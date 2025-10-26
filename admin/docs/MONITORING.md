# Post-merge monitoring

- Check Supabase logs for 5xx spikes; correlate with x-request-id from UI or smoke tests.
- Verify RLS errors (401/403) are expected; adjust policies if legitimate access should be allowed.
- Track login-to-dashboard TTI after changes; ensure provisional profile path is not visible to end-users in production (switch off once stable).
- Ensure VITE_ALLOW_PROVISIONAL_ADMIN=0 in production. Only toggle to 1 during emergencies; revert after fix. Remove emergency bypass VITE_DEV_EMERGENCY_ADMIN entirely post-stabilization.
