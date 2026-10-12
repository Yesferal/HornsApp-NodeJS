# Lima events — last sync report

| | |
|--|--|
| **Last sync** | 2026-10-11 (weekly — TM + Rockmetalperu + Pacific Timing) |
| **Window** | 2026-10-11 → 2027-12-31 (default: today → 31 Dec next year) |
| **Next** | `/sync-lima-events` |

Tracked: this file (`scripts/lima-events-sync/LAST-SYNC-REPORT.md`). `*.json` under `lima-events-sync/` stay local (gitignored).

---

## 1. Summary

| | |
|--|--|
| Sources scanned | Rockmetalperu · Ticketmaster PE · Teleticket · Pacific Timing · Joinnus (deep-link hunt) · Eventrid (FOLLOW_UP recheck) |
| Broken / blocked list_url | **Running4Peru** (prior 403) · **Passline** Cloudflare — not scanned. Joinnus list still JS-heavy. |
| Already in DB (§4c before run) | prior `*b*` / `*c*` packs assumed imported |
| **New this run** | **10** inserts → `events-2026-10-11.json` (8 Confirmed + 2 Announced/`FOLLOW_UP`; Floor Jansen promoted after your Teleticket OK) |
| **Updates this run** | **2** → `events-2026-10-11-updates.json` (ASICS + Floor Jansen → Confirmed Teleticket) |
| New categories / venues | **1** venue → `venues-2026-10-11.json` (Parque Marina de Guerra, Magdalena) |
| Needs your OK | none (§3 empty; Floor Jansen accepted → Confirmed Teleticket) |
| Note | Quiet Riot recovered from Rockmetalperu typo. HammerFall + 5K Ilumina created with seller name + empty CTA (`FOLLOW_UP`). Posters probed 200 + `image/*`. |

---

## 2. Ready for Compass (this run only)

**Order:** venues → **insert** events → **update** events (temp + `$merge`, see §5).

| File | Status |
|------|--------|
| `venues-2026-10-11.json` | **Import** — Parque Marina de Guerra, Magdalena |
| `events-2026-10-11.json` | **Import** — 10 new (Roy Khan, Six Feet Under, Ghost Dance, Dying Fetus, Hellripper, Alcest, Quiet Riot, Floor Jansen, HammerFall, 5K Ilumina) |
| `events-2026-10-11-updates.json` | **Replace by `_id`** — ASICS Golden Run Lima · Floor Jansen → Confirmed (Teleticket) |

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
| TBA | `63e7b5bb5b520b8feeb889b7` | `https://static.vecteezy.com/system/resources/thumbnails/070/677/281/small/energetic-crowd-enjoying-live-music-event-hands-raised-at-festival-concert-photo.jpeg` |
| Parque de la Exposición | `63e47ef3a2364c17d03756ea` | `https://livesystemperu.com/wp-content/uploads/2022/11/GRUPO-5-4.jpg` |
| Parque Kennedy | `680e556dfd23ead6b0ca6c07` | `https://www.incatrailmachu.com/img/kennedy-park-the-central-park-of-miraflores-in-lima-277.jpg` |
| Parque Las Lomas, San Borja | `68ce0001a1b2c3d4e5f60008` | `https://i.pinimg.com/736x/97/c7/e9/97c7e9b463543ba93d8c69e6bc54161d.jpg` |
| Parque Los Heroes | `699269c76725336cb5f11e89` | `https://imgmedia.larepublica.pe/1000x590/larepublica/original/2025/03/17/67d8ac7c81bc3651622f3646.webp` |
| Parque Mariscal Ramón Castilla | `699273da6725336cb5f11ede` | `https://cdn.abril.pe/2019/03/parques-Lince-disfrutar-junto-a-familia-mariscal-ramon-castilla-768x402.jpg` |
| Parque Pentagonito | `67fb8035842ed656c38da88e` | `https://i.pinimg.com/736x/97/c7/e9/97c7e9b463543ba93d8c69e6bc54161d.jpg` |
| Plaza de Armas, Lima | `681d2ece32cfcf770e5a5cc7` | `https://portal.andina.pe/EDPfotografia3/Thumbnail/2024/07/28/001086717W.jpg` |
| Sargento Pimienta | `68ce0001a1b2c3d4e5f60001` | `https://indiehoy.com/wp-content/uploads/2015/09/Sargento-Pimienta-de-Barranco.jpg` |
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
| Zayn — The Konnakol Tour | 2026-10-14 | Costa 21 | Confirmed | `68d1b001a1b2c3d4e5f70201` |
| Nicole Zignago — Tour (enamorada) | 2026-10-15 | CC Barranco | Confirmed | `68e4a001a1b2c3d4e5f70402` |
| Kidd Voodoo | 2026-10-16 | CC Barranco | Announced | `07a5c7a13cdff51c75145f73` |
| Grupo Frontera — Triste Pero Bien | 2026-10-17 | Costa 21 | Confirmed | `68d1b001a1b2c3d4e5f70202` |
| Run For Your Lives | 2026-10-17 | Estadio Nacional | Confirmed | `6992825f6725336cb5f11ffb` |
| Festival de Lima — Día de la Salsa | 2026-10-17 | Círculo Militar de Jesús María | Confirmed | `68e8b001a1b2c3d4e5f70507` |
| Iron Maiden en Lima | 2026-10-17 | Estadio Nacional | Confirmed | `68e8c001a1b2c3d4e5f70804` |
| ASICS Golden Run Lima | 2026-10-18 | Parque Marina de Guerra, Magdalena | Confirmed | `68e8b001a1b2c3d4e5f70509` |
| Trote del Milagro 10K 2026 | 2026-10-18 | TBA | Announced + FOLLOW_UP | `68e8c001a1b2c3d4e5f70807` |
| Gosper Fest 2.0 | 2026-10-19 | Costa 21 | Confirmed | `68e8b001a1b2c3d4e5f70506` |
| Zelda Symphonic Legends | 2026-10-22 | Teatro Manuel A. Segura | Announced | `a100c5f9f5da439b330364e9` |
| Six Feet Under en Lima *new* | 2026-10-23 | Teatro Kantaro | Confirmed | `68e8e001a1b2c3d4e5f70a02` |
| Río Roma | 2026-10-24 | Costa 21 | Announced | `ed1701eefcfad288d5d6b7d4` |
| Media Maratón del Callao & 10K | 2026-10-25 | La Punta, Callao | Confirmed | `5c0e9f1bf041fa894763d30f` |
| Carrera Avon por Ellas | 2026-10-25 | TBA | Announced + FOLLOW_UP | `68e8c001a1b2c3d4e5f70808` |
| The Rasmus — Weirdo Tour | 2026-10-27 | CC Leguía | Confirmed | `68e4a001a1b2c3d4e5f70403` |
| Jaze — QNEPT Tour II | 2026-10-28 | CC Barranco | Confirmed | `68d1a001a1b2c3d4e5f70103` |
| Hombres G | 2026-10-29 | Estadio Nacional | Confirmed | `32bb8834a6bc5aac6eb96b89` |
| Jaze — QNEPT Tour II | 2026-10-29 | CC Barranco | Confirmed | `68d1a001a1b2c3d4e5f70104` |
| Hombres G | 2026-10-30 | Estadio Nacional | Confirmed | `ff87daadbb81d75f9bd78155` |
| Ken-Y Round 2 | 2026-10-30 | Arena 1 | Announced | `5aa0d3b10750f89092021fc3` |
| Jesse y Joy | 2026-10-31 | Costa 21 | Confirmed | `7504b778cbeb59b55fd90c0e` |
| Reggaetón Lima Festival 7 | 2026-10-31 | Costa 21 | Confirmed | `d19ae6c10dd1ec7a0b601890` |
| Expofolk 5.ª | 2026-10-31 | Parque de la Exposición | Announced | `a90aeec114509ffb83c13a13` |
| Humbe — Dueño de los Cielos | 2026-11-01 | Costa 21 | Confirmed | `68d1b001a1b2c3d4e5f70203` |
| María Becerra — Quimera Tour | 2026-11-04 | Costa 21 | Confirmed | `68e4a001a1b2c3d4e5f70404` |
| Taemin — LiMiNaL World Tour | 2026-11-06 | Estadio Monumental de Ate | Confirmed | `68d1a001a1b2c3d4e5f7010a` |
| Myriam Hernández | 2026-11-06 | Parque de la Exposición | Confirmed | `ea02c022e0146ef47db5973c` |
| Coti en Lima | 2026-11-06 | CC Barranco | Announced + FOLLOW_UP | `68e8d001a1b2c3d4e5f70908` |
| Bunbury — Nuevas Mutaciones Tour | 2026-11-07 | Costa 21 | Confirmed | `68d1b001a1b2c3d4e5f70206` |
| APP Touring 10K & 5K | 2026-11-08 | TBA | Announced + FOLLOW_UP | `68e8b001a1b2c3d4e5f7050a` |
| Timø en Lima | 2026-11-08 | CC Barranco | Confirmed | `68e4a001a1b2c3d4e5f70405` |
| Ill Niño en Lima | 2026-11-10 | Yield Rock | Confirmed | `68e8d001a1b2c3d4e5f70901` |
| Camilo — Para Cuando Sean Mayores Tour | 2026-11-10 | Costa 21 | Confirmed | `68e4a001a1b2c3d4e5f70406` |
| Hardwell — South America World Tour | 2026-11-13 | Costa 21 | Confirmed | `68d1a001a1b2c3d4e5f70102` |
| Tierra Santa en Lima | 2026-11-13 | Teatro Kantaro | Confirmed | `68e8d001a1b2c3d4e5f70902` |
| Cypress Hill en Lima | 2026-11-13 | Coliseo Eduardo Dibós | Confirmed | `68e8b001a1b2c3d4e5f70504` |
| Airbag | 2026-11-14 | Estadio San Marcos | Confirmed | `ee36cb510db6a1bd6c6702af` |
| Santa Maria Swim & Grill | 2026-11-14 | TBA | Announced + FOLLOW_UP | `68e8d001a1b2c3d4e5f7090b` |
| Ghost Dance en Lima *new* | 2026-11-14 | Teatro Kantaro | Confirmed | `68e8e001a1b2c3d4e5f70a03` |
| Ser Como Blippi Tour | 2026-11-15 | Auditorio Colegio San Agustín | Confirmed | `68e8c001a1b2c3d4e5f70802` |
| ¡Viva los 90s! | 2026-11-15 | Parque de la Exposición | Announced + FOLLOW_UP | `68e8d001a1b2c3d4e5f70909` |
| Elefante — 30 Aniversario Tour | 2026-11-18 | CC Barranco | Confirmed | `68e8d001a1b2c3d4e5f70903` |
| The Strokes | 2026-11-20 | Estadio San Marcos | Confirmed | `a68fa8d78639172f5c416743` |
| The Hayley Williams Show | 2026-11-21 | Costa 21 | Announced | `25bf35051ec12ee970245358` |
| Amanda Miguel — El Me Mintió World Tour | 2026-11-21 | Parque de la Exposición | Confirmed | `68e8b001a1b2c3d4e5f70503` |
| Easykid — Soy Un Fatalista | 2026-11-21 | CC Festiva | Confirmed | `68e8b001a1b2c3d4e5f70505` |
| My Dying Bride en Lima | 2026-11-22 | Yield Rock | Confirmed | `68e8d001a1b2c3d4e5f70904` |
| Ancón Trail Fest 2026 | 2026-11-22 | TBA | Announced + FOLLOW_UP | `68e8c001a1b2c3d4e5f70809` |
| Gorillaz en Lima | 2026-11-23 | Arena 1 | Confirmed | `68e8d001a1b2c3d4e5f70905` |
| CA7RIEL & Paco Amoroso — Free Spirits | 2026-11-27 | Costa 21 | Confirmed | `68d1a001a1b2c3d4e5f70109` |
| Dying Fetus en Lima *new* | 2026-11-28 | Teatro Kantaro | Confirmed | `68e8e001a1b2c3d4e5f70a04` |
| Lima Latin Pop Fest Vol. 3 | 2026-11-28 | Costa 21 | Announced | `77eb20f1a2e05db4b5a28402` |
| Flor Bertotti | 2026-11-29 | Gran Teatro Nacional | Announced | `32e2609dc4f3ee2c417a3cd6` |
| Dimash — Dimensions World Tour | 2026-12-01 | Costa 21 | Confirmed | `68d1b001a1b2c3d4e5f70204` |
| Maná | 2026-12-02 | Costa 21 | Confirmed | `cd9897f94ec7bbbb42b20398` |
| Sleeping With Sirens en Lima | 2026-12-06 | Costa 21 | Confirmed | `68e4a001a1b2c3d4e5f70407` |
| BABYMETAL | 2026-12-07 | Costa 21 | Confirmed | `68d1b001a1b2c3d4e5f70205` |
| Kreator — Latin American Tour | 2026-12-08 | CC Leguía | Confirmed | `68e8d001a1b2c3d4e5f70906` |
| 5K Ilumina El Mundo 2026 *new* | 2026-12-09 | TBA | Announced + FOLLOW_UP | `68e8e001a1b2c3d4e5f70a0a` |
| Daniel Caesar — Son of Spergy Tour | 2026-12-08 | Costa 21 | Confirmed | `68e8b001a1b2c3d4e5f70502` |
| Super Arte — Lenny Tavárez & Justin Quiles | 2026-12-12 | Arena 1 | Confirmed | `68d1a001a1b2c3d4e5f70101` |
| The Jacksons | 2026-12-15 | Costa 21 | Confirmed | `c02f1311ff0199a114894162` |
| Aterciopelados en Lima | 2026-12-17 | CC Leguía | Announced + FOLLOW_UP | `68e8d001a1b2c3d4e5f7090a` |
| Hellripper en Lima *new* | 2027-01-21 | Vichama Conciertos | Confirmed | `68e8e001a1b2c3d4e5f70a05` |
| Karol G — Tropitour | 2027-01-22 | Estadio San Marcos | Confirmed | `68d1a001a1b2c3d4e5f70105` |
| Alcest en Lima *new* | 2027-02-13 | Teatro Kantaro | Confirmed | `68e8e001a1b2c3d4e5f70a06` |
| Foo Fighters en Lima | 2027-03-03 | Estadio Nacional | Confirmed | `68e8c001a1b2c3d4e5f70805` |
| Ha*Ash — No Me Hablen de Amor | 2027-03-05 | Costa 21 | Confirmed | `68d1a001a1b2c3d4e5f70108` |
| Sin Bandera — Escenas Tour 25 años | 2027-03-06 | Costa 21 | Confirmed | `68d1a001a1b2c3d4e5f70107` |
| La Oreja de Van Gogh — Tantas Cosas | 2027-03-14 | Costa 21 | Confirmed | `68d1a001a1b2c3d4e5f70106` |
| Jungle — World Tour 2027 | 2027-03-24 | Costa 21 | Confirmed | `68e4a001a1b2c3d4e5f70408` |
| Una Noche de Salsa 15 | 2027-04-02 | Estadio San Marcos | Confirmed | `68e4a001a1b2c3d4e5f70409` |
| Una Noche de Salsa 15 | 2027-04-03 | Estadio San Marcos | Confirmed | `68e4a001a1b2c3d4e5f7040a` |
| Caifanes en Lima | 2027-04-17 | Costa 21 | Confirmed | `68e4a001a1b2c3d4e5f7040b` |
| Quiet Riot — Metal Health Latin American Tour *new* | 2027-04-18 | CC Leguía | Confirmed | `68e8e001a1b2c3d4e5f70a07` |
| Floor Jansen en Lima *new* | 2027-04-27 | CC Leguía | Confirmed | `68e8e001a1b2c3d4e5f70a08` |
| HammerFall en Lima *new* | 2027-05-01 | Teatro Kantaro | Announced + FOLLOW_UP | `68e8e001a1b2c3d4e5f70a09` |
| Jay Wheeler — La Voz Favorita | 2027-05-01 | Costa 21 | Confirmed | `68e8b001a1b2c3d4e5f70501` |
| Kase.O — Camisa de Fuerza Tour | 2027-05-13 | Parque de la Exposición | Confirmed | `68e4a001a1b2c3d4e5f7040c` |
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
