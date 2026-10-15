const D=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
function ct(){const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',weekday:'short',hour:'numeric',minute:'numeric',hourCycle:'h23'}).formatToParts(new Date());
const o={};p.forEach(x=>o[x.type]=x.value);return{day:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(o.weekday),m:(+o.hour%24)*60+ +o.minute,txt:o.weekday+' '+o.hour+':'+o.minute+' CT'};}
const face=v=>v>80?'😄':v>60?'🙂':v>40?'😐':v>25?'😩':'🧟';
const sel=document.getElementById('day');D.forEach((d,i)=>sel.add(new Option(d,i)));
function now(){const t=ct(),r=BP.calc(t.day,t.m-t.m%10);
now_.textContent='('+t.txt+')';ev.textContent=r.energy;hv.textContent=r.happiness;ef.style.width=r.energy+'%';hf.style.width=r.happiness+'%';
efc.textContent=face(r.energy);hfc.textContent=face(r.happiness);st.textContent=r.phase;return t;}
const now_=document.getElementById('now');
function draw(){const c=document.getElementById('c'),x=c.getContext('2d'),W=c.width,H=c.height,L=30,B=24;
x.clearRect(0,0,W,H);x.font='11px sans-serif';x.fillStyle='#888';x.strokeStyle='#eee';
for(let h=6;h<=22;h+=2){const X=L+(h-6)/16*(W-L-5);x.beginPath();x.moveTo(X,0);x.lineTo(X,H-B);x.stroke();x.fillText((h%12||12)+(h<12?'a':'p'),X-8,H-8);}
for(let v=0;v<=100;v+=25){const Y=(H-B)*(1-v/100);x.fillText(v,2,Y+4);}
[['energy','#ffb300'],['happiness','#ec407a']].forEach(([k,col])=>{x.strokeStyle=col;x.lineWidth=3;x.beginPath();
for(let m=360;m<=1320;m+=10){const r=BP.calc(+sel.value,m),X=L+(m-360)/960*(W-L-5),Y=(H-B)*(1-r[k]/100);m==360?x.moveTo(X,Y):x.lineTo(X,Y);}x.stroke();});
x.lineWidth=1;}
sel.onchange=draw;const t=now();sel.value=t.day;draw();setInterval(now,60000);
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
