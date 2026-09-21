# Lima events — last sync report

| | |
|--|--|
| **Last sync** | 2026-09-21 |
| **Window** | 2026-09-21 → 2027-12-31 (default: today → 31 Dec next year) |
| **Next** | **sync lima events** |

Tracked: this file (`scripts/lima-events-sync/LAST-SYNC-REPORT.md`). `*.json` under `lima-events-sync/` stay local (gitignored).

---

## 1. Summary

| | |
|--|--|
| Sources | Teleticket · Ticketmaster PE · Joinnus |
| Already in DB (§4c before run) | 45 upcoming (BritPop → The Jacksons + Callao Media Maratón) |
| **New this run** | **10** Confirmed → `events-2026-09-21.json` |
| New categories / venues / states / activities | none |
| Watchlist cleared | W01 Super Arte → **Dec 12** Ticketmaster · W02 Jaze → **Oct 28+29** Joinnus · W16 Hardwell → **Nov 13** Teleticket |
| Needs your OK | §3: W15 Anime Perú Fest (no solid 2026 date) |
| Note | Scope = **Lima + Callao**. Urban / EDM / K-pop → `isLiveMusicEvent: false` (Muvin). |

---

## 2. Ready for Compass (this run only)

**Order:** states → categories → venues → activities → events.  
Previous JSON packs were cleared at sync start (assumed already imported).

| File | Status |
|------|--------|
| `events-2026-09-21.json` | **Import** — 10 Confirmed (Jaze×2, Taemin, Hardwell, CA7RIEL, Super Arte, Karol G, Ha*Ash, Sin Bandera, Oreja) |

---

## 3. Watchlist — needs manual approval

Only **open** rows stay here.

| ID | Event | Tentative | Why blocked | Recheck | Status |
|----|-------|-----------|-------------|---------|--------|
| W15 | Anime Perú Fest 2026 | ~Oct | No solid 2026 date on Group A ticketing | EntradaLibre / IG | open |

**Statuses:** `open` · `approved` → next sync writes JSON · `rejected` · `imported` (then removed) · `closed`

---

## 4. DB inventory (dedupe + link)

Names + oids. Agent extracts oids from dumps / new JSON — you don’t type them.

**How §4 stays current**

| Who | When |
|-----|------|
| You | Paste dumps / say if you edited this file |
| Agent (each sync) | Clear stale `output/*.json` → write new → append §4 · drop past §4c · sort |

### 4a. Categories — `key` · `oid`

| key | oid |
|-----|-----|
| METAL | `68041b3bd6756ac71587fa1e` |
| ROCK | `68041bb4a5203cc93bbd2e59` |
| MUSEUM | `6809c52f6c0fbf6561d8e6d4` |
| CONCERT | `680a6b1f6c0fbf6561d8ed15` |
| FEST | `680a6b316c0fbf6561d8ed1f` |
| SPORT | `680a6b466c0fbf6561d8ed2b` |
| THEATER | `680a6b586c0fbf6561d8ed39` |
| MUSICAL | `680e726cfd23ead6b0ca76cb` |
| FREE | `680e75c4fd23ead6b0ca7f51` |
| POP | `681afac457fc1eba7491e8e0` |
| PUNK | `6992673e6725336cb5f11e09` |
| HOTEL | `69940b777a87bd339c1165cd` |
| FOOD | `68ce2001a1b2c3d4e5f60201` |
| COFFEE | `68ce2001a1b2c3d4e5f60202` |
| ANIME | `68ce2001a1b2c3d4e5f60203` |
| BOOKS | `68ce2001a1b2c3d4e5f60204` |
| PETS | `68ce2001a1b2c3d4e5f60205` |
| CRAFT | `68ce2001a1b2c3d4e5f60206` |
| IN_REVIEW | `68cf4001a1b2c3d4e5f60401` |

### 4b. Venues — `name` · `oid`

| name | oid |
|------|-----|
| Agua Dulce Beach, Chorrillos | `699e058a9e62c48e8be7b029` |
| Arena 1 | `5f4579bef64840ec4b382c6a` |
| Arena Bar | `645343dbaae3a86c7beb775e` |
| Asociación Peruano China (APCH) | `68ce0001a1b2c3d4e5f60009` |
| CC Barranco | `5e8a68e063b0f505de950181` |
| CC Embassy | `5f456a3af64840ec4b382c69` |
| CC Festiva | `5fd6d8699cc97b061bc02243` |
| CC Leguía | `643eb8b9b76f0e727ce05e4a` |
| Club Cultural Lima | `68ce0001a1b2c3d4e5f60004` |
| Costa 21 | `67be4416e7cef6acc7a629ef` |
| Estadio Monumental de Ate | `6451a4c7aae3a86c7beb7730` |
| Estadio Municipal Chipoco, Barranco | `680e6c98fd23ead6b0ca6cd4` |
| Estadio Nacional | `6242ac79d6f0f34fa510a08c` |
| Estadio San Marcos | `5e8a68e063b0f505de950180` |
| Gran Teatro Nacional | `645335e3aae3a86c7beb7747` |
| ICPNA Miraflores | `68ce0001a1b2c3d4e5f60005` |
| La Noche de Barranco | `681ab7db4d065d0a489de313` |
| La Punta, Callao | `b6d1540c8e8c1fdba6c4506b` |
| Lurin Live | `67e80d47b7596ab3a93ee9dd` |
| MALI | `680e64b6fd23ead6b0ca6c49` |
| No anunciado | `63e7b5bb5b520b8feeb889b7` |
| Parque de la Exposición | `63e47ef3a2364c17d03756ea` |
| Parque Kennedy | `680e556dfd23ead6b0ca6c07` |
| Parque Las Lomas, San Borja | `68ce0001a1b2c3d4e5f60008` |
| Parque Los Heroes | `699269c76725336cb5f11e89` |
| Parque Mariscal Ramón Castilla | `699273da6725336cb5f11ede` |
| Parque Pentagonito | `67fb8035842ed656c38da88e` |
| Plaza de Armas, Lima | `681d2ece32cfcf770e5a5cc7` |
| Sargento Pimienta | `68ce0001a1b2c3d4e5f60001` |
| Teatro Británico | `68ce0001a1b2c3d4e5f60007` |
| Teatro Centro Español | `75535bfee2fa690575e1b569` |
| Teatro Kantaro | `64bcd027a22189a26979c710` |
| Teatro Manuel A. Segura | `68ce0001a1b2c3d4e5f60002` |
| Teatro Marsano | `68ce0001a1b2c3d4e5f60006` |
| Teatro NOS PUCP | `680e7230fd23ead6b0ca76ae` |
| Universidad de Lima | `68ce0001a1b2c3d4e5f60003` |
| Vichama Conciertos | `681ac91ac443cf7a1821a080` |
| Yield Rock | `63d9d704627ffe83a2e34381` |

### 4c. Events — `name` · `date` · `venue` · `state` · `oid`

Dedupe: **name + date(day)**; headliner only as tie-break (see skill). Venue is for display/link, not the hard key. Today + future only, sorted by date.
Rows marked *new* come from `events-2026-09-21.json` (append after you import).

| name | date | venue | state | oid |
|------|------|-------|-------|-----|
| BritPop | 2026-09-23 | Arena 1 | Confirmed | `68ce1001a1b2c3d4e5f60101` |
| La Cabaña | 2026-09-23 | Teatro Marsano | Confirmed | `68ce3001a1b2c3d4e5f60308` |
| BritPop | 2026-09-24 | Arena 1 | Confirmed | `699cb6609e62c48e8be7affe` |
| La mujer de negro | 2026-09-24 | Teatro Británico | Confirmed | `68ce3001a1b2c3d4e5f60309` |
| ¡Funado! | 2026-09-24 | Teatro NOS PUCP | Confirmed | `68ce3001a1b2c3d4e5f6030a` |
| 30th Anniversary World Tour | 2026-09-25 | CC Leguía | Confirmed | `6997adddb42ea53dbaa0b154` |
| Brutal Sinfónico | 2026-09-26 | Parque de la Exposición | Confirmed | `68ce1001a1b2c3d4e5f60102` |
| El Plan de la Mariposa | 2026-09-26 | Sargento Pimienta | Confirmed | `68ce1001a1b2c3d4e5f60103` |
| Genshin Lima: El Tour Iridiscente | 2026-09-26 | CC Festiva | Confirmed | `68ce3001a1b2c3d4e5f60305` |
| Bimbo Global Race | 2026-09-27 | Parque Las Lomas, San Borja | Confirmed | `68ce3001a1b2c3d4e5f60306` |
| Everyone's a Star! World Tour | 2026-09-27 | Costa 21 | Confirmed | `68ce1001a1b2c3d4e5f60104` |
| Gánale la Carrera al Cáncer | 2026-09-27 | Parque Pentagonito | Confirmed | `68ce3001a1b2c3d4e5f60307` |
| Unseen Horror Scenes | 2026-09-30 | Vichama Conciertos | Confirmed | `68ce1001a1b2c3d4e5f60105` |
| TURR4ZO World Tour | 2026-10-01 | Arena 1 | Confirmed | `68ce1001a1b2c3d4e5f60106` |
| Euforia Tour | 2026-10-03 | CC Festiva | Confirmed | `68ce1001a1b2c3d4e5f60107` |
| Plays Metallica Vol. 2 | 2026-10-03 | Teatro Manuel A. Segura | Confirmed | `68ce1001a1b2c3d4e5f60108` |
| TEDxLima 2026 | 2026-10-03 | Universidad de Lima | Confirmed | `68ce1001a1b2c3d4e5f60109` |
| Raphaelísimo Tour | 2026-10-03 | Parque de la Exposición | Announced | `ca6f8b6ce8bb7da53553ee6c` |
| BTS World Tour ARIRANG | 2026-10-07 | Estadio San Marcos | Confirmed | `c3fa85dd63b08354b53cc6bb` |
| Cultura Profética | 2026-10-08 | Costa 21 | Announced | `0d08e1c6b0b7a68af9b16170` |
| BTS World Tour ARIRANG | 2026-10-09 | Estadio San Marcos | Confirmed | `47f05e26e5b015cf2efe61af` |
| Chyno y Nacho | 2026-10-09 | Costa 21 | Announced | `f756f96075da7e0c5bfadd69` |
| BTS World Tour ARIRANG | 2026-10-10 | Estadio San Marcos | Confirmed | `0095b5f35a0f9b0f1f073bd9` |
| Queen Sinfónico | 2026-10-10 | Teatro Centro Español | Announced | `b02f183d1c736a490141face` |
| This Is Michael | 2026-10-10 | Parque de la Exposición | Confirmed | `fb20f425e801ae5884bf241e` |
| Gruesome | 2026-10-13 | Yield Rock | Confirmed | `699286386725336cb5f12035` |
| Kidd Voodoo | 2026-10-16 | CC Barranco | Announced | `07a5c7a13cdff51c75145f73` |
| Run For Your Lives | 2026-10-17 | Estadio Nacional | Confirmed | `6992825f6725336cb5f11ffb` |
| Zelda Symphonic Legends | 2026-10-22 | Teatro Manuel A. Segura | Announced | `a100c5f9f5da439b330364e9` |
| Río Roma | 2026-10-24 | Costa 21 | Announced | `ed1701eefcfad288d5d6b7d4` |
| Media Maratón del Callao & 10K | 2026-10-25 | La Punta, Callao | Announced | `5c0e9f1bf041fa894763d30f` |
| Jaze — QNEPT Tour II *new* | 2026-10-28 | CC Barranco | Confirmed | `68d1a001a1b2c3d4e5f70103` |
| Hombres G | 2026-10-29 | Estadio Nacional | Confirmed | `32bb8834a6bc5aac6eb96b89` |
| Jaze — QNEPT Tour II *new* | 2026-10-29 | CC Barranco | Confirmed | `68d1a001a1b2c3d4e5f70104` |
| Hombres G | 2026-10-30 | Estadio Nacional | Confirmed | `ff87daadbb81d75f9bd78155` |
| Ken-Y Round 2 | 2026-10-30 | Arena 1 | Announced | `5aa0d3b10750f89092021fc3` |
| Jesse y Joy | 2026-10-31 | Costa 21 | Confirmed | `7504b778cbeb59b55fd90c0e` |
| Reggaetón Lima Festival 7 | 2026-10-31 | Costa 21 | Confirmed | `d19ae6c10dd1ec7a0b601890` |
| Expofolk 5.ª | 2026-10-31 | Parque de la Exposición | Announced | `a90aeec114509ffb83c13a13` |
| Taemin — LiMiNaL World Tour *new* | 2026-11-06 | Estadio Monumental de Ate | Confirmed | `68d1a001a1b2c3d4e5f7010a` |
| Myriam Hernández | 2026-11-06 | Parque de la Exposición | Confirmed | `ea02c022e0146ef47db5973c` |
| Hardwell — South America World Tour *new* | 2026-11-13 | Costa 21 | Confirmed | `68d1a001a1b2c3d4e5f70102` |
| Airbag | 2026-11-14 | Estadio San Marcos | Confirmed | `ee36cb510db6a1bd6c6702af` |
| The Strokes | 2026-11-20 | Estadio San Marcos | Confirmed | `a68fa8d78639172f5c416743` |
| The Hayley Williams Show | 2026-11-21 | Costa 21 | Announced | `25bf35051ec12ee970245358` |
| CA7RIEL & Paco Amoroso — Free Spirits *new* | 2026-11-27 | Costa 21 | Confirmed | `68d1a001a1b2c3d4e5f70109` |
| Lima Latin Pop Fest Vol. 3 | 2026-11-28 | Costa 21 | Announced | `77eb20f1a2e05db4b5a28402` |
| Flor Bertotti | 2026-11-29 | Gran Teatro Nacional | Announced | `32e2609dc4f3ee2c417a3cd6` |
| Maná | 2026-12-02 | Costa 21 | Confirmed | `cd9897f94ec7bbbb42b20398` |
| Super Arte — Lenny Tavárez & Justin Quiles *new* | 2026-12-12 | Arena 1 | Confirmed | `68d1a001a1b2c3d4e5f70101` |
| The Jacksons | 2026-12-15 | Costa 21 | Confirmed | `c02f1311ff0199a114894162` |
| Karol G — Tropitour *new* | 2027-01-22 | Estadio San Marcos | Confirmed | `68d1a001a1b2c3d4e5f70105` |
| Ha*Ash — No Me Hablen de Amor *new* | 2027-03-05 | Costa 21 | Confirmed | `68d1a001a1b2c3d4e5f70108` |
| Sin Bandera — Escenas Tour 25 años *new* | 2027-03-06 | Costa 21 | Confirmed | `68d1a001a1b2c3d4e5f70107` |
| La Oreja de Van Gogh — Tantas Cosas *new* | 2027-03-14 | Costa 21 | Confirmed | `68d1a001a1b2c3d4e5f70106` |

### 4d. Activities — `name` · `oid`

| name | oid |
|------|-----|
| Korn | `6902e1d9bbc2d74a4cb2c3da` |
| Linkin Park | `678efcacca72843d1bf2c83b` |
| Poppy | `68e192465e2c6d53a9c6cbd8` |
| Seven Hours After Violet | `6902e386bbc2d74a4cb2c3e2` |
| Spiritbox | `6902e26fbbc2d74a4cb2c3de` |

### 4e. States — `name` · `oid`

| name (en) | name (es) | oid |
|-----------|-----------|-----|
| Confirmed | Confirmado | `5e8a68e063b0f505de950182` |
| Postponed | Postergado | `5e8a68e063b0f505de950183` |
| Cancelled | Cancelado | `5e8a68e063b0f505de950184` |
| Sold Out | Sold Out | `680e67a14e764417408ffd6d` |
| Announced | Anunciado | `6ab018d84f1ea7cdf3c65320` |

---

## 5. How to run

1. Agent reads this file (Step 0). Missing/corrupt → ask for all 5 dumps (categories, venues, events, activities, states) and recreate
2. Sync clears `output/*.json`, scans window, writes new JSON, updates this report
3. You import Compass: **events** from §2
4. Next sync assumes that import is done and deletes those JSON files again
