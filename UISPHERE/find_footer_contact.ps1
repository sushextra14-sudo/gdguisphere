$raw = [System.IO.File]::ReadAllText("$PSScriptRoot\client_bundle.js")
$idx = $raw.IndexOf('developers.google.com/community/gdg')
if ($idx -gt -1) {
    $outPath = "$PSScriptRoot\footer_contact_full.js"
    $snippet = $raw.Substring($idx - 50, 4000)
    [System.IO.File]::WriteAllText($outPath, $snippet)
    Write-Host "Success ($idx)"
} else {
    Write-Host "Not found"
}
