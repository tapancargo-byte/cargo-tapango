# Internal Cleanup & Audit Summary

This document consolidates prior cleanup/audit reports so we can safely remove redundant root-level files. It summarizes what matters and where to find the canonical sources going forward.

## Canonical Sources To Keep

- **DOCUMENTATION.md** (root): Single source of truth for project docs
- **README.md** (root): Entry point; link to `DOCUMENTATION.md`
- **supabase/**: All migrations and backend assets
- **tapango/** and **admin/**: App sources
- **tsconfig.json** (root): References to subprojects

## Content Merged Here (Safe To Remove After Commit)

- `CLEANUP_COMPLETION_SUMMARY.md`
- `cleanup_plan.md`
- `MISSION_COMPLETE.md`
- `PR_DESCRIPTION.md`

Key takeaways from those files:

- **Dependency unification:** Conflicts across mobile/admin were identified and addressed. Continue to pin cross-cutting libs to compatible ranges and verify with typecheck + lint.
- **Docs consolidation:** A single `DOCUMENTATION.md` exists; archive or delete one-off reports to reduce noise.
- **Duplicate artifacts:** Build outputs and generated assets are safe to delete/regenerate.

## Analysis Artifacts (Delete or Move To scripts/audit/)

These were used during one-time repo cleanup. They should not ship with the repo root.

- `dependencies_matrix.json`
- `dependency_conflicts.json`
- `duplicates_by_hash.json`
- `duplicates_report.json`
- `madge_output.txt`
- `madge_circular.json`
- `routes_map.json`
- `repo_files_before.txt`
- `filelist.json`
- `navigation_search.txt`
- `tree.txt`
- `cleanup_patch.diff`
- `final_cleanup_patch.diff`

Recommended: delete to reduce clutter. If you want to regenerate later, keep the scripts under `scripts/audit/`.

## Utility Scripts (Move Under scripts/audit/)

- `gather-deps.js` → `scripts/audit/gather-deps.js`
- `process-colors.js` → `scripts/audit/process-colors.js`
- If you intend to periodically scan hardcoded colors, keep `process-colors.js` and drop the raw outputs below.

## Color Scan Outputs (Delete)

- `hardcoded_colors_raw.txt`
- `hardcoded_colors.json`

These are derived from source code and can be regenerated when needed.

## Supabase Migration File (Move)

- `supabase-migration.sql` → `supabase/migrations/000_legacy_consolidated_migration.sql`

Reason: keep all SQL under `supabase/migrations/` for consistency with local/CI flows.

## Exact Git Commands (proposed)

Run from the repo root. Review before executing.

```bash
# Create audit folder for scripts
mkdir -p scripts/audit

# Move scripts and SQL
git mv gather-deps.js scripts/audit/gather-deps.js
git mv process-colors.js scripts/audit/process-colors.js
git mv supabase-migration.sql supabase/migrations/000_legacy_consolidated_migration.sql

# Remove redundant docs and analysis artifacts
git rm -f CLEANUP_COMPLETION_SUMMARY.md \
  cleanup_plan.md MISSION_COMPLETE.md PR_DESCRIPTION.md WARP.md \
  dependencies_matrix.json dependency_conflicts.json \
  duplicates_by_hash.json duplicates_report.json \
  madge_output.txt madge_circular.json \
  routes_map.json repo_files_before.txt filelist.json navigation_search.txt tree.txt \
  cleanup_patch.diff final_cleanup_patch.diff \
  hardcoded_colors_raw.txt hardcoded_colors.json \
  package-lock.json

# Note: root package-lock.json is redundant; per-project lockfiles live in admin/ and tapango/

# Commit
git add -A
git commit -m "chore(docs): consolidate cleanup/audit docs; move scripts under scripts/audit; remove redundant artifacts"
```

If you prefer to archive instead of delete, move files into `docs/obsolete-backup/`.
