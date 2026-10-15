// BP model: minutes since midnight -> {energy, happiness, phase}
(function(g){
const sm=t=>t<=0?0:t>=1?1:t*t*(3-2*t);
function study(m){ // 420..690
  const t=(m-420)/270;
  let e=95-55*Math.pow(t,1.3)-6*Math.exp(-Math.pow((m-570)/25,2));
  let h=92-40*Math.pow(t,1.1)-8*Math.exp(-Math.pow((m-570)/25,2));
  const s=sm((m-670)/20); e+= s*(88-e); h+= s*(95-h); return [e,h];
}
function work(m){ // 690..1020
  const t=(m-690)/330;
  let e=85-60*Math.pow(t,1.2)-5*Math.exp(-Math.pow((m-870)/30,2));
  let h=90-50*Math.pow(t,1.1); return [e,h];
}
function calc(day,m){ // day 0=Sun
  let e,h,p;
  const wk=day>=1&&day<=4, works=[1,3,4].includes(day);
  if(!wk){ e=80+5*Math.sin(m/90); h=90+4*Math.sin(m/120); p=m<540?'Off day — morning':'Off day';
    if(m<480){e=60+sm((m-360)/120)*20;} }
  else if(m<420){ e=55+sm((m-360)/60)*40; h=60+sm((m-360)/60)*32; p='Pre-session'; }
  else if(m<670){ [e,h]=study(m); p='Study session — declining'; }
  else if(m<690){ [e,h]=study(m); p='Pre-break recovery'; }
  else if(works&&m<1020){ [e,h]=work(m); p='Work shift — declining'; }
  else if(works){ const s=sm((m-1020)/60); e=25+s*45; h=40+s*50; p='Evening recovery'; }
  else { e=85-5*sm((m-690)/400); h=94; p='Free afternoon — stable'; }
  const c=x=>Math.round(Math.max(3,Math.min(100,x)));
  return {energy:c(e),happiness:c(h),phase:p};
}
g.BP={calc};
if(typeof module!=='undefined')module.exports=g.BP;
})(typeof window!=='undefined'?window:globalThis);
