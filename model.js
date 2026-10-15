// BP model (modeled estimates): minutes since midnight -> {energy, happiness, phase}
(function(g){
const sm=t=>t<=0?0:t>=1?1:t*t*(3-2*t);
const AM=[[360,30,50],[420,85,82],[480,80,78],[570,52,60],[600,45,56],[660,22,45],[670,22,45],[690,78,85]];
const K={
 work:AM.concat([[720,72,82],[840,45,62],[900,35,55],[1000,12,38],[1020,10,36],[1080,45,62],[1140,60,75],[1200,62,78],[1260,48,70],[1320,30,60]]),
 tue:AM.concat([[720,80,88],[840,72,86],[900,66,84],[1020,70,85],[1140,65,82],[1260,50,74],[1320,35,65]]),
 fri:[[360,20,45],[450,55,65],[540,72,78],[660,80,85],[780,76,86],[900,62,80],[960,58,78],[1080,70,86],[1200,66,84],[1320,40,70]],
 sat:[[360,10,40],[480,15,48],[570,55,72],[660,78,88],[780,84,92],[900,68,84],[990,60,80],[1110,74,88],[1230,64,82],[1320,45,72]],
 sun:[[360,10,40],[510,20,52],[600,60,76],[720,76,88],[840,70,84],[960,58,74],[1080,62,72],[1200,52,66],[1320,32,56]]};
const KEY=['sun','work','tue','work','work','fri','sat'];
function interp(k,m){if(m<=k[0][0])return[k[0][1],k[0][2]];
 for(let i=1;i<k.length;i++)if(m<=k[i][0]){const a=k[i-1],b=k[i],s=sm((m-a[0])/(b[0]-a[0]));return[a[1]+(b[1]-a[1])*s,a[2]+(b[2]-a[2])*s];}
 const l=k[k.length-1];return[l[1],l[2]];}
function phase(day,m){const wk=day>=1&&day<=4,works=[1,3,4].includes(day);
 if(m>=1200)return 'Evening wind-down';
 if(wk){if(m<420)return 'Morning wake-up';if(m<670)return 'Study session — declining';if(m<690)return 'Pre-break recovery';
  if(works)return m<1020?'Work shift — declining':'Evening recovery';return 'Free afternoon — stable';}
 if(m<(day==5?450:570))return 'Off day — wake-up';if(m<840)return 'Off day — midday peak';if(m<1020)return 'Off day — afternoon dip';return 'Off day — evening';}
function calc(day,m){let[e,h]=interp(K[KEY[day]],m);
 const n=Math.sin(m*0.13+day*7)*1.2+Math.sin(m*0.047+day*3)*0.8;e+=n;h+=n*0.7;
 const c=x=>Math.round(Math.max(3,Math.min(100,x)));return{energy:c(e),happiness:c(h),phase:phase(day,m)};}
g.BP={calc};if(typeof module!=='undefined')module.exports=g.BP;
})(typeof window!=='undefined'?window:globalThis);
