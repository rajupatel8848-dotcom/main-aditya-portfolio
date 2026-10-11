(function(){var d=document,H=d.documentElement,l=d.getElementById('ldr');H.classList.add('ld');window.__t0=Infinity;
function fin(){H.classList.remove('ld');window.__t0=performance.now()}
if(matchMedia('(prefers-reduced-motion:reduce)').matches){fin();l.style.display='none';return}
var nm=l.querySelector('.ld-name');[['Aditya','wa'],['PATEL','wb']].forEach(function(p){var s=d.createElement('span');s.className='ld-w '+p[1];for(var i=0;i<p[0].length;i++){var e=d.createElement('i');e.textContent=p[0][i];e.style.animationDelay=(.15+i*.06)+'s';s.appendChild(e)}nm.appendChild(s)});
var loaded=d.readyState==='complete',s0=performance.now(),n=d.getElementById('ldn'),b=d.getElementById('ldb'),shown=0,ended=false;addEventListener('load',function(){loaded=true});
function tick(now){var el=now-s0,tg=100*(1-Math.pow(1-Math.min(1,el/2300),3));if(!loaded)tg=Math.min(tg,92);shown=tg>=99.9?100:tg;
n.textContent=String(Math.round(shown)).padStart(3,'0')+'%';b.style.transform='scaleX('+shown/100+')';
if(shown>=100&&!ended){ended=true;setTimeout(function(){l.classList.add('out');fin();setTimeout(function(){l.style.display='none'},1100)},200);return}requestAnimationFrame(tick)}
requestAnimationFrame(tick)})();
