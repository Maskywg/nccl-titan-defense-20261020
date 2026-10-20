window.__timelines=window.__timelines||{};
const scenes=[{"id": "prologue", "start": 0, "duration": 10}, {"id": "definition", "start": 10, "duration": 10}, {"id": "enemies", "start": 20, "duration": 10}, {"id": "abrasion", "start": 30, "duration": 10}, {"id": "erosion", "start": 40, "duration": 10}, {"id": "stress", "start": 50, "duration": 10}, {"id": "synergy", "start": 60, "duration": 10}, {"id": "shapes", "start": 70, "duration": 10}, {"id": "recession", "start": 80, "duration": 10}, {"id": "recon", "start": 90, "duration": 10}, {"id": "case", "start": 100, "duration": 10}, {"id": "restore", "start": 110, "duration": 10}, {"id": "materials", "start": 120, "duration": 10}, {"id": "ending", "start": 130, "duration": 10}, {"id": "sources", "start": 140, "duration": 10}, {"id": "branch", "start": 150, "duration": 10}];
let last=null;
const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
function activate(el){
 if(reduced)return;
 gsap.fromTo(el.querySelectorAll('[data-anim]'),{opacity:0,x:-50},{opacity:1,x:0,duration:.7,stagger:.1,ease:'power3.out',overwrite:true});
 const art=el.querySelector('.hero-art');if(art)gsap.fromTo(art,{scale:1.12,x:30},{scale:1,x:0,duration:3.4,ease:'power2.out',overwrite:true});
 const diagram=el.querySelector('.diagram');if(diagram)gsap.fromTo(diagram,{opacity:0,scale:1.14,x:70},{opacity:1,scale:1,x:0,duration:.9,ease:'power3.out',overwrite:true});
 gsap.fromTo(el.querySelector('.slash'),{opacity:.8,x:-1600},{opacity:0,x:1700,duration:.46,ease:'power3.in',overwrite:true});
 gsap.fromTo(el.querySelectorAll('.ember'),{y:70,opacity:0},{y:-190,opacity:.7,duration:4,stagger:.09,ease:'none',overwrite:true});
 const brush=el.querySelector('.brush');if(brush)gsap.fromTo(brush,{x:-25,y:20},{x:25,y:-20,duration:.35,repeat:13,yoyo:true,ease:'sine.inOut',overwrite:true});
 const drops=el.querySelectorAll('.acid-drop');if(drops.length)gsap.fromTo(drops,{y:-30,opacity:0},{y:220,opacity:.9,duration:1.5,stagger:.14,repeat:2,ease:'power1.in',overwrite:true});
 const load=el.querySelector('.load');if(load)gsap.fromTo(load,{y:-30},{y:15,duration:.45,repeat:7,yoyo:true,ease:'power2.in',overwrite:true});
 const patch=el.querySelector('.patch');if(patch)gsap.fromTo(patch,{opacity:0},{opacity:1,delay:.5,duration:1.4,overwrite:true});
 el.querySelectorAll('.route').forEach(path=>{const len=path.getTotalLength();gsap.fromTo(path,{strokeDasharray:len,strokeDashoffset:len},{strokeDashoffset:0,duration:1.3,ease:'power2.out',overwrite:true});});
}
function update(t){
 scenes.forEach(s=>{const el=document.getElementById('scene-'+s.id),active=t>=s.start&&t<s.start+s.duration;el.style.opacity=active?'1':'0';el.style.visibility=active?'visible':'hidden';el.style.pointerEvents=active?'auto':'none';if(active&&last!==s.id){last=s.id;activate(el);} });
 document.querySelectorAll('.fragment').forEach(el=>{const on=t+.001>=Number(el.dataset.reveal);if(el.dataset.shown!==(on?'1':'0')){el.dataset.shown=on?'1':'0';gsap.killTweensOf(el);if(on&&!reduced)gsap.fromTo(el,{opacity:0,x:-22},{opacity:1,x:0,duration:.35,overwrite:true});else{el.style.opacity=on?'1':'0';el.style.transform='none';}}});
}
const root=gsap.timeline({paused:true,onUpdate(){update(this.time())}});root.to({},{duration:160});window.__timelines.root=root;
scenes.forEach(s=>{const tl=gsap.timeline({paused:true});tl.to({},{duration:10});window.__timelines[s.id]=tl;});
window.__hfSetTime=update;update(.1);
function postTimeline(){parent.postMessage({source:'hf-preview',type:'timeline',durationInFrames:4800,scenes},'*');}window.addEventListener('load',postTimeline);postTimeline();
