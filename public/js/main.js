document.documentElement.classList.add('js');
const $=s=>document.querySelector(s),RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
$('#y').textContent=new Date().getFullYear();
// nav
const nv=$('#nv'),mn=$('#mn'),mb=$('#mb');
mb.onclick=()=>{const o=mn.classList.toggle('o');mb.setAttribute('aria-expanded',o)};
mn.onclick=e=>{if(e.target.tagName=='A'){mn.classList.remove('o');mb.setAttribute('aria-expanded',false)}};
const links=[...mn.querySelectorAll('a')];
// reveal + active
document.querySelectorAll('h2').forEach(x=>{x.innerHTML='<span class="hm"><span>'+x.innerHTML+'</span></span>'});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.rv,.st,h2,.pj').forEach(x=>io.observe(x));
const secs=['about','projects','journey','skills','services','contact'].map(i=>document.getElementById(i));
const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')=='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
secs.forEach(s=>io2.observe(s));
// scroll: nav bg, timeline progress, portrait parallax
const pimg=$('#pimg');
function onS(){nv.classList.toggle('sc',scrollY>40)}
addEventListener('scroll',onS,{passive:true});onS();
document.querySelectorAll('.pt,.lg').forEach(e=>e.dataset.par='.06');document.querySelectorAll('.pi span').forEach(e=>e.dataset.par='.16');
const it=$('#it');it.innerHTML=it.textContent.trim().split(/\s+/).map(w=>'<span class="w">'+w+'</span>').join(' ');const words=[...it.children],isec=$('#intro');
const bar=$('#bar'),hg=document.querySelector('.hg'),cvx=$('#cv'),mq=$('#mq'),mq2=$('#mq2'),mw=document.querySelector('.mqw'),pars=[...document.querySelectorAll('[data-par]')];const hl=document.querySelector('.hl'),hrr=document.querySelector('.hr');let tk=false;
function tick(){tk=false;const y=scrollY,H=innerHeight,dh=document.documentElement.scrollHeight-H;bar.style.transform='scaleX('+(dh>0?y/dh:0)+')';
const p=Math.min(1,Math.max(0,y/H));window.__p=RM?0:p;
{const r=isec.getBoundingClientRect(),q=Math.min(1,Math.max(0,(H*.8-r.top)/(r.height*.8))),n=RM?words.length:Math.round(q*words.length);words.forEach((w,i)=>w.classList.toggle('on',i<n))}
if(RM)return;
hl.style.transform='translateY('+(-p*70)+'px)';hrr.style.transform='translateY('+(-p*45)+'px)';hg.style.opacity=Math.max(0,1-p*1.15);cvx.style.opacity=Math.max(.1,1-p*.8);
const d=(H-mw.getBoundingClientRect().top)*.4;mq.style.transform='translateX('+(-d)+'px)';mq2.style.transform='translateX('+(d-700)+'px)';
pars.forEach(e=>{const r=e.parentElement.getBoundingClientRect();e.style.setProperty('--py',(-(r.top+r.height/2-H/2)*e.dataset.par)+'px')})}
addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(tick)}},{passive:true});addEventListener('resize',tick);tick();
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);if(RM)return;const el=e.target,t=+el.dataset.count,dc=+(el.dataset.dec||0),s=performance.now();(function f(n){const k=Math.min(1,(n-s)/1400);el.textContent=(t*(1-Math.pow(1-k,3))).toFixed(dc);if(k<1)requestAnimationFrame(f)})(s)}),{threshold:.6});
document.querySelectorAll('[data-count]').forEach(x=>co.observe(x));
if(!RM&&matchMedia('(pointer:fine)').matches){$('#pt').addEventListener('mousemove',e=>{const r=e.currentTarget.getBoundingClientRect();pimg.style.transform=`translate(${(e.clientX-r.left-r.width/2)/r.width*10}px,${(e.clientY-r.top-r.height/2)/r.height*10}px) scale(1.02)`});$('#pt').addEventListener('mouseleave',()=>pimg.style.transform='')}
// form -> POST /api/contact (server sends the email; success is shown only after the server confirms)
const f=$('#f'),fs=$('#fs'),formOpened=Date.now();let sending=false;
f.onsubmit=async ev=>{ev.preventDefault();if(sending)return;if($('#hp').value)return;let ok=true;
[['#n',v=>v.trim().length>1,'Please enter your name.'],['#e',v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),'Enter a valid email.'],['#m',v=>v.trim().length>9,'Please write a few more words.']].forEach(([s,t,m])=>{const el=$(s),b=t(el.value);el.parentNode.querySelector('.er').textContent=b?'':m;if(!b)ok=false});
if(!ok){fs.textContent='Please fix the highlighted fields.';return}
const sb=$('#sb');sending=true;sb.disabled=true;sb.textContent='Sending…';fs.textContent='';
try{const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:$('#n').value,email:$('#e').value,type:$('#t').value,message:$('#m').value,hp:$('#hp').value,elapsed:Date.now()-formOpened})});
let d={};try{d=await r.json()}catch(e){}
if(r.ok&&d.ok){f.reset();fs.textContent='Thank you! Your message has been sent. I will reply by email soon.'}
else fs.textContent=d.error||'Sorry, your message could not be sent. Please email me directly at rajupatel8848@gmail.com.'}
catch(e){fs.textContent='Network error. Please try again or email me directly at rajupatel8848@gmail.com.'}
finally{sending=false;sb.disabled=false;sb.textContent='Send message'}};
