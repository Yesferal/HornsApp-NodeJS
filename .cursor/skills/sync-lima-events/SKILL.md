---
name: sync-lima-events
description: >-
  Weekly sync of Lima (Peru) events into HornsApp MongoDB Compass JSON.
  Use when the user says "sync events", "Cursor sync events for apps",
  "weekly events", recreate last-sync-report, or asks to
  refresh Lima / Callao concerts, fests, runs, or theater for HornsApp / Muvin.
disable-model-invocation: false
---

# Sync Lima events (HornsApp / Muvin)

Additive Compass JSON only. Do **not** wipe collections.

## Steps (follow in order — announce each briefly to the user)

| # | Step | What |
|---|------|------|
| **0** | Gate | Open `LAST-SYNC-REPORT.md`. If missing/corrupt → stop and ask for the 5 Compass dumps (recreate). |
| **1** | Clear JSON | Delete all `output/*.json` (prior run assumed imported). Keep the report. |
| **2** | Dedupe | Compare finds vs §4 events: **name + date** (+ **headliner** if both set). |
| **3** | Watchlist | Read §3 **and** §4 Announced/IN_REVIEW rows — candidates to **promote** this run. |
| **4** | Scan | Group A for the **default window** (or user range). **Lima + Callao**. |
| **5** | Classify | New → Confirmed / Announced+IN_REVIEW / §3. **Also:** if a watchlist or IN_REVIEW event is now solid → promote (see below). |
| **6** | Write JSON | Only **new** objects → `events-YYYY-MM-DD.json` (+ cats/venues/activities/states if new). |
| **7** | Images + about | Image: **event → headliner → venue → default**. Always non-empty **about.es** + **about.en**. |
| **8** | Times | UTC (Lima UTC−5). |
| **9** | Update report | Refresh `LAST-SYNC-REPORT.md` §1–§4 (append oids · drop past events · sort §4c). |
| **10** | Hand off | Tell user what to import: **states → categories → venues → activities → events**. |

When running, say e.g. “Step 1 — clearing output JSON…” so the path is visible in chat.

### Default window

Unless the user names other dates:

| | |
|--|--|
| **From** | today (Lima calendar) |
| **To** | **31 Dec of next calendar year** |

Example: on 2026-09-21 → scan **2026-09-21 → 2027-12-31**.  
That picks up early next-year announcements without a huge backlog of past dates. §4c still drops rows whose date is before today.

User can narrow (“next 8 weeks”) or widen; otherwise use this default.

---

## Skill I/O (only this)

```
scripts/lima-events-sync/
  LAST-SYNC-REPORT.md         ← primary input/output each sync (tracked)
  input/                      ← Compass table dumps (*.json gitignored) — rebuild backup
  output/
    events-YYYY-MM-DD.json    ← new events this run (gitignored) — cleared at start
    categories-*.json         ← only if new keys (gitignored)
    venues-*.json             ← only if new venues (gitignored)
    activities-*.json         ← only if new activities (gitignored)
    states-*.json             ← only if new states (gitignored)
```

| Path | Git | Role |
|------|-----|------|
| `scripts/lima-events-sync/LAST-SYNC-REPORT.md` | yes | **Required** — §1–5 + §4 oids |
| `input/*.json` | no | Backup dumps to recreate report |
| `output/*.json` | no | New Compass paste for **this** run only |

Process = **this skill**. Oids live **only** in `LAST-SYNC-REPORT.md` §4.  
Ignore `**/*.json` under this folder (except the report is `.md`).

---

## Step 0 — Read LAST-SYNC-REPORT (gate)

**Always** open `scripts/lima-events-sync/LAST-SYNC-REPORT.md` first.

### Exists + healthy

Use as background: §3 watchlist, §4 inventory. Continue.

Healthy = sections §1–§5 present, and §4a–4e tables with name/key + oid.

### Missing or corrupt

1. **Stop.** Tell the user `LAST-SYNC-REPORT.md` is missing or unusable.
2. **Ask for all 5 Compass collection dumps** (chat paste or drop under `input/`):

| Collection | Typical export name | Fills |
|------------|---------------------|--------|
| **Categories** | `hornsAppDB.categories.json` | §4a |
| **Venues** | `hornsAppDB.venues.json` | §4b |
| **Events** | `hornsAppDB.events.json` | §4c |
| **Activities** | `hornsAppDB.activities.json` | §4d |
| **States** | `hornsAppDB.states.json` | §4e |

3. Do **not** invent oids or scan the web until the report is rebuilt.
4. When all 5 are available → recreate (below). If any file is missing, ask again for the missing one(s).

### Recreate from JSON (“rebuild last-sync-report”)

Requires **all five** dumps above.

Write `LAST-SYNC-REPORT.md` from the skeleton below; §4c = Lima today+future only, sorted by date; strip about/tickets/images/geo. Start §3 empty (or keep recoverable open watchlist rows only if the corrupt file still has a readable §3).

---

## Weekly sync steps (detail)

Same as the table at the top. Extra rules:

0. **Gate:** read `LAST-SYNC-REPORT.md` (Step 0 section below).
1. **Clear stale output JSON:** delete all `output/*.json`. Keep `LAST-SYNC-REPORT.md` (one level up from `output/`).
2. Dedupe against **§4** (see event dedupe key below).
3. Read §3 **and** §4 Announced/IN_REVIEW (promotion candidates).
4. Scan group A for the window (see **Default window**). **Lima + Callao**.
5. Classify new finds; **promote** watchlist / IN_REVIEW rows that are now solid (Confirmed, drop IN_REVIEW, remove from §3).
6. **Write new JSON only** for objects not in §4 (`events-YYYY-MM-DD.json` + optional cats/venues/activities/states).
7. **Images:** shape-check real poster; else default by category (see Images). Prefer default over `""`.
7b. **About i18n:** always set non-empty `about.es` **and** `about.en` (translate; never leave one null/blank).
8. Times: UTC (Lima UTC−5).
9. **Update `LAST-SYNC-REPORT.md`:** Last sync, §1–3, **§4** (append · drop past · sort §4c).
10. Tell user import order; next sync will clear those JSON files again.

---

## Report skeleton

```markdown
# Lima events — last sync report

| | |
|--|--|
| **Last sync** | YYYY-MM-DD |
| **Window** | … (default: today → 31 Dec next year) |
| **Inventory from** | … |

---

## 1. Summary
## 2. Ready for Compass (this run’s JSON only)
## 3. Watchlist — needs manual approval
## 4. DB inventory (dedupe + link)
### 4a. Categories — key · oid
### 4b. Venues — name · oid
### 4c. Events — name · date · venue · state · oid
### 4d. Activities — name · oid
### 4e. States — name en/es · oid
## 5. How to run
```

---

## §4 inventory — names + oids

| Collection | Columns | Dedupe key |
|------------|---------|------------|
| **categories** | key + oid | key |
| **venues** | name + oid | name |
| **events** | name + date + venue + state + oid (+ headliner when known) | see **Event dedupe** below |
| **activities** | name + oid | name |
| **states** | name en/es + oid | English name |

Reuse §4 oids when writing event JSON. Never invent an oid for a name already in §4.

### Event dedupe

**Primary key:** normalized **name** + Lima **date** (calendar day).  
That alone catches almost every duplicate (tour titles are distinctive; multi-night tours differ by date).

**Headliner (optional tie-break):** if **both** the §4 row and the candidate have a non-empty headliner and they **differ** (case-insensitive) → treat as **different** events (rare same-name / same-day clash). If either headliner is missing or they match → same event → skip write.

### Event `state` from web confidence

| Web finding | State | Also |
|-------------|--------|------|
| Tickets + date + venue solid | **Confirmed** | — |
| Announced / press / soft / incomplete | **Announced** | always add category **`IN_REVIEW`** |
| Official delay | **Postponed** | — |
| Official cancel | **Cancelled** | — |
| Sold out | **Sold Out** | — |

**`IN_REVIEW`:** ops category for admin filter. Client **list** endpoints (`/event`, `/concert`) exclude those events; **GET by id** still returns them. After manual fix, remove `IN_REVIEW` (and usually set state Confirmed).

### Activities (optional UX)

Only if important and/or repeats across events. Skip one-offs.

### Images (`headliner.url`) — must work on iOS/Android

Client uses `headliner.url` in `AsyncImage` / equivalent. **Broken URL = blank UI.**

**Flow (priority):**  
1. **Event** poster (ticketing / official event page image)  
2. Else **headliner** press/official image (same shape rules)  
3. Else **venue** `imageUrl` (use `name.es` for venue labels in the report)  
4. Else **category default** (for now all kinds share the same Vecteezy JPEG; per-category defaults later)  

Shape-check every candidate. Never leave blank if a default exists.

#### 1) Real poster — cheap URL-shape check (no network)

Pass only if **all**:

1. `https://`
2. Path ends with `.jpg` / `.jpeg` / `.png` (optional `.webp`)
3. **No** `?` query and **no** `#`
4. Host not in reject list
5. Length ≲ **200** chars

**Reject → do not use** (fall through to defaults):

| Signal | Why |
|--------|-----|
| any `?` query | signed / session (`token`, `Expires`, `X-Amz-`, …) |
| `wikipedia` / `wikimedia` | unstable |
| `instagram` / `fbcdn` / `cdninstagram` | expire |
| `googleusercontent` / `ggpht` | gated |
| no image extension | HTML page |
| `http://` | ATS risk |
| very long URL | usually signed |

#### 2) Defaults by kind (when real image missing/fails)

Use a **simple** `https://…/….png` with **no query**. Pick from the event’s primary content category.

| Kind (category key) | Default `headliner.url` |
|---------------------|-------------------------|
| METAL / ROCK / PUNK / POP | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| FEST / FREE / CONCERT (fallback live) | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| THEATER / MUSICAL / MUSEUM | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| FOOD / COFFEE / CRAFT | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| ANIME / BOOKS / PETS | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| SPORT | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| HOTEL / IN_REVIEW| `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| anything else | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |

If `isLiveMusicEvent: true` and categories are only CONCERT + genre, prefer the **genre** row (METAL/ROCK/…) over CONCERT.

These are **temporary placeholders** until you paste a real poster in admin. Same shape rules apply (https, `.png`, no `?`).

---

## Product split

| Flag | Feed | Types |
|------|------|-------|
| `isLiveMusicEvent: true` | Horns `/concert` | metal, rock, jazz, blues, pop, punk + similar fests |
| `isLiveMusicEvent: false` | Muvin `/event` | food, coffee, anime, books, pets, craft, sport, theater, urban, EDM, K-pop, tropical, TEDx, … |

## Sources

### A — Weekly

**Ticketing (authoritative — required to pick / write a paid event):**  
Joinnus · Teleticket · Ticketmaster PE · Passline · Eventrid · EntradaLibre

A **paid** event enters the sync pack only when it appears on (or is confirmed by) one of these with a usable date + enough detail. Prefer the **event page** URL (never homepage / events / search — see **Ticketing**).

**Leads / calendars (reference — not enough alone for paid events):**  
Enlima · Running4Peru · Infobae · La República · El Comercio · Peru Travel eventos  

Use these to **discover leads** or fill context (`about`, venue hints). For **paid** events: **do not** add or Confirm from a lead alone — verify on a Group A **ticketer** first. If a lead says it’s on sale but no ticketer page yet → §3 watchlist or Announced+IN_REVIEW with `ticketing.url: ""` (name only), never a listing URL.

**Exception — FREE / libre:**  
If the event is clearly **free** (entrada libre / FREE / no ticket sale), you **may** write it from a lead/calendar alone (no ticketer required). Prefer category **`FREE`** when that key exists in §4a. Omit `ticketing` or leave `url: ""` — do not invent a ticketer homepage.

## Confirmed / Announced vs §3

**Confirmed:** tickets + **date** + venue solid → write event JSON (no `IN_REVIEW`).  
**Announced:** real event but incomplete → write JSON with state Announced **and** category `IN_REVIEW`.

**Date vs venue TBA**
- **Date TBA** → **do not** write the event (skip; optional §3 note only if you want a reminder). No calendar day = no import.
- **Venue unknown** → **write** the event; use venue **TBA / No anunciado** (`63e7b5bb5b520b8feeb889b7`). Update the venue later when known.

### §3 Watchlist (parking lot — not JSON yet)

Use **§3** when the skill should **not** write import JSON yet, for example:
- sources disagree on the **date**
- **date** still TBA (no day yet)
- you need to **choose** before import  

Do **not** park an event in §3 only because the venue is unknown — **write** it with venue **TBA / No anunciado** (`63e7b5bb5b520b8feeb889b7`) and Announced+IN_REVIEW (or Confirmed if the rest is solid).

| Status | Who sets it | Meaning |
|--------|-------------|---------|
| `open` | skill (or you) | Still waiting — keep the row |
| `approved` | **you** (chat or edit) | OK to write on the **next** sync |
| `imported` | **you** say so in chat (“imported”) **or** you edit the report — *not* auto-detected from Compass | Done in DB → skill **deletes** the row on the next sync (or immediately if you ask) |
| `rejected` / `closed` | **you** | Won’t do — **delete** the row |

Compass import is **manual**. The skill never “sees” the DB unless you paste dumps or say you imported. After you import a §2 pack (or an approved §3 row that was written), tell the skill (e.g. “imported”) or the next sync assumes prior `output/*.json` was imported when clearing those files — then drop matching §3 rows.

**On each sync the skill updates §3:** write JSON for `approved` rows, then leave only `open` (and any `approved` not written yet). Do not keep `imported` / `rejected` / `closed` rows — that keeps the watchlist short.

**Geography:** Lima **and Callao** are both in product scope (Callao is not a reason to reject or park an event).

### Promote on a later scan (do not forget)

When Group A shows an event is **fully ready** (Confirmed-quality):

1. **Match** it to §3 (open/approved) and/or §4c (same name + date; often already Announced + IN_REVIEW).
2. **Do not insert a duplicate.** Prefer an **update** pack (or Compass note) that:
   - sets state → **Confirmed**
   - **removes** category **IN_REVIEW**
   - fills any missing ticketing / venue / image (shape-OK or default)
3. **Remove** that row from §3 (status was open → gone after promote).
4. Refresh §4c state to Confirmed for that oid.

If it was only on §3 and never imported, write it once as Confirmed (no IN_REVIEW) and do not leave it on the watchlist.

## Ticketing

**Never** put a ticketer homepage / search event / all events as `ticketing.url` (it opens the wrong place in the app).

| Situation | What to write |
|-----------|----------------|
| Found the **event** ticket page | `{ "name": "Teleticket", "url": "https://teleticket.com.pe/…-event-slug" }` |
| Seller announced, **no** event URL yet | `{ "name": "Joinnus", "url": "" }` — name only |
| No seller / no sale info | omit `ticketing` or leave unset — do **not** invent a homepage |

### Fix existing DB (homepage ticketing urls)

Paste `output/fix-ticketing-urls.mongosh.js` into Compass → Mongosh.

```bash
node scripts/lima-events-sync/fix-ticketing-urls.mjs \
  --from-dump ~/Downloads/hornsAppDB.events.json
```

---

## Event shape

Ticketing: event-page URL or name-only with `url: ""` — never a homepage (see **Ticketing**).

`about.es` and `about.en` are **both required** (non-empty strings). Never ship `null` / `""` for either language. Write real copy in each language when possible; if a source only has one, translate before import (do not leave the other blank).

```json
{
  "_id": { "$oid": "NEVER_REUSE_EXISTING" },
  "name": "Short title",
  "about": {
    "es": "Descripción en español…",
    "en": "Description in English…"
  },
  "dateTime": { "$date": "2026-09-28T00:15:00.000Z" },
  "totalDays": null,
  "headliner": { "name": "<Main Activity (or Short Title by defaul)>", "url": "<Main Activity image>" },
  "ticketing": { "name": "Teleticket", "url": "https://teleticket.com.pe/event-slug" },
  "isLiveMusicEvent": true,
  "links": [],
  "categories": [{ "$oid": "…" }],
  "venue": { "$oid": "…" },
  "state": { "$oid": "…" },
  "activities": [],
  "lineup": null,
  "__v": 0
}
```

## Triggers

“sync events”, “sync lima events”, “Cursor sync events for apps”, “weekly events sync”,  
“rebuild last-sync-report”, “recreate last-sync-report”.
