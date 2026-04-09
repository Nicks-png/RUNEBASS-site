/* ===== RUN & BASS CLUB — main.js (compartilhado) ===== */

var menuOpen=false;
function toggleMenu(){menuOpen=!menuOpen;document.getElementById('drawer').classList.toggle('open',menuOpen);document.getElementById('b1').style.transform=menuOpen?'rotate(45deg) translate(4px,4px)':'';document.getElementById('b2').style.opacity=menuOpen?'0':'1';document.getElementById('b3').style.transform=menuOpen?'rotate(-45deg) translate(4px,-4px)':'';}
function closeMenu(){menuOpen=false;document.getElementById('drawer').classList.remove('open');document.getElementById('b1').style.transform='';document.getElementById('b2').style.opacity='1';document.getElementById('b3').style.transform='';}
document.querySelectorAll('#drawer a[href^="#"]').forEach(function(a){a.addEventListener('click',closeMenu);});
var pbar=document.getElementById('pbar');var pbarRaf=false;
window.addEventListener('scroll',function(){if(!pbarRaf){pbarRaf=true;requestAnimationFrame(function(){var d=document.documentElement;if(pbar)pbar.style.width=(d.scrollTop/(d.scrollHeight-d.clientHeight)*100)+'%';pbarRaf=false;});}},{passive:true});
