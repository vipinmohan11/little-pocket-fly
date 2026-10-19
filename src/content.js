/* ===== Kofferforscher content (German). Saved progress is keyed by id, so lists can grow in updates. ===== */
var WINDOWS=[
 {id:'vor',t:'Vor dem Abflug',s:'Packliste & Briefing',c:'#ECD06F',ic:'M5 13l4 4L19 7'},
 {id:'hgr',t:'Tüftel-Hangar',s:'Papierflieger-Labor',c:'#49C5B6',ic:'M3 12l18-8-6 16-3-7-9-1z'},
 {id:'auf',t:'Kapitäns-Aufträge',s:'Flughafen-Missionen',c:'#FF6A52',ic:'M4 7h16v10H4zM14 7v10M7 11h4'},
 {id:'wie',t:'Wie fliegt das?',s:'8 Kapitel zum Ausprobieren',c:'#B5D5FF',ic:'M4 16c4-1 6-5 8-9 2 4 4 8 8 9M4 20h16'},
 {id:'wes',t:'Wunderwesen',s:'Barcelona entdecken',c:'#B1EAC4',ic:'M12 21s-7-5-7-11a7 7 0 0114 0c0 6-7 11-7 11zM12 8v4'},
 {id:'rek',t:'Weltrekorde',s:'Schätzen & vergleichen',c:'#FFB288',ic:'M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4z'},
 {id:'tag',t:'Reise-Tagebuch',s:'Deine Erinnerungen',c:'#2779A7',ic:'M5 4h12a2 2 0 012 2v14H7a2 2 0 01-2-2V4zM9 8h6M9 12h6'}
];
var ICON=function(p,col,w){return '<svg viewBox="0 0 24 24" fill="none" stroke="'+(col||'#13324A')+'" stroke-width="'+(w||2.4)+'" stroke-linecap="round" stroke-linejoin="round"><path d="'+p+'"/></svg>'};
var IC={check:'M5 13l4 4L19 7',suitcase:'M8 7V5h8v2M4 7h16v12H4zM9 11v4M15 11v4',plane:'M2 13l20-6-4 6 4 6-20-6zM8 13l-2 5',ticket:'M3 7h18v4a2 2 0 000 4v4H3v-4a2 2 0 000-4zM14 7v12',star:'M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5 6.7 19.4l1.2-6L3.4 9.3l6-.7z',
 book:'M4 5h7a2 2 0 012 2v12a2 2 0 00-2-2H4zM20 5h-7a2 2 0 00-2 2v12a2 2 0 012-2h7z',eye:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z',map:'M9 4L3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14',heart:'M12 20s-8-5-8-11a4 4 0 018-1 4 4 0 018 1c0 6-8 11-8 11z',
 trophy:'M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4zM7 6H4a3 3 0 003 4M17 6h3a3 3 0 01-3 4',compass:'M12 3a9 9 0 100 18 9 9 0 000-18zM15.5 8.5l-2 5-5 2 2-5z',wing:'M3 15c5-1 9-4 12-9 1 4 3 7 6 9M3 19h18',bulb:'M9 18h6M10 21h4M12 3a6 6 0 00-4 10c1 1 1 2 1 3h6c0-1 0-2 1-3a6 6 0 00-4-10z',
 tower:'M10 21l1-12h2l1 12M8 9h8l-1-4H9zM12 5V3',dragon:'M4 16c3 0 4-3 7-3s3 3 6 3 3-2 3-2M6 12l2-4 2 3 2-4 2 3 2-4',paw:'M12 13c-3 0-5 3-5 5h10c0-2-2-5-5-5zM7 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM10 6a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM14 6a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
 food:'M5 3v8a3 3 0 006 0V3M8 3v18M17 3c-2 2-2 6 0 8v10',chat:'M4 5h16v10H9l-5 4z',tile:'M12 3l9 9-9 9-9-9zM12 8l4 4-4 4-4-4z',sun:'M12 7a5 5 0 100 10 5 5 0 000-10zM12 1v2M12 21v2M1 12h2M21 12h2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
 flag:'M5 21V4M5 4h11l-2 4 2 4H5',gear:'M12 15a3 3 0 100-6 3 3 0 000 6zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2',cloud:'M7 18h10a4 4 0 000-8 6 6 0 00-11.5 1.5A3.5 3.5 0 007 18z',walk:'M13 4a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM10 22l2-7 3 3v6M9 12l2-5 4 2 2 4M11 7l-3 3'};

/* ---------- Vor dem Abflug: Briefing (Haustür bis Barcelona) ---------- */
var BRIEFING=[
 ['Abfahrt','Zu Hause',IC.suitcase,'Überprüfe die „Wohnung“-Liste in der Packliste. Mama oder Papa fotografieren die Bordkarten, falls etwas verloren geht.',['Reisepässe und Bordkarten griffbereit','Trinkflasche leer mitnehmen und später füllen','Kopfhörer und '+'Kuscheltier in den Rucksack']],
 ['Check-in','Am Schalter',IC.ticket,'Am Schalter oder Automaten werden die Koffer gewogen und bekommen einen Aufkleber mit dem Code BCN. Dann fahren sie auf einem Band in den Keller des Flughafens.',['Wohin fährt der Koffer auf dem Band?','Gewicht auf der Waage ablesen','Handgepäck bleibt bei dir']],
 ['Kontrolle','Sicherheit',IC.eye,'Dein Rucksack kommt in eine Wanne und fährt durch einen Scanner. Du gehst durch einen Rahmen. Das ist für alle gleich und dauert nur kurz.',['Jacke und Metall in die Wanne','Flüssigkeiten im durchsichtigen Beutel','Leere Trinkflasche darf mit']],
 ['Gate','Warten',IC.tower,'Auf der Anzeigetafel stehen Gate (zum Beispiel „B12“) und Boarding-Zeit. Beobachte die Flugzeuge: Wer lädt Koffer ein? Welche Fahrzeuge fahren herum?',['Gate-Nummer merken','Toilette vor dem Boarding','Kennzeichen am Flugzeug lesen (D-…)']],
 ['Boarding','Einsteigen',IC.plane,'Bordkarte zeigen, durch die Röhre oder über die Treppe ins Flugzeug. Die Crew begrüßt dich. Dein Platz steht auf der Bordkarte.',['Reihe und Buchstabe finden','Rucksack unter den Sitz','Anschnallen, sobald du sitzt']],
 ['Start','Abheben',IC.wing,'Das Licht wird gedimmt, die Triebwerke werden lauter, du wirst sanft in den Sitz gedrückt. Schlucken oder Gähnen hilft den Ohren.',['Tisch hochklappen','Fensterblende offen','Beschleunigung spüren']],
 ['Im Flug','Reiseflug',IC.cloud,'Etwa zwei Stunden geht es über Deutschland, Frankreich und die Pyrenäen. Wenn das Anschnallzeichen aus ist, darfst du kurz aufstehen.',['Wolkenarten erkennen','Pyrenäen suchen','Kapitäns-Aufträge lösen']],
 ['Ankunft','Barcelona',IC.flag,'Beim Sinkflug knackt es wieder in den Ohren. Nach der Landung rollt das Flugzeug zum Gate. Dann holst du deinen Koffer vom Band. Benvinguts a Barcelona!',['Koffer am Band erkennen','Erstes katalanisches Wort lesen','Stadtplan öffnen']]
];
/* Tipps vorher abgeben, nach der Reise auflösen. a = richtige Antwort (null = deine eigene Beobachtung) */
var VORHER2=[
 {id:'hoch',q:'Wie hoch fliegen wir?',o:['1 km','5 km','11 km','50 km'],a:2,w:'Verkehrsflugzeuge fliegen meist 10 bis 12 Kilometer hoch.'},
 {id:'dauer',q:'Wie lange dauert der Flug?',o:['1 Stunde','gut 2 Stunden','4 Stunden','8 Stunden'],a:1,w:'Hannover → Barcelona dauert etwa 2 Stunden und 15 Minuten.'},
 {id:'tempo',q:'Wie schnell fliegen wir?',o:['150 km/h','400 km/h','850 km/h','3 000 km/h'],a:2,w:'Im Reiseflug etwa 800 bis 870 km/h.'},
 {id:'kalt',q:'Wie kalt ist es draußen oben?',o:['+10 °C','0 °C','−20 °C','−55 °C'],a:3,w:'In 11 km Höhe sind es ungefähr −55 °C.'},
 {id:'weit',q:'Wie weit ist Barcelona entfernt?',o:['500 km','1 400 km','3 000 km','9 000 km'],a:1,w:'Luftlinie rund 1 370 Kilometer.'},
 {id:'erst',q:'Was siehst du zuerst von Barcelona?',o:['Das Meer','Berge','Die Sagrada Família','Den Flughafen'],a:null,w:'Das weißt nur du! Tippe nach der Landung, was es wirklich war.'},
 {id:'essen',q:'Was wird dein erstes Essen?',o:['Pizza','Churros','Tapas','Eis'],a:null,w:'Tippe nach dem ersten Essen, was es wirklich war.'},
 {id:'wetter',q:'Wie wird das Wetter bei der Ankunft?',o:['Sonne','Wolken','Regen','Wind'],a:null,w:'Schau bei der Ankunft aus dem Fenster.'}
];

/* ---------- Stadtplan Tipps ---------- */
var STADT_TIPS=[
 ['Jetzt buchen','<ul><li><b>Sagrada Família</b> früh buchen (9 oder 10 Uhr): sagradafamilia.org. Kind unter 11 frei, braucht aber ein Ticket.</li><li><b>Park Güell</b>, Slot ca. 10:30: parkguell.barcelona.</li><li><b>Picasso-Museum</b>, kostenloser Slot donnerstags 16–19 Uhr: museupicassobcn.cat.</li><li><b>CosmoCaixa</b> (optional, mit Planetarium): cosmocaixa.org.</li></ul>'],
 ['Unterwegs','<ul><li><b>T-casual</b>: €13 für 10 Fahrten (Zone 1), je bis 75 Min. inkl. Umsteigen. Metro, Bus, Tram, FGC, Nahverkehrszüge. Pro Person eine Karte.</li><li>Kinder ab 4 zahlen wie Erwachsene.</li><li><b>Flughafen:</b> Zug R2 Nord ab T2 gilt mit T-casual, Metro L9 nicht (€5,90). Ab T1 gratis grüner Shuttle zu T2.</li><li>Die Standseilbahn Montjuïc ist im Metrotarif enthalten, die Seilbahnen nicht.</li></ul>'],
 ['Geld sparen','<ul><li>Mittags <b>menú del día</b> (ca. €13–18, drei Gänge).</li><li>Gratis-Aussichten: Tres Creus, Bunkers del Carmel, Turó del Putxet, Montjuïc-Gärten, MNAC-Treppen.</li><li>Picasso donnerstags 16–19 Uhr gratis, MNAC samstags ab 15 Uhr. CosmoCaixa unter 16 gratis.</li><li>Kartenzahlung immer in <b>EUR</b>.</li></ul>'],
 ['Sicherheit','<ul><li><b>Taschendiebe</b>: Rambla, Metro L1/L3, Sagrada Família, Strände. Taschen zu und vorne tragen.</li><li><b>Strand</b>: ab Oktober keine Rettungsschwimmer. Nur so tief, dass man steht.</li><li><b>Notruf 112</b>. Jeden Tag einen Treffpunkt ausmachen, Telefonnummer in die Kindertasche.</li><li>Hut, Sonnencreme, Trinkflasche. Brunnen haben Trinkwasser.</li></ul>']
];
var KIND={see:'Sehen',eat:'Essen',play:'Spielen',view:'Aussicht'};
var TRANSIT={'d4:arc':'FGC + Metro L1 bis Arc de Triomf, ca. 30 Min.','d6:castle':'Bus 150 hinauf zur Burg (oder Seilbahn)'};
