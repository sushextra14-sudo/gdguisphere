$raw = [System.IO.File]::ReadAllText("$PSScriptRoot\client_bundle.js")

# Find footer component
$idx = $raw.IndexOf("footer")
$footerMatches = [regex]::Matches($raw, '<footer[^>]*>.*?</footer>', [System.Text.RegularExpressions.RegexOptions]::Singleline)

# Let's search for "gdg@iter.ac.in" or social handles or footer text
$idx2 = $raw.IndexOf("gdg@iter.ac.in")
if ($idx2 -gt -1) {
    $outPath = Join-Path $PSScriptRoot "footer_snippet.js"
    $start = [Math]::Max(0, $idx2 - 1500)
    $snippet = $raw.Substring($start, 5000)
    [System.IO.File]::WriteAllText($outPath, $snippet)
    Write-Host "Wrote footer snippet around gdg@iter.ac.in ($idx2)"
} else {
    Write-Host "gdg@iter.ac.in not found"
}
