/* ===== RUN & BASS CLUB — index.js (exclusivo do index.html) ===== */

var sections=['home','sobre','strava','eventos','djs','galeria','membros','duvidas','loja'];

function togglePlayer(){document.getElementById('sp-panel').classList.toggle('open');}

function toggleFaq(btn){var item=btn.closest('.faq-item');var open=item.classList.contains('open');document.querySelectorAll('.faq-item.open').forEach(function(el){el.classList.remove('open');});if(!open)item.classList.add('open');}

var observer=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){var id=e.target.id;document.querySelectorAll('.desk-nav a, #drawer a').forEach(function(a){var h=a.getAttribute('href');a.classList.toggle('active',h==='#'+id||(id==='home'&&h==='index.html'));});}});},{threshold:0.3,rootMargin:'-80px 0px -40% 0px'});
sections.forEach(function(id){var el=document.getElementById(id);if(el)observer.observe(el);});

// Carrega stats do Strava via JSON estático
fetch('assets/data/strava.json').then(function(r){return r.json();}).then(function(d){
  if(d.members)document.getElementById('stv-members').textContent=d.members;
  if(d.km)document.getElementById('stv-km').textContent=d.km;
  if(d.runs)document.getElementById('stv-runs').textContent=d.runs;
}).catch(function(){
  document.getElementById('stv-members').textContent='120+';
  document.getElementById('stv-km').textContent='5K+';
  document.getElementById('stv-runs').textContent='80+';
});

// Scroll reveal
var rvSel='section h2,section h3,section .lbl,section .desc,section .pil,.evc,.dj-card,.gi,.shcard,.faq-item,.plan,.spons-card,.ql,.aniv-strip,.ig-cta,.shop-cta,section .sobre-img,section .dj-stage-img,.stv-stat,.stv-cta,.wpp-cta';
var rvEls=document.querySelectorAll(rvSel);
rvEls.forEach(function(el){el.classList.add('rv');});
var rvObs=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(!e.isIntersecting)return;
    var el=e.target;
    var siblings=Array.from(el.parentElement.querySelectorAll('.rv:not(.show)'));
    var idx=siblings.indexOf(el);
    el.style.transitionDelay=Math.min(idx,3)*0.06+'s';
    el.classList.add('show');
    rvObs.unobserve(el);
  });
},{threshold:0.1,rootMargin:'0px 0px -32px 0px'});
rvEls.forEach(function(el){rvObs.observe(el);});

// Reflexo nas letras ol2
document.querySelectorAll('.ol2').forEach(function(el){el.setAttribute('data-text',el.textContent);});

// Paralaxe nas fotos
var plxEls=document.querySelectorAll('.page-hero img,.djs-hero img,.dj-stage-img');
plxEls.forEach(function(el){el.classList.add('parallax-img');});
var plxRaf=false;
window.addEventListener('scroll',function(){
  if(!plxRaf){plxRaf=true;requestAnimationFrame(function(){
    plxEls.forEach(function(el){
      var cnt=el.closest('.page-hero')||el.closest('.djs-hero')||el.closest('.dj-card')||el;
      var r=cnt.getBoundingClientRect();
      var vh=window.innerHeight;
      if(r.bottom<0||r.top>vh)return;
      var p=(r.top/vh);
      el.style.transform='translateY('+Math.round(p*20)+'px)';
    });
    plxRaf=false;
  });}
},{passive:true});
