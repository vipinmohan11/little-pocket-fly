/* ===== Muya-Freunde: Materialien sammeln, Eier basteln, Freunde entwickeln, Tagesaufträge ===== */
var MATS=['papier','wolken','kompass','mosaik','sterne'];
var MAT={papier:{n:'Papier',c:'#E9E1CC',h:'Tüftel-Hangar: werfen und falten'},wolken:{n:'Wolken',c:'#B5D5FF',h:'Wie fliegt das?: Aufgaben lösen'},kompass:{n:'Kompass',c:'#FF9E8C',h:'Kapitän-Missionen: Runden, Bordkarten, Bingo'},mosaik:{n:'Mosaik',c:'#49C5B6',h:'Schatzsuche und Stadtplan'},sterne:{n:'Sterne',c:'#ECD06F',h:'Tagebuch, Packliste, Rekord-Labor'}};
function matIcon(m,sz){sz=sz||22;var i={
 papier:'<path d="M5 3h10l4 4v14H5z" fill="#FFFDF8" stroke="#13324A" stroke-width="1.8" stroke-linejoin="round"/><path d="M15 3v4h4" fill="#E9E1CC" stroke="#13324A" stroke-width="1.6" stroke-linejoin="round"/>',
 wolken:'<path d="M7 18a4 4 0 010-8 5 5 0 019.4-1A4.5 4.5 0 0117 18z" fill="#DCEEFF" stroke="#13324A" stroke-width="1.8" stroke-linejoin="round"/>',
 kompass:'<circle cx="12" cy="12" r="9" fill="#FFE6DF" stroke="#13324A" stroke-width="1.8"/><path d="M12 5l2.5 7-2.5 7-2.5-7z" fill="#FF6A52" stroke="#13324A" stroke-width="1.4" stroke-linejoin="round"/>',
 mosaik:'<rect x="3" y="3" width="8" height="8" fill="#49C5B6" stroke="#13324A" stroke-width="1.6"/><rect x="13" y="3" width="8" height="8" fill="#ECD06F" stroke="#13324A" stroke-width="1.6"/><rect x="3" y="13" width="8" height="8" fill="#FFB288" stroke="#13324A" stroke-width="1.6"/><rect x="13" y="13" width="8" height="8" fill="#B5D5FF" stroke="#13324A" stroke-width="1.6"/>',
 sterne:'<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5 6.7 19.4l1.2-6L3.4 9.3l6-.7z" fill="#ECD06F" stroke="#13324A" stroke-width="1.7" stroke-linejoin="round"/>'};
 return '<svg viewBox="0 0 24 24" width="'+sz+'" height="'+sz+'" style="flex:none">'+i[m]+'</svg>'}

/* 12 eigene Freunde, je 3 Entwicklungsstufen */
var SPEC=[
 {id:'knick',m:'papier',n:['Knick','Knicker','Knickaro'],c:'#FFB288',c2:'#FFE2CF',sh:'round',ears:'tri',tail:'fox',mark:'fold',story:'Knick wohnt in einer Schublade voller Papier. Wenn es aufgeregt ist, faltet sich sein Schwanz von allein zu einem Fächer.'},
 {id:'gleit',m:'papier',n:['Gleitchen','Gleiter','Gleitaro'],c:'#B5D5FF',c2:'#E4F0FF',sh:'wide',ears:'fin',tail:'star',mark:'fold',story:'Gleitchen liebt Aufwind. Es breitet die Flügel aus und segelt, bis ihm die Puste ausgeht, und dann noch ein Stück weiter.'},
 {id:'woelk',m:'wolken',n:['Wölkli','Wolkino','Wolkano'],c:'#DCEEFF',c2:'#FFFFFF',sh:'round',ears:'round',tail:'puff',mark:'cloud',story:'Wölkli ist ganz weich und sieht aus wie ein Mini-Wölkchen. Bei Sonnenschein wird es ein bisschen rosa.'},
 {id:'nebbi',m:'wolken',n:['Nebbi','Nebulo','Nebelor'],c:'#C9C7E8',c2:'#EEEDFA',sh:'tall',ears:'ant',tail:'puff',mark:'cloud',story:'Nebbi kennt jeden Morgennebel persönlich. Es hüllt sich ein, wenn es schüchtern ist, und taucht dann wieder auf.'},
 {id:'kompi',m:'kompass',n:['Kompi','Kompaso','Kompanus'],c:'#FF9E8C',c2:'#FFE1DA',sh:'round',ears:'ant',tail:'star',mark:'rose',story:'Kompi findet immer Norden. Nur bei Eiscreme dreht sich seine Nase im Kreis.'},
 {id:'nordi',m:'kompass',n:['Nordi','Nordling','Nordikus'],c:'#8BC7D9',c2:'#DDF1F7',sh:'tall',ears:'tri',tail:'fox',mark:'rose',story:'Nordi hat ein feines Gespür für Richtungen. Es zeigt mit dem Ohr dorthin, wo das nächste Abenteuer wartet.'},
 {id:'mosi',m:'mosaik',n:['Mosi','Mosaiko','Mosaikus'],c:'#49C5B6',c2:'#CDF1EC',sh:'round',ears:'round',tail:'fox',mark:'tile',story:'Mosi ist aus bunten Scherben gemacht und glitzert in der Sonne. Es sammelt Farben wie andere Muscheln.'},
 {id:'scherb',m:'mosaik',n:['Scherbi','Scherbino','Scherbaro'],c:'#ECD06F',c2:'#FBF0C4',sh:'wide',ears:'tri',tail:'puff',mark:'tile',story:'Scherbi liegt gern in warmen Mosaikbänken und sonnt sich. Jeder Fleck auf seinem Fell ist eine kleine Geschichte.'},
 {id:'funki',m:'sterne',n:['Funki','Funkelo','Funkelion'],c:'#ECD06F',c2:'#FFF5CC',sh:'round',ears:'ant',tail:'star',mark:'star',story:'Funki funkelt, wenn jemand etwas Schönes erlebt. Je mehr Erinnerungen, desto heller wird es.'},
 {id:'mondi',m:'sterne',n:['Mondi','Mondo','Mondaro'],c:'#9AA9E8',c2:'#DDE3FA',sh:'tall',ears:'round',tail:'star',mark:'moon',story:'Mondi ist ein Nachtmensch. Es erzählt dir beim Einschlafen, was am Tag alles passiert ist.'},
 {id:'bunt',m:'sterne',n:['Bunti','Buntino','Buntaro'],c:'#FFB6C8',c2:'#FFE4EB',sh:'wide',ears:'round',tail:'puff',mark:'star',story:'Bunti steckt voller Farben. Packt man den Koffer ordentlich, wird es ganz hell vor Freude.'},
 {id:'rakki',m:'kompass',n:['Rakki','Rakko','Rakkator'],c:'#FF6A52',c2:'#FFD2C9',sh:'tall',ears:'fin',tail:'fox',mark:'rose',story:'Rakki ist ein kleiner Abenteurer mit großem Mut. Es will bei jedem Start ganz vorne mit dabei sein.'}];
var SPEC_BY={};SPEC.forEach(function(s){SPEC_BY[s.id]=s});

/* ---- 20 weitere Freunde: wilde Freunde (Orte in Barcelona) und Himmels-Freunde (Hangar & Cockpit) ---- */
var WILD=[
 {id:'flamm',src:'wild',rar:1,m:'sterne',n:['Flämmi','Flammero','Flammador'],c:'#FF8A4C',c2:'#FFE0B8',sh:'round',ears:'horn',tail:'flame',mark:'flame',story:'Flämmi wärmt kalte Hände. Wenn es lacht, sprühen kleine Funken, aber nie heiß genug zum Verbrennen.'},
 {id:'blatti',src:'wild',rar:1,m:'mosaik',n:['Blättli','Blattino','Blattaro'],c:'#7CCB6B',c2:'#D9F3C9',sh:'round',ears:'leaf',tail:'leaf',mark:'leaf',story:'Blättli duftet nach Wiese. Es mag Parks am liebsten und schläft gern im Schatten großer Bäume.'},
 {id:'plansch',src:'wild',rar:1,m:'wolken',n:['Planschi','Planscho','Planschor'],c:'#5BB6E8',c2:'#D2EEFC',sh:'wide',ears:'fin',tail:'fin',mark:'drop',story:'Planschi liebt Pfützen, Brunnen und das Meer. Es spritzt gern, aber immer nur ein kleines bisschen.'},
 {id:'felsi',src:'wild',rar:1,m:'mosaik',n:['Felsi','Felsling','Felsikus'],c:'#B49B84',c2:'#E8DDD0',sh:'wide',ears:'round',tail:'puff',mark:'gem',story:'Felsi ist robust und gemütlich. Es sammelt glitzernde Steine und zeigt sie jedem, der fragt.'},
 {id:'pilzi',src:'wild',rar:1,m:'papier',n:['Pilzi','Pilzo','Pilzario'],c:'#E86A5A',c2:'#FFE6DC',sh:'round',ears:'round',tail:'none',mark:'dots',story:'Pilzi trägt einen Hut mit weißen Punkten. Bei Regen stellt es sich unter sich selbst unter.'},
 {id:'schlumm',src:'wild',rar:1,m:'sterne',n:['Schlummi','Schlummo','Schlummeron'],c:'#C7A6E8',c2:'#F0E4FA',sh:'wide',ears:'round',tail:'puff',mark:'moon',story:'Schlummi ist fast immer müde und träumt von Wolkenkissen. Wenn es gähnt, gähnen alle mit.'},
 {id:'blitzi',src:'wild',rar:2,m:'sterne',n:['Blitzli','Blitzo','Blitzaro'],c:'#FFD84D',c2:'#FFF4B8',sh:'tall',ears:'tri',tail:'bolt',mark:'bolt',story:'Blitzli ist flink wie der Wind. Seine Schwanzspitze knistert, wenn es sich freut.'},
 {id:'drachi',src:'wild',rar:2,m:'kompass',n:['Drachi','Drachino','Drachomir'],c:'#4FC1A6',c2:'#C9F0E4',sh:'tall',ears:'horn',tail:'fox',mark:'scale',story:'Drachi ist ein kleiner Mutmacher. Es pustet nur Seifenblasen, aber die sind riesig.'},
 {id:'muschi',src:'wild',rar:2,m:'wolken',n:['Muschli','Muscheli','Muschelia'],c:'#FFB6C8',c2:'#FFE8EE',sh:'wide',ears:'fin',tail:'fin',mark:'shell',story:'Muschli hört das Meer rauschen, auch wenn es weit weg ist. Es verrät dir, wo die schönsten Strände sind.'},
 {id:'eisi',src:'wild',rar:2,m:'wolken',n:['Eisli','Eiskristo','Eiskaiser'],c:'#A9E4F2',c2:'#F0FBFF',sh:'round',ears:'tri',tail:'puff',mark:'snow',story:'Eisli glitzert wie frischer Schnee. Es kühlt dir an heißen Tagen die Nase.'},
 {id:'goldi',src:'wild',rar:3,m:'sterne',n:['Goldi','Goldino','Goldrache'],c:'#F6C945',c2:'#FFF1B8',sh:'tall',ears:'horn',tail:'flame',mark:'gem',story:'Goldi ist ein seltener Glücksbringer. Man trifft es nur, wenn man es gar nicht erwartet.'},
 {id:'kristo',src:'wild',rar:3,m:'mosaik',n:['Kristo','Kristallo','Kristallion'],c:'#9AE6F0',c2:'#EAFBFF',sh:'round',ears:'tri',tail:'star',mark:'gem',story:'Kristo besteht aus funkelndem Kristall. Wenn die Sonne darauf fällt, malt es kleine Regenbögen an die Wand.'},
 {id:'regenb',src:'wild',rar:3,m:'wolken',n:['Regenbo','Regenbogo','Regenbogus'],c:'#FFB6E0',c2:'#FFF0FA',sh:'wide',ears:'fin',tail:'star',mark:'rainbow',story:'Regenbo taucht nach dem Regen auf. Wer es findet, hat bestimmt einen besonders guten Tag.'},
 {id:'schatti',src:'wild',rar:3,m:'kompass',n:['Schatti','Schattino','Schattenfürst'],c:'#6B5B95',c2:'#C9BFE8',sh:'tall',ears:'tri',tail:'fox',mark:'moon',story:'Schatti wirkt geheimnisvoll, ist aber ganz lieb. Es versteckt sich gern und freut sich, wenn man es findet.'}];
var SKY=[
 {id:'fluegi',src:'sky',rar:1,wing:1,m:'papier',n:['Flügli','Flügelo','Flügelion'],c:'#B5D5FF',c2:'#F0F7FF',sh:'round',ears:'fin',tail:'puff',mark:'wing',hint:'Wirf deinen ersten Papierflieger im Tüftel-Hangar.',story:'Flügli ist beim ersten Wurf aus dem Papier geschlüpft. Es kann kaum erwarten, wieder zu fliegen.'},
 {id:'jetti',src:'sky',rar:2,wing:1,m:'papier',n:['Jetti','Jetto','Jettator'],c:'#E4E8EC',c2:'#FFFFFF',sh:'tall',ears:'fin',tail:'bolt',mark:'plane',hint:'Wirf 10 Papierflieger im Tüftel-Hangar.',story:'Jetti liebt Tempo. Es kennt jeden Trick, wie ein Flieger schnell und weit gleitet.'},
 {id:'ballo',src:'sky',rar:1,wing:1,m:'wolken',n:['Ballo','Ballino','Ballonius'],c:'#FF8E7A',c2:'#FFE0D8',sh:'round',ears:'ant',tail:'puff',mark:'balloon',hint:'Löse 5 Aufgaben in „Wie fliegt das?“.',story:'Ballo schwebt ganz ruhig und sieht die Welt von oben. Warme Luft macht es besonders leicht.'},
 {id:'segel',src:'sky',rar:2,wing:1,m:'wolken',n:['Segli','Segelo','Segelion'],c:'#FFE08A',c2:'#FFF7D6',sh:'wide',ears:'fin',tail:'fin',mark:'wing',hint:'Löse 20 Aufgaben in „Wie fliegt das?“.',story:'Segli segelt stundenlang im Aufwind, ganz ohne Anstrengung. Es ist ein echter Gleit-Profi.'},
 {id:'kapi',src:'sky',rar:2,wing:1,m:'kompass',n:['Käppi','Kapitano','Kapitänchen'],c:'#3E7CB1',c2:'#BFD9F0',sh:'round',ears:'tri',tail:'star',mark:'cap',hint:'Spiele eine Runde in der Missions-Zentrale.',story:'Käppi trägt eine Kapitänsmütze und sagt immer „Alles klar zum Start!“.'},
 {id:'sternli',src:'sky',rar:3,wing:1,m:'sterne',n:['Sternli','Sternino','Sternenpilot'],c:'#FFD36B',c2:'#FFF1C4',sh:'round',ears:'ant',tail:'star',mark:'star',hint:'Vergleiche 10 Rekorde im Rekord-Labor.',story:'Sternli fliegt nachts zwischen den Sternen und kennt jeden Rekord im Himmel.'}];
WILD.concat(SKY).forEach(function(x){SPEC.push(x)});
SPEC.forEach(function(x){if(!x.src)x.src='egg';if(!x.rar)x.rar=1});
var SPEC_BY={};SPEC.forEach(function(s){SPEC_BY[s.id]=s});
var RARN=['','Gewöhnlich','Selten','Sehr selten'];
function eggSpecs(){return SPEC.filter(function(s){return s.src==='egg'})}
function mStar(x,y,r,f,s){var p='',i;for(i=0;i<10;i++){var a=-Math.PI/2+i*Math.PI/5,q=i%2?r*.45:r;p+=(i?'L':'M')+(x+q*Math.cos(a)).toFixed(1)+','+(y+q*Math.sin(a)).toFixed(1)}return '<path d="'+p+'Z" fill="'+f+'" stroke="'+(s||'#13324A')+'" stroke-width="1.3" stroke-linejoin="round"/>'}
function cre(sp,st,sil,shiny){var I='#13324A',sc=[.84,.97,1.1][st-1],cx=50,cy=60,c=sp.c,c2=sp.c2,
 rx=24*sc*(sp.sh==='wide'?1.14:sp.sh==='tall'?.9:1),ry=22*sc*(sp.sh==='tall'?1.18:sp.sh==='wide'?.92:1),top=cy-ry,o='';
 var ln='stroke="'+I+'" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"';
 if(sp.rar===3&&st<3)o+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(rx+11)+'" fill="'+c+'" opacity=".18"/>';
 if(st===3)o+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(rx+13)+'" fill="'+c+'" opacity=".2"/><circle cx="'+cx+'" cy="'+cy+'" r="'+(rx+9)+'" fill="none" stroke="'+c+'" stroke-width="1.6" stroke-dasharray="3 5" opacity=".7"/>';
 /* Schwanz */
 if(sp.tail==='fox')o+='<g transform="rotate(-32 '+(cx+rx)+' '+(cy+ry*.3)+')"><ellipse cx="'+(cx+rx+7)+'" cy="'+(cy+ry*.3)+'" rx="'+(13*sc)+'" ry="'+(7*sc)+'" fill="'+c+'" '+ln+'/><circle cx="'+(cx+rx+7+11*sc)+'" cy="'+(cy+ry*.3)+'" r="'+(4.5*sc)+'" fill="#FFFDF8" stroke="'+I+'" stroke-width="1.4"/></g>';
 else if(sp.tail==='puff')o+=[[0,0,6],[7,-5,5],[7,6,5]].map(function(q){return '<circle cx="'+(cx+rx+q[0]*sc+2)+'" cy="'+(cy+ry*.35+q[1]*sc)+'" r="'+(q[2]*sc)+'" fill="'+c2+'" '+ln+'/>'}).join('');
 else if(sp.tail==='star')o+='<path d="M'+(cx+rx-2)+','+(cy+ry*.5)+' Q'+(cx+rx+10)+','+(cy+ry*.5)+' '+(cx+rx+12)+','+(cy+ry*.1)+'" fill="none" '+ln+'/>'+mStar(cx+rx+13,cy+ry*.05,6*sc,'#ECD06F');
 else if(sp.tail==='flame'){var fx=cx+rx-1,fy2=cy+ry*.45;o+='<path d="M'+fx+','+fy2+' C'+(fx+5*sc)+','+(fy2-5*sc)+' '+(fx+13*sc)+','+(fy2-8*sc)+' '+(fx+11*sc)+','+(fy2-21*sc)+' C'+(fx+23*sc)+','+(fy2-13*sc)+' '+(fx+23*sc)+','+(fy2+3*sc)+' '+(fx+9*sc)+','+(fy2+4*sc)+'Z" fill="#FF8A4C" '+ln+'/><path d="M'+(fx+6*sc)+','+(fy2+1)+' C'+(fx+8*sc)+','+(fy2-4*sc)+' '+(fx+13*sc)+','+(fy2-5*sc)+' '+(fx+14*sc)+','+(fy2-10*sc)+' C'+(fx+19*sc)+','+(fy2-4*sc)+' '+(fx+17*sc)+','+(fy2+1)+' '+(fx+10*sc)+','+(fy2+2)+'Z" fill="#FFD84D"/>'}
 else if(sp.tail==='bolt'){var bx=cx+rx-2,by=cy+ry*.3;o+='<path d="M'+bx+','+by+' L'+(bx+9*sc)+','+(by-5*sc)+' L'+(bx+6*sc)+','+(by+1*sc)+' L'+(bx+16*sc)+','+(by-8*sc)+' L'+(bx+8*sc)+','+(by+9*sc)+' L'+(bx+10*sc)+','+(by+3*sc)+'Z" fill="#FFD84D" '+ln+'/>'}
 else if(sp.tail==='fin'){o+='<g transform="rotate(-20 '+(cx+rx)+' '+(cy+ry*.4)+')"><path d="M'+(cx+rx-2)+','+(cy+ry*.4)+' Q'+(cx+rx+12*sc)+','+(cy+ry*.4-12*sc)+' '+(cx+rx+20*sc)+','+(cy+ry*.4-4*sc)+' Q'+(cx+rx+14*sc)+','+(cy+ry*.4+2)+' '+(cx+rx+20*sc)+','+(cy+ry*.4+10*sc)+' Q'+(cx+rx+8*sc)+','+(cy+ry*.4+8*sc)+' '+(cx+rx-2)+','+(cy+ry*.4+3)+'Z" fill="'+c2+'" '+ln+'/></g>'}
 else if(sp.tail==='leaf'){o+='<g transform="rotate(-35 '+(cx+rx)+' '+(cy+ry*.4)+')"><path d="M'+(cx+rx-2)+','+(cy+ry*.4)+' Q'+(cx+rx+10*sc)+','+(cy+ry*.4-12*sc)+' '+(cx+rx+22*sc)+','+(cy+ry*.4)+' Q'+(cx+rx+10*sc)+','+(cy+ry*.4+10*sc)+' '+(cx+rx-2)+','+(cy+ry*.4)+'Z" fill="#7CCB6B" '+ln+'/><path d="M'+(cx+rx+2)+','+(cy+ry*.4)+' H'+(cx+rx+18*sc)+'" stroke="'+I+'" stroke-width="1.2"/></g>'}
 /* Flügel ab Stufe 2 */
 if(st>=2||sp.wing){var wl=(st===3?22:st===2?15:11)*sc;o+='<path d="M'+(cx-rx+3)+','+(cy-2)+' L'+(cx-rx-wl)+','+(cy-ry*.55)+' L'+(cx-rx+2)+','+(cy+9)+'Z" fill="#FFFDF8" '+ln+'/><path d="M'+(cx+rx-3)+','+(cy-2)+' L'+(cx+rx+wl)+','+(cy-ry*.55)+' L'+(cx+rx-2)+','+(cy+9)+'Z" fill="#FFFDF8" '+ln+'/>'}
 /* Füße */
 o+='<ellipse cx="'+(cx-rx*.5)+'" cy="'+(cy+ry-1)+'" rx="'+(7*sc)+'" ry="'+(4*sc)+'" fill="'+c2+'" '+ln+'/><ellipse cx="'+(cx+rx*.5)+'" cy="'+(cy+ry-1)+'" rx="'+(7*sc)+'" ry="'+(4*sc)+'" fill="'+c2+'" '+ln+'/>';
 /* Ohren / Fühler */
 if(sp.ears==='tri')[-1,1].forEach(function(d){o+='<path d="M'+(cx+d*rx*.78)+','+(cy-ry*.5)+' L'+(cx+d*rx*.5)+','+(top-13*sc)+' L'+(cx+d*rx*.08)+','+(cy-ry*.92)+'Z" fill="'+c+'" '+ln+'/><path d="M'+(cx+d*rx*.55)+','+(top-3*sc)+' L'+(cx+d*rx*.5)+','+(top-8*sc)+' L'+(cx+d*rx*.35)+','+(top-1)+'Z" fill="'+c2+'"/>'});
 else if(sp.ears==='round')[-1,1].forEach(function(d){o+='<circle cx="'+(cx+d*rx*.62)+'" cy="'+(top+2)+'" r="'+(8*sc)+'" fill="'+c+'" '+ln+'/><circle cx="'+(cx+d*rx*.62)+'" cy="'+(top+3)+'" r="'+(4*sc)+'" fill="'+c2+'"/>'});
 else if(sp.ears==='ant')[-1,1].forEach(function(d){o+='<path d="M'+(cx+d*rx*.3)+','+(top+2)+' Q'+(cx+d*rx*.5)+','+(top-8*sc)+' '+(cx+d*rx*.7)+','+(top-13*sc)+'" fill="none" '+ln+'/><circle cx="'+(cx+d*rx*.7)+'" cy="'+(top-14*sc)+'" r="'+(3.6*sc)+'" fill="#ECD06F" stroke="'+I+'" stroke-width="1.5"/>'});
 else if(sp.ears==='fin')[-1,1].forEach(function(d){o+='<ellipse cx="'+(cx+d*rx*.72)+'" cy="'+(top+4)+'" rx="'+(5*sc)+'" ry="'+(11*sc)+'" transform="rotate('+(d*28)+' '+(cx+d*rx*.72)+' '+(top+4)+')" fill="'+c2+'" '+ln+'/>'});
 else if(sp.ears==='horn')[-1,1].forEach(function(d){o+='<path d="M'+(cx+d*rx*.62)+','+(top+6)+' L'+(cx+d*rx*.72)+','+(top-12*sc)+' L'+(cx+d*rx*.22)+','+(top+1)+'Z" fill="#FFF1CC" '+ln+'/>'});
 else if(sp.ears==='leaf')[-1,1].forEach(function(d){o+='<path d="M'+(cx+d*rx*.35)+','+(top+3)+' Q'+(cx+d*rx*.55)+','+(top-14*sc)+' '+(cx+d*rx*.85)+','+(top-10*sc)+' Q'+(cx+d*rx*.85)+','+(top+4)+' '+(cx+d*rx*.35)+','+(top+3)+'Z" fill="#7CCB6B" '+ln+'/>'});
 /* Körper */
 o+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="'+ry+'" fill="'+c+'" '+ln+'/><ellipse cx="'+cx+'" cy="'+(cy+ry*.36)+'" rx="'+(rx*.62)+'" ry="'+(ry*.5)+'" fill="'+c2+'" opacity=".75"/>';
 /* Merkmal */
 var fy=cy-ry*.58;
 if(sp.mark==='fold')o+='<path d="M'+(cx-6)+','+(fy+2)+' L'+(cx+6)+','+(fy+2)+' L'+cx+','+(fy-8)+'Z" fill="#FFFDF8" stroke="'+I+'" stroke-width="1.4" stroke-linejoin="round"/><path d="M'+cx+','+(fy-8)+' L'+cx+','+(fy+2)+'" stroke="'+I+'" stroke-width="1" opacity=".5"/>';
 else if(sp.mark==='cloud')o+=[[-7,1,5.5],[0,-3,6.5],[7,1,5.5]].map(function(q){return '<circle cx="'+(cx+q[0])+'" cy="'+(top+q[1]+1)+'" r="'+q[2]+'" fill="#FFFFFF" '+ln.replace('stroke-width="2"','stroke-width="1.5"')+'/>'}).join('');
 else if(sp.mark==='rose')o+=mStar(cx,fy-1,7*sc,'#FF6A52');
 else if(sp.mark==='tile')o+=[[-9,0,'#FF6A52'],[-1,2,'#ECD06F'],[7,-1,'#13324A']].map(function(q,k){return '<rect x="'+(cx+q[0]+(k?2:0))+'" y="'+(cy+ry*.3+q[1])+'" width="6.5" height="6.5" fill="'+q[2]+'" stroke="'+I+'" stroke-width="1.2" transform="rotate('+(k*14-8)+' '+(cx+q[0]+3)+' '+(cy+ry*.3+q[1]+3)+')"/>'}).join('');
 else if(sp.mark==='star')o+=mStar(cx,fy-1,6.5*sc,'#ECD06F');
 else if(sp.mark==='moon')o+='<path d="M'+(cx+4)+','+(fy-7)+' A7 7 0 1 0 '+(cx+4)+','+(fy+7)+' A5.5 5.5 0 1 1 '+(cx+4)+','+(fy-7)+'Z" fill="#FFF5CC" stroke="'+I+'" stroke-width="1.3" stroke-linejoin="round"/>';
 else if(sp.mark==='flame')o+='<path d="M'+cx+','+(fy+3)+' C'+(cx-6)+','+(fy-1)+' '+(cx-3)+','+(fy-5)+' '+cx+','+(fy-10)+' C'+(cx+3)+','+(fy-5)+' '+(cx+6)+','+(fy-1)+' '+cx+','+(fy+3)+'Z" fill="#FF8A4C" stroke="'+I+'" stroke-width="1.3" stroke-linejoin="round"/>';
 else if(sp.mark==='drop')o+='<path d="M'+cx+','+(fy-9)+' C'+(cx+7)+','+(fy-1)+' '+(cx+6)+','+(fy+5)+' '+cx+','+(fy+5)+' C'+(cx-6)+','+(fy+5)+' '+(cx-7)+','+(fy-1)+' '+cx+','+(fy-9)+'Z" fill="#DFF3FF" stroke="'+I+'" stroke-width="1.3"/>';
 else if(sp.mark==='bolt')o+='<path d="M'+(cx+2)+','+(fy-10)+' L'+(cx-5)+','+(fy+1)+' L'+(cx-1)+','+(fy+1)+' L'+(cx-3)+','+(fy+9)+' L'+(cx+5)+','+(fy-2)+' L'+(cx+1)+','+(fy-2)+'Z" fill="#FFF4B8" stroke="'+I+'" stroke-width="1.3" stroke-linejoin="round"/>';
 else if(sp.mark==='leaf')o+='<path d="M'+(cx-7)+','+(fy+4)+' Q'+(cx-5)+','+(fy-9)+' '+(cx+7)+','+(fy-8)+' Q'+(cx+6)+','+(fy+5)+' '+(cx-7)+','+(fy+4)+'Z" fill="#D9F3C9" stroke="'+I+'" stroke-width="1.3" stroke-linejoin="round"/>';
 else if(sp.mark==='shell')o+='<path d="M'+(cx-8)+','+(fy+4)+' Q'+cx+','+(fy-12)+' '+(cx+8)+','+(fy+4)+'Z" fill="#FFF0F4" stroke="'+I+'" stroke-width="1.3" stroke-linejoin="round"/><path d="M'+cx+','+(fy+4)+' V'+(fy-6)+' M'+(cx-4)+','+(fy+4)+' L'+(cx-3)+','+(fy-3)+' M'+(cx+4)+','+(fy+4)+' L'+(cx+3)+','+(fy-3)+'" stroke="'+I+'" stroke-width="1" fill="none"/>';
 else if(sp.mark==='scale')o+=[-6,0,6].map(function(q){return '<path d="M'+(cx+q-3)+','+(fy+4)+' A3.5 3.5 0 0 1 '+(cx+q+3)+','+(fy+4)+'" fill="none" stroke="'+I+'" stroke-width="1.5"/><path d="M'+(cx+q-3)+','+(fy-3)+' A3.5 3.5 0 0 1 '+(cx+q+3)+','+(fy-3)+'" fill="none" stroke="'+I+'" stroke-width="1.5"/>'}).join('');
 else if(sp.mark==='gem')o+='<path d="M'+cx+','+(fy-9)+' L'+(cx+7)+','+(fy-1)+' L'+cx+','+(fy+8)+' L'+(cx-7)+','+(fy-1)+'Z" fill="#9AE6F0" stroke="'+I+'" stroke-width="1.3" stroke-linejoin="round"/><path d="M'+(cx-7)+','+(fy-1)+' H'+(cx+7)+' M'+cx+','+(fy-9)+' L'+(cx-3)+','+(fy-1)+' L'+cx+','+(fy+8)+'" stroke="'+I+'" stroke-width="1" fill="none"/>';
 else if(sp.mark==='rainbow')o+=['#FF6A52','#ECD06F','#49C5B6'].map(function(q,k){return '<path d="M'+(cx-9+k*2.5)+','+(fy+5)+' A'+(9-k*2.5)+' '+(9-k*2.5)+' 0 0 1 '+(cx+9-k*2.5)+','+(fy+5)+'" fill="none" stroke="'+q+'" stroke-width="2.4"/>'}).join('');
 else if(sp.mark==='plane')o+='<path d="M'+(cx-8)+','+(fy+2)+' L'+(cx+9)+','+(fy-6)+' L'+(cx+3)+','+(fy+8)+' L'+(cx+1)+','+(fy+2)+'Z" fill="#fff" stroke="'+I+'" stroke-width="1.3" stroke-linejoin="round"/>';
 else if(sp.mark==='balloon')o+='<ellipse cx="'+cx+'" cy="'+(fy-2)+'" rx="6" ry="7" fill="#FF6A52" stroke="'+I+'" stroke-width="1.3"/><path d="M'+cx+','+(fy+5)+' q-2,4 0,6" stroke="'+I+'" stroke-width="1.2" fill="none"/>';
 else if(sp.mark==='wing')o+='<path d="M'+(cx-9)+','+(fy+4)+' Q'+(cx-3)+','+(fy-10)+' '+(cx+9)+','+(fy-4)+' Q'+(cx+2)+','+(fy+1)+' '+(cx+4)+','+(fy+6)+'Z" fill="#fff" stroke="'+I+'" stroke-width="1.3" stroke-linejoin="round"/>';
 else if(sp.mark==='cap')o+='<path d="M'+(cx-12)+','+(top+5)+' Q'+cx+','+(top-14)+' '+(cx+12)+','+(top+5)+'Z" fill="#1F4F7A" stroke="'+I+'" stroke-width="1.5" stroke-linejoin="round"/><rect x="'+(cx-14)+'" y="'+(top+4)+'" width="28" height="4" rx="2" fill="#ECD06F" stroke="'+I+'" stroke-width="1.3"/>';
 else if(sp.mark==='dots')o+=[[-9,-1,3],[0,-6,2.6],[8,-1,3]].map(function(q){return '<circle cx="'+(cx+q[0])+'" cy="'+(top+q[1]+8)+'" r="'+q[2]+'" fill="#FFFDF8" stroke="'+I+'" stroke-width="1.1"/>'}).join('');
 else if(sp.mark==='snow')o+='<path d="M'+cx+','+(fy-8)+' V'+(fy+8)+' M'+(cx-7)+','+(fy-4)+' L'+(cx+7)+','+(fy+4)+' M'+(cx-7)+','+(fy+4)+' L'+(cx+7)+','+(fy-4)+'" stroke="#2779A7" stroke-width="1.8" stroke-linecap="round"/>';
 /* Gesicht */
 var ey=cy-ry*.12,ed=rx*.42;
 [-1,1].forEach(function(d){o+='<circle cx="'+(cx+d*ed)+'" cy="'+ey+'" r="'+(5.4*sc)+'" fill="#fff" stroke="'+I+'" stroke-width="1.7"/><circle cx="'+(cx+d*ed+d*.6)+'" cy="'+(ey+.6)+'" r="'+(3*sc)+'" fill="'+I+'"/><circle cx="'+(cx+d*ed+d*.6-1)+'" cy="'+(ey-.8)+'" r="1.1" fill="#fff"/><circle cx="'+(cx+d*rx*.68)+'" cy="'+(ey+9*sc)+'" r="'+(3.2*sc)+'" fill="#FF8F7E" opacity=".55"/>'});
 o+='<path d="M'+(cx-3.5)+','+(ey+8*sc)+' Q'+cx+','+(ey+12*sc)+' '+(cx+3.5)+','+(ey+8*sc)+'" fill="none" stroke="'+I+'" stroke-width="1.8" stroke-linecap="round"/>';
 /* Krone und Glitzer ab Stufe 3 / 2 */
 if(st===3){var ct=top-(sp.ears==='none'?2:7*sc);o+='<path d="M'+(cx-9)+','+(ct+5)+' L'+(cx-9)+','+(ct-3)+' L'+(cx-4.5)+','+(ct+1)+' L'+cx+','+(ct-6)+' L'+(cx+4.5)+','+(ct+1)+' L'+(cx+9)+','+(ct-3)+' L'+(cx+9)+','+(ct+5)+'Z" fill="#ECD06F" '+ln.replace('stroke-width="2"','stroke-width="1.6"')+'/>'}
 if(st>=2)o+=mStar(14,24,4,'#fff')+mStar(88,30,3.5,'#fff')+(st===3?mStar(20,86,3,'#fff')+mStar(84,84,4,'#fff'):'');
 if(shiny)o+=mStar(14,24,5,'#fff')+mStar(88,30,4.5,'#FFF5CC')+mStar(84,86,4,'#fff')+mStar(18,84,3.4,'#FFF5CC');
 return '<svg viewBox="6 8 90 90" style="width:100%;height:100%;display:block'+(sil?';filter:brightness(0);opacity:.14':shiny?';filter:hue-rotate(150deg) saturate(1.25)':'')+'" aria-hidden="true">'+o+'</svg>'}

/* ---- Zustand und Ereignisse ---- */
var EVT={throw:['papier',1],fold:['papier',3],chal:['wolken',1],chalok:['wolken',2],round:['kompass',2],pass:['kompass',3],bingo:['kompass',1],find:['mosaik',2],explore:['mosaik',1],stop:['mosaik',1],mem:['sterne',2],rek:['sterne',1],pack:['sterne',.2],cmp:['sterne',0]};
var BS={find:[1,'u'],explore:[1,'u'],chalok:[1,'u'],stop:[1,'u'],pass:[2,'u'],fold:[2,'u'],bingo:[1,'u'],mem:[1,'d2'],round:[1,'d2'],rek:[1,'d2'],cmp:[2,'d1']};
function bsGain(k,uid){var b=BS[k];if(!b)return;var m=S.mu,D=muDay(),n=b[0];
 if(b[1]==='u'){if(uid==null)return;var key=k+':'+uid;if(m.bbk[key])return;m.bbk[key]=1}
 else{var cap=b[1]==='d1'?1:2;D.b=D.b||{};if((D.b[k]||0)>=cap)return;D.b[k]=(D.b[k]||0)+1}
 m.bb=(m.bb||0)+n;var Dd=muDay();Dd.bbn=(Dd.bbn||0)+n;bchip(n)}
function bchip(n){var h=gbox();while(h.children.length>=3)h.removeChild(h.firstChild);var e=document.createElement('div');e.style.cssText='display:flex;align-items:center;gap:6px;background:#2779A7;color:#fff;border-radius:18px;padding:5px 12px 5px 8px;font-weight:800;font-size:16px;animation:pop .35s both;box-shadow:0 4px 14px rgba(19,50,74,.25)';e.innerHTML=brickIcon(20)+'+'+n+' Baustein'+(n>1?'e':'');h.appendChild(e);setTimeout(function(){e.style.transition='opacity .4s';e.style.opacity=0;setTimeout(function(){e.remove()},420)},1500)}
function brickIcon(sz){return '<svg viewBox="0 0 24 24" width="'+(sz||22)+'" height="'+(sz||22)+'" style="flex:none"><rect x="2" y="9" width="20" height="11" rx="2" fill="#FF9E8C" stroke="#13324A" stroke-width="1.7"/><rect x="5" y="5" width="4" height="4" rx="1" fill="#FF9E8C" stroke="#13324A" stroke-width="1.5"/><rect x="15" y="5" width="4" height="4" rx="1" fill="#FF9E8C" stroke="#13324A" stroke-width="1.5"/></svg>'}
function muDay(){var m=S.mu,d=today();return m.days[d]||(m.days[d]={c:{},done:{}})}
function ev(k,x,uid){var e=EVT[k];if(!e||!S.mu)return;bsGain(k,uid);var m=S.mu,x1=x||1,n=e[1]*x1,D=muDay();m.cnt[k]=(m.cnt[k]||0)+x1;D.c[k]=(D.c[k]||0)+x1;if(k==='chalok'){m.cnt.chal=(m.cnt.chal||0)+1;D.c.chal=(D.c.chal||0)+1}
 var w=n;if(n<1){m.frac=(m.frac||0)+n;w=Math.floor(m.frac+1e-9);m.frac-=w}
 if(w>0){D.m=D.m||{};D.m[e[0]]=(D.m[e[0]]||0)+w;m.mat[e[0]]=(m.mat[e[0]]||0)+w;m.life[e[0]]=(m.life[e[0]]||0)+w;chip(e[0],w);muEvo()}
 save();skyCheck()}
function gbox(){var h=document.getElementById('gainbox');if(!h){h=document.createElement('div');h.id='gainbox';h.style.cssText='position:fixed;left:50%;top:12px;transform:translateX(-50%);display:flex;flex-direction:row;gap:6px;z-index:90;pointer-events:none';document.body.appendChild(h)}return h}
function chip(mk,n){var h=gbox();
 while(h.children.length>=3)h.removeChild(h.firstChild);var e=document.createElement('div');e.style.cssText='display:flex;align-items:center;gap:6px;background:#13324A;color:#fff;border-radius:18px;padding:5px 12px 5px 8px;font-weight:800;font-size:16px;animation:pop .35s both;box-shadow:0 4px 14px rgba(19,50,74,.25)';e.innerHTML=matIcon(mk,20)+'+'+n+' '+MAT[mk].n;h.appendChild(e);setTimeout(function(){e.style.transition='opacity .4s';e.style.opacity=0;setTimeout(function(){e.remove()},420)},1500)}
function petStage(id){var p=S.mu.pets[id];if(!p)return 0;var sp=SPEC_BY[id],g=(S.mu.life[sp.m]||0)-p.base;return g>=EVO[1]?3:g>=EVO[0]?2:1}
var EVO=[12,30];
function muEvo(){Object.keys(S.mu.pets).forEach(function(id){var p=S.mu.pets[id],st=petStage(id);if(st>(p.st||1)){p.st=st;S.mu.news.push({id:id,st:st});setTimeout(function(){toast(SPEC_BY[id].n[st-2]+' hat sich zu '+SPEC_BY[id].n[st-1]+' entwickelt!')},900)}})}
function muOwned(){return SPEC.filter(function(s){return S.mu.pets[s.id]})}
function muOwnedEgg(){return SPEC.filter(function(s){return s.src==='egg'&&S.mu.pets[s.id]})}
function creP(id,st,sil){var sp=SPEC_BY[id],p=S.mu.pets[id];return cre(sp,st,sil,p&&p.shiny)}
function eggCost(sp){if(sp.src!=='egg')return {};var o=MATS[(MATS.indexOf(sp.m)+1)%MATS.length],c={};c[sp.m]=5;c[o]=3;return c}
function canAfford(c){return Object.keys(c).every(function(k){return (S.mu.mat[k]||0)>=c[k]})}
function costHtml(c){return Object.keys(c).map(function(k){var ok=(S.mu.mat[k]||0)>=c[k];return '<span class="tag" style="display:inline-flex;align-items:center;gap:4px;background:'+(ok?'#B1EAC4':'var(--paper)')+'">'+matIcon(k,14)+(S.mu.mat[k]||0)+'/'+c[k]+'</span>'}).join(' ')}
function hatch(id){var sp=SPEC_BY[id];S.mu.pets[id]={t:Date.now(),base:S.mu.life[sp.m]||0,st:1,how:'egg'};if(!S.mu.buddy)S.mu.buddy=id;S.mu.sel=id;save();checkRewards&&checkRewards();
 var s=sheet('<div style="text-align:center;padding:6px 10px"><span class="lab">Ein Ei schlüpft!</span><div style="width:190px;height:190px;margin:6px auto;animation:pop .6s both">'+cre(sp,1)+'</div><h2 class="disp" style="font-size:40px">'+esc(sp.n[0])+'</h2><p class="muted" style="margin:8px auto 16px;max-width:340px">'+esc(sp.story)+'</p><button class="b p" data-act="closeSheetGo">Willkommen!</button></div>');rerender()}
ACT.closeSheetGo=function(){closeSheet();rerender()};
ACT.muCraft=function(id){var sp=SPEC_BY[id];if(!sp||S.mu.pets[id]||sp.src!=='egg')return;var c=eggCost(sp);if(!canAfford(c))return toast('Dir fehlt noch etwas Material.');Object.keys(c).forEach(function(k){S.mu.mat[k]-=c[k]});hatch(id)};
ACT.muSurprise=function(){if(!S.mu.free)return;var left=eggSpecs().filter(function(s){return !S.mu.pets[s.id]});if(!left.length)return;S.mu.free--;hatch(left[Math.floor(Math.random()*left.length)].id)};
ACT.muSel=function(id){S.mu.sel=id;save();rerender()};
ACT.muBuddy=function(id){S.mu.buddy=id;save();rerender();toast(SPEC_BY[id].n[petStage(id)-1]+' begleitet dich jetzt.')};
ACT.muTab=function(t){S.mu.tab=t;save();rerender()};


/* ---- Begegnungen: wilde Freunde an Orten, Himmels-Freunde im Hangar & Cockpit ---- */
var SKYREW=[['fluegi','throw',1],['jetti','throw',10],['ballo','chalok',5],['segel','chalok',20],['kapi','round',1],['sternli','rek',10]];
var CATCHQ=[];
function skyCheck(){if(!S.mu||!S.mu.cnt)return;SKYREW.forEach(function(r){var sp=SPEC_BY[r[0]];if(sp&&!S.mu.pets[r[0]]&&(S.mu.cnt[r[1]]||0)>=r[2])catchSpecies(sp,'sky','Himmel')})}
function wRand(a){var t=0;a.forEach(function(x){t+=x.rar===1?6:3});var r=Math.random()*t;for(var i=0;i<a.length;i++){r-=a[i].rar===1?6:3;if(r<=0)return a[i]}return a[a.length-1]}
function rollWild(){var m=S.mu,pool=WILD.filter(function(x){return !m.pets[x.id]});if(!pool.length)return null;
 var rare=pool.filter(function(x){return x.rar===3}),norm=pool.filter(function(x){return x.rar<3});
 if(rare.length&&(!norm.length||Math.random()<0.12+(m.noRare||0)*0.04)){m.noRare=0;return rare[Math.floor(Math.random()*rare.length)]}
 m.noRare=(m.noRare||0)+1;return wRand(norm)}
function catchSpecies(sp,how,place){var shiny=Math.random()<0.07;
 S.mu.pets[sp.id]={t:Date.now(),base:S.mu.life[sp.m]||0,st:1,shiny:shiny?1:0,how:how};
 if(!S.mu.buddy)S.mu.buddy=sp.id;S.mu.sel=sp.id;
 var g=sp.rar===3?3:sp.rar===2?2:1,got=[];for(var i=0;i<g;i++){var mk=MATS[Math.floor(Math.random()*MATS.length)];S.mu.mat[mk]=(S.mu.mat[mk]||0)+1;S.mu.life[mk]=(S.mu.life[mk]||0)+1;got.push(mk)}
 save();checkRewards&&checkRewards();CATCHQ.push({id:sp.id,shiny:shiny,place:place||'',got:got});setTimeout(catchNext,how==='sky'?700:150)}
function catchNext(){if(document.getElementById('catch')||!CATCHQ.length)return;var c=CATCHQ.shift(),sp=SPEC_BY[c.id],nr=SPEC.indexOf(sp)+1,own=muOwned().length;
 var st='';for(var i=0;i<sp.rar;i++)st+='★';
 var e=document.createElement('div');e.id='catch';e.className='catch celebrate';
 e.innerHTML='<div class="cx"><span class="lab" style="color:#ECD06F;letter-spacing:.2em">'+(sp.src==='sky'?'Neuer Himmels-Freund':'Neuer Freund'+(c.place?' · '+esc(c.place):''))+'</span>'+
  '<div class="cpic"><div class="burst"></div><div class="cfig">'+cre(sp,1,0,c.shiny)+'</div></div>'+
  '<div class="crar"><span class="rb r'+sp.rar+'">'+st+' '+RARN[sp.rar]+'</span>'+(c.shiny?'<span class="rb shi">✦ Funkel-Version!</span>':'')+'</div>'+
  '<h1 class="disp cname">'+esc(sp.n[0])+'</h1><div class="csub">Nr. '+nr+' im Muya-Dex · Stufe 1 von 3</div><p class="cst">'+esc(sp.story)+'</p>'+
  '<div class="cgot">'+c.got.map(function(k){return '<span class="tag" style="display:inline-flex;gap:6px;align-items:center;background:#ffffff1f;color:#fff">'+matIcon(k,16)+'+1 '+MAT[k].n+'</span>'}).join(' ')+' <span class="tag" style="background:#ffffff1f;color:#fff">Dex '+own+'/'+SPEC.length+'</span></div>'+
  '<div class="cbt"><button class="b" style="background:#49C5B6;border-color:#49C5B6;color:#fff" data-act="catchTeam" data-a="'+sp.id+'">Ins Team nehmen</button><button class="b" style="background:#ffffff1f;border-color:#ffffff40;color:#fff" data-act="catchDex">Zum Dex</button><button class="b" style="background:transparent;border-color:#ffffff40;color:#fff" data-act="catchClose">Weiter</button></div></div>';
 document.body.appendChild(e)}
ACT.catchClose=function(){var e=document.getElementById('catch');if(e)e.remove();if(CATCHQ.length)setTimeout(catchNext,200);else rerender()};
ACT.catchTeam=function(id){S.mu.buddy=id;S.mu.sel=id;save();ACT.catchClose();toast(SPEC_BY[id].n[petStage(id)-1]+' begleitet dich jetzt.')};
ACT.catchDex=function(){var e=document.getElementById('catch');if(e)e.remove();CATCHQ=[];location.hash='#/freunde';rerender()};
/* Ich bin hier: am Ort ankommen, Freund suchen */
function dayStops(i){var c=CT(i);return c?stopsAct(c):[]}
function curSlot(){var t=tripDayOf(today());return t>-1?t:Math.max(0,Math.min((S.stadt.day||0),5))}
function nextStop(){var st=dayStops(curSlot());for(var i=0;i<st.length;i++)if(!S.mu.met[st[i].id])return st[i];return null}
ACT.here=function(id){var stp=id?STOPID[id]:nextStop();
 if(!stp)return toast('Alle Orte von heute sind besucht. Super!');
 if(S.mu.met[stp.id])return toast('Hier warst du schon. Dein Freund wartet im Dex.');
 S.mu.met[stp.id]={t:Date.now(),sp:null};if(!S.stadt.done[stp.id]){S.stadt.done[stp.id]=1;ev('stop',1,stp.id)}
 var sp=rollWild(),place=pname(stp.id);if(sp)S.mu.met[stp.id].sp=sp.id;
 if(sp){catchSpecies(sp,'wild',place)}
 else{var got={};for(var i=0;i<3;i++){var mk=MATS[Math.floor(Math.random()*MATS.length)];got[mk]=(got[mk]||0)+1;S.mu.mat[mk]=(S.mu.mat[mk]||0)+1;S.mu.life[mk]=(S.mu.life[mk]||0)+1}
  save();sheet('<div style="text-align:center;padding:6px 10px"><span class="lab">'+esc(place)+' entdeckt</span><div style="display:flex;gap:12px;justify-content:center;margin:16px 0">'+Object.keys(got).map(function(k){return '<div style="display:flex;flex-direction:column;align-items:center;gap:4px">'+matIcon(k,48)+'<b>+'+got[k]+'</b><span class="lab">'+MAT[k].n+'</span></div>'}).join('')+'</div><p class="muted">Du kennst schon alle wilden Freunde. Das ist eine Schatzkiste für dich!</p><button class="b p" data-act="closeSheetGo">Super!</button></div>')}
 save();rerender()};

/* ---- Tagesaufträge (5 bis 10 Minuten) ---- */
var QPOOL=[['throw',3,'Wirf 3 Papierflieger','/hgr','trip'],['fold',1,'Falte einen Flieger fertig','/hgr','trip'],['chal',3,'Löse 3 Aufgaben in „Wie fliegt das?“','/wie'],['round',1,'Spiele eine Runde in der Missions-Zentrale','/auf'],['bingo',2,'Entdecke 2 Dinge im Flughafen-Bingo','/auf'],['find',1,'Öffne einen Schatz in der Schatzsuche','/wes'],['rek',3,'Vergleiche 3 Rekorde im Rekord-Labor','/rek'],['mem',1,'Schreibe eine Erinnerung ins Tagebuch','/tag','in'],['stop',2,'Hake 2 Orte im Stadtplan ab','/stadt','in'],['pack',6,'Hake 6 Sachen auf der Packliste ab','/vor','pre']];
function questsToday(){var d=today(),inTrip=tripDayOf(d)>-1,pre=daysBetween(d,S.trip.depart)>0,pool=QPOOL.filter(function(q){return !q[4]||q[4]==='trip'||(q[4]==='in'&&inTrip)||(q[4]==='pre'&&pre)||(q[4]==='trip')});
 if(!inTrip)pool=pool.filter(function(q){return q[4]!=='in'});
 var h=0;for(var i=0;i<d.length;i++)h=(h*31+d.charCodeAt(i))>>>0;var out=[],used={},step=(h%5)*2+1;for(var j=0;out.length<3&&j<40;j++){var q=pool[(h+j*step)%pool.length];if(used[q[0]])continue;used[q[0]]=1;out.push(q)}
 return out}
function questState(){var D=muDay();return questsToday().map(function(q,i){var n=Math.min(q[1],D.c[q[0]]||0);return{k:q[0],g:q[1],n:n,t:q[2],go:q[3],ok:n>=q[1],claimed:!!D.done[q[0]]}})}
ACT.muClaim=function(k){var D=muDay(),q=questState().filter(function(x){return x.k===k})[0];if(!q||!q.ok||q.claimed)return;D.done[k]=1;S.mu.qdone=(S.mu.qdone||0)+1;bsGain0('qc:'+today()+k,1);
 var got={},n=3;for(var i=0;i<n;i++){var mk=MATS[Math.floor(Math.random()*MATS.length)],a=1+Math.floor(Math.random()*2);got[mk]=(got[mk]||0)+a}
 Object.keys(got).forEach(function(mk){D.m=D.m||{};D.m[mk]=(D.m[mk]||0)+got[mk];S.mu.mat[mk]=(S.mu.mat[mk]||0)+got[mk];S.mu.life[mk]=(S.mu.life[mk]||0)+got[mk]});
 var all=questState().every(function(x){return x.claimed});if(all&&!D.bonus){D.bonus=1;S.mu.free=(S.mu.free||0)+1}
 muEvo();save();checkRewards&&checkRewards();
 sheet('<div style="text-align:center;padding:6px 10px"><span class="lab">Kiste geöffnet</span><div style="display:flex;gap:12px;justify-content:center;margin:16px 0">'+Object.keys(got).map(function(mk){return '<div style="animation:pop .5s both;display:flex;flex-direction:column;align-items:center;gap:4px">'+matIcon(mk,48)+'<b>+'+got[mk]+'</b><span class="lab">'+MAT[mk].n+'</span></div>'}).join('')+'</div>'+(all?'<p style="font-weight:800;color:#2779A7;margin-bottom:12px">Alle drei Aufträge geschafft! Du bekommst ein Überraschungs-Ei.</p>':'')+'<button class="b p" data-act="closeSheetGo">Super!</button></div>');rerender()};

/* ---- Seite ---- */
ROUTES.freunde=function(){var m=S.mu,tab=m.tab||'dex',own=muOwned().length;
 if(!m.sel||!SPEC_BY[m.sel])m.sel=(muOwned()[0]||SPEC[0]).id;
 var strip=MATS.map(function(k){return '<div class="pn" style="display:flex;align-items:center;gap:8px;padding:6px 12px;flex:1;min-width:0">'+matIcon(k,26)+'<span style="line-height:1.1"><b style="font-size:20px">'+(m.mat[k]||0)+'</b><span class="lab" style="display:block">'+MAT[k].n+'</span></span></div>'}).join('')+'<div class="pn" style="display:flex;align-items:center;gap:8px;padding:6px 12px;flex:1;min-width:0;background:#E4F0FF">'+brickIcon(26)+'<span style="line-height:1.1"><b style="font-size:20px">'+(m.bb||0)+'</b><span class="lab" style="display:block">Bausteine</span></span></div>';
 var qs=questState(),open=qs.filter(function(q){return q.ok&&!q.claimed}).length;
 var tabs='<div class="row" style="gap:8px"><button class="chip'+(tab==='dex'?' on':'')+'" data-act="muTab" data-a="dex">Meine Freunde · '+own+'/'+SPEC.length+'</button><button class="chip'+(tab==='base'?' on':'')+'" data-act="muTab" data-a="base">Forscherbasis · '+Object.keys(m.base).length+'/'+BLD.length+'</button><button class="chip'+(tab==='quest'?' on':'')+'" data-act="muTab" data-a="quest">Tagesaufträge'+(open?' · '+open+' bereit':'')+'</button><div class="sp"></div>'+(m.free?'<button class="b y s" data-act="muSurprise">Überraschungs-Ei öffnen ('+m.free+')</button>':'')+'</div>';
 var body=tab==='quest'?questHtml(qs):tab==='base'?baseHtml():dexHtml();
 return screen(head('MUYA-FREUNDE','Sammelmappe der Freunde','/','<span class="lab" style="text-align:right">'+own+' von '+SPEC.length+'<br>Freunden gefunden</span>'),'<div class="col" style="height:100%;gap:10px"><div class="row" style="gap:8px">'+strip+'</div>'+tabs+'<div style="flex:1;min-height:0">'+body+'</div></div>')};
function rarStars(n){var o='';for(var i=0;i<n;i++)o+='★';return o}
ACT.muFilter=function(f){S.mu.f=f;save();rerender()};
function dexHtml(){var m=S.mu,f=m.f||'all',list=SPEC.filter(function(x){return f==='all'||x.src===f});
 if(!m.sel||!SPEC_BY[m.sel])m.sel=list[0].id;var sel=SPEC_BY[m.sel],ps=m.pets[sel.id],st=ps?petStage(sel.id):0;
 var fl='<div class="row" style="gap:6px;flex-wrap:wrap">'+[['all','Alle'],['wild','Wilde'],['sky','Himmel'],['egg','Ei-Freunde']].map(function(x){var L=SPEC.filter(function(y){return x[0]==='all'||y.src===x[0]});var o=L.filter(function(y){return m.pets[y.id]}).length;return '<button class="chip s'+(f===x[0]?' on':'')+'" data-act="muFilter" data-a="'+x[0]+'">'+x[1]+' · '+o+'/'+L.length+'</button>'}).join('')+'</div>';
 var cards=list.map(function(sp){var p=m.pets[sp.id],s2=p?petStage(sp.id):1,on=sp.id===m.sel;return '<button class="pn'+(on?' sel':'')+'" data-act="muSel" data-a="'+sp.id+'" style="padding:5px;display:flex;flex-direction:column;align-items:center;gap:1px;'+(p?'':'background:rgba(255,255,255,.5)')+'"><div class="mupic" style="width:100%;flex:1;min-height:0;display:grid;place-items:center">'+cre(sp,s2,!p,p&&p.shiny)+'</div><b style="font-size:14px;white-space:nowrap">'+(p?esc(sp.n[s2-1]):'? ? ?')+'</b><span style="display:flex;gap:3px;height:8px;align-items:center">'+(p?'<span style="font-size:9px;color:#C9A227;letter-spacing:1px">'+rarStars(sp.rar)+'</span>':'')+[1,2,3].map(function(k){return '<i style="width:7px;height:7px;border-radius:50%;background:'+(p&&s2>=k?'#ECD06F':'var(--line)')+'"></i>'}).join('')+'</span></button>'}).join('');
 var g=ps?(m.life[sel.m]||0)-ps.base:0,next=st>=3?null:EVO[st-1],detail;
 if(ps){detail='<div style="width:180px;height:180px;margin:0 auto">'+cre(sel,st,0,ps.shiny)+'</div><h2 class="disp" style="font-size:32px;text-align:center">'+esc(sel.n[st-1])+'</h2><div class="lab" style="text-align:center">Stufe '+st+' von 3 · '+(m.buddy===sel.id?'dein Begleiter':'Freund')+'</div><div style="text-align:center;margin:6px 0"><span class="tag" style="background:#FFF1B8;color:#7a5c00">'+rarStars(sel.rar)+' '+RARN[sel.rar]+'</span>'+(ps.shiny?' <span class="tag" style="background:#E4D9FF">✦ Funkel-Version</span>':'')+'</div><p class="muted" style="font-size:15px;margin:6px 0">'+esc(sel.story)+'</p>'+
  (next?'<div class="row" style="gap:8px">'+matIcon(sel.m,20)+'<div class="bar" style="flex:1"><i style="width:'+Math.min(100,g/next*100)+'%"></i></div><span class="lab">'+g+' / '+next+'</span></div><p class="muted" style="font-size:14px;margin-top:4px">Sammle '+MAT[sel.m].n+' ('+esc(MAT[sel.m].h)+'), dann entwickelt sich '+esc(sel.n[st-1])+'.</p>':'<p style="font-weight:800;color:#2779A7">Voll entwickelt!</p>')+
  '<div class="row" style="gap:6px;margin:8px 0">'+[1,2,3].map(function(k){return '<div style="flex:1;text-align:center"><div style="height:52px">'+cre(sel,k,st<k,ps.shiny)+'</div><span class="lab" style="font-size:13px">'+(st>=k?esc(sel.n[k-1]):'?')+'</span></div>'}).join('')+'</div>'+
  (m.buddy===sel.id?'':'<button class="b s" data-act="muBuddy" data-a="'+sel.id+'" style="width:100%">Als Begleiter wählen</button>')}
 else if(sel.src==='egg'){var c=eggCost(sel);detail='<div style="width:160px;height:160px;margin:0 auto">'+cre(sel,1,1)+'</div><h2 class="disp" style="font-size:32px;text-align:center">Unbekannter Freund</h2><p class="muted" style="font-size:15px;text-align:center;margin:6px 0 10px">Ein Freund aus der Welt von „'+esc(MAT[sel.m].n)+'“. Bastle ein Ei und schau, wer schlüpft!</p><div style="text-align:center;margin-bottom:10px">'+costHtml(c)+'</div><button class="b '+(canAfford(c)?'p':'')+'" data-act="muCraft" data-a="'+sel.id+'" style="width:100%"'+(canAfford(c)?'':' disabled')+'>Ei basteln</button><p class="muted" style="font-size:14px;margin-top:8px;text-align:center">Material findest du: '+esc(MAT[sel.m].h)+'</p>'}
 else{detail='<div style="width:160px;height:160px;margin:0 auto">'+cre(sel,1,1)+'</div><h2 class="disp" style="font-size:32px;text-align:center">Unbekannter Freund</h2><p class="muted" style="font-size:15px;text-align:center;margin:6px 0 10px">'+(sel.src==='wild'?'Ein wilder Freund. Du triffst ihn, wenn du in Barcelona an einem neuen Ort ankommst und auf „Ich bin hier“ tippst. Manchmal ist auch ein ganz seltener dabei!':'Ein Himmels-Freund. So findest du ihn: '+esc(sel.hint))+'</p>'}
 return '<div style="display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:12px;height:100%"><div class="col" style="gap:8px;min-height:0">'+fl+'<div data-keep="mugrid" style="display:grid;grid-auto-flow:column;grid-template-rows:repeat(auto-fill,108px);grid-auto-columns:98px;gap:8px;overflow-x:auto;overflow-y:hidden;min-height:0;flex:1;align-content:start;scroll-snap-type:x proximity">'+cards+'</div></div><div class="pn" style="padding:12px 14px;overflow:auto;min-height:0" data-keep="mudet">'+detail+'</div></div>'}
var QMAT={throw:'papier',fold:'papier',chal:'wolken',round:'kompass',bingo:'kompass',find:'mosaik',stop:'mosaik',mem:'sterne',rek:'sterne',pack:'sterne'};
function questHtml(qs){var D=muDay(),all=qs.every(function(q){return q.claimed});
 var cards=qs.map(function(q){var pct=q.n/q.g*100;return '<div class="pn" style="padding:14px 16px;display:flex;flex-direction:column;gap:10px;'+(q.claimed?'background:rgba(177,234,196,.35)':'')+'"><span class="lab">Auftrag</span><div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center">'+matIcon(QMAT[q.k],72)+'<b style="font-size:19px;line-height:1.2">'+esc(q.t)+'</b><span class="muted" style="font-size:14.5px">Belohnung: eine Kiste mit 3 Materialien</span></div><div class="row" style="gap:8px"><div class="bar" style="flex:1"><i style="width:'+pct+'%"></i></div><b>'+q.n+'/'+q.g+'</b></div>'+(q.claimed?'<span class="tag" style="background:#B1EAC4;align-self:flex-start">Kiste geöffnet ✓</span>':q.ok?'<button class="b y" data-act="muClaim" data-a="'+q.k+'">Kiste öffnen</button>':'<a class="b s" href="#'+q.go+'">Los geht’s '+arrow()+'</a>')+'</div>'}).join('');
 var how=MATS.map(function(k){return '<div class="row" style="gap:8px">'+matIcon(k,22)+'<span style="font-size:15.5px"><b>'+MAT[k].n+'</b> · '+esc(MAT[k].h)+'</span></div>'}).join('');
 return '<div style="display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:12px;height:100%"><div class="col" style="gap:12px;min-height:0"><div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;flex:1;min-height:0">'+cards+'</div><div class="pn" style="padding:10px 16px"><b>Alle drei geschafft?</b> <span class="muted">Dann gibt es heute ein Überraschungs-Ei.</span> '+(D.bonus?'<span class="tag" style="background:#B1EAC4">heute schon bekommen ✓</span>':'')+'</div></div><div class="pn" style="padding:14px 16px;display:flex;flex-direction:column;gap:10px"><span class="lab">So sammelst du Material</span>'+how+'<p class="muted" style="font-size:14.5px;margin-top:auto">Jeder Auftrag dauert nur 5 bis 10 Minuten. Alle zählen mit, ganz ohne Druck. Neue Aufträge gibt es jeden Tag.</p></div></div>'}

function muBuddyChip(){var id=S.mu.buddy,sp=id&&SPEC_BY[id];return '<span style="width:30px;height:30px;display:inline-block">'+(sp?creP(id,petStage(id)):cre(SPEC[0],1,1))+'</span>'}

function bsGain0(key,n){var m=S.mu;if(m.bbk[key])return;m.bbk[key]=1;m.bb=(m.bb||0)+n;var Dd=muDay();Dd.bbn=(Dd.bbn||0)+n;bchip(n)}

/* ---- Muyas Forscherbasis: Bausteine werden zu Gebäuden ---- */
var BLD=[{id:'bank',n:'Werkbank',c:2,x:95,h:'Hier tüftelt Muya an Papierfliegern. Die erste Werkbank ist schnell gebaut.'},{id:'turm',n:'Beobachtungsturm',c:4,x:255,h:'Von hier oben sieht man Flugzeuge, Wolken und weit entfernte Städte.'},{id:'garten',n:'Mosaik-Garten',c:4,x:415,h:'Ein Garten aus bunten Mosaik-Scherben, wie in Barcelona.'},{id:'labor',n:'Wolkenlabor',c:6,x:575,h:'Hier werden Wolken, Wind und Wetter untersucht.'},{id:'haus',n:'Erinnerungshaus',c:6,x:735,h:'Ein gemütliches Haus für alle schönen Erinnerungen deiner Reise.'}];
var BCOL=['#FF9E8C','#49C5B6','#ECD06F','#B5D5FF'];
var BLD_BY={};BLD.forEach(function(b){BLD_BY[b.id]=b});
function bldSvg(id,col){var I='#13324A',st='stroke="'+I+'" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"',o='';
 if(id==='bank'){o='<rect x="-52" y="-44" width="104" height="12" rx="3" fill="#D9B382" '+st+'/><rect x="-44" y="-32" width="8" height="32" fill="#B88B5A" '+st+'/><rect x="36" y="-32" width="8" height="32" fill="#B88B5A" '+st+'/><rect x="-36" y="-26" width="72" height="5" fill="#C79A66" stroke="'+I+'" stroke-width="1.4"/><path d="M-30,-44 L-6,-56 L-12,-44Z" fill="#fff" '+st+'/><circle cx="22" cy="-52" r="9" fill="'+col+'" '+st+'/><circle cx="22" cy="-52" r="3" fill="#fff"/><rect x="-2" y="-52" width="16" height="8" fill="#FFFDF8" '+st+'/><path d="M-60,0 L60,0" '+st+'/>'}
 else if(id==='turm'){o='<rect x="-22" y="-112" width="44" height="112" fill="#E9E1CC" '+st+'/><path d="M-22,-84 H22 M-22,-52 H22" stroke="'+I+'" stroke-width="1.6" fill="none"/><circle cx="0" cy="-96" r="8" fill="#B5D5FF" '+st+'/><rect x="-7" y="-26" width="14" height="26" rx="6" fill="'+col+'" '+st+'/><path d="M-30,-112 L0,-142 L30,-112Z" fill="'+col+'" '+st+'/><path d="M0,-142 V-166" '+st+'/><path d="M0,-166 L20,-159 L0,-152Z" fill="#fff" '+st+'/>'}
 else if(id==='garten'){o='<ellipse cx="0" cy="-8" rx="62" ry="16" fill="#8B6B4A" '+st+'/>'+[[-40,-12,'#FF6A52'],[-22,-8,'#ECD06F'],[-4,-13,col],[14,-8,'#B5D5FF'],[32,-12,'#FF9E8C'],[-30,-2,'#49C5B6'],[4,-2,'#ECD06F'],[24,-1,'#FF6A52']].map(function(q,k){return '<rect x="'+q[0]+'" y="'+q[1]+'" width="10" height="10" fill="'+q[2]+'" stroke="'+I+'" stroke-width="1.5" transform="rotate('+(k*11-20)+' '+(q[0]+5)+' '+(q[1]+5)+')"/>'}).join('')+'<rect x="-3" y="-60" width="7" height="42" fill="#B88B5A" '+st+'/><circle cx="0" cy="-70" r="20" fill="#8BC99A" '+st+'/><circle cx="-8" cy="-74" r="3" fill="'+col+'"/><circle cx="8" cy="-66" r="3" fill="'+col+'"/>'}
 else if(id==='labor'){o='<path d="M-44,-30 A44,44 0 0 1 44,-30 Z" fill="#DCEEFF" '+st+'/><rect x="-48" y="-30" width="96" height="30" fill="'+col+'" '+st+'/><rect x="-9" y="-24" width="18" height="24" rx="8" fill="#FFFDF8" '+st+'/><path d="M10,-62 a8,8 0 0 1 8,-8 a10,10 0 0 1 19,2 a7,7 0 0 1 -2,14 h-22 a7,7 0 0 1 -3,-8z" fill="#fff" '+st+' transform="translate(-26 -6) scale(.9)"/><path d="M30,-74 V-96" '+st+'/><circle cx="30" cy="-100" r="5" fill="#fff" '+st+'/><circle cx="40" cy="-110" r="7" fill="#fff" '+st+'/>'}
 else{o='<rect x="-42" y="-62" width="84" height="62" fill="#FFF1CC" '+st+'/><path d="M-52,-62 L0,-104 L52,-62Z" fill="'+col+'" '+st+'/><rect x="24" y="-100" width="10" height="24" fill="#B88B5A" '+st+'/><rect x="-10" y="-30" width="20" height="30" rx="3" fill="#B88B5A" '+st+'/><path d="M-36,-48 h20 v16 h-20z" fill="#B5D5FF" '+st+'/><path d="M16,-48 h20 v16 h-20z" fill="#B5D5FF" '+st+'/><path d="M26,-44 l2.4,5 5.6,.6 -4.2,3.8 1.1,5.5 -4.9,-2.8 -4.9,2.8 1.1,-5.5 -4.2,-3.8 5.6,-.6z" fill="#ECD06F" stroke="'+I+'" stroke-width="1"/>'}
 return o}
function baseSvg(sel){var m=S.mu,o='<defs><linearGradient id="bsk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFE6FF"/><stop offset="1" stop-color="#F7F2E4"/></linearGradient></defs><rect width="840" height="520" fill="url(#bsk)"/><circle cx="760" cy="80" r="30" fill="#FBE59B"/><path d="M0,368 Q130,308 260,363 T520,353 T840,360 V520 H0Z" fill="#BFE0C2"/><rect y="400" width="840" height="120" fill="#CFE8C8"/><path d="M0,400 H840" stroke="#8BC99A" stroke-width="3"/>';
 BLD.forEach(function(b){var bt=m.base[b.id],on=sel===b.id;
  o+='<g transform="translate('+b.x+' 400) scale(1.4)" data-act="baseSel" data-a="'+b.id+'" style="cursor:pointer">';
  if(on)o+='<ellipse cx="0" cy="6" rx="66" ry="10" fill="#FF6A52" opacity=".28"/>';
  if(bt)o+='<g style="animation:pop .5s both;transform-box:fill-box;transform-origin:50% 100%">'+bldSvg(b.id,BCOL[bt.c||0])+'</g>';
  else o+='<g opacity=".55"><rect x="-48" y="-70" width="96" height="70" rx="10" fill="rgba(255,255,255,.5)" stroke="#13324A" stroke-width="2" stroke-dasharray="6 6"/><text x="0" y="-28" text-anchor="middle" font-family="Big Shoulders Display" font-weight="900" font-size="34" fill="#13324A">?</text></g><text x="0" y="22" text-anchor="middle" font-family="DM Mono" font-size="12" fill="#13324A">'+b.c+' Bausteine</text>';
  o+='<rect x="-60" y="-150" width="120" height="180" fill="transparent"/></g>'});
 var pets=muOwned();pets.slice(0,12).forEach(function(sp,k){var x=44+k*68+(k%2?8:0),y=448+(k%3)*22;o+='<g transform="translate('+x+' '+y+') scale(.66)"><g transform="translate(-50 -80)">'+creP(sp.id,petStage(sp.id)).replace('<svg viewBox="6 8 90 90" style="width:100%;height:100%;display:block','<svg viewBox="6 8 90 90" width="100" height="100" style="display:block').replace(/^<svg[^>]*>/,'<g>').replace(/<\/svg>$/,'</g>')+'</g></g>'});
 return '<svg viewBox="0 0 840 520" style="width:100%;height:100%" preserveAspectRatio="xMidYMid meet">'+o+'</svg>'}
function baseHtml(){var m=S.mu;if(!m.bsel||!BLD_BY[m.bsel])m.bsel=(BLD.filter(function(b){return !m.base[b.id]})[0]||BLD[0]).id;var b=BLD_BY[m.bsel],bt=m.base[b.id],can=(m.bb||0)>=b.c;
 var how=['Schätze öffnen und erforschen','Aufgaben in „Wie fliegt das?“ meistern','Orte im Stadtplan abhaken','Einen Flieger falten, ein Experiment vergleichen','Bordkarten, Bingo, Erinnerungen und Tagesaufträge'].map(function(t){return '<div style="font-size:14.5px">• '+t+'</div>'}).join('');
 var side='<div style="width:140px;height:150px;margin:0 auto"><svg viewBox="-70 -150 140 170" style="width:100%;height:100%">'+(bt?bldSvg(b.id,BCOL[bt.c||0]):'<g opacity=".3">'+bldSvg(b.id,'#999')+'</g>')+'</svg></div><h2 class="disp" style="font-size:32px;text-align:center">'+esc(b.n)+'</h2><p class="muted" style="font-size:15.5px;text-align:center;margin:6px 0 10px">'+esc(b.h)+'</p>'+
  (bt?'<div class="lab" style="text-align:center;margin-bottom:6px">Farbe wählen</div><div class="row" style="justify-content:center;gap:10px">'+BCOL.map(function(c,k){return '<button data-act="baseCol" data-a="'+b.id+'|'+k+'" aria-label="Farbe '+(k+1)+'" style="width:40px;height:40px;border-radius:50%;background:'+c+';border:3px solid '+((bt.c||0)===k?'#13324A':'#fff')+'"></button>'}).join('')+'</div>'
   :'<button class="b '+(can?'p':'')+'" data-act="baseBuild" data-a="'+b.id+'" style="width:100%"'+(can?'':' disabled')+'>Bauen · '+brickIcon(18)+' '+b.c+' Bausteine</button>'+(can?'':'<p class="muted" style="font-size:14.5px;text-align:center;margin-top:6px">Dir fehlen noch '+(b.c-(m.bb||0))+' Bausteine.</p>'))+
  '<div style="border-top:1.5px solid var(--line);margin-top:12px;padding-top:8px"><span class="lab">So bekommst du Bausteine</span>'+how+'</div>';
 return '<div style="display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:12px;height:100%"><div class="pn" style="padding:6px;min-height:0;overflow:hidden">'+baseSvg(b.id)+'</div><div class="pn" style="padding:12px 14px;overflow:auto;min-height:0" data-keep="bsd">'+side+'</div></div>'}
ACT.baseSel=function(id){S.mu.bsel=id;save();rerender()};
ACT.baseBuild=function(id){var b=BLD_BY[id];if(!b||S.mu.base[id])return;if((S.mu.bb||0)<b.c)return toast('Dir fehlen noch Bausteine.');S.mu.bb-=b.c;S.mu.base[id]={c:0,t:Date.now()};S.mu.bsel=id;save();checkRewards&&checkRewards();rerender();toast(b.n+' steht! Such dir eine Farbe aus.')};
ACT.baseCol=function(v){var x=v.split('|'),bt=S.mu.base[x[0]];if(!bt)return;bt.c=+x[1];save();rerender()};
