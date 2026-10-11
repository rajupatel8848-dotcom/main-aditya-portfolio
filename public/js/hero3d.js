// 3D hero
(function(){const cv=$('#cv');let R;try{R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true})}catch(e){$('#fb').style.display='block';return}
R.setPixelRatio(Math.min(devicePixelRatio,2));const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(40,1,.1,100);C.position.set(0,1.1,9);C.lookAt(0,-.1,0);
S.fog=new THREE.Fog(0x000000,15,32);
const vs='varying vec3 vN;varying vec3 vP;void main(){vN=normalize(normalMatrix*normal);vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}';
const fsr=`uniform float t;uniform float a;varying vec3 vN;varying vec3 vP;
vec3 pal(float x){vec3 ic=vec3(.97,.98,1.),ie=vec3(.62,.93,1.),tq=vec3(.1,.82,.8),vi=vec3(.55,.3,.96),mg=vec3(.95,.2,.8),pb=vec3(.65,.78,1.);float k=fract(x)*6.;if(k<1.)return mix(ic,ie,k);if(k<2.)return mix(ie,tq,k-1.);if(k<3.)return mix(tq,vi,k-2.);if(k<4.)return mix(vi,mg,k-3.);if(k<5.)return mix(mg,pb,k-4.);return mix(pb,ic,k-5.);}
void main(){vec3 p=vP*.6;float w=sin(p.x*3.+t*.4+sin(p.y*2.5+t*.3)*1.6)+sin(p.y*3.2-t*.35+sin(p.z*2.+t*.2)*1.4)+sin((p.x+p.z)*2.4+t*.25);
float f=pow(1.-max(dot(normalize(vN),vec3(0,0,1)),0.),2.);vec3 c=pal(w*.17+.3+f*.2);c=mix(c,vec3(.95,.97,1.),.1+f*.35);
float h=pow(max(dot(normalize(vN),normalize(vec3(-.5,.7,.8))),0.),30.);c+=h*.5;gl_FragColor=vec4(c,a);}`;
const mk=a=>new THREE.ShaderMaterial({uniforms:{t:{value:0},a:{value:a}},vertexShader:vs,fragmentShader:fsr,transparent:a<1});
const m1=mk(1),m2=mk(.32),g=new THREE.SphereGeometry(2,96,96),sp=new THREE.Mesh(g,m1),rf=new THREE.Mesh(g,m2);S.add(sp,rf);
// floor
const fg=new THREE.PlaneGeometry(40,40,160,160);fg.rotateX(-Math.PI/2);const ps=fg.attributes.position;
const n=(x,z)=>Math.sin(x*.7)*Math.cos(z*.6)*.5+Math.sin(x*1.9+z*1.3)*.22+Math.abs(Math.sin(x*3.1)*Math.sin(z*2.7))*.2;
for(let i=0;i<ps.count;i++){const x=ps.getX(i),z=ps.getZ(i);ps.setY(i,n(x,z)*1.05*Math.min(1,Math.hypot(x,z)/5))}fg.computeVertexNormals();
const fl=new THREE.Mesh(fg,new THREE.MeshStandardMaterial({color:0x2a3a44,roughness:.3,metalness:.55,flatShading:true}));fl.position.y=-2.8;S.add(fl);
S.add(new THREE.AmbientLight(0x9fb4bf,.3));const l1=new THREE.PointLight(0x2fe0e8,1.3,18);l1.position.set(-4,1,3);const l2=new THREE.PointLight(0xD8E4EC,1.3,22);l2.position.set(4,5,4);const l3=new THREE.PointLight(0x8a5cff,.7,16);l3.position.set(4,0,2);S.add(l1,l2,l3);
let mx=0,my=0,sy=0,t0=performance.now();addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
function rs(){const w=cv.clientWidth,h=cv.clientHeight;R.setSize(w,h,false);C.aspect=w/h;const m=w<860;C.position.z=m?15:11;C.fov=m?46:40;C.updateProjectionMatrix();sy=m?2.4:0}rs();addEventListener('resize',rs);
let vis=true;new IntersectionObserver(e=>vis=e[0].isIntersecting).observe($('#hero'));
function fr(now){requestAnimationFrame(fr);if(!vis)return;const t=Math.max(0,(now-(window.__t0===undefined?t0:window.__t0))/1000),k=RM?1:Math.min(1,t/1.8),ez=1-Math.pow(1-k,3);
const fy=RM?0:Math.sin(t*.8)*.18,by=.9+sy-(1-ez)*1.6;sp.position.set(0,by+fy,0);sp.rotation.y=RM?0:t*.12;sp.rotation.x=my*.3;sp.position.x=mx*.5;const P=window.__p||0,sc=1-P*.28;sp.position.y+=P*1.5;sp.scale.setScalar(sc);sp.rotation.y+=P*3;sp.rotation.x+=P*.7;
rf.position.set(sp.position.x,-4.8-(by+fy-(.9+sy))*.0-(by+fy)+(-2.4*2)+ (2.4*0),0);rf.position.y=2*-2.8-sp.position.y-.1;rf.scale.set(sc,-sc,sc);rf.rotation.copy(sp.rotation);
m1.uniforms.t.value=m2.uniforms.t.value=t;l1.intensity=(1.3+(RM?0:Math.sin(t*.6)*.25)+P*1.4)*ez;l2.intensity=1.3*ez;l3.intensity=.7*ez;fl.position.z=P*2;m1.uniforms.a.value=ez;m2.uniforms.a.value=.32*ez*(1-P*.5);C.position.x=mx*.4;C.lookAt(0,-.1,0);R.render(S,C)}
requestAnimationFrame(fr)})();
