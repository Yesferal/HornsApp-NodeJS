---
name: sync-lima-events
description: >-
  Weekly sync of Lima (Peru) events into HornsApp MongoDB Compass JSON.
  Use when the user says "sync events", "Cursor sync events for apps",
  "weekly events", recreate last-sync-report, or asks to
  refresh Lima / Callao concerts, fests, runs, or theater for HornsApp / Muvin.
disable-model-invocation: true
---

# Sync Lima events (HornsApp / Muvin)

Additive Compass JSON only. Do **not** wipe collections.

## Steps (follow in order — announce each briefly to the user)

| # | Step | What |
|---|------|------|
| **0** | Gate | Open `LAST-SYNC-REPORT.md`. If missing/corrupt → stop and ask for the 5 Compass dumps (recreate). |
| **1** | Clear JSON | Delete all `output/*.json` (prior run assumed imported). Keep the report. |
| **2** | Dedupe | Compare finds vs §4 events: **name + date** (+ **headliner** if both set). |
| **3** | Watchlist | Read §3 **and** §4 `FOLLOW_UP` / `IN_REVIEW`. Re-check; **promote complete `FOLLOW_UP`** → Confirmed; **`IN_REVIEW`** wait for your accept / reject. |
| **4** | Scan | Trusted **list_url**s only (groups **1–4**). Report broken lists / unknown ticket hosts (see **Trusted navigation**). **Lima + Callao**. |
| **5** | Classify | New → Confirmed / Announced+`FOLLOW_UP` / `IN_REVIEW` / §3. Complete `FOLLOW_UP` → Confirmed (drop tag). |
| **6** | Write JSON | **Inserts** → `events-YYYY-MM-DD.json`. **Updates** (same oid, e.g. `FOLLOW_UP`→Confirmed) → `events-YYYY-MM-DD-updates.json`. (+ cats/venues/… if new). |
| **7** | Images + about | Image: **event → headliner → venue → default**. Always non-empty **about.es** + **about.en**. |
| **8** | Times | UTC (Lima UTC−5). Always set `dateTime` + `endDate` (see Event shape). |
| **9** | Update report | Refresh `LAST-SYNC-REPORT.md` §1–§4 (append oids · drop past events · sort §4c). |
| **10** | Hand off | Import order + **`IN_REVIEW`** accept/reject + any **broken list_url**s + **unknown ticket hosts** (for you to validate). |

When running, say e.g. “Step 1 — clearing output JSON…” so the path is visible in chat.

### Default window

Unless the user names other dates:

| | |
|--|--|
| **From** | today (Lima calendar) |
| **To** | **31 Dec of next calendar year** |

Example: on 2026-09-21 → scan **2026-09-21 → 2027-12-31**.  
That picks up early next-year announcements without a huge backlog of past dates.

User can narrow (“next 8 weeks”) or widen; otherwise use this default.

**(Separate) §4c inventory:** when refreshing the report, drop rows whose **`endDate` is before today**. Mid-run seasons stay even if debut was before today.

---

## Skill I/O (only this)

```
scripts/lima-events-sync/
  LAST-SYNC-REPORT.md         ← primary input/output each sync (tracked)
  input/                      ← Compass table dumps (*.json gitignored) — rebuild backup
  output/
    events-YYYY-MM-DD.json           ← INSERT only — new oids (gitignored)
    events-YYYY-MM-DD-updates.json   ← UPDATE/REPLACE only — existing oids (gitignored)
    categories-*.json                ← only if new keys (gitignored)
    venues-*.json                    ← only if new venues (gitignored)
    activities-*.json                ← only if new activities (gitignored)
    states-*.json                    ← only if new states (gitignored)
```

| Path | Git | Role |
|------|-----|------|
| `scripts/lima-events-sync/LAST-SYNC-REPORT.md` | yes | **Required** — §1–5 + §4 oids |
| `input/*.json` | no | Backup dumps to recreate report |
| `output/*.json` | no | Compass paste for **this** run only |

**Compass hand-off (agent):** tell user which insert / update files exist; point them to **LAST-SYNC-REPORT §5** for how to import (insert vs updates). Skip either file when empty / not written.

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

Write `LAST-SYNC-REPORT.md` from the skeleton below; §4c = still-active only (`endDate` ≥ today), sorted by debut date; strip about/tickets/images/geo. Start §3 empty (or keep recoverable open watchlist rows only if the corrupt file still has a readable §3).

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
### 4b. Venues — name · oid · imageUrl
### 4c. Events — name · date · venue · state · oid
### 4d. Activities — name · oid
### 4e. States — name en/es · oid
## 5. How to run / import
```

---

## §4 inventory — names + oids

| Collection | Columns | Dedupe key |
|------------|---------|------------|
| **categories** | key + oid | key |
| **venues** | name + oid + imageUrl | name |
| **events** | name + date + venue + state + oid (+ headliner when known) | see **Event dedupe** below |
| **activities** | name + oid | name |
| **states** | name en/es + oid | English name |

Reuse §4 oids when writing event JSON. Never invent an oid for a name already in §4.  
Venue **`imageUrl`** in §4b is the event-poster fallback (skill image flow step 3) when ticketer/headliner image is missing — refresh from admin dump / `input/hornsAppDB.venues.json` when venues change.

### Event dedupe

**Primary key:** normalized **name** + Lima **date** (calendar day).  
That alone catches almost every duplicate (tour titles are distinctive; multi-night tours differ by date).

**Headliner (optional tie-break):** if **both** the §4 row and the candidate have a non-empty headliner and they **differ** (case-insensitive) → treat as **different** events (rare same-name / same-day clash). If either headliner is missing or they match → same event → skip write.

### Event `state` from web confidence

| Web finding | State | Also |
|-------------|--------|------|
| Complete: date + **real venue** (not TBA) + ticketing (group-1 CTA or **Free**) | **Confirmed** | no `FOLLOW_UP` |
| Has **date** + venue (or TBA venue) + ticketing (group-1 CTA, **Free**, or **TBA**); some fields still soft | **Announced** | add **`FOLLOW_UP`** — **visible** on clients |
| Looks ready but some data sounds wrong / conflicting — raise a hand | keep showable state (usually Announced fields) | add **`IN_REVIEW`** — **hidden** until you remove it. If ticketing/venue is also incomplete → **also** add **`FOLLOW_UP`** (both tags allowed) |
| Official delay | **Postponed** | — |
| Official cancel | **Cancelled** | — |
| Sold out | **Sold Out** | — |

**Admin labels** (only these two; stored on `categories` as workflow tags):

| Key | Client lists | Who owns it | When | Next action |
|-----|--------------|-------------|------|-------------|
| **`FOLLOW_UP`** | **Shown** (as Announced) | **Agent** | Incomplete but usable: calendar **date** required. Soft fields: **venue TBA** → venue oid **TBA** `63e7b5bb5b520b8feeb889b7`; **ticketing TBA** → `{ "name": "TBA", "url": "" }` (see **Ticketing CTA**) | Next sync: agent re-searches; when **date + venue + ticketing** are complete → drop `FOLLOW_UP`, set **Confirmed**, write update JSON |
| **`IN_REVIEW`** | **Hidden** until you clear the tag | **You** (accept / reject) | Data sounds weird / doubtful — agent raises a hand | Agent lists **what to double-check in chat**; **you** accept or reject (below). Stack with **`FOLLOW_UP`** when CTA/venue still incomplete so the next sync still hunts the deep link after Accept |

### Your accept / reject (`IN_REVIEW` only)

`FOLLOW_UP` is agent-managed. For **`IN_REVIEW`**, you decide in chat (and mirror in admin). Agent updates the report to match.

| You say | You do in admin | Agent does in report / tracking |
|---------|-----------------|----------------------------------|
| **Accept** | Remove `IN_REVIEW` (keep or Confirm the event) | Drop `IN_REVIEW` tracking for that event; refresh §4c to match |
| **Reject** | Delete the event from DB | Remove the event from §4c (and §3 if listed) |

### Activities (optional UX)

Only if important and/or repeats across events. Skip one-offs.

### Images (`headliner.url`) — must work on iOS/Android

Client uses `headliner.url` in `AsyncImage` / equivalent (`URLSession` / OkHttp-style HTTPS GET). **Broken, redirected, or expired URL = blank UI.**

**Goal:** store a URL the **mobile client can load directly** as an image — not an HTML page, not a redirect hop, not a signed link that dies later. Default image is last resort only (placeholder until admin paste).

**Flow (priority):**  
1. **Event** poster (ticketing / official event page — prefer `og:image` / main hero)  
2. Else **headliner** press/official image (same checks)  
3. Else **venue** `imageUrl` from §4b (same checks)  
4. Else **category default** (JPEG below)

Never leave `headliner.url` blank if a default exists. **Do not** skip the hunt and jump to Default image when a ticketer page has a usable poster.

#### Accept / reject (probe before write)

Before writing `headliner.url`, **probe** the candidate (HEAD preferred; short GET range OK if HEAD blocked). Use a normal browser-like `User-Agent` if the CDN requires it.

**Must pass all:**

| Rule | Why |
|------|-----|
| Absolute `https://` URL | ATS / cleartext blocked on iOS; Android cleartext off by default |
| **No 3XX** on the URL we store | Clients often mishandle or strip cookies on redirects; store a URL that answers **200** directly |
| Response **`Content-Type` starts with `image/`** | Proves it is an image for AsyncImage / Coil / Glide — not `text/html` |
| Preferred types: `image/jpeg`, `image/png`, `image/webp` | Widely supported on iOS + Android; avoid exotic types |
| Host not on reject list | Unstable / gated / expire |
| No **expiry / signing** query signals | Blank weeks later in the app |

**3XX policy**

- If the candidate returns **301 / 302 / 303 / 307 / 308** → **do not store that URL**.
- Optional: follow redirects **once** only to discover the final URL, then **re-run the full accept check on the final URL** (https, 200, `image/*`, no signing). Store the **final** URL only if it passes; never store the intermediate redirecting URL.
- If final also redirects, fails, or is HTML → reject → try next candidate / default.

**Looks like an image (cheap pre-filter before probe)** — any of:

1. Path ends with `.jpg` / `.jpeg` / `.png` / `.webp` (query after extension OK), **or**
2. Host/path looks like media/CDN (`…/image…`, `…/media…`, `…/uploads…`, Cloudinary, Imgix, ticketer CDN)

Pre-filter alone is **not enough** — the probe (`200` + `Content-Type: image/*`, no 3XX on stored URL) is required for new sync writes when network is available. If probe is impossible in-environment, fall through to default rather than guessing.

**Query strings**

| Allow | Reject |
|-------|--------|
| Harmless resize/cache: `w`, `h`, `width`, `height`, `quality`, `fit`, `auto`, `v` (version) | Signing / session: `token`, `Expires`, `Signature`, `X-Amz-*`, `sig`, `Policy`, `Key-Pair-Id`, `AWSAccessKeyId`, `ossAccessKeyId`, similar |

You **may** strip only known-harmless resize params if that yields a cleaner URL; **never** invent a host or path. After stripping, **probe again**.

**Reject hosts / patterns (fall through):**

| Signal | Why |
|--------|-----|
| `wikipedia` / `wikimedia` | unstable |
| `instagram` / `fbcdn` / `cdninstagram` | expire |
| `googleusercontent` / `ggpht` | gated |
| `http://` | ATS / cleartext risk |
| ticketer **homepage / listing HTML** URL used as image | not an image |
| signed / expiring query (table above) | dies later |
| `Content-Type: text/html` (or non-`image/*`) | mobile shows blank |
| Store URL that only works via **3XX** chain | unreliable on clients |

#### Default image (when hunt fails)

Use this known-good HTTPS JPEG (no signing) as temporary placeholder until admin pastes a real poster:

`https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg`

Same image on every event in a pack usually means the poster hunt was skipped — fix before hand-off when ticketer posters existed.

---

## Product split

| Flag | Feed | Types |
|------|------|-------|
| `isLiveMusicEvent: true` | Horns `/concert` | **Only** metal, rock, jazz, blues, pop, punk + similar fests (same vibe) — also tag genre (`METAL`/`ROCK`/…) + usually `CONCERT` |
| `isLiveMusicEvent: false` | Muvin `/event` | Everything else — theater, art, film, food, sport, `CONCERT`(salsa/tropical/reggaeton/urban/) that isn’t Horns |

A ticketer **concert** list row does **not** auto-set `isLiveMusicEvent: true`. Categories: use the list row’s §4a key as primary, then any other keys that fit; free → also `FREE`.

## Sources

Four trusted groups. Scan each **list_url** every weekly sync for Lima + Callao in the window.  
Events may come from any group. **`ticketing` CTAs may only use group-1 hosts** (see **Ticketing CTA**).

### Trusted navigation

Open / fetch **only** URLs that appear in this Sources section:

| Allowed | Examples |
|---------|----------|
| **list_url** rows | Group 1–4 tables below |
| **Event / ticket pages** on group-1 allowed CTA hosts | `teleticket.com.pe`, `joinnus.com`, … |
| **Image URLs** that already passed the Images probe rules | posters for `headliner.url` |

**Relative links on an allowed host:** if the page is already on a **group-1** host (or a Sources `list_url` host you’re allowed to open) and the href is relative (`../event/…`, `/evento/…`), **resolve it against that page’s origin** and treat it as a same-host navigation — do **not** drop it just because it isn’t an absolute `https://…` string in the HTML.

Stay on those hosts/paths. If a page only *mentions* a ticket seller on a host **not** in **Allowed CTA hosts**, do **not** open that link — note host + event name in the hand-off so you can decide whether to add it.

**Broken list_url:** if a Sources `list_url` returns **404**, **5xx**, or is otherwise unreachable during the sync → say so in the hand-off (source, category, URL, status). Continue with the other lists.

### 1 — Ticketing

Buy-ticket platforms. Primary place to find events and the **only** allowed source for `ticketing.name` / `ticketing.url`.

**Allowed CTA hosts:** `teleticket.com.pe` · `joinnus.com` · `ticketmaster.pe` · `passline.com` · `passline.com` · `eventrid.pe` · `pacifictiming.com`

| Source | Category (§4a) | list_url |
|--------|----------------|----------|
| Teleticket | `CONCERT` | `https://teleticket.com.pe/conciertos` |
| Teleticket | `THEATER` | `https://teleticket.com.pe/teatro` |
| Joinnus | `CONCERT` | `https://www.joinnus.com/search?cat=concerts` |
| Joinnus | `THEATER` | `https://www.joinnus.com/search?cat=stand-up&cat=theater` |
| Joinnus | `FOOD` | `https://www.joinnus.com/search?cat=food-drinks` |
| Joinnus | `FEST` | `https://www.joinnus.com/search?cat=festivales` |
| Joinnus | `ART` | `https://www.joinnus.com/search?cat=art-culture&cat=cursos-talleres` |
| Joinnus | `FILM` | `https://www.joinnus.com/search?cat=cine` |
| Ticketmaster | `CONCERT` | `https://www.ticketmaster.pe/page/categoria-conciertos` |
| Ticketmaster | `THEATER` | `https://www.ticketmaster.pe/page/teatros` |
| Passline | `CONCERT` | `https://home.passline.com/eventos.php?category=17&pais=peru&category_name=Musica` |
| Passline | `FEST` | `https://home.passline.com/eventos.php?category=26&pais=peru&category_name=Festivales` |
| Passline | `THEATER` | `https://home.passline.com/eventos.php?q=&category=11&pais=peru&category_name=Teatro%20y%20Musicales` |
| Eventrid | `SPORT` | `https://www.eventrid.pe/eventos?event_type=deportivo` |
| Eventrid | `CONCERT` | `https://www.eventrid.pe/eventos?event_type=espectaculo` |
| Pacific Timing | `SPORT` | `https://eventsv2.pacifictiming.com/` |

Prefer each event’s **ticket page** URL as the CTA (same host family as above).

### 2 — Guides / experts (by category)

Discovery lists (not buy CTAs). Scan **every** **list_url** row for Lima + Callao in the window.  
**Notes** = how to filter that page (leave blank = scan the full list as usual).

Keep a row only if it’s **free** or the guide points at a **group-1** seller — then apply **Ticketing CTA**. No group-1 seller → discard. Never use the guide host as `ticketing.url`.

| Source | Host | Category (§4a) | Notes | list_url |
|--------|------|----------------|-------|----------|
| Running4Peru | `running4peru.com` | `SPORT` | Sync **Destacado** + **Saturday** + **Sunday** (Lima + Callao; skip `¡Gratis!` municipal trots / outside metro) | `https://www.running4peru.com/calendarios/calendario-peru-running` |
| Running4Peru | `running4peru.com` | `SPORT` | Sync **Destacado** + **Saturday** + **Sunday** (Lima + Callao; skip `¡Gratis!` municipal trots / outside metro) | `https://www.running4peru.com/calendarios/calendario-peru-running-2027` |
| Rockmetalperu | `rockmetalperu.com` | `CONCERT` | | `https://rockmetalperu.com/agenda/` |
| Puroteatro | `puroteatro.pe` | `THEATER` | | `https://puroteatro.pe/cartelera` |

Add more guide rows when you approve them.

### 3 — General event lists

| Source | Host | Category (§4a) | list_url |
|--------|------|----------------|----------|
| EntradaLibre | `entradalibre.me` | `CONCERT` | `https://entradalibre.me/event_cat/musica/` |
| EntradaLibre | `entradalibre.me` | `THEATER` | `https://entradalibre.me/event_cat/teatro/` |
| EntradaLibre | `entradalibre.me` | `FEST` | `https://entradalibre.me/event_cat/feria/` |
| EntradaLibre | `entradalibre.me` | `FILM` | `https://entradalibre.me/event_cat/cine/` |

**Ticketing:** same as group 2 → **Ticketing CTA**.

### 4 — News / informative

Coverage of what to do in Lima (special days, seasons, city moments). Useful for discovery and `about` copy.

| Source | Host | list_url |
|--------|------|----------|
| Infobae | `infobae.com` | `https://www.infobae.com/peru/` |
| La República | `larepublica.pe` | `https://larepublica.pe/` |
| El Comercio | `elcomercio.pe` | `https://elcomercio.pe/` |

**Ticketing:** same as group 2 → **Ticketing CTA**.

### Ticketing CTA

`ticketing.url` is an **event page** on a **group-1** allowed CTA host (above), except Free / TBA labels (no buy link yet). Use the event’s ticket page — not a homepage, search, or category list URL.

| Situation | What to write |
|-----------|----------------|
| Group-1 **event** ticket page found | `{ "name": "Teleticket", "url": "https://teleticket.com.pe/…-event-slug" }` |
| Free / entrada libre | `{ "name": "Free", "url": "" }` (+ category `FREE` when in §4a) |
| Tickets only on an **unknown** host (not in Allowed CTA hosts) | `{ "name": "TBA", "url": "" }` + **`FOLLOW_UP`**; **report the host** in hand-off — do not open it |
| Seller TBA / no ticket page yet | `{ "name": "TBA", "url": "" }` + **`FOLLOW_UP`** |

## §3 Watchlist (parking lot — not JSON yet)

State / `FOLLOW_UP` / `IN_REVIEW` (including **venue TBA** / **ticketing TBA**): see **Event `state`**, **Admin labels**, and **Ticketing CTA** — do not restate here.  
**Date TBA** (only §3-specific gate) → stay in §3 (or omit); do not write JSON without a calendar day.

Use **§3** only when the skill should **not** write import JSON yet, e.g. sources disagree on the **date**, date still TBA, or you need to **choose** before import.

| Status | Who sets it | Meaning |
|--------|-------------|---------|
| `open` | skill (or you) | Still waiting — keep the row |
| `approved` | **you** (chat or edit) | OK to write on the **next** sync |
| `imported` | **you** say so in chat (“imported”) **or** you edit the report — *not* auto-detected from Compass | Done in DB → skill **deletes** the row on the next sync (or immediately if you ask) |
| `rejected` / `closed` | **you** | Won’t do — **delete** the row |

Compass import is **manual**. After you import a pack (or an approved §3 row), say so (“imported”) or the next sync assumes prior `output/*.json` was imported when clearing those files — then drop matching §3 rows. Each sync: write `approved` rows; leave only `open` (and unwritten `approved`); drop `imported` / `rejected` / `closed`.

**Geography:** Lima **and Callao** are both in scope.

**Later syncs (file mechanics):** promote complete `FOLLOW_UP` → full doc in `events-YYYY-MM-DD-updates.json` (same oid), refresh §4c, hand off replace-by-`_id`. Still incomplete → keep Announced + `FOLLOW_UP`. `IN_REVIEW`: wait for accept/reject (table above).

## Venue shape

Match existing Compass venues.

| Field | Rule |
|-------|------|
| `name` | `{ "en": "…", "es": "…" }` (same string is fine when there is no translation) |
| `latitude` / `longitude` | Numbers, or `null` if unknown use null |
| `mapSearchName` | Required — string the app uses for map search (e.g. `"Teatro Canout, Lima"`) |
| `imageUrl` | HTTPS image, or the known default poster |

## Event shape

JSON template for each insert/update. Fill fields using the rules above:

| Field | Rule |
|-------|------|
| `name` | **Event title** (what the show/listing is called) |
| `headliner` | **Main activity / artist** (`headliner.name`) + poster (`headliner.url` → **Images**) |
| `ticketing` | **Ticketing CTA** |
| `isLiveMusicEvent` | **Product split** (Horns vs Muvin) |
| `about.es` + `about.en` | Both required (translate if the source has only one language) |
| `dateTime` | **Required.** First performance (debut), UTC. Sort / list day / calendar start. Never rewrite to “today” mid-run. |
| `endDate` | **Required.** End of visibility / last moment of the event, UTC. Always ≥ `dateTime`. API upcoming = `endDate >= now`. |
| `totalDays` | Optional legacy; prefer `endDate`. Leave `null` on new writes unless you already compute it. |

| Source says | Write |
|-------------|--------|
| Single night / single showtime | `dateTime` = start · `endDate` = start + **known duration**, else **+2 hours** |
| Range (“del 10 al 30 de nov”, “hasta el 15”, season end) | `dateTime` = first show · `endDate` = last show (same local time-of-day when known; if last showtime unknown, last day + same clock as debut or +2h) |
| Open-ended / TBA end | `dateTime` = first known · `endDate` = that show +2h (or last published night) + `FOLLOW_UP` — do **not** invent a far-future season end |

**`name` vs `headliner.name` — avoid duplicate wording**

```json
{
  "_id": { "$oid": "NEVER_REUSE_EXISTING" },
  "name": "Event title",
  "about": {
    "es": "Descripción en español…",
    "en": "Description in English…"
  },
  "dateTime": { "$date": "2026-09-28T00:15:00.000Z" },
  "endDate": { "$date": "2026-09-28T02:15:00.000Z" },
  "totalDays": null,
  "headliner": { "name": "Main artist or activity", "url": "<poster url>" },
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

**Primary (required while `disable-model-invocation: true`):** `/sync-lima-events` in Agent chat.

Also recognized in the skill description if invocation is ever re-enabled: “sync events”, “sync lima events”, “Cursor sync events for apps”, “weekly events sync”, “rebuild last-sync-report”, “recreate last-sync-report”.
