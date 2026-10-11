(function(){const URL_='https://pycrafters-official.vercel.app/';
const D=[{k:'01',l:'School',t:'School Foundation',c:'#D8E4EC',d:'Spring Day Higher Secondary School, Jabalpur.',s:'Jabalpur · Foundation'},
{k:'02',l:'86%',t:'Class 10',c:'#B2B6C1',d:'Academic result: 86%.',s:'Spring Day Higher Secondary School'},
{k:'03',l:'88.4%',t:'Class 12',c:'#C8C9D3',d:'Academic result: 88.4%.',s:'Spring Day Higher Secondary School'},
{k:'04',t:'Engineering Journey',c:'#A2A3A8',img:'por',d:'Gyan Ganga Institute of Technology.',s:'B.Tech · Gyan Ganga Institute of Technology'},
{k:'05',l:'AIML',t:'B.Tech in AIML',c:'#869196',d:'Currently pursuing a Bachelor of Technology in Artificial Intelligence and Machine Learning.',s:'In progress'},
{k:'06',t:'Building Pycrafters',c:'#D8E4EC',img:'logo',d:'Started a company with my team while developing my technical skills and exploring real-world digital products.',s:'Company · Web · Automation',h:URL_}];
const n=D.length,w=document.getElementById('journey'),tk=document.getElementById('dtk'),inf=document.getElementById('inf'),dn=document.getElementById('dn'),dp=document.getElementById('dp'),rmq=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(pointer:fine)').matches;
const logo=document.querySelector('.lg'),por=document.getElementById('pimg');let idx=-1,pos=0,mx=0,my=0;
function go(i){const r=w.getBoundingClientRect(),span=r.height-innerHeight;scrollTo({top:scrollY+r.top+span*i/(n-1)})}
function show(i){idx=i;const o=D[i],a=document.getElementById('iv');document.getElementById('ik').textContent='Milestone '+o.k;document.getElementById('it2').textContent=o.t;document.getElementById('id2').textContent=o.d;document.getElementById('is').textContent=o.s;
if(o.h){a.hidden=false;a.href=o.h;a.target='_blank';a.rel='noopener'}else{a.hidden=true;a.removeAttribute('href')}
dn.textContent='0'+(i+1)+' / 0'+n;inf.classList.remove('go');void inf.offsetWidth;inf.classList.add('go')}
const els=D.map((o,i)=>{const b=document.createElement('button');b.type='button';b.className='d';b.setAttribute('aria-label','Milestone '+o.k+': '+o.t);
b.innerHTML='<span class="e e1"></span><span class="e e2"></span><span class="sh"></span><span class="f"><span class="rt"><span class="sp"></span></span><span class="lb"><b>'+o.k+'</b><i>'+(o.l||'')+'</i></span><span class="hh"></span><span class="gl"></span></span>';
const lb=b.querySelector('.lb');lb.style.setProperty('--lc',o.c);if(o.img){lb.classList.add('im');lb.style.backgroundImage='url("'+(o.img=='logo'?logo.src:por.src)+'")'}
const e={b,rt:b.querySelector('.rt'),a:i*50,h:false};
b.onclick=()=>{if(rmq){show(i);return}if(i!==idx)go(i);else if(o.h)window.open(o.h,'_blank','noopener')};b.onfocus=()=>{if(!rmq&&i!==idx)go(i);else show(i)};
b.onpointerenter=()=>e.h=true;b.onpointerleave=()=>e.h=false;tk.appendChild(b);return e});
let q=false;function upd(){q=false;if(rmq){if(idx<0)show(0);return}
const r=w.getBoundingClientRect(),H=innerHeight,W=innerWidth,sp=r.height-H,p=sp>0?Math.min(1,Math.max(0,-r.top/sp)):0,m=W<760,gap=m?.6:.34;pos=p*(n-1);
dp.style.transform='scaleX('+p+')';const ci=Math.round(pos);if(ci!==idx)show(ci);
els.forEach((e,i)=>{const d=i-pos,a=Math.abs(d),y=Math.sin(i*1.9)*H*.045;
e.b.style.transform='translate3d(calc(-50% + '+(d*gap*W-mx*30*(1+a*.5))+'px),calc(-50% + '+(y-my*20)+'px),'+(-a*220)+'px) rotateY('+(-d*26+mx*8)+'deg) rotateX('+(8-my*6)+'deg) scale('+(1-Math.min(a,3)*.09)+')';
e.b.style.opacity=a>(m?1.7:3.2)?0:Math.max(.4,1-a*.3);e.b.style.zIndex=50-Math.round(a*10)})}
function sch(){if(!q){q=true;requestAnimationFrame(upd)}}addEventListener('scroll',sch,{passive:true});addEventListener('resize',sch);
if(fine&&!rmq)addEventListener('pointermove',ev=>{mx=ev.clientX/innerWidth-.5;my=ev.clientY/innerHeight-.5;sch()});
let vis=false,last=0;function loop(t){if(!vis)return;const dt=Math.min(50,t-(last||t));last=t;els.forEach(e=>{e.a+=dt*.014*(e.h?.25:1);e.rt.style.transform='rotate('+(e.a+pos*70)+'deg)'});requestAnimationFrame(loop)}
if(!rmq)new IntersectionObserver(en=>{vis=en[0].isIntersecting;last=0;if(vis)requestAnimationFrame(loop)}).observe(w);
upd()})();
