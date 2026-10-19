/* ===== Kofferforscher content (German). Add to these lists to deepen the app; saved progress is keyed by id and never lost. ===== */
var WINDOWS=[
 {id:'vor',t:'Vor dem Abflug',s:'Packliste & Briefing',c:'#ECD06F',ic:'M5 13l4 4L19 7'},
 {id:'hgr',t:'Tüftel-Hangar',s:'Papierflieger bauen',c:'#49C5B6',ic:'M3 12l18-8-6 16-3-7-9-1z'},
 {id:'auf',t:'Kapitäns-Aufträge',s:'Rätsel für unterwegs',c:'#FF6A52',ic:'M12 3v18M5 10l7-7 7 7'},
 {id:'wie',t:'Wie fliegt das?',s:'8 Kapitel zum Staunen',c:'#B5D5FF',ic:'M4 16c4-1 6-5 8-9 2 4 4 8 8 9M4 20h16'},
 {id:'wes',t:'Wunderwesen',s:'Barcelona entdecken',c:'#B1EAC4',ic:'M12 21s-7-5-7-11a7 7 0 0114 0c0 6-7 11-7 11zM12 8v4'},
 {id:'rek',t:'Weltrekorde',s:'Größer, schneller, älter',c:'#FFB288',ic:'M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4z'},
 {id:'tag',t:'Reise-Tagebuch',s:'Dein Buch der Reise',c:'#2779A7',ic:'M5 4h12a2 2 0 012 2v14H7a2 2 0 01-2-2V4zM9 8h6M9 12h6'}
];
var ICON=function(p,col){return '<svg viewBox="0 0 24 24" fill="none" stroke="'+(col||'#13324A')+'" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="'+p+'"/></svg>'};

/* ---------- Wie fliegt das? ---------- */
var WISSEN=[
{id:'auftrieb',t:'Auftrieb',c:'#B5D5FF',sim:'lift',intro:'Ein Flugzeug mit 70 Tonnen schwebt in der Luft. Wie geht das? Die Antwort steckt in den Flügeln und in der Luft, die du nicht siehst.',
 secs:[
 ['Luft ist nicht „nichts“','Ein Würfel Luft von einem Meter Kantenlänge wiegt am Boden rund 1,2 Kilogramm. Wenn ein Flügel mit hoher Geschwindigkeit durch diese Luft saust, trifft er auf Milliarden winziger Teilchen. Genug, um ein ganzes Flugzeug zu tragen.'],
 ['Der Flügel lenkt Luft nach unten','Ein Flügel ist leicht schräg zur Strömung gestellt. Er schiebt die Luft nach unten. Die Luft schiebt den Flügel nach oben zurück. Das ist die Kraft, die wir Auftrieb nennen. Den Winkel zwischen Flügel und Luftstrom nennt man Anstellwinkel.'],
 ['Gewölbt oben, flacher unten','Die Oberseite eines Flügels ist gewölbt. Die Luft folgt der Wölbung und wird so zusätzlich nach unten gelenkt. Auf der gewölbten Seite sinkt der Druck ein wenig. Unterdruck oben und Überdruck unten ziehen und schieben den Flügel zusammen nach oben.'],
 ['Schneller heißt mehr Auftrieb','Verdoppelst du die Geschwindigkeit, wird der Auftrieb viermal so groß. Darum rollt ein Flugzeug erst über die Bahn: Es braucht Tempo, bis die Flügel genug tragen. Das ist der Startlauf.'],
 ['Klappen zum langsam Fliegen','Beim Start und bei der Landung fährt das Flugzeug Klappen an der Flügelhinterkante und Vorflügel an der Vorderkante aus. Sie machen den Flügel größer und gewölbter. So trägt er auch bei geringerem Tempo. Von deinem Fenstersitz aus kannst du ihnen beim Ausfahren zusehen.']],
 facts:['Ein Airbus A320 hat eine Spannweite von etwa 36 Metern, das ist breiter als ein Basketballfeld lang ist.','Auch ein Vogel nutzt Auftrieb: Er breitet die Flügel aus und lässt sich von warmer Luft nach oben tragen.','Der Papierflieger fliegt nach demselben Prinzip wie ein Jumbo. Nur der Motor ist deine Wurfhand.','Die Brüder Wright flogen 1903 zum ersten Mal mit einem Motorflugzeug. Der erste Flug dauerte 12 Sekunden.','Segelflieger steigen nur mit Aufwind und fliegen so viele Stunden ohne Motor.'],
 quiz:[['Was macht ein Flügel mit der Luft?',['Er schiebt sie nach unten','Er saugt sie in sich hinein','Er hält sie fest'],0,'Der Flügel lenkt die Luft nach unten, die Gegenkraft hebt ihn nach oben.'],['Was passiert mit dem Auftrieb, wenn das Flugzeug doppelt so schnell fliegt?',['Er bleibt gleich','Er wird viermal so groß','Er halbiert sich'],1,'Der Auftrieb wächst mit dem Quadrat der Geschwindigkeit.'],['Wozu sind die Klappen am Flügel da?',['Zum Bremsen am Boden','Damit der Flügel auch bei langsamem Tempo trägt','Zum Kühlen'],1,'Klappen vergrößern und wölben den Flügel für Start und Landung.']]},

{id:'kraefte',t:'Die vier Kräfte',c:'#ECD06F',sim:'forces',intro:'Jedes Flugzeug wird von vier Kräften gleichzeitig gehalten, gezogen und geschoben. Pilotinnen und Piloten spielen mit ihnen wie bei einem Tauziehen, das immer im Gleichgewicht bleibt.',
 secs:[
 ['Auftrieb – nach oben','Er entsteht an den Flügeln und hebt das Flugzeug an.'],
 ['Gewicht – nach unten','Das Flugzeug samt Passagieren, Gepäck und Treibstoff wird von der Erde angezogen. Je leichter, desto weniger Auftrieb braucht es. Darum zählt beim Check-in jedes Kilo.'],
 ['Schub – nach vorne','Die Triebwerke blasen Luft nach hinten und schieben das Flugzeug dadurch nach vorne.'],
 ['Widerstand – nach hinten','Die Luft bremst alles, was sich durch sie bewegt. Darum haben Flugzeuge eine glatte, stromlinienförmige Form. Am Ende der Flügel stehen oft kleine aufgebogene Spitzen, sogenannte Winglets. Sie verringern den Widerstand und sparen Treibstoff.'],
 ['Gleichgewicht im Reiseflug','Im Reiseflug sind Auftrieb und Gewicht gleich groß und Schub und Widerstand ebenfalls. Dann fliegt das Flugzeug geradeaus, ohne zu steigen oder zu sinken. Beim Steigen ist der Auftrieb etwas größer, beim Sinken etwas kleiner.']],
 facts:['Beim Abheben ist der Schub fast am größten. Im Reiseflug reicht weniger.','Der Treibstoff steckt zum großen Teil in den Flügeln. Er macht sie schwer und hält sie zugleich ruhig.','Ein Flugzeug wird während des Fluges leichter, weil es Treibstoff verbraucht.','Gleitflug: Auch ganz ohne Schub gleitet ein Flugzeug weit, ähnlich wie ein Papierflieger.'],
 quiz:[['Welche Kraft schiebt das Flugzeug nach vorne?',['Gewicht','Schub','Widerstand'],1,'Die Triebwerke erzeugen den Schub.'],['Wann sind alle vier Kräfte im Gleichgewicht?',['Im Geradeausflug in gleicher Höhe','Beim Start','Beim Parken'],0,'Im Reiseflug halten sich Auftrieb/Gewicht und Schub/Widerstand die Waage.'],['Wofür sind Winglets gut?',['Als Antenne','Sie verringern den Widerstand','Sie machen den Flieger bunter'],1,'Winglets sparen Treibstoff.']]},

{id:'steuern',t:'Steuern',c:'#49C5B6',sim:'steer',intro:'Ein Flugzeug kann sich auf drei Arten drehen. Für jede gibt es ein eigenes Ruder. Du kannst sie beim Warten am Flughafen oder im Flug am Fenster beobachten.',
 secs:[
 ['Rollen – Querruder','Die Querruder sitzen hinten außen an den Flügeln. Geht das eine nach oben und das andere nach unten, neigt sich das Flugzeug zur Seite. So fliegt es Kurven.'],
 ['Nicken – Höhenruder','Das Höhenruder sitzt hinten am waagerechten Leitwerk. Nach oben gestellt hebt es die Nase, nach unten senkt es sie. So steigt und sinkt das Flugzeug.'],
 ['Gieren – Seitenruder','Das Seitenruder steht am senkrechten Leitwerk, der großen Flosse hinten. Es dreht die Nase nach links oder rechts. Es hält das Flugzeug sauber in der Spur, vor allem bei Wind.'],
 ['Spoiler und Klappen','Auf den Flügeln stehen zusätzliche Platten, die Spoiler. Sie klappen nach der Landung hoch und nehmen dem Flügel den Auftrieb, damit das Flugzeug fest auf der Bahn steht und bremsen kann.'],
 ['Trimmung','Kleine Einstellungen am Leitwerk halten das Flugzeug im Reiseflug ruhig, ohne dass jemand ständig steuern muss. Der Autopilot hilft dabei.']],
 facts:['Die Steuerung im Cockpit geht heute über Kabel und Computer („Fly-by-wire“), nicht mehr nur über Seile und Stangen.','Ein Seitensteuer-Pedal wird mit den Füßen bewegt, das Höhen- und Querruder mit dem Steuerknüppel.','Bei der Landung siehst du die Spoiler als Platten auf den Flügeln, wenn du am Fenster sitzt.'],
 quiz:[['Welches Ruder lässt das Flugzeug steigen?',['Seitenruder','Höhenruder','Querruder'],1,'Das Höhenruder hebt oder senkt die Nase.'],['Wozu sind Spoiler nach der Landung da?',['Sie nehmen dem Flügel den Auftrieb','Sie sind Lichter','Sie kühlen die Reifen'],0,'Damit das Flugzeug fest auf der Bahn steht und bremsen kann.'],['Was bewirkt das Seitenruder?',['Es dreht die Nase nach links oder rechts','Es fährt das Fahrwerk aus','Es heizt die Kabine'],0,'Es steuert das Gieren.']]},

{id:'triebwerk',t:'Triebwerke',c:'#FF6A52',sim:'engine',intro:'Ein modernes Triebwerk ist wie ein riesiger, sehr kontrollierter Föhn: Es saugt Luft an, drückt sie zusammen, mischt Treibstoff dazu und bläst sie kraftvoll nach hinten.',
 secs:[
 ['1 · Ansaugen','Ganz vorn dreht sich der Fan, ein großes Rad mit breiten Schaufeln. Es saugt Luft an. Der größte Teil der Luft läuft außen am Kern vorbei und liefert den Großteil des Schubs.'],
 ['2 · Verdichten','Im Kern drücken viele kleine Schaufelräder die Luft auf einen Bruchteil ihres Raumes zusammen. Dabei wird sie heiß und steht unter hohem Druck.'],
 ['3 · Verbrennen','In der Brennkammer spritzt Treibstoff in die verdichtete Luft. Die Mischung brennt gleichmäßig. Die Gase dehnen sich mit großer Kraft aus.'],
 ['4 · Antreiben und Ausstoßen','Die heißen Gase treiben eine Turbine an, ähnlich wie Wind eine Windmühle. Die Turbine dreht den Fan und den Verdichter vorne mit. Der Rest strömt nach hinten hinaus und schiebt das Flugzeug.'],
 ['Leiser und sparsamer','Neue Triebwerke haben größere Fans und lassen mehr Luft außen vorbeiströmen. Das spart Treibstoff und macht sie leiser.']],
 facts:['Der Fan eines großen Triebwerks hat mehr als drei Meter Durchmesser.','Die Schaufeln drehen sich tausende Male pro Minute.','Triebwerke werden im Test sogar mit Wasser und Sand beschossen, damit sie robust sind.','Moderne Flugzeuge können auch mit teilweise nachhaltigem Treibstoff fliegen.'],
 quiz:[['Was macht der Fan?',['Er saugt Luft an','Er kühlt den Treibstoff','Er dreht den Reifen'],0,'Der Fan zieht Luft ins Triebwerk.'],['Was treibt die Turbine an?',['Die heißen Gase','Die Passagiere','Ein Gummiband'],0,'Die Gase strömen durch die Turbine wie Wind durch eine Windmühle.'],['Wo wird der Treibstoff verbrannt?',['In der Brennkammer','Im Fan','In den Rädern'],0,'In der Brennkammer mischt sich Treibstoff mit der verdichteten Luft.']]},

{id:'innen',t:'Im Inneren',c:'#B1EAC4',sim:'inside',intro:'Ein Flugzeug ist wie ein kleines Dorf, das fliegt: Cockpit, Küche, Gepäckkeller, Wohnzimmer – und alles passt in eine Röhre.',
 secs:[
 ['Cockpit','Hier arbeiten Kapitänin oder Kapitän und Erste Offiziere zusammen. Sie prüfen vor jedem Flug Wetter, Route, Treibstoff und Technik. Viele Anzeigen sind Bildschirme.'],
 ['Kabine','Die Kabine ist luftdicht. Die Luft wird gefiltert und auf einen angenehmen Druck gebracht, ungefähr wie auf einem Berg in 2 000 Metern Höhe. Deshalb knackt es manchmal in den Ohren.'],
 ['Frachtraum','Unter dem Boden der Kabine liegen Koffer und Fracht. Auch dieser Raum ist beheizt und belüftet.'],
 ['Tanks','Der Treibstoff liegt vor allem in den Flügeln. Dort ist viel Platz, und das Gewicht ist gut verteilt.'],
 ['Fahrwerk','Beim Start fährt das Fahrwerk ein, damit weniger Widerstand entsteht. Du hörst dabei ein leises Rumpeln. Vor der Landung fährt es wieder aus.'],
 ['Küche und Toiletten','Die Bordküche (Galley) hat Wagen, Öfen und Kaffeemaschinen. Das Wasser kommt aus Tanks.']],
 facts:['Fenster haben ein winziges Loch, das Druck ausgleicht und Beschlag verhindert.','Die Kabinendecke und Sitze sind so gebaut, dass sie bei jedem Flug sehr leicht sind.','Das Licht in der Kabine wird beim Start und bei der Landung gedimmt, damit sich die Augen schneller an Dunkelheit gewöhnen.','Das Bordmenü wird auf der Erde vorbereitet und an Bord aufgewärmt.'],
 quiz:[['Wo ist der meiste Treibstoff?',['In den Flügeln','Im Kofferraum','Im Cockpit'],0,'Die Tanks liegen hauptsächlich in den Flügeln.'],['Warum knackt es in den Ohren?',['Der Druck ändert sich beim Steigen und Sinken','Wegen der Musik','Wegen der Kälte'],0,'Der Luftdruck ändert sich, das Ohr gleicht ihn aus. Schlucken oder Gähnen hilft.'],['Wann fährt das Fahrwerk ein?',['Nach dem Start','Vor dem Boarding','Nach der Landung'],0,'So gibt es weniger Luftwiderstand.']]},

{id:'start',t:'Start und Landung',c:'#FFB288',sim:'phases',intro:'Ein Flug besteht aus mehreren Abschnitten, wie die Kapitel in einem Buch. Wenn du sie kennst, weißt du immer, was gerade passiert.',
 secs:[
 ['Rollen','Das Flugzeug rollt zur Startbahn. Du hörst leise Geräusche vom Fahrwerk und spürst kleine Kurven.'],
 ['Startlauf','Die Triebwerke geben mehr Schub, das Flugzeug beschleunigt. Du wirst sanft in den Sitz gedrückt.'],
 ['Abheben','Bei etwa 250 bis 280 km/h hebt die Nase ab und die Räder verlassen den Boden.'],
 ['Steigflug','Das Flugzeug steigt in Kurven und gerade aus, bis es seine Reiseflughöhe erreicht. Das Fahrwerk fährt ein. Die Klappen werden eingezogen.'],
 ['Reiseflug','In etwa 10 bis 12 Kilometern Höhe fliegt es bei rund 850 km/h. Hier ist die Luft dünn und kalt, aber sehr ruhig.'],
 ['Sinkflug und Anflug','Das Flugzeug sinkt langsam, die Klappen kommen heraus, das Fahrwerk fährt aus. Die Landebahn wird größer.'],
 ['Landung','Die Räder berühren die Bahn bei etwa 250 km/h. Spoiler und Bremsen bringen das Flugzeug zum Stehen. Dann rollst du zum Gate.']],
 facts:['Die Landebahn in Barcelona liegt direkt am Meer. Bei klarem Wetter siehst du beim Anflug die Küste.','Beim Start geht es sehr schnell: In etwa 30 Sekunden vom Stehen zum Abheben.','Piloten sprechen bei der Landung vom „Aufsetzen“. Gute Landungen sind oft ganz sanft.','Die Reiseflughöhe wird so gewählt, dass das Flugzeug möglichst wenig Treibstoff braucht.'],
 quiz:[['Bei welchem Tempo hebt ein Verkehrsflugzeug etwa ab?',['50 km/h','250 bis 280 km/h','900 km/h'],1,'Das ist nötig, damit die Flügel genug Auftrieb erzeugen.'],['Wie hoch fliegt ein Passagierflugzeug etwa im Reiseflug?',['1 Kilometer','10 bis 12 Kilometer','100 Kilometer'],1,'Reiseflughöhe liegt meist bei 10 bis 12 km.'],['Was passiert nach der Landung mit den Spoilern?',['Sie klappen hoch und helfen beim Bremsen','Sie fallen ab','Sie leuchten'],0,'Sie nehmen Auftrieb weg und drücken das Flugzeug auf die Bahn.']]},

{id:'wetter',t:'Wolken und Wetter',c:'#9ACDEB',sim:'weather',intro:'Über den Wolken ist es fast immer sonnig. Von oben siehst du, wie Wetter „gemacht“ wird.',
 secs:[
 ['Wolkenfamilien','Cumulus sind die weißen Haufenwolken. Stratus ist eine flache Schicht, oft grau. Cirrus sind hohe, dünne Schleier aus Eiskristallen. Cumulonimbus sind die hohen Gewitterwolken, die wie Türme aussehen. Flugzeuge fliegen um sie herum.'],
 ['Warum wird es oben kalt?','Pro 1 000 Meter Höhe sinkt die Temperatur im Mittel um etwa 6,5 Grad. In Reiseflughöhe sind es ungefähr minus 55 Grad. Außen kalt, innen gemütlich: Die Kabine wird beheizt.'],
 ['Schaukeln in der Luft','Manchmal schaukelt das Flugzeug leicht. Das sind Luftströmungen, wie Wellen auf dem Wasser. Das Flugzeug ist dafür gebaut. Man bleibt am besten angeschnallt.'],
 ['Kondensstreifen','Die weißen Streifen hinter dem Flugzeug entstehen, wenn heißer, feuchter Abgasstrahl in der sehr kalten Luft zu winzigen Eiskristallen gefriert.'],
 ['Besondere Himmelsbilder','Manchmal sieht man vom Flugzeug einen runden Regenbogen, der den Schatten des Flugzeugs umgibt. Er heißt Glorie. Du brauchst Sonne in deinem Rücken und eine Wolkenschicht unten.']],
 facts:['Eine kleine Sommerwolke kann mehrere hundert Tonnen Wasser enthalten.','Wolken schweben, weil die Wassertröpfchen so klein sind.','Auch Vögel nutzen Wetter: Zugvögel fliegen mit Rückenwind.','Der höchste Berg der Erde, der Mount Everest, ist 8 849 Meter hoch, also niedriger als ein Flugzeug fliegt.'],
 quiz:[['Wie kalt ist es in Reiseflughöhe etwa?',['+15 Grad','0 Grad','etwa minus 55 Grad'],2,'Mit der Höhe sinkt die Temperatur.'],['Welche Wolke ist die Gewitterwolke?',['Cirrus','Cumulonimbus','Stratus'],1,'Cumulonimbus ist die hohe Türme-Wolke.'],['Wie entsteht ein Kondensstreifen?',['Aus Eiskristallen im kalten Abgas','Aus Rauch','Aus Schnee'],0,'Der feuchte Abgasstrahl gefriert in der Kälte.']]},

{id:'wege',t:'Wege am Himmel',c:'#2779A7',sim:'routes',intro:'Auch am Himmel gibt es Straßen, Schilder und Verkehrsregeln. Sie sind nur unsichtbar. Genau dadurch kommen viele Flugzeuge sicher und pünktlich an.',
 secs:[
 ['Der kürzeste Weg ist gebogen','Die Erde ist rund. Der kürzeste Weg zwischen zwei Orten ist ein Bogen, der „Großkreis“. Auf einer flachen Karte sieht er manchmal gebogen aus, auf dem Globus ist er die gerade Linie.'],
 ['Flugstraßen','Flugzeuge folgen festgelegten Strecken, die aus Punkten mit fünf Buchstaben bestehen. Das ist wie ein Netz aus Autobahnen mit Kreuzungen.'],
 ['Flugsicherung','Lotsen am Boden sprechen mit den Pilotinnen und Piloten. Sie sorgen für ausreichenden Abstand und die richtige Reihenfolge beim Landen. Die Sprache dabei ist Englisch.'],
 ['Jetstream','In großer Höhe weht ein sehr starker Wind von West nach Ost. Flüge nach Osten sind dadurch oft kürzer, Flüge nach Westen etwas länger.'],
 ['Navigation','Heute helfen Satelliten (GPS) und Funkfeuer. Aber auch ein Kompass gehört weiter zur Ausstattung.'],
 ['Hannover → Barcelona','Die Luftlinie von Hannover nach Barcelona beträgt rund 1 370 Kilometer. Die Richtung ist Südwest. Du überfliegst unterwegs Deutschland, einen Zipfel Frankreich und die Pyrenäen, bevor das Mittelmeer auftaucht.']],
 facts:['Die Flugroute wird vor jedem Flug neu berechnet, mit aktuellem Wetter und Wind.','Jeder Flughafen hat einen Dreibuchstaben-Code: HAJ steht für Hannover, BCN für Barcelona.','Flugzeuge fliegen in verschiedenen Höhenstufen, damit sie nicht in dieselbe Richtung auf gleicher Höhe fliegen.','Die Pyrenäen sind ein Gebirge zwischen Frankreich und Spanien.'],
 quiz:[['Wofür steht HAJ?',['Hannover','Hamburg','Hawaii'],0,'HAJ ist der Code des Flughafens Hannover-Langenhagen.'],['Wie heißt der starke Wind in großer Höhe?',['Jetstream','Passat','Föhn'],0,'Der Jetstream weht meist von West nach Ost.'],['In welche Himmelsrichtung fliegen wir von Hannover nach Barcelona?',['Südwest','Nordost','Nordwest'],0,'Barcelona liegt südwestlich von Hannover.']]}
];

/* ---------- Weltrekorde ---------- */
var REKORDE={
 'Höhe':{unit:'m',items:[['Giraffe',5.5,'Das höchste Landtier'],['Torre Glòries (Barcelona)',144.4,'Der Turm sieht aus wie eine Gurke'],['Kölner Dom',157,'Einst das höchste Gebäude der Welt'],['Sagrada Família',172.5,'Höchste Kirche der Welt, 2026 mit dem Turm Jesu'],['Eiffelturm',330,'Mit Antenne'],['Burj Khalifa',828,'Höchstes Gebäude der Welt'],['Zugspitze',2962,'Höchster Berg Deutschlands'],['Mount Everest',8849,'Höchster Berg der Erde'],['Reiseflughöhe',11000,'Etwa 10 bis 12 km']]},
 'Tempo':{unit:'km/h',items:[['Spaziergänger',5,''],['Fahrrad',20,''],['Gepard',110,'Schnellstes Landtier, aber nur kurz'],['ICE',300,'Höchstgeschwindigkeit auf Teilstrecken'],['Wanderfalke im Sturzflug',320,'Schnellster Vogel, über 300 km/h'],['Passagierflugzeug',850,'Reiseflug'],['Schallgeschwindigkeit',1225,'Bei 15 °C in der Luft'],['Raumstation ISS',27600,'Sie umkreist die Erde alle rund 90 Minuten']]},
 'Länge':{unit:'m',items:[['Papierflieger',0.3,''],['Albatros-Spannweite',3.5,'Größte Flügelspannweite lebender Vögel'],['Wright Flyer 1903',12.3,'Das erste Motorflugzeug, Spannweite'],['Blauwal',30,'Größtes Tier der Erde'],['Airbus A320',35.8,'Spannweite'],['Airbus A380',79.8,'Spannweite'],['Fußballfeld',105,'Länge im Stadion'],['Papierflieger-Weltrekord',69.1,'Weitester Flug 2012']]},
 'Gewicht':{unit:'t',items:[['Auto',1.5,''],['Elefant',6,'Afrikanischer Elefantenbulle'],['Flugzeug A320 (max.)',78,'Höchstes Startgewicht'],['Blauwal',150,'Bis zu 150 Tonnen'],['Airbus A380 (max.)',575,'Höchstes Startgewicht']]}
};

/* ---------- Wunderwesen in Barcelona (Orte aus dem Stadtplan) ---------- */
var WESEN=[
 {id:'schild',n:'Die Säulen-Schildkröten',stop:'sagrada',c:'#B1EAC4',txt:'An der Weihnachtsfassade tragen zwei Schildkröten Säulen: eine Land- und eine Meeresschildkröte. Findest du beide?',tip:'Stell dich genau gegenüber und schau nach oben.'},
 {id:'drache',n:'Der Dach-Drache',stop:'batllo',c:'#FF6A52',txt:'Das Dach von Casa Batlló sieht aus wie der Rücken eines Drachen. Das Kreuz ist die Lanze des Ritters.',tip:'Suche die Schuppen aus Keramikfliesen.'},
 {id:'ritter',n:'Die Helm-Ritter',stop:'milla',c:'#ECD06F',txt:'Auf dem Dach der Casa Milà stehen Schornsteine, die wie Ritter mit Helm aussehen.',tip:'Von der Straßenecke aus kannst du sie zählen.'},
 {id:'pfef',n:'Das Lebkuchenhaus',stop:'amatller',c:'#FFB288',txt:'Der gestufte Giebel von Casa Amatller sieht aus wie ein Lebkuchenhaus. Unten gibt es sogar Schokolade.',tip:'Stufen zählen!'},
 {id:'gaense',n:'Die 13 Gänse',stop:'cath',c:'#B5D5FF',txt:'Im Kreuzgang der Kathedrale leben 13 weiße Gänse, eine für jedes Lebensjahr der jungen Heiligen Eulàlia.',tip:'Gänse sind laut. Zuhören hilft.'},
 {id:'skull',n:'Der Brücken-Wächter',stop:'bisbe',c:'#ECD06F',txt:'Unter der Brücke Pont del Bisbe soll ein Totenkopf mit Dolch versteckt sein. Eine Legende.',tip:'Schau nach oben zur Brücke und suche das Zeichen.'},
 {id:'traeger',n:'Die Stein-Träger',stop:'smm',c:'#49C5B6',txt:'An den Türen von Santa Maria del Mar sind Hafenarbeiter in Stein gehauen, die die Steine für die Kirche trugen.',tip:'Schau auf Augenhöhe an die Türen.'},
 {id:'barcino',n:'Die Römer-Säulen',stop:'august',c:'#FFB288',txt:'Vier Säulen sind rund 2 000 Jahre alt. Damals hieß Barcelona noch Barcino.',tip:'Sie stehen versteckt in einem Innenhof.'},
 {id:'salam',n:'Der bunte Drache El Drac',stop:'guell',c:'#49C5B6',txt:'Im Park Güell begrüßt dich ein farbiges Tier aus Scherbenmosaik am Eingangstreppchen.',tip:'Bunte Fliesenstücke, wohin du schaust!'},
 {id:'mammut',n:'Das Mammut',stop:'mammoth',c:'#B1EAC4',txt:'Im Ciutadella-Park steht ein großes Mammut aus Stein. Es erinnert an Tiere der Eiszeit.',tip:'Kannst du seine Stoßzähne zählen?'},
 {id:'fisch',n:'Der goldene Fisch',stop:'peix',c:'#ECD06F',txt:'Am Strand schimmert ein riesiger goldener Fisch aus Metall in der Sonne.',tip:'Er glitzert bei Sonne am besten.'},
 {id:'brunnen',n:'Die tanzenden Wasser',stop:'fountain',c:'#2779A7',txt:'Beim Zauberbrunnen tanzen Wasser, Licht und Musik gemeinsam. Gebaut 1929 für eine Weltausstellung.',tip:'Abends wird es am schönsten.'},
 {id:'cube',n:'Die gestapelten Würfel',stop:'estel',c:'#B5D5FF',txt:'Am Hafen steht eine Skulptur aus aufeinandergestapelten Würfeln.',tip:'Sie sieht je nach Winkel anders aus.'}
];

/* ---------- Vor dem Abflug: Briefing ---------- */
var BRIEFING=[
 ['Zu Hause · Abfahrt','Überprüfe die „Wohnung verlassen“-Liste in der Packliste. Fotografiere die Bordkarten, falls du sie verlierst.',['Reisepässe und Bordkarten griffbereit','Wasserflasche leer mitnehmen und später füllen','Kopfhörer und Kuscheltier in den Handgepäck-Rucksack']],
 ['Am Flughafen · Check-in','Am Schalter oder am Automaten geben Erwachsene Gepäck auf. Die Koffer werden gewogen und bekommen einen Aufkleber mit dem Code BCN. Danach rollt das Gepäck auf einem Band in den Keller des Flughafens.',['Gepäckband: Wohin geht der Koffer?','Bordkarte zeigen','Handgepäck bleibt bei dir']],
 ['Sicherheitskontrolle','Du legst deinen Rucksack in eine Wanne und gehst durch einen Scanner. Flüssigkeiten sollten in kleinen Behältern und im durchsichtigen Beutel sein. Das ist für alle gleich und dauert nur kurz.',['Gürtel, Jacke, Metall in die Wanne','Flüssigkeiten griffbereit (Zip-Beutel)','Leere Trinkflasche darf mit']],
 ['Gate und Warten','Auf der Anzeigetafel steht das Gate (zum Beispiel „B12“) und die Boarding-Zeit. Wenn du magst, beobachte die Flugzeuge: Welche Tür wird geöffnet? Wer lädt Koffer ein?',['Gate-Nummer merken','Toilette vor dem Boarding','Flugzeug-Registrierung am Rumpf lesen']],
 ['Boarding','Du zeigst deine Bordkarte und gehst durch die Röhre zum Flugzeug. Am Eingang begrüßt dich die Crew. Dein Sitzplatz steht auf der Bordkarte.',['Sitzreihe und Buchstabe finden','Handgepäck über dem Sitz oder darunter','Anschnallen, sobald du sitzt']],
 ['Start','Das Licht wird gedimmt, die Triebwerke werden lauter, und du spürst die Beschleunigung. Kaugummi, Schlucken oder Gähnen helfen den Ohren.',['Tablett hochklappen','Fensterblende offen lassen','Beschleunigung spüren']],
 ['Im Flug','Etwa 2 bis 2,5 Stunden dauert der Flug Hannover → Barcelona. Du kannst lesen, spielen, malen oder aus dem Fenster schauen. Wenn die Anschnallzeichen aus sind, darfst du kurz aufstehen.',['Wolken zählen','Wie schnell fliegen wir? (siehe „Wie fliegt das?“)','Pyrenäen suchen']],
 ['Landung und Ankunft','Beim Sinkflug knackt es wieder in den Ohren. Nach dem Aufsetzen rollt das Flugzeug zum Gate. Dann holst du dein Gepäck vom Band. Willkommen in Barcelona!',['Koffer am Band erkennen (Band-Nummer)','Offline-Karte öffnen (Stadtplan)','Metro-Ticket kaufen']]
];
var VORHER=['Wie hoch fliegen wir? (Schätze in Kilometern)','Wie lange dauert der Flug?','Wie viele Tunnel / Berge siehst du von oben?','Welche Farbe hat das Meer bei Barcelona?','Was wird das Erste sein, das du in Barcelona isst?'];

/* ---------- Stadtplan Tipps (aus dem Familien-Stadtplan) ---------- */
var STADT_TIPS=[
 ['Jetzt buchen','<ul><li><b>Sagrada Família</b>, früh buchen (9:00 oder 10:00). sagradafamilia.org. Kind unter 11 frei, braucht aber ein Ticket.</li><li><b>Park Güell</b>, Slot ca. 10:30: parkguell.barcelona.</li><li><b>Picasso-Museum</b>, kostenloser Slot donnerstags 16:00–19:00: museupicassobcn.cat.</li><li><b>CosmoCaixa</b> (optional, mit Planetarium): cosmocaixa.org.</li></ul>',true],
 ['Unterwegs','<ul><li><b>T-casual</b>: €13 für 10 Fahrten (Zone 1), je bis 75 Min. inklusive Umsteigen. Gilt in Metro, Bus, Tram, FGC und Nahverkehrszügen. Pro Person eine Karte am Metro-Automaten.</li><li>Dein Kind (9–12) zahlt wie Erwachsene. Nur unter 4 fahren frei.</li><li><b>Flughafen:</b> Zug R2 Nord ab Terminal 2 nach Sants / Passeig de Gràcia gilt mit T-casual. Die Flughafen-Metro L9 nicht (€5,90). Bei Ankunft an T1: kostenloser grüner Shuttle zu T2.</li><li>Die Hola-Barcelona-Karte lohnt sich nur bei viel Fahrten.</li><li>Die Standseilbahn Montjuïc ist im Metrotarif enthalten, die Seilbahnen nicht.</li></ul>'],
 ['Geld sparen','<ul><li>Mittags warm essen: <b>menú del día</b> ca. €13–18 mit drei Gängen.</li><li>Kostenlose Aussichtspunkte: Tres Creus, Bunkers del Carmel, Turó del Putxet, Montjuïc-Gärten, MNAC-Treppen.</li><li>Gratis-Zeiten: Picasso donnerstags 16–19 Uhr, MNAC samstags ab 15 Uhr. CosmoCaixa ist unter 16 frei.</li><li>Picknick aus dem Supermarkt (Mercadona, Bonpreu, Condis).</li><li>Nicht an der Rambla oder Strandpromenade essen. Eine Straße weiter ist besser.</li><li>Kartenzahlung immer in <b>EUR</b>.</li><li>Die Touristensteuer wird meist im Hotel pro Person und Nacht gezahlt.</li></ul>'],
 ['Sicherheit','<ul><li><b>Taschendiebe</b> sind das größte Risiko: Rambla, Metro L1/L3, Sagrada Família, Strände, Brunnen-Menge. Taschen zu und vorne tragen. Kein Handy auf dem Tisch.</li><li><b>Strand:</b> ab Oktober keine Rettungsschwimmer. Nur bis zum Stehen ins Wasser und nie allein.</li><li><b>Notruf 112</b> (jedes Handy).</li><li>Jeden Tag einen Treffpunkt ausmachen. Kärtchen mit Telefonnummer in die Tasche des Kindes.</li><li>Achtung Radwege auf Gehwegen, besonders Passeig de Sant Joan und an der Küste.</li><li>Hut, Sonnencreme und Trinkflasche. Öffentliche Brunnen haben Trinkwasser.</li></ul>']
];
var KIND={see:'Sehen',eat:'Essen',play:'Spielen',view:'Aussicht'};
var TRANSIT={'d4:arc':'FGC + Metro L1 bis Arc de Triomf, ca. 30 Min.','d6:castle':'Bus 150 hinauf zur Burg (oder Seilbahn)'};
