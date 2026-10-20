/* ===== Reisepass-Stempel: every stamp is tied to a real action in one feature ===== */
function mkStamp(id,cat,t,d,ic,c,n,of){var st={id:id,cat:cat,t:t,d:d,ic:ic,c:c,n:n};if(typeof of==='function')Object.defineProperty(st,'of',{get:of});else st.of=of;STAMPS.push(st)}
(function(){
 var Y='#ECD06F',T='#49C5B6',C='#FF6A52',B='#2779A7',M='#7FD39E',P='#FFB288',K='#9ACDEB';
 function kidItems(){return packItems('kind')}
 /* Vor dem Abflug */
 mkStamp('pk-kind','vor','Koffer zu!','Alles für das Kind gepackt',IC.suitcase,Y,function(){return kidItems().filter(function(i){return S.pack.done[i.key]}).length},function(){return Math.max(1,kidItems().length)});
 mkStamp('pk-fam','vor','Familien-Packmeister','Die ganze Packliste fertig',IC.check,Y,function(){return packStats('alle').d},function(){return Math.max(1,packStats('alle').n)});
 mkStamp('brief','vor','Flughafen-Profi','Alle Briefing-Punkte abgehakt',IC.tower,T,function(){return Object.keys(S.brief.done).length},BRIEFING.reduce(function(a,b){return a+b[4].length},0));
 mkStamp('pred','vor','Hellseher','3 Vorhersagen genau getroffen',IC.eye,P,function(){return VORHER2.filter(function(v){var p=S.pred2[v.id];if(!p||p.p==null)return false;var ans=v.a!=null?v.a:p.r;return ans!=null&&ans===p.p&&daysBetween(S.trip.depart,today())>=0}).length},3);
 /* Muya-Freunde */
 mkStamp('mu-1','mu','Erstes Ei','Einen Muya-Freund schlüpfen lassen',IC.star,Y,function(){return muOwned().length},1);
 mkStamp('mu-6','mu','Freunde-Sammler','6 Muya-Freunde gefunden',IC.star,Y,function(){return muOwned().length},6);
 mkStamp('mu-12','mu','Muya-Dex komplett','Alle 12 Muya-Freunde gefunden',IC.star,Y,function(){return muOwned().length},12);
 mkStamp('mu-evo','mu','Entwicklung!','Einen Freund voll entwickelt (Stufe 3)',IC.star,Y,function(){return muOwned().filter(function(s){return petStage(s.id)>=3}).length},1);
 mkStamp('mu-q','mu','Tagesheld','5 Tagesaufträge geschafft',IC.star,Y,function(){return S.mu.qdone||0},5);
 /* Aufträge */
 mkStamp('a-pass1','auf','Erste Bordkarte','Eine echte Bordkarte komplett entdeckt',IC.ticket,Y,function(){return passCount()},1);
 mkStamp('a-pass2','auf','Hin und zurück','Beide Bordkarten komplett',IC.ticket,C,function(){return passCount()},2);
 mkStamp('a-bingo5','auf','Adlerauge','5 Dinge am Flughafen entdeckt',IC.eye,T,function(){return Object.keys(S.auf.bingo).length},5);
 mkStamp('a-bingo','auf','Bingo!','Eine ganze Bingo-Reihe',IC.star,Y,function(){return bingoLines()},1);
 mkStamp('a-bingo16','auf','Flughafen-Detektiv','Alle 16 Bingo-Felder',IC.eye,C,function(){return Object.keys(S.auf.bingo).length},16);
 mkStamp('a-dest5','auf','Weltenbummler','5 Reiseziele gesammelt',IC.plane,K,function(){return Object.keys(S.auf.dest).length},5);
 mkStamp('a-dest15','auf','Vielflieger','15 Reiseziele gesammelt',IC.plane,B,function(){return Object.keys(S.auf.dest).length},15);
 mkStamp('a-dest24','auf','Einmal um die Welt','Alle 24 Reiseziele',IC.compass,C,function(){return Object.keys(S.auf.dest).length},24);
 mkStamp('a-tafel','auf','Tafel-Profi','5 Runden Abflugtafel',IC.tower,P,function(){return S.auf.rounds.tafel||0},5);
 mkStamp('a-kennz','auf','Kennzeichen-Kenner','5 Runden Kennzeichen',IC.flag,M,function(){return S.auf.rounds.kennz||0},5);
 /* Hangar */
 mkStamp('h-first','hgr','Erster Flug','Den ersten Papierflieger geworfen',IC.wing,T,function(){return S.hgr.log.length},1);
 mkStamp('h-fold','hgr','Faltmeister','Beide Modelle Schritt für Schritt gefaltet',IC.book,Y,function(){return(S.hgr.fold.pfeil?1:0)+(S.hgr.fold.gleiter?1:0)},2);
 mkStamp('h-both','hgr','Zwei Modelle','Beide Modelle getestet',IC.plane,K,function(){return Object.keys(S.hgr.models||{}).length},2);
 mkStamp('h-test','hgr','Testpilot','15 Testflüge',IC.gear,B,function(){return S.hgr.log.length},15);
 mkStamp('h-20','hgr','20-Meter-Club','Ein Flug über 20 Meter',IC.trophy,C,function(){return S.hgr.best>=20?1:0},1);
 mkStamp('h-loop','hgr','Looping!','Einen Überschlag geflogen',IC.star,P,function(){return S.hgr.looped?1:0},1);
 /* Wie fliegt das? */
 WISSEN.forEach(function(w){mkStamp('wis-'+w.id,'wie',w.t,'8 Aufgaben im Kapitel gemeistert',IC.bulb,w.c,function(){return chMastery(w).n},Math.min(8,w.qs.length))});
 mkStamp('wis-all','wie','Flug-Professor','Alle 8 Kapitel gemeistert',IC.trophy,C,function(){return WISSEN.filter(function(w){return chMastery(w).n>=Math.min(8,w.qs.length)}).length},8);
 /* Wunderwesen */
 WCATS.forEach(function(c){mkStamp('wcat-'+c[0],'wes',c[1],'Alle '+c[1]+' entdeckt',c[3],c[2],function(){return WESEN.filter(function(w){return w.c===c[0]&&S.wes.found[w.id]}).length},WESEN.filter(function(w){return w.c===c[0]}).length)});
 mkStamp('w-10','wes','Spürnase','10 Wesen entdeckt',IC.eye,T,function(){return Object.keys(S.wes.found).length},10);
 mkStamp('w-know','wes','Forscher','15 Wesen erforscht',IC.bulb,Y,function(){return Object.keys(S.wes.known).length},15);
 mkStamp('w-30','wes','Stadt-Entdecker','30 Wesen entdeckt',IC.map,C,function(){return Object.keys(S.wes.found).length},30);
 /* Rekorde */
 mkStamp('r-cats','rek','Rekordjäger','Alle 4 Rekord-Arten erkundet',IC.trophy,P,function(){return Object.keys(S.rek.cats||{}).length},4);
 mkStamp('r-10','rek','Schätz-Profi','10 Duelle richtig geschätzt',IC.star,Y,function(){return S.rek.right},10);
 mkStamp('r-streak','rek','Volltreffer-Serie','5 richtige Schätzungen am Stück',IC.check,C,function(){return S.rek.best},5);
 /* Tagebuch: one stamp per trip day */
 for(var i=0;i<6;i++)(function(i){mkStamp('tag-d'+i,'tag','Tag '+(i+1)+' erlebt','3 Erinnerungen an Tag '+(i+1),IC.heart,['#ECD06F','#49C5B6','#FF6A52','#B5D5FF','#B1EAC4','#FFB288'][i],function(){var d=tripDates()[i];return d?memsOn(d).length:0},3)})(i);
 mkStamp('tag-10','tag','Geschichtenerzähler','10 Erinnerungen mit eigenem Satz',IC.book,B,function(){return S.mem.filter(function(m){return m.note}).length},10);
 /* Stadtplan: one stamp per city day */
 CITY.forEach(function(d,i){mkStamp('stadt-'+d.id,'stadt','Tag '+(i+1)+' erkundet',d.title,IC.walk,['#ECD06F','#49C5B6','#FF6A52','#B5D5FF','#B1EAC4','#FFB288'][i%6],function(){return d.stops.filter(function(s){return S.stadt.done[s.id]}).length},Math.ceil(d.stops.length*0.6))});
 mkStamp('stadt-such','stadt','Such-Profi','3 Such-Listen ganz gefunden',IC.eye,T,function(){return CITY.filter(function(d){return d.spot.every(function(_,k){return S.wes.spot[d.id+'-'+k]})}).length},3);
})();
