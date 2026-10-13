# Node / API roadmap (`HornsApp-NodeJS`)

Ops + data quality for HornsApp / Muvin. Prefer additive Compass fixes; clients consume via HTTPS.

**Updated:** 2026-10-12

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
| `#feat-8-end-date` | Feat | Optional event `endDate` for multi-day runs. **Done in repo:** schema + upcoming filter + sync skill + theater pack backfill. **Left:** deploy API + Compass import of theater updates | Small | Deploy + import |

---

## Done (recent)

| ID | Note |
|----|------|
| `#feat-8-end-date` (code) | `endDate` on event model; upcoming `$or` filter; skill date rules; theater JSON endDates |
