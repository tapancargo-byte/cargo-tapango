# AWARDS-GRADE MASTER PLAN – TAPANGO CARGO LOGISTICS (Living Doc)

This blueprint folds earlier insights (Address Autocomplete, ₹-first UI, volumetric weight, GST, push, dark mode, accessibility, Supabase) into three parallel work-streams. It aligns with docs/ADDRESS_AUTOCOMPLETE_AND_UX_PLAN.md and is ticket-grade: every item has acceptance criteria, effort, and KPI hooks. Paste-ready for Jira/Notion.

Linkage:
- Customer App milestones M0–M7 map to TC tasks below (see Mapping table at end).
- This file is a living artifact; update per release train.

---

## 🎯 North-Star (award-ceremony wording)
> “India’s safest, fastest, most delightful cargo platform – ₹-native, GST-compliant, zero-crash, 60 fps, WCAG 2.2 AA – where customers book in 3 taps, drivers earn more, admins geofence the country.”

## 🧭 Success KPIs (non‑negotiable)
| KPI | Budget | Measure |
|-----|--------|---------|
| Customer book → quote | ≤ 5 s | Flipper timeline + react-query timings |
| Driver accept | ≤ 30 s (90%ile) | Supabase realtime event latency |
| Scroll FPS (all apps) | ≥ 60 | RN Perf Monitor / Chrome FPS meter |
| Crash-free sessions | ≥ 99.8% | Sentry / Play Console |
| GST invoice accuracy | 100% | Spot audit vs GST spec |
| Dark-mode flash | 0 frames | Visual capture test |
| WCAG violations | 0 | axe DevTools / RN A11y Inspector |

Notes: On Android/iOS you cannot bypass system DND; use high-priority channels within OS limits.

---

## 🗂 Epic Backlogs (parallel streams)

### A. TAPANGO CUSTOMER APP (TC)
ID | Task | Cargo Twist | Acceptance Criteria | Est. | Owner
---|---|---|---|---|---
TC0 | ₹-first currency helper | Intl.NumberFormat('en-IN') | Zero "$" via repo grep; unit test asserts ₹ | 0.5 d | FE
TC1 | Google Places key (restricted) | Shared across apps | EAS secret; platform restrictions documented | 0.5 d | DevOps
TC2 | usePlacesAutocomplete hook | 400–600 ms debounce | Exponential backoff; zustand cache; session-token | 1 d | FE
TC3 | AddressAutocomplete component | “Pickup address for cargo” a11y | Dark-mode safe; shows PIN prominently | 1 d | FE
TC4 | 3-step Book Wizard | Step 0 Truck-Type; Step 1 Places; Step 2 Cargo+Quote | ≤ 3 taps; quote P95 ≤ 1.8 s; draft resume | 3 d | FE
TC5 | Volumetric weight live tag | L×W×H/5000 vs actual | “Billable weight” updates live with guidance | 0.5 d | FE
TC6 | GST break-up card | CGST/SGST or IGST; HSN 9965 | Stored in quotes.gst_breakup; rounding to ₹0.01 | 0.5 d | FE
TC7 | Quote → Pay flow | Credit-limit banner | Blocks if credit exceeded; telemetry | 1 d | FE
TC8 | LiveMap tracking | Truck icon + ETA overlay | 60 fps on low-end Android; polling 30 s | 2 d | FE
TC9 | Share ETA (WhatsApp) | “Track TPG123” | Native share; deep-link works | 0.5 d | FE
TC10 | Repeat Cargo button | Re-use last place_ids | 1-tap draft on Home | 0.5 d | FE
TC11 | Offline queue for quote | Retry on NetInfo changes | Toast “Quote pending network”; replay success | 1 d | FE
TC12 | Push critical channel | High-priority within OS rules | Foreground heads-up (where allowed) | 1 d | BE
TC13 | Dark mode instant | Persist with mmkv | No flash on toggle or app start | 1 d | FE
TC14 | A11y audit | Labels, contrast, dynamic type | 0 axe violations; VO hints on main actions | 1 d | FE
TC15 | Detox E2E | Book → pay → track → delivered | CI green run | 2 d | QA

### B. TAPANGO DRIVER APP (TD)
ID | Task | Cargo Twist | Acceptance Criteria | Est. | Owner
---|---|---|---|---|---
TD0 | Driver Places key | Driver bundle restriction | Re-use TC1 secret with bundle constraint | 0.2 d | DevOps
TD1 | Driver autocomplete | “Current location” chip | Prefills pickup; 3 recent addresses | 1 d | FE
TD2 | Bid/Offer flow | driver_offers table | Offer created in ≤ 2 taps; realtime to admin | 1 d | FE
TD3 | GPS stream optimisation | 10 m/5 s moving; 100 m/30 s idle | Battery drain ≤ 3%/h (mid device) | 1 d | FE
TD4 | Geofence auto-status | 150 m radius → PICKUP_ENTER | Status lag ≤ 30 s vs GPS | 1 d | BE
TD5 | Proof of delivery | Photo + e‑signature | Upload ≤ 500 KB; stored in Supabase | 1 d | FE
TD6 | Driver wallet | Today’s earnings + history | ₹ format; filters | 0.5 d | FE
TD7 | Dark mode | Night shift | Tokens match customer | 0.5 d | FE
TD8 | A11y | Clear hints | 0 violations | 0.5 d | FE

### C. ADMIN COMMAND‑CENTRE (TA)
ID | Task | Cargo Twist | Acceptance Criteria | Est. | Owner
---|---|---|---|---|---
TA0 | Admin Places key | Admin domain restrict | Re-use TC1 key; domain whitelisted | 0.2 d | DevOps
TA1 | Google Maps JS + traffic | Live traffic + truck icons | ≤ 60 fps on 4K monitor | 2 d | FE
TA2 | Joy UI (MUI v6) theme | Dark-mode, better contrast | WCAG 2.2 AA pass | 2 d | FE
TA3 | PostGIS dashboard | Order-density heat map | Zoom ≤ 500 ms | 1 d | FE
TA4 | Auto-assign workflow | ≤ ₹50k standard region → auto | ≥ 80% orders auto-assigned | 2 d | BE
TA5 | GST invoice generator | PDF HSN 9965 + QR | ≤ 200 KB; sample validates | 1 d | BE
TA6 | Credit top‑up | Admin RPC → profiles.credit_limit | Audit log record created | 0.5 d | BE
TA7 | Driver KYC queue | RC + licence approve/reject | SLA ≤ 24 h | 1 d | Admin
TA8 | Rate‑limit monitor | Google $ usage chart | Alert @ 80% quota | 0.5 d | BE
TA9 | Dark mode | System + manual | No flash | 0.5 d | FE
TA10 | A11y audit | Keyboard table sorting | 0 axe violations | 1 d | FE

---

## 🧪 Cross‑Cutting QA & Perf
ID | Task | Scope | Acceptance | Est. | Owner
---|---|---|---|---|---
QP0 | Sentry release tracking | All apps | Sourcemaps uploaded; crash‑free ≥ 99.8% | 0.5 d | DevOps
QP1 | Detox E2E pipeline | Mobile | Parallel sims; end‑to‑end green | 2 d | QA
QP2 | Lighthouse CI | Admin | Perf ≥ 90; block merge if < 90 | 1 d | QA
QP3 | Bundle size budgets | All | Customer ≤ 35 MB; Driver ≤ 30 MB; Admin ≤ 250 kB first load | 0.5 d | DevOps

---

## 🚀 Release Train
Phase | Scope | Gates
------|-------|------
α | TC0‑TC6 + TD0‑TD2 + TA0‑TA1 | Internal dogfood; ₹ shown everywhere; GST PDF correct
β | Full backlog; Detox green; Lighthouse ≥ 90 | 20% rollout; crash‑free ≥ 99.5%
GA | Marketing push; award submission | Play Store targets; press kit ready

---

## 📁 File Tree (new files only – indicative)
```
tapango/
├── app/(tabs)/book/wizard.tsx          // TC4
├── components/AddressAutocomplete.tsx  // TC3
├── hooks/usePlacesAutocomplete.ts      // TC2
├── stores/quoteStore.ts                // TC6
admin/
├── src/pages/live-map.tsx              // TA1
├── src/components/gst-invoice.tsx      // TA5
supabase/
├── migrations/20250622_quotes.sql      // TC6
├── migrations/20250622_workflows.sql   // TA4
```

---

## 🔗 Mapping to docs/ADDRESS_AUTOCOMPLETE_AND_UX_PLAN.md
- M0 (INR + offline + telemetry) → TC0, TC11, QP0
- M1 (Autocomplete) → TC1–TC3
- M2 (Book + Quote) → TC4–TC7
- M3 (Track) → TC8–TC9
- M4 (Home) → TC10 + polish
- M5 (Orders) → integrated later (admin PDFs TA5 complements)
- M6 (Profile) → dark/language/KYC align with admin TA7
- M7 (A11y/Perf/E2E) → TC14–TC15 + QP1–QP3

---

## ❗ Risks & Clarifications
- Push “bypass DND” is OS‑constrained; we’ll use high‑priority channels instead.
- Places costs: enforce country=IN, session tokens, cache; add TA8 quota alerts.
- Scope creep: Admin geospatial features should not block mobile α/β; keep behind flags.
- Privacy: PII in addresses handled per platform secure‑storage policy; rotate keys.

---

## ✅ First PR set (suggested)
1) TC0 – ₹ helper + zero‑$ grep
2) TA0 – Restricted Google key (shared pool with proper restrictions)
3) QP0 – Sentry release + sourcemaps on CI

Reply “award-go” to proceed with these PRs.

