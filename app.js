const D=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const $=id=>document.getElementById(id);
function ct(){const o={};new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',weekday:'short',hour:'numeric',minute:'numeric',hourCycle:'h23'}).formatToParts(new Date()).forEach(x=>o[x.type]=x.value);
return{day:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(o.weekday),m:(+o.hour%24)*60+ +o.minute,txt:o.weekday+' '+o.hour+':'+o.minute+' CT'};}
const fmt=m=>{const h=Math.floor(m/60)%24,mm=String(m%60).padStart(2,'0');return (h%12||12)+':'+mm+(h<12?' AM':' PM');};
function next(day,m){const p=BP.calc(day,m).phase;for(let t=m-m%10+10;t<1440;t+=10)if(BP.calc(day,t).phase!==p)return fmt(t)+' — '+BP.calc(day,t).phase;return 'None today';}
D.forEach((d,i)=>$('day').add(new Option(d,i)));
function now(){const t=ct(),r=BP.calc(t.day,t.m-t.m%10);$('now').textContent=t.txt;$('ev').textContent=r.energy;$('hv').textContent=r.happiness;
$('ef').style.width=r.energy+'%';$('hf').style.width=r.happiness+'%';$('st').textContent=r.phase;$('nx').textContent=next(t.day,t.m);return t;}
function draw(){const c=$('c'),x=c.getContext('2d'),W=c.width,H=c.height,L=40,R=24,T=10,B=28,pw=W-L-R,ph=H-T-B;
x.clearRect(0,0,W,H);x.font='12px Arial,sans-serif';x.lineWidth=1;
for(let v=0;v<=100;v+=20){const Y=T+ph*(1-v/100);x.strokeStyle='#263041';x.beginPath();x.moveTo(L,Y);x.lineTo(W-R,Y);x.stroke();x.fillStyle='#8b95a5';x.fillText(v+'%',4,Y+4);}
for(let h=6;h<=22;h+=2){const X=L+(h-6)/16*pw;x.strokeStyle='#1f2836';x.beginPath();x.moveTo(X,T);x.lineTo(X,T+ph);x.stroke();x.fillStyle='#8b95a5';x.fillText(fmt(h*60).replace(':00',''),X-14,H-8);}
x.strokeStyle='#475569';x.beginPath();x.moveTo(L,T);x.lineTo(L,T+ph);x.lineTo(W-R,T+ph);x.stroke();
[['energy','#4f8cff'],['happiness','#2ec4a6']].forEach(([k,col])=>{x.strokeStyle=col;x.lineWidth=2;x.beginPath();
for(let m=360;m<=1320;m+=10){const X=L+(m-360)/960*pw,Y=T+ph*(1-BP.calc(+$('day').value,m)[k]/100);m==360?x.moveTo(X,Y):x.lineTo(X,Y);}x.stroke();});}
$('day').onchange=draw;const t=now();$('day').value=t.day;draw();setInterval(now,60000);
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
