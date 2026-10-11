$raw = [System.IO.File]::ReadAllText("$PSScriptRoot\client_bundle.js")
$idx = $raw.IndexOf('children:[(0,U.jsx)(`footer')
if ($idx -eq -1) { $idx = $raw.IndexOf('footer') }
if ($idx -gt -1) {
    $outPath = "$PSScriptRoot\real_footer.js"
    $snippet = $raw.Substring($idx, 4000)
    [System.IO.File]::WriteAllText($outPath, $snippet)
    Write-Host "Success ($idx)"
} else {
    Write-Host "Not found"
}
