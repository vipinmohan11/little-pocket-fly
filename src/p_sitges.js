/* ===== v1.9.5: Sitges (Tagesausflug) als eigenes Gebiet: Orte mit GPS (Koordinaten ungefähr), Fragen, Postkartenbilder ===== */
var SIT=[
 {id:'sit_sebastia',n:'Strand Platja de Sant Sebastià',lat:41.2339,lng:1.8052,k:'play',kid:'Such am Wasserrand die schönste Muschel.'},
 {id:'sit_kirche',n:'Kirche Sant Bartomeu i Santa Tecla',lat:41.2349,lng:1.8064,k:'see',kid:'Die Kirche steht fast im Meer. Von weitem sieht sie aus wie ein Schiff.'},
 {id:'sit_promenade',n:'Passeig Marítim (Promenade)',lat:41.2362,lng:1.8040,k:'view',kid:'Lauf die Promenade entlang und zähl die Palmen.'},
 {id:'sit_altstadt',n:'Altstadt & Platja de la Ribera',lat:41.2371,lng:1.8056,k:'see',kid:'Such eine enge Gasse mit weißen Häusern.'},
 {id:'sit_cauferrat',n:'Museum Cau Ferrat',lat:41.2350,lng:1.8059,k:'see',kid:'Such die großen Fenster. Sie stammen von der alten Burg der Stadt.'},
 {id:'sit_maricel',n:'Palau Maricel',lat:41.2347,lng:1.8068,k:'see',kid:'Der Palast steht direkt am Wasser. „Mar i Cel“ heißt Meer und Himmel.'}];
SIT.forEach(function(s,i){s.day=6;s.idx=i;STOPID[s.id]=s;PLACE[s.id]=s;PNAME_DE[s.id]=s.n});
Object.assign(PTHEME,{sit_sebastia:'meer',sit_kirche:'kunst',sit_promenade:'meer',sit_altstadt:'stadt',sit_cauferrat:'kunst',sit_maricel:'kunst'});
Object.assign(PLACEQ,{
 sit_sebastia:['Was kannst du am Strand Sant Sebastià machen?','Im Sand spielen und aufs Meer schauen','Ski fahren','Schlittschuh laufen'],
 sit_kirche:['Wo steht die große Kirche von Sitges?','Direkt am Meer','Mitten im Wald','Auf einem Berggipfel'],
 sit_promenade:['Was ist eine Promenade?','Ein Spazierweg am Meer','Eine Autobahn','Ein Fluss'],
 sit_altstadt:['Was heißt „Platja“ auf Deutsch?','Strand','Platz','Pizza'],
 sit_cauferrat:['Wem gehörte das Haus Cau Ferrat?','Dem Maler Santiago Rusiñol','Einem Piraten','Einem Bäcker'],
 sit_maricel:['Was bedeutet „Mar i Cel“?','Meer und Himmel','Sand und Sonne','Berg und Tal']});
Object.assign(PC.MAP,{sit_sebastia:['beach','sea','gold'],sit_kirche:['smm','sea','gold'],sit_promenade:['beach','sea','dawn'],sit_altstadt:['smm','street','gold'],sit_cauferrat:['smm','sea','blue'],sit_maricel:['colom','sea','gold']});
