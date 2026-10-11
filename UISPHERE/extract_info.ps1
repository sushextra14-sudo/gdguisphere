$raw = [System.IO.File]::ReadAllText("$PSScriptRoot\client_bundle.js")

# Find URLs
$urls = [regex]::Matches($raw, 'https?://[^\s"''`<>]+') | ForEach-Object { $_.Value } | Select-Object -Unique
Write-Host "=== URLS ==="
$urls | Select-Object -First 30

# Find emails
$emails = [regex]::Matches($raw, '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}') | ForEach-Object { $_.Value } | Select-Object -Unique
Write-Host "`n=== EMAILS ==="
$emails

# Search snippets with contact / address / footer
Write-Host "`n=== CONTACT / FOOTER SNIPPETS ==="
$matches = [regex]::Matches($raw, '(.{0,100}(?:contact|footer|address|location|email|venue|phone|social).{0,200})', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
$matches | Select-Object -First 25 | ForEach-Object {
    Write-Host "---"
    Write-Host $_.Value.Trim()
}
