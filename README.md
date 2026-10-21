# Kofferforscher

A travel companion app for children (about 8–11 years old), in German. It turns a family trip into a small adventure: packing, learning how flying works, and finding collectible friends at the places you visit.

**Open the app:** https://vipinmohan11.github.io/little-pocket-fly/

## Features
- **Before the flight:** packing list, briefing and small predictions
- **At the airport and in the air:** missions, paper-plane lab, "How does flying work?" chapters
- **In the city:** day plan and offline map; at each planned place the phone's GPS shows *kalt / warm / heiß*. Answer a short question about the place to catch a friend for the Muya-Dex.
- **Progress:** levels, badges, stamps and a travel diary
- Works on phone and tablet, light and dark themes

## Install
Open the link in Chrome → menu → **Install app** (or **Add to Home screen**). After the first visit it works offline.

## Privacy
No accounts, no tracking, no server. All progress stays on the device (browser storage). Location is only used on the device, while the app is open, to compare it with the planned places. A backup file can be exported under *Für Eltern*.

## Development
Plain HTML, CSS and JavaScript with no dependencies. Source is in `src/`; `python3 build.py` builds the single `index.html` and updates the service worker version from `version.json`.
