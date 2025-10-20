$ErrorActionPreference = 'Stop'

# Determine repository root based on this script's location
$repoRoot = Split-Path -Path $PSScriptRoot -Parent

# 1) Backup and merge Markdown files into README.md (excluding node_modules)
$timestamp = Get-Date -Format 'yyyyMMdd_HHmmss'
$backupDir = Join-Path $repoRoot "docs\_backup_$timestamp"
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null

$mdFiles = Get-ChildItem -Path $repoRoot -Recurse -File -Filter *.md |
    Where-Object { $_.FullName -notlike '*\node_modules\*' -and $_.Name -ne 'README.md' }

# Backup: copy all markdowns (flattening names that contain invalid chars for Windows filenames)
foreach ($f in $mdFiles) {
    $relative = $f.FullName.Substring($repoRoot.Length + 1)
    $safeName = ($relative -replace '[\\/:*?\"<>|]', '_')
    $dest = Join-Path $backupDir $safeName
    Copy-Item -LiteralPath $f.FullName -Destination $dest -Force
}

# Merge into README.md
$readme = Join-Path $repoRoot 'README.md'
if (-not (Test-Path $readme)) {
    Set-Content -Path $readme -Value "# Tapango Mobile App`n"
}

Add-Content -Path $readme -Value "`n`n## Consolidated Documentation (archived) - $timestamp`n"

$sorted = $mdFiles | Sort-Object FullName
foreach ($f in $sorted) {
    $rel = $f.FullName.Substring($repoRoot.Length + 1)
    Add-Content -Path $readme -Value "`n---`n### $rel`n"
    $content = Get-Content -LiteralPath $f.FullName -Raw
    Add-Content -Path $readme -Value $content
    Add-Content -Path $readme -Value "`n"
}

# Delete the merged markdown files
foreach ($f in $mdFiles) {
    Remove-Item -LiteralPath $f.FullName -Force -ErrorAction SilentlyContinue
}

# 2) Remove redundant/unnecessary files & directories
$removePaths = @(
    '.storybook',
    'playwright.config.json',
    'babel.config.js.bak',
    'components',                     # root legacy components (unused)
    'src\components\ui',             # legacy internal UI (unused)
    'src\components\examples',       # example components (unused)
    '__tests__',                      # standardize on tests/
    '.eslintcache',                   # cache
    'test-results',                   # artifacts
    'tsc-errors.log',                 # log
    'assets\onboarding\spinner_lottie.json',
    'assets\onboarding\design_specs.json'
)

foreach ($p in $removePaths) {
    $full = Join-Path $repoRoot $p
    if (Test-Path $full) {
        Remove-Item -LiteralPath $full -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "Removed: $p"
    }
}

Write-Host "Cleanup done. Backup of docs: $backupDir"
