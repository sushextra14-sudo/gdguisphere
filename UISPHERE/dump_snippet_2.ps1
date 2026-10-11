$raw = [System.IO.File]::ReadAllText("$PSScriptRoot\client_bundle.js")
$idx = $raw.IndexOf("faq-1")
if ($idx -gt -1) {
    $outPath = Join-Path $PSScriptRoot "data_snippet_2.js"
    $snippet = $raw.Substring($idx - 20, 15000)
    [System.IO.File]::WriteAllText($outPath, $snippet)
    Write-Host "Success"
} else {
    Write-Host "Not found"
}
