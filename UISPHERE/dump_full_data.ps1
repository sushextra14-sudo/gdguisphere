$raw = [System.IO.File]::ReadAllText("$PSScriptRoot\client_bundle.js")

# Find the main data definition in the bundle
# Look for organization:`Google Developer Group (GDG) @ SOA, ITER Chapter`
$idx = $raw.IndexOf("Google Developer Group (GDG) @ SOA, ITER Chapter")
if ($idx -gt -1) {
    $start = [Math]::Max(0, $idx - 300)
    $len = [Math]::Min($raw.Length - $start, 12000)
    $snippet = $raw.Substring($start, $len)
    [System.IO.File]::WriteAllText("$PSScriptRoot\data_snippet.js", $snippet)
    Write-Host "Wrote data_snippet.js ($len chars)"
} else {
    Write-Host "Not found"
}
