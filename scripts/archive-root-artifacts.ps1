param()
$ErrorActionPreference = 'Stop'
$dest = Join-Path -Path 'docs' -ChildPath 'obsolete-backup'
if (-not (Test-Path $dest)) {
  New-Item -ItemType Directory -Force -Path $dest | Out-Null
}

$files = @(
  'CLEANUP_COMPLETION_SUMMARY.md',
  'cleanup_patch.diff',
  'final_cleanup_patch.diff',
  'cleanup_plan.md',
  'dependencies_matrix.json',
  'dependency_conflicts.json',
  'duplicates_by_hash.json',
  'duplicates_report.json',
  'madge_circular.json',
  'madge_output.txt',
  'navigation_search.txt',
  'repo_files_before.txt',
  'filelist.json',
  'routes_map.json',
  'tree.txt',
  'package-lock.json',
  'PR_DESCRIPTION.md',
  'WARP.md',
  'gather-deps.js',
  'process-colors.js',
  'hardcoded_colors_raw.txt',
  'hardcoded_colors.json',
  'supabase-migration.sql'
)

$moveCount = 0
foreach ($f in $files) {
  if (Test-Path $f) {
    $target = Join-Path $dest (Split-Path $f -Leaf)
    git mv -- $f $target 2>$null
    if ($LASTEXITCODE -ne 0) {
      Move-Item -Path $f -Destination $target -Force
    }
    $moveCount++
  } else {
    Write-Host "Skip missing $f"
  }
}

git add -A
try {
  git commit -m "chore(docs): archive audit/cleanup artifacts under docs/obsolete-backup/" | Out-Null
} catch {}

Write-Host "Archived $moveCount file(s) to $dest"
