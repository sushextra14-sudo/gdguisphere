$raw = [System.IO.File]::ReadAllText("$PSScriptRoot\client_bundle.js")
$idx = $raw.IndexOf("#faqs")
if ($idx -gt -1) {
    $outPath = Join-Path $PSScriptRoot "footer_col345.js"
    $snippet = $raw.Substring($idx - 50, 4000)
    [System.IO.File]::WriteAllText($outPath, $snippet)
    Write-Host "Success"
} else {
    Write-Host "Not found"
}
