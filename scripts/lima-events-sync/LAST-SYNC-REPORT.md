# Lima events — last sync report

| | |
|--|--|
| **Last sync** | 2026-10-13 (Puroteatro cartelera only) |
| **Window** | 2026-10-12 → 2027-12-31 (default: today → 31 Dec next year) |
| **Next** | `/sync-lima-events` |

Tracked: this file (`scripts/lima-events-sync/LAST-SYNC-REPORT.md`). `*.json` under `lima-events-sync/` stay local (gitignored).

---

## 1. Summary

| | |
|--|--|
| Sources scanned | **Teleticket /teatro** · **Ticketmaster /teatros** · **EntradaLibre /teatro** · Joinnus theater (blocked) · Passline theater (403) |
| Broken / blocked list_url | **Passline** theater `403` Cloudflare · **Joinnus** best-effort (CloudFront / “Navegador no compatible”) · Ticketmaster OK — resolve relative `../event/…` against `ticketmaster.pe` |
| Already in DB (§4c before run) | prior `*b*` / `*c*` packs assumed imported |
| **New this run** | **65** → `events-2026-10-12-theater.json` (Teleticket Confirmed + TM FOLLOW_UP + EntradaLibre Free; `THEATER`/`MUSICAL` tags) |
| **Updates this run** | theater pack: **25** multi-day runs got `endDate` (+ debut `dateTime` corrected where source had a range) |
| New categories / venues | **19** → `venues-2026-10-12-theater.json` (theater halls); events re-linked off TBA |
| Needs your OK | none (§3 empty; Floor Jansen accepted → Confirmed Teleticket) |
| Note | **`endDate`:** Node lists keep events while `endDate >= now` (else `dateTime`). Skill maps published ranges → debut + `endDate`. Theater JSON: e.g. Annie 20 Sep–8 Nov · Irresponsables 16 Oct–6 Dec · HH through 17 Oct. **Theater pass:** venues backfilled; TM relative URLs; Joinnus best-effort; `THEATER`/`MUSICAL`. **R4P 2027** Notes OK. |

---

## 2. Ready for Compass (this run only)

**Order:** venues → **insert** events → **update** events (temp + `$merge`, see §5).

| File | Status |
|------|--------|
| `venues-2026-10-11.json` | **Import** — Parque Marina de Guerra, Magdalena |
| `events-2026-10-11.json` | **Import** — 10 new (Roy Khan, Six Feet Under, Ghost Dance, Dying Fetus, Hellripper, Alcest, Quiet Riot, Floor Jansen, HammerFall, 5K Ilumina) |
| `events-2026-10-11-updates.json` | **Replace by `_id`** — ASICS Golden Run Lima · Floor Jansen → Confirmed (Teleticket) |
| `venues-2026-10-12.json` | **Import** — Costa Verde, San Miguel |
| `events-2026-10-12.json` | **Import** — 3 Running4Peru Destacado (Color Run Confirmed · Olympikus + Amancay FOLLOW_UP) |
| `events-2026-10-12-weekend.json` | **Import** — 22 Sat/Sun Lima+Callao (Infancia Feliz Confirmed · 21 FOLLOW_UP) |
| `events-2026-10-12-r4p-2027.json` | **Import** — 7 Running4Peru **2027** Destacado/Sat/Sun Lima+Callao (all FOLLOW_UP) |
| `venues-2026-10-12-theater.json` | **Import first** — 20 theater halls (incl. **Teatro Municipal de Surco** — was missing from DB) |
| `events-2026-10-12-theater.json` | **Insert** only if not imported yet — 65 theater/musical (**25** with `endDate`) |
| `events-2026-10-12-theater-updates.json` | **Replace by `_id`** if theater pack already imported — same 65 oids: venues + TM CTAs + **`endDate` / debut fixes** |
| `venues-2026-10-12-shape-updates.json` | **Replace whole doc by `_id`** — 7 venues (Dibós, Círculo Militar, Surco, San Agustín, Cúpula, Parque Marina, Costa Verde): `name` object + `latitude`/`longitude` + `mapSearchName`; drops `geolocation` |
| `venues-2026-10-13-puroteatro.json` | **Import first** — **20** halls that were not in §4b (Alianza Francesa, Teatro de Lucía, Teatro La Plaza, ICPNA San Isidro, and others) |
| `events-2026-10-13-puroteatro.json` | **Insert** if not imported yet — **64** new (63 Confirmed · Daniil Trifonov Announced + `FOLLOW_UP`). Posters: **54** Joinnus/Teleticket CDN, **1** Ticketmaster Crowder CDN, **9** signed Puroteatro (Passline + Ticketmaster; token through Sep–Oct 2031) |
| `events-2026-10-13-puroteatro-venue-updates.json` | **Replace by `_id`** only if the 64 were already inserted — same oids, halls + posters filled |
| `events-2026-10-13-puroteatro-image-updates.json` | **Replace by `_id`** — **28** shows already in the DB. **18** Teleticket CDN posters, **10** still the signed Puroteatro image |

---
## 3. Watchlist — needs manual approval

Only **open** rows stay here.

| ID | Event | Tentative | Why blocked | Recheck | Status |
|----|-------|-----------|-------------|---------|--------|
| — | *(empty)* | | | | |

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
| FOLLOW_UP | `68cf5001a1b2c3d4e5f60501` |
| ART | `68cf6001a1b2c3d4e5f60601` |
| FILM | `68cf6001a1b2c3d4e5f60602` |

### 4b. Venues — `name` · `oid` · `imageUrl`

Event poster fallback when ticketer/headliner image is missing (skill image flow). Keep in sync with admin / `input/hornsAppDB.venues.json`.

| name | oid | imageUrl |
|------|-----|----------|
| Agua Dulce Beach, Chorrillos | `699e058a9e62c48e8be7b029` | `https://portal.munichorrillos.gob.pe/sites/default/files/portfolio-images/complejo-turistico-agua-dulce-14.jpg` |
| Arena 1 | `5f4579bef64840ec4b382c6a` | `https://static.wixstatic.com/media/01f0f2_fa6bde2dc7c14587b54afadecf376d04%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/01f0f2_fa6bde2dc7c14587b54afadecf376d04%7Emv2.jpg` |
| Arena Bar | `645343dbaae3a86c7beb775e` | `https://indiehoy.com/wp-content/uploads/2018/11/Centro-de-Convenciones-Barranco-Arena-1280x720.jpg` |
| Asociación Peruano China (APCH) | `68ce0001a1b2c3d4e5f60009` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| CC Barranco | `5e8a68e063b0f505de950181` | `https://www.ccbarranco.com/img/espacios/salon1.png` |
| CC Embassy | `5f456a3af64840ec4b382c69` | `https://enlima.pe/sites/default/files/embassy.jpg` |
| CC Festiva | `5fd6d8699cc97b061bc02243` | `https://indiehoy.com/wp-content/uploads/2015/09/Centro-Convenciones-Festiva.jpg` |
| CC Leguía | `643eb8b9b76f0e727ce05e4a` | `https://cdn.getcrowder.com/images/3d21a672-9361-4f94-b809-b0b2dbe85a5c-fondo-teatro-leguia.jpg` |
| Auditorio Colegio San Agustín | `68e8c001a1b2c3d4e5f70702` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Círculo Militar de Jesús María | `68e8b001a1b2c3d4e5f70602` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Club Cultural Lima | `68ce0001a1b2c3d4e5f60004` | `https://clubculturaldeportivolima.pe/assets/img/all-images/service/service-grill3.png` |
| Coliseo Eduardo Dibós | `68e8b001a1b2c3d4e5f70601` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Costa 21 | `67be4416e7cef6acc7a629ef` | `https://i0.wp.com/conciertos.com.pe/wp-content/uploads/2024/12/Costa-21-2.png` |
| Costa Verde, San Miguel *new* | `68e8f001a1b2c3d4e5f70c01` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| La Cúpula de las Artes | `68e8c001a1b2c3d4e5f70703` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Estadio Monumental de Ate | `6451a4c7aae3a86c7beb7730` | `https://www.tvperu.gob.pe/sites/default/files/styles/note/public/noche_crema_2026_universitario_entradas.jpg` |
| Estadio Municipal Chipoco, Barranco | `680e6c98fd23ead6b0ca6cd4` | `https://thumbs.dreamstime.com/b/barranco-estadio-chipoco-imagen-a%C3%A9rea-lima-per%C3%BA-de-octubre-ciudad-durante-la-pandemia-covid-los-domingos-el-transporte-privado-198691426.jpg` |
| Estadio Nacional | `6242ac79d6f0f34fa510a08c` | `https://livesystemperu.com/wp-content/uploads/2024/07/1-20.jpg` |
| Estadio San Marcos | `5e8a68e063b0f505de950180` | `https://cloudfront-us-east-1.images.arcpublishing.com/infobae/Q3SP3WSSA5AJ5FOMKKOQNPK3Q4.png` |
| Gran Teatro Nacional | `645335e3aae3a86c7beb7747` | `https://cdn.www.gob.pe/uploads/document/file/3354669/standard_IMG_0089.jpg.jpg` |
| ICPNA Miraflores | `68ce0001a1b2c3d4e5f60005` | `https://www.icpna.edu.pe/thumbs/1031x580_fit/uploads/shares/institucional/fotos-sedes-interiores/Miraflores/3.jpg` |
| La Noche de Barranco | `681ab7db4d065d0a489de313` | `https://www.lanoche.com.pe/wp-content/uploads/2020/02/IMG-20191216-WA0013-1024x682.jpg` |
| La Punta, Callao | `b6d1540c8e8c1fdba6c4506b` | `https://i.pinimg.com/736x/92/f0/a5/92f0a5c69103d7541bb8fadaccb85ff4.jpg` |
| Lurin Live | `67e80d47b7596ab3a93ee9dd` | `https://cdn.getcrowder.com/images/834a9e4c-f3f8-4771-bfa8-edc09a3ff3d6-image-1125.jpg` |
| MALI | `680e64b6fd23ead6b0ca6c49` | `https://cosas.pe/efsfiles/2026-04/la-noche-del-mali.jpg` |
| Parque Marina de Guerra, Magdalena *new* | `68e8e001a1b2c3d4e5f70b01` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Asociación Cultural Campo Abierto *new* | `68e8f001a1b2c3d4e5f71213` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Auditorio Derrama Magisterial *new* | `68e8f001a1b2c3d4e5f71201` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Auditorio San Antonio de Padua *new* | `68e8f001a1b2c3d4e5f71202` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| CC Parque de la Amistad, Surco *new* | `68e8f001a1b2c3d4e5f71203` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Capital Restobar *new* | `68e8f001a1b2c3d4e5f71204` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Centro Cultural CAFAE-SE *new* | `68e8f001a1b2c3d4e5f71205` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Centro Cultural Ricardo Palma *new* | `68e8f001a1b2c3d4e5f71206` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Estación de Barranco *new* | `68e8f001a1b2c3d4e5f71207` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Jazz Zone *new* | `68e8f001a1b2c3d4e5f71208` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Multiteatro Movistar *new* | `68e8f001a1b2c3d4e5f71209` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Teatro Auditorio Miraflores *new* | `68e8f001a1b2c3d4e5f7120a` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Teatro Canout *new* | `68e8f001a1b2c3d4e5f7120b` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Teatro Mario Vargas Llosa *new* | `68e8f001a1b2c3d4e5f7120c` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Teatro Municipal de Lima *new* | `68e8f001a1b2c3d4e5f7120d` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Teatro Peruano Japonés *new* | `68e8f001a1b2c3d4e5f7120e` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Teatro Plaza Norte *new* | `68e8f001a1b2c3d4e5f7120f` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Teatro Ricardo Blume *new* | `68e8f001a1b2c3d4e5f71210` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Teatro San Camilo *new* | `68e8f001a1b2c3d4e5f71211` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Teatro Unifé *new* | `68e8f001a1b2c3d4e5f71212` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| TBA | `63e7b5bb5b520b8feeb889b7` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Parque de la Exposición | `63e47ef3a2364c17d03756ea` | `https://livesystemperu.com/wp-content/uploads/2022/11/GRUPO-5-4.jpg` |
| Parque Kennedy | `680e556dfd23ead6b0ca6c07` | `https://www.incatrailmachu.com/img/kennedy-park-the-central-park-of-miraflores-in-lima-277.jpg` |
| Parque Las Lomas, San Borja | `68ce0001a1b2c3d4e5f60008` | `https://i.pinimg.com/736x/97/c7/e9/97c7e9b463543ba93d8c69e6bc54161d.jpg` |
| Parque Los Heroes | `699269c76725336cb5f11e89` | `https://imgmedia.larepublica.pe/1000x590/larepublica/original/2025/03/17/67d8ac7c81bc3651622f3646.webp` |
| Parque Mariscal Ramón Castilla | `699273da6725336cb5f11ede` | `https://cdn.abril.pe/2019/03/parques-Lince-disfrutar-junto-a-familia-mariscal-ramon-castilla-768x402.jpg` |
| Parque Pentagonito | `67fb8035842ed656c38da88e` | `https://i.pinimg.com/736x/97/c7/e9/97c7e9b463543ba93d8c69e6bc54161d.jpg` |
| Plaza de Armas, Lima | `681d2ece32cfcf770e5a5cc7` | `https://portal.andina.pe/EDPfotografia3/Thumbnail/2024/07/28/001086717W.jpg` |
| Sargento Pimienta | `68ce0001a1b2c3d4e5f60001` | `https://indiehoy.com/wp-content/uploads/2015/09/Sargento-Pimienta-de-Barranco.jpg` |
| Anfiteatro de la Plaza Túpac Amaru *new* | `68e9d001a1b2c3d4e5f70012` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Ares Teatro *new* | `68e9d001a1b2c3d4e5f70009` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Auditorio ICPNA San Isidro *new* | `68e9d001a1b2c3d4e5f70004` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Centrum Petrus *new* | `68e9d001a1b2c3d4e5f70014` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Centro Cultural de Jesús María *new* | `68e9d001a1b2c3d4e5f7000b` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Centro Cultural de la Universidad del Pacífico *new* | `68e9d001a1b2c3d4e5f70008` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Fortaleza del Real Felipe *new* | `68e9d001a1b2c3d4e5f7000a` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| La Vaca Multicolor *new* | `68e9d001a1b2c3d4e5f70013` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Nuevo Teatro Julieta *new* | `68e9d001a1b2c3d4e5f70010` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Sala Quilla *new* | `68e9d001a1b2c3d4e5f70011` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Sala Roja – Centro Cultural PUCP *new* | `68e9d001a1b2c3d4e5f7000e` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Teatro Barranco *new* | `68e9d001a1b2c3d4e5f70002` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Teatro de la Alianza Francesa de Lima *new* | `68e9d001a1b2c3d4e5f70003` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Teatro de Lucía *new* | `68e9d001a1b2c3d4e5f70001` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Teatro Esencia *new* | `68e9d001a1b2c3d4e5f7000c` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Teatro Juanita Tarnawiecki *new* | `68e9d001a1b2c3d4e5f7000f` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Teatro La Plaza *new* | `68e9d001a1b2c3d4e5f7000d` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Teatro Municipal Alejandro Granda Relayza *new* | `68e9d001a1b2c3d4e5f70007` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Teatro Racional *new* | `68e9d001a1b2c3d4e5f70006` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Teatro Ricardo Roca Rey (AAA) *new* | `68e9d001a1b2c3d4e5f70005` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Teatro Británico | `68ce0001a1b2c3d4e5f60007` | `https://applications-media.feverup.com/image/upload/f_auto/fever2/plan/photo/8c301b42-5476-11f1-ad1b-8200bfc15269.jpg` |
| Teatro Centro Español | `75535bfee2fa690575e1b569` | `https://infoartes.pe/sites/default/files/wp-files/uploads/2013/10/teatro01.jpg` |
| Teatro Kantaro | `64bcd027a22189a26979c710` | `https://cdn.getcrowder.com/images/3d21a672-9361-4f94-b809-b0b2dbe85a5c-fondo-teatro-leguia.jpg` |
| Teatro Manuel A. Segura | `68ce0001a1b2c3d4e5f60002` | `https://portal.andina.pe/EDPfotografia3/Thumbnail/2022/09/15/000898738W.jpg` |
| Teatro Marsano | `68ce0001a1b2c3d4e5f60006` | `https://enlima.pe/sites/default/files/teatro-marsano-lima.jpg` |
| Teatro Municipal de Surco | `68e8c001a1b2c3d4e5f70701` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Teatro NOS PUCP | `680e7230fd23ead6b0ca76ae` | `https://files.pucp.education/puntoedu/wp-content/uploads/2022/07/14103324/1.-abre-hector-jara.jpg` |
| Universidad de Lima | `68ce0001a1b2c3d4e5f60003` | `https://www.ulima.edu.pe/sites/default/files/jfu-images/ULima_Video%20institucional.jpg` |
| Vichama Conciertos | `681ac91ac443cf7a1821a080` | `https://enlima.pe/sites/default/files/vichama_conciertos.jpg` |
| Yield Rock | `63d9d704627ffe83a2e34381` | `https://media-cdn.tripadvisor.com/media/photo-s/0f/10/ea/95/desenchufados-yield.jpg` |

### 4c. Events — `name` · `date` · `venue` · `state` · `oid`

Dedupe: **name + date(day)**; headliner only as tie-break (see skill). Venue is for display/link, not the hard key. Today + future only, sorted by date.  
Rows marked come from this run’s `events-2026-10-10c.json`.

| name | date | venue | state | oid |
|------|------|-------|-------|-----|
| Between the Buried and Me | 2026-10-11 | Yield Rock | Announced + FOLLOW_UP | `68e8d001a1b2c3d4e5f70907` |
| Carrera de Princesas 2026 | 2026-10-11 | TBA | Announced + FOLLOW_UP | `68e8c001a1b2c3d4e5f70806` |
| Roy Khan — The Black Halo And Beyond *new* | 2026-10-13 | Yield Rock | Confirmed | `68e8e001a1b2c3d4e5f70a01` |
| Gruesome | 2026-10-13 | Yield Rock | Confirmed | `699286386725336cb5f12035` |
| Informe Para Una Academia *new* | 2026-10-13 | Teatro Ricardo Blume | Confirmed | `68e8f001a1b2c3d4e5f71031` |
| PIRUETTA Circo de salón *new* | 2026-10-13 | Teatro Ricardo Blume | Confirmed | `68e8f001a1b2c3d4e5f71032` |
| Zayn — The Konnakol Tour | 2026-10-14 | Costa 21 | Confirmed | `68d1b001a1b2c3d4e5f70201` |
| Una Muerte Light *new* | 2026-10-14 | TBA | Confirmed | `68e8f001a1b2c3d4e5f7103f` |
| Nicole Zignago — Tour (enamorada) | 2026-10-15 | CC Barranco | Confirmed | `68e4a001a1b2c3d4e5f70402` |
| Los Hombres No Lloran *new* | 2026-10-15 | Teatro Municipal de Surco | Confirmed | `68e8f001a1b2c3d4e5f71005` |
| Queríamos cambiarlo todo *new* | 2026-10-15 | Teatro Ricardo Blume | Confirmed | `68e8f001a1b2c3d4e5f71030` |
| Radojka - Miraflores *new* | 2026-10-15 | Teatro Auditorio Miraflores | Confirmed | `68e8f001a1b2c3d4e5f71006` |
| Kidd Voodoo | 2026-10-16 | CC Barranco | Announced | `07a5c7a13cdff51c75145f73` |
| Annie *new* | 2026-09-20 → 2026-11-08 | Teatro Municipal de Surco | Confirmed | `68e8f001a1b2c3d4e5f71001` |
| El Jefe Del Jefe *new* | 2026-10-16 | Multiteatro Movistar | Confirmed | `68e8f001a1b2c3d4e5f71002` |
| Hablando Huevadas — Nueva Temporada *new* | 2026-09-06 → 2026-10-17 | Teatro Canout | Confirmed | `68e8f001a1b2c3d4e5f71007` |
| Hogar Dulce Hogar *new* | 2026-10-16 | Centro Cultural Ricardo Palma | Confirmed | `68e8f001a1b2c3d4e5f71008` |
| La Cena *new* | 2026-10-16 | Teatro Auditorio Miraflores | Confirmed | `68e8f001a1b2c3d4e5f71009` |
| Grupo Frontera — Triste Pero Bien | 2026-10-17 | Costa 21 | Confirmed | `68d1b001a1b2c3d4e5f70202` |
| Run For Your Lives | 2026-10-17 | Estadio Nacional | Confirmed | `6992825f6725336cb5f11ffb` |
| Festival de Lima — Día de la Salsa | 2026-10-17 | Círculo Militar de Jesús María | Confirmed | `68e8b001a1b2c3d4e5f70507` |
| Iron Maiden en Lima | 2026-10-17 | Estadio Nacional | Confirmed | `68e8c001a1b2c3d4e5f70804` |
| Electro Showck – La Comedia De Alto Voltaje *new* | 2026-10-17 | Capital Restobar | Confirmed | `68e8f001a1b2c3d4e5f7100a` |
| Grease El Musical *new* | 2026-10-17 | TBA | Confirmed | `68e8f001a1b2c3d4e5f71040` |
| Las Irresponsables *new* | 2026-10-16 → 2026-12-06 | Teatro NOS PUCP | Confirmed | `68e8f001a1b2c3d4e5f7100b` |
| ASICS Golden Run Lima | 2026-10-18 | Parque Marina de Guerra, Magdalena | Confirmed | `68e8b001a1b2c3d4e5f70509` |
| Trote del Milagro 10K 2026 | 2026-10-18 | TBA | Announced + FOLLOW_UP | `68e8c001a1b2c3d4e5f70807` |
| Carrera Aniversario Legión Runners 2026 *new* | 2026-10-18 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70e13` |
| Corriendo por una Infancia Feliz 2026 *new* | 2026-10-18 | Parque Pentagonito | Confirmed | `68e8f001a1b2c3d4e5f70e01` |
| GepeTrail 2026 *new* | 2026-10-18 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70e14` |
| Aladino Y La Lampara Maravillosa - Arlequin Teatro *new* | 2026-10-18 | Teatro Auditorio Miraflores | Confirmed | `68e8f001a1b2c3d4e5f7100f` |
| Chisti Raymi en Lima *new* | 2026-10-18 | Teatro Plaza Norte | Confirmed | `68e8f001a1b2c3d4e5f71033` |
| El Baile Del Olvido *new* | 2026-10-18 | Teatro Auditorio Miraflores | Confirmed | `68e8f001a1b2c3d4e5f71011` |
| Eres Bueno Charlie Brown, El Musical Familiar De Broadway *new* | 2026-10-18 | Multiteatro Movistar | Confirmed | `68e8f001a1b2c3d4e5f7100e` |
| Las Eternas - Jesus Maria *new* | 2026-10-18 | Auditorio San Antonio de Padua | Confirmed | `68e8f001a1b2c3d4e5f71010` |
| Los 3 Cerditos - Arlequin Teatro *new* | 2026-10-18 | Teatro Auditorio Miraflores | Confirmed | `68e8f001a1b2c3d4e5f7100c` |
| Villasucia *new* | 2026-10-18 | Centro Cultural CAFAE-SE | Confirmed | `68e8f001a1b2c3d4e5f7100d` |
| Gosper Fest 2.0 | 2026-10-19 | Costa 21 | Confirmed | `68e8b001a1b2c3d4e5f70506` |
| El Club De Las Viudas *new* | 2026-10-19 | Teatro Auditorio Miraflores | Confirmed | `68e8f001a1b2c3d4e5f71016` |
| Giselle *new* | 2026-10-19 | Teatro Unifé | Confirmed | `68e8f001a1b2c3d4e5f71034` |
| Hansel Y Gretel *new* | 2026-10-19 | Auditorio San Antonio de Padua | Confirmed | `68e8f001a1b2c3d4e5f71014` |
| ISMO *new* | 2026-10-19 | TBA | Confirmed | `68e8f001a1b2c3d4e5f7103e` |
| La Banda Del Lobo Feroz *new* | 2026-10-19 | Asociación Cultural Campo Abierto | Confirmed | `68e8f001a1b2c3d4e5f71012` |
| Los Tres Chanchitos Y El Lobo Feroz En Teatro Padua *new* | 2026-10-19 | Auditorio San Antonio de Padua | Confirmed | `68e8f001a1b2c3d4e5f71013` |
| Pareja Abierta Jesus Maria *new* | 2026-10-19 | Auditorio San Antonio de Padua | Confirmed | `68e8f001a1b2c3d4e5f71015` |
| 6 Días, El Final De Un Poeta *new* | 2026-10-20 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f71035` |
| Zelda Symphonic Legends | 2026-10-22 | Teatro Manuel A. Segura | Announced | `a100c5f9f5da439b330364e9` |
| La Prueba De Merlín *new* | 2026-10-22 | Teatro Peruano Japonés | Confirmed | `68e8f001a1b2c3d4e5f71017` |
| Six Feet Under en Lima *new* | 2026-10-23 | Teatro Kantaro | Confirmed | `68e8e001a1b2c3d4e5f70a02` |
| Nosotras Que Nos Queremos Tanto Miraflores *new* | 2026-10-23 | Teatro Auditorio Miraflores | Confirmed | `68e8f001a1b2c3d4e5f71018` |
| Río Roma | 2026-10-24 | Costa 21 | Announced | `ed1701eefcfad288d5d6b7d4` |
| Beer Run Oktoedition — Caños del Santero *new* | 2026-10-24 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70e02` |
| Nosotras Que Nos Queremos Tanto Jesus Maria *new* | 2026-10-24 | TBA | Confirmed | `68e8f001a1b2c3d4e5f71019` |
| Media Maratón del Callao & 10K | 2026-10-25 | La Punta, Callao | Confirmed | `5c0e9f1bf041fa894763d30f` |
| Carrera Avon por Ellas | 2026-10-25 | TBA | Announced + FOLLOW_UP | `68e8c001a1b2c3d4e5f70808` |
| Carrera New Start 2026 *new* | 2026-10-25 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70e03` |
| HYROX Simulation Experience 2026 *new* | 2026-10-25 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70e16` |
| Remada Rosada 2026 *new* | 2026-10-25 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70e15` |
| La Magia De Ser Diferentes *new* | 2026-10-25 | Teatro Mario Vargas Llosa | Confirmed | `68e8f001a1b2c3d4e5f7101a` |
| Mujer Que No Jode Es Hombre - Edición 2026 *new* | 2026-10-25 | Estación de Barranco | Confirmed | `68e8f001a1b2c3d4e5f7101b` |
| NOS CASAMOS LA CAGAMOS - Show de Comedia en Pareja *new* | 2026-10-25 | Jazz Zone | Confirmed | `68e8f001a1b2c3d4e5f7101c` |
| Blancanieves Y Los 7 Enanitos *new* | 2026-10-26 | Auditorio San Antonio de Padua | Confirmed | `68e8f001a1b2c3d4e5f7101d` |
| El Perú en un solo canto *new* | 2026-10-26 | Gran Teatro Nacional | Confirmed | `68e8f001a1b2c3d4e5f71036` |
| Escena Escolar | I Edición *new* | 2026-10-26 | TBA | Confirmed | `68e8f001a1b2c3d4e5f71041` |
| The Rasmus — Weirdo Tour | 2026-10-27 | CC Leguía | Confirmed | `68e4a001a1b2c3d4e5f70403` |
| Jaze — QNEPT Tour II | 2026-10-28 | CC Barranco | Confirmed | `68d1a001a1b2c3d4e5f70103` |
| Hombres G | 2026-10-29 | Estadio Nacional | Confirmed | `32bb8834a6bc5aac6eb96b89` |
| Jaze — QNEPT Tour II | 2026-10-29 | CC Barranco | Confirmed | `68d1a001a1b2c3d4e5f70104` |
| Palacio De Los Sueños En Surco *new* | 2026-10-29 | CC Parque de la Amistad, Surco | Confirmed | `68e8f001a1b2c3d4e5f7101e` |
| Hombres G | 2026-10-30 | Estadio Nacional | Confirmed | `ff87daadbb81d75f9bd78155` |
| Ken-Y Round 2 | 2026-10-30 | Arena 1 | Announced | `5aa0d3b10750f89092021fc3` |
| Mensajes Del Alma *new* | 2026-10-30 | Teatro Manuel A. Segura | Confirmed | `68e8f001a1b2c3d4e5f7101f` |
| Pareja Abierta - Miraflores *new* | 2026-10-30 | Teatro Auditorio Miraflores | Confirmed | `68e8f001a1b2c3d4e5f71020` |
| Un Océano Para Todos *new* | 2026-10-30 | Teatro Peruano Japonés | Confirmed | `68e8f001a1b2c3d4e5f71003` |
| Jesse y Joy | 2026-10-31 | Costa 21 | Confirmed | `7504b778cbeb59b55fd90c0e` |
| Reggaetón Lima Festival 7 | 2026-10-31 | Costa 21 | Confirmed | `d19ae6c10dd1ec7a0b601890` |
| Expofolk 5.ª | 2026-10-31 | Parque de la Exposición | Announced | `a90aeec114509ffb83c13a13` |
| Festival Arpa Peru *new* | 2026-10-31 | Teatro San Camilo | Confirmed | `68e8f001a1b2c3d4e5f71021` |
| Humbe — Dueño de los Cielos | 2026-11-01 | Costa 21 | Confirmed | `68d1b001a1b2c3d4e5f70203` |
| Carrera Independencia Race 2026 *new* | 2026-11-01 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70e05` |
| Cerro Colorado Race Trail 2026 *new* | 2026-11-01 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70e06` |
| Marathon Ekiden by Grupo Gloria *new* | 2026-11-01 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70e04` |
| Truco O Trato – Halloween Para Niños *new* | 2026-11-01 | Multiteatro Movistar | Confirmed | `68e8f001a1b2c3d4e5f71022` |
| María Becerra — Quimera Tour | 2026-11-04 | Costa 21 | Confirmed | `68e4a001a1b2c3d4e5f70404` |
| Taemin — LiMiNaL World Tour | 2026-11-06 | Estadio Monumental de Ate | Confirmed | `68d1a001a1b2c3d4e5f7010a` |
| Myriam Hernández | 2026-11-06 | Parque de la Exposición | Confirmed | `ea02c022e0146ef47db5973c` |
| Coti en Lima | 2026-11-06 | CC Barranco | Announced + FOLLOW_UP | `68e8d001a1b2c3d4e5f70908` |
| Felipe Avello *new* | 2026-11-06 | Teatro Canout | Confirmed | `68e8f001a1b2c3d4e5f71023` |
| Bunbury — Nuevas Mutaciones Tour | 2026-11-07 | Costa 21 | Confirmed | `68d1b001a1b2c3d4e5f70206` |
| Los Dioses Del Teatro *new* | 2026-11-07 | Teatro Municipal de Surco | Confirmed | `68e8f001a1b2c3d4e5f71004` |
| Theodora, de Georg Friedrich Handel *new* | 2026-11-07 | Teatro Manuel A. Segura | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f71037` |
| APP Touring 10K & 5K | 2026-11-08 | TBA | Announced + FOLLOW_UP | `68e8b001a1b2c3d4e5f7050a` |
| Timø en Lima | 2026-11-08 | CC Barranco | Confirmed | `68e4a001a1b2c3d4e5f70405` |
| Carrera Aniversario de Rímac Runners *new* | 2026-11-08 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70e07` |
| Hybrid Race Magdalena 2026 *new* | 2026-11-08 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70e08` |
| adidas Lima Training Fest by LesMills *new* | 2026-11-08 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70e09` |
| Amy Gutierrez - Mi Primer Gran Teatro *new* | 2026-11-08 | Gran Teatro Nacional | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f71038` |
| Gran Homenaje Ayacucho En Mi Corazón *new* | 2026-11-08 | Auditorio Derrama Magisterial | Confirmed | `68e8f001a1b2c3d4e5f71025` |
| Los Rocosaurios Y El Misterio De Rocolandia - Rocosaurios Y El Misterio De Rocolandia *new* | 2026-11-08 | Multiteatro Movistar | Confirmed | `68e8f001a1b2c3d4e5f71024` |
| La Herencia *new* | 2026-11-09 | Teatro Auditorio Miraflores | Confirmed | `68e8f001a1b2c3d4e5f71026` |
| Ill Niño en Lima | 2026-11-10 | Yield Rock | Confirmed | `68e8d001a1b2c3d4e5f70901` |
| Camilo — Para Cuando Sean Mayores Tour | 2026-11-10 | Costa 21 | Confirmed | `68e4a001a1b2c3d4e5f70406` |
| Gran Gala Lirica Solistas De La Opera Del Teatro Colon *new* | 2026-11-11 | Gran Teatro Nacional | Confirmed | `68e8f001a1b2c3d4e5f71027` |
| Cosi Fan Tutte *new* | 2026-11-12 | Teatro Manuel A. Segura | Confirmed | `68e8f001a1b2c3d4e5f71039` |
| Hardwell — South America World Tour | 2026-11-13 | Costa 21 | Confirmed | `68d1a001a1b2c3d4e5f70102` |
| Tierra Santa en Lima | 2026-11-13 | Teatro Kantaro | Confirmed | `68e8d001a1b2c3d4e5f70902` |
| Cypress Hill en Lima | 2026-11-13 | Coliseo Eduardo Dibós | Confirmed | `68e8b001a1b2c3d4e5f70504` |
| Se Busca Amor (Urgente) *new* | 2026-11-13 | Teatro Auditorio Miraflores | Confirmed | `68e8f001a1b2c3d4e5f71028` |
| Airbag | 2026-11-14 | Estadio San Marcos | Confirmed | `ee36cb510db6a1bd6c6702af` |
| Santa Maria Swim & Grill | 2026-11-14 | TBA | Announced + FOLLOW_UP | `68e8d001a1b2c3d4e5f7090b` |
| Ghost Dance en Lima *new* | 2026-11-14 | Teatro Kantaro | Confirmed | `68e8e001a1b2c3d4e5f70a03` |
| Ser Como Blippi Tour | 2026-11-15 | Auditorio Colegio San Agustín | Confirmed | `68e8c001a1b2c3d4e5f70802` |
| ¡Viva los 90s! | 2026-11-15 | Parque de la Exposición | Announced + FOLLOW_UP | `68e8d001a1b2c3d4e5f70909` |
| Media Maratón Las Palmas 2026 *new* | 2026-11-15 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70e0a` |
| The Color Run Geely 2026 *new* | 2026-11-15 | Costa Verde, San Miguel | Confirmed | `68e8f001a1b2c3d4e5f70d01` |
| Broadway In Concert From Spain - Live in Lima *new* | 2026-11-16 | Teatro Unifé | Confirmed | `68e8f001a1b2c3d4e5f7103a` |
| Caos En Familia *new* | 2026-11-16 | TBA | Confirmed | `68e8f001a1b2c3d4e5f71029` |
| Elefante — 30 Aniversario Tour | 2026-11-18 | CC Barranco | Confirmed | `68e8d001a1b2c3d4e5f70903` |
| The Strokes | 2026-11-20 | Estadio San Marcos | Confirmed | `a68fa8d78639172f5c416743` |
| Venga Que Si Es Pa´Eso | Andrés Parra *new* | 2026-11-20 | Teatro Canout | Confirmed | `68e8f001a1b2c3d4e5f7102a` |
| Ópera Iolanta *new* | 2026-11-20 | Teatro Municipal de Lima | Confirmed | `68e8f001a1b2c3d4e5f7103b` |
| The Hayley Williams Show | 2026-11-21 | Costa 21 | Announced | `25bf35051ec12ee970245358` |
| Amanda Miguel — El Me Mintió World Tour | 2026-11-21 | Parque de la Exposición | Confirmed | `68e8b001a1b2c3d4e5f70503` |
| Easykid — Soy Un Fatalista | 2026-11-21 | CC Festiva | Confirmed | `68e8b001a1b2c3d4e5f70505` |
| My Dying Bride en Lima | 2026-11-22 | Yield Rock | Confirmed | `68e8d001a1b2c3d4e5f70904` |
| Ancón Trail Fest 2026 | 2026-11-22 | TBA | Announced + FOLLOW_UP | `68e8c001a1b2c3d4e5f70809` |
| Dame Esos 5K 2026 *new* | 2026-11-22 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70e0b` |
| Travesía El Reto Olaya Inverso 2026 *new* | 2026-11-22 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70e0c` |
| Gorillaz en Lima | 2026-11-23 | Arena 1 | Confirmed | `68e8d001a1b2c3d4e5f70905` |
| Gran Gala Lírica Rusa *new* | 2026-11-24 | Teatro Municipal de Lima | Confirmed | `68e8f001a1b2c3d4e5f7103c` |
| CA7RIEL & Paco Amoroso — Free Spirits | 2026-11-27 | Costa 21 | Confirmed | `68d1a001a1b2c3d4e5f70109` |
| Dying Fetus en Lima *new* | 2026-11-28 | Teatro Kantaro | Confirmed | `68e8e001a1b2c3d4e5f70a04` |
| Lima Latin Pop Fest Vol. 3 | 2026-11-28 | Costa 21 | Announced | `77eb20f1a2e05db4b5a28402` |
| Flor Bertotti | 2026-11-29 | Gran Teatro Nacional | Announced | `32e2609dc4f3ee2c417a3cd6` |
| Copa Nadar es Vida 2026 *new* | 2026-11-29 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70e0d` |
| Glow Inspiration Race powered by Olympikus *new* | 2026-11-29 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70d02` |
| Rosaflor Celebra 46 Años De Trayectoria Con ´´Mestiza *new* | 2026-11-29 | TBA | Confirmed | `68e8f001a1b2c3d4e5f7102b` |
| Dimash — Dimensions World Tour | 2026-12-01 | Costa 21 | Confirmed | `68d1b001a1b2c3d4e5f70204` |
| Maná | 2026-12-02 | Costa 21 | Confirmed | `cd9897f94ec7bbbb42b20398` |
| The Last Five Years *new* | 2026-12-04 | Teatro Ricardo Blume | Confirmed | `68e8f001a1b2c3d4e5f7103d` |
| Sleeping With Sirens en Lima | 2026-12-06 | Costa 21 | Confirmed | `68e4a001a1b2c3d4e5f70407` |
| Carrera Aniversario Comas Runners 2026 *new* | 2026-12-06 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70e0e` |
| BABYMETAL | 2026-12-07 | Costa 21 | Confirmed | `68d1b001a1b2c3d4e5f70205` |
| Kreator — Latin American Tour | 2026-12-08 | CC Leguía | Confirmed | `68e8d001a1b2c3d4e5f70906` |
| 5K Ilumina El Mundo 2026 *new* | 2026-12-09 | TBA | Announced + FOLLOW_UP | `68e8e001a1b2c3d4e5f70a0a` |
| Daniel Caesar — Son of Spergy Tour | 2026-12-08 | Costa 21 | Confirmed | `68e8b001a1b2c3d4e5f70502` |
| Super Arte — Lenny Tavárez & Justin Quiles | 2026-12-12 | Arena 1 | Confirmed | `68d1a001a1b2c3d4e5f70101` |
| La Ruta del Pejerrey 2026 *new* | 2026-12-12 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70e0f` |
| Carrera de Niños — Edición Navideña 2026 *new* | 2026-12-13 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70e10` |
| La Vuelta 8K & 4K Miraflores 2026 *new* | 2026-12-13 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70e11` |
| Fraude - Jaime Ferraro - Fraude *new* | 2026-12-13 | Teatro Canout | Confirmed | `68e8f001a1b2c3d4e5f7102d` |
| Navidad Maricarmen 10 Años - Por Primera Vez En El Teatro *new* | 2026-12-13 | Gran Teatro Nacional | Confirmed | `68e8f001a1b2c3d4e5f7102c` |
| The Jacksons | 2026-12-15 | Costa 21 | Confirmed | `c02f1311ff0199a114894162` |
| Aterciopelados en Lima | 2026-12-17 | CC Leguía | Announced + FOLLOW_UP | `68e8d001a1b2c3d4e5f7090a` |
| Desafío Jicamarca 2026 *new* | 2026-12-27 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70e12` |
| Carrera Venecia Run 10K 2027 *new* | 2027-01-03 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70f01` |
| Hellripper en Lima *new* | 2027-01-21 | Vichama Conciertos | Confirmed | `68e8e001a1b2c3d4e5f70a05` |
| Karol G — Tropitour | 2027-01-22 | Estadio San Marcos | Confirmed | `68d1a001a1b2c3d4e5f70105` |
| Desafío Independencia 2027 *new* | 2027-01-24 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70f02` |
| El Invencible Verano De Liliana *new* | 2027-01-29 | Teatro Canout | Confirmed | `68e8f001a1b2c3d4e5f7102e` |
| Pacha Wild Trail by Merrell — Summer Season 2027 *new* | 2027-02-06 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70f03` |
| Alcest en Lima *new* | 2027-02-13 | Teatro Kantaro | Confirmed | `68e8e001a1b2c3d4e5f70a06` |
| Chungo´ - Luis Zahera *new* | 2027-02-20 | Teatro Canout | Confirmed | `68e8f001a1b2c3d4e5f7102f` |
| Foo Fighters en Lima | 2027-03-03 | Estadio Nacional | Confirmed | `68e8c001a1b2c3d4e5f70805` |
| Ha*Ash — No Me Hablen de Amor | 2027-03-05 | Costa 21 | Confirmed | `68d1a001a1b2c3d4e5f70108` |
| Amancay Trail 2027 *new* | 2027-03-05 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70d03` |
| Sin Bandera — Escenas Tour 25 años | 2027-03-06 | Costa 21 | Confirmed | `68d1a001a1b2c3d4e5f70107` |
| Running Corporates Games Lima 2027 *new* | 2027-03-07 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70f04` |
| La Oreja de Van Gogh — Tantas Cosas | 2027-03-14 | Costa 21 | Confirmed | `68d1a001a1b2c3d4e5f70106` |
| Jungle — World Tour 2027 | 2027-03-24 | Costa 21 | Confirmed | `68e4a001a1b2c3d4e5f70408` |
| Una Noche de Salsa 15 | 2027-04-02 | Estadio San Marcos | Confirmed | `68e4a001a1b2c3d4e5f70409` |
| Una Noche de Salsa 15 | 2027-04-03 | Estadio San Marcos | Confirmed | `68e4a001a1b2c3d4e5f7040a` |
| Caifanes en Lima | 2027-04-17 | Costa 21 | Confirmed | `68e4a001a1b2c3d4e5f7040b` |
| Quiet Riot — Metal Health Latin American Tour *new* | 2027-04-18 | CC Leguía | Confirmed | `68e8e001a1b2c3d4e5f70a07` |
| Lima Aqua Fest 2027 *new* | 2027-04-18 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70f05` |
| IRONMAN 70.3 Perú 2027 *new* | 2027-04-25 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70f06` |
| Floor Jansen en Lima *new* | 2027-04-27 | CC Leguía | Confirmed | `68e8e001a1b2c3d4e5f70a08` |
| HammerFall en Lima *new* | 2027-05-01 | Teatro Kantaro | Announced + FOLLOW_UP | `68e8e001a1b2c3d4e5f70a09` |
| Jay Wheeler — La Voz Favorita | 2027-05-01 | Costa 21 | Confirmed | `68e8b001a1b2c3d4e5f70501` |
| Kase.O — Camisa de Fuerza Tour | 2027-05-13 | Parque de la Exposición | Confirmed | `68e4a001a1b2c3d4e5f7040c` |
| Maratón adidas Rímac Lima 42K 2027 *new* | 2027-05-23 | TBA | Announced + FOLLOW_UP | `68e8f001a1b2c3d4e5f70f07` |
| Salsa Lima Festival 2027 | 2027-05-29 | Estadio San Marcos | Confirmed | `68e4a001a1b2c3d4e5f7040d` |
| Slipknot en Lima | 2027-09-14 | Estadio Nacional | Confirmed | `68e4a001a1b2c3d4e5f7040e` |

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

## 5. How to run / import

1. Agent reads this file (Step 0). Missing/corrupt → ask for all 5 dumps (categories, venues, events, activities, states) and recreate
2. Sync clears `output/*.json`, scans window, writes JSON, updates this report
3. You import from §2 (order: states → categories → venues → activities → **insert** events → **update** events)
4. Next sync assumes that import is done and deletes those JSON files again

### Insert (`events-YYYY-MM-DD.json`)

Compass → `events` → **Add Data → Import JSON** (normal insert). New `_id`s only.

### Updates (`events-YYYY-MM-DD-updates.json`)

Compass Import does **not** upsert (same `_id` → duplicate key). Use a temp collection + Mongosh:

1. Create temp collection `events_updates_tmp`
2. **Add Data → Import JSON** the updates file into `events_updates_tmp`
3. Mongosh (same DB):

```js
db.events_updates_tmp.aggregate([
  {
    $merge: {
      into: "events",
      on: "_id",
      whenMatched: "replace",
      whenNotMatched: "discard",
    },
  },
]);
```

4. Drop `events_updates_tmp`

**CLI alternative:** `mongoimport --db=hornsAppDB --collection=events --mode=upsert --file=events-YYYY-MM-DD-updates.json`
