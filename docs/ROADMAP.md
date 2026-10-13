# Node / API roadmap (`HornsApp-NodeJS`)

Ops + data quality for HornsApp / Muvin. Prefer additive Compass fixes; clients consume via HTTPS.

**Updated:** 2026-10-13

### How to use

- Pick keys like `#data-1-venue-maps` in commits / chat.
- Move rows: Next → Active → Done. One Active at a time when pairing with clients.
- **iOS twin:** [`HornsApp-Mobile-Ios/docs/ROADMAP.md`](../../HornsApp-Mobile-Ios/docs/ROADMAP.md) `#fix-1-venue-maps-open`.

---

## Active

| ID | Item | Effort | Depends on |
|----|------|--------|------------|
| — | *(none)* | | |

---

## Next — data / venues

| ID | Kind | Item | Effort | Depends on |
|----|------|------|--------|------------|
| `#data-1-venue-maps` | Fix | Audit venues that **fail to open in Apple / Google Maps**: missing/null/`0` `latitude`/`longitude`, wrong coords, or weak `mapSearchName`. Backfill Compass updates (shape already `{ name: {en,es}, latitude, longitude, mapSearchName }`). Sync skill: require usable map fields on new venues; note bad halls in hand-off | Medium | — (Compass + skill); pairs with iOS `#fix-1-venue-maps-open` |

---

## Next — API / product

| ID | Kind | Item | Effort | Depends on |
|----|------|------|--------|------------|
| `#feat-8-end-date` | Feat | **`endDate` required**; upcoming = `endDate >= now`. **Backfill order:** import real-range packs → audit theater/season suspects → only then +2h for the rest ([`BACKFILL-ENDDATE.md`](../scripts/lima-events-sync/BACKFILL-ENDDATE.md)). Blind +2h alone would hide multi-day runs. **Left:** audit current DB · deploy API | Small | Audit before +2h · deploy |

---

## Done (recent)

| ID | Note |
|----|------|
| `#feat-8-end-date` (code) | `endDate` always; filter `{ endDate: { $gte: now } }`; skill +2h default; backfill doc |
