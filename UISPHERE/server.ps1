$port = 3000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")

try {
    $listener.Start()
    Write-Host "HTTP server running at http://localhost:$port/"
} catch {
    Write-Error "Failed to start server: $_"
    exit 1
}

$root = $PSScriptRoot
if (-not $root) {
    $root = (Get-Location).Path
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        # Add CORS headers
        $response.AddHeader("Access-Control-Allow-Origin", "*")
        
        $rawPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($rawPath) -or $rawPath -eq "/") {
            $rawPath = "index.html"
        }
        
        # Security & subfolder resolution
        $relPath = [System.Uri]::UnescapeDataString($rawPath).Replace('/', '\')
        $fullRequested = [System.IO.Path]::GetFullPath((Join-Path $root $relPath))
        
        if ($fullRequested.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase) -and (Test-Path $fullRequested -PathType Leaf)) {
            $filePath = $fullRequested
        } else {
            $assetAttempt = Join-Path $root ("assets\" + [System.IO.Path]::GetFileName($rawPath))
            if (Test-Path $assetAttempt -PathType Leaf) {
                $filePath = $assetAttempt
            } else {
                $filePath = Join-Path $root "index.html"
            }
        }
        
        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".svg"  { "image/svg+xml" }
                ".json" { "application/json; charset=utf-8" }
                ".ico"  { "image/x-icon" }
                default { "application/octet-stream" }
            }
            
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    } catch {
        # Continue loop on error
    }
}
