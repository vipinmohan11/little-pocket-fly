# Kofferforscher (little-pocket-fly)

Offline travel PWA for the family trip (German UI). Static files, no server. Source in `src/`, built into one `index.html` by `python3 build.py`.

Source map: `core.js` (state, migration, router, Reisepass engine, updates) · `rewards.js` (all stamps) · `p_home.js` (start, Vor dem Abflug) · `p_stadt.js` (offline city map) · `p_wie.js` + `wissen.js` (8 interactive chapters, question bank) · `p_hgr.js` (paper-plane lab) · `p_auf.js` (missions, boarding passes, bingo) · `p_wes.js` + `wesen.js` (discoveries, records) · `p_misc.js` (diary, Reisepass, parents) · `city.js` + `city_de.js` (family city plan).

**Install on the tablet:** open https://vipinmohan11.github.io/little-pocket-fly/ in Chrome → menu → *Install app* (or *Add to Home screen*). Works offline afterwards.

## Updating the app (data is kept)
1. Edit files in `src/` (content lives in `src/content.js`, `src/city.js`, `src/pack.json`).
2. Raise `"version"` and add `notes` in `version.json`.
3. Run `python3 build.py`, commit, push.
4. On the tablet: *Für Eltern → Nach Updates suchen → Jetzt aktualisieren*.

The child's data (packing ticks, diary, stars, found creatures, settings) is stored in the tablet's `localStorage` under `kofferforscher.v1`. The service worker only caches app files and never touches it, and new fields are merged into old data, so updates never reset progress. *Für Eltern → Daten sichern* exports a backup file.
