(function(){
 var C={lng:'#5FC6E8',ref:'#FFB066',clean:'#5BE3A8',hq:'#F4F7F9',hub:'#E07A1F',petro:'#C79BFF'};
 var L={lng:'LNG & Gas',ref:'Refining',clean:'Clean Energy',hq:'Headquarters',hub:'Regional focus',petro:'Petrochemicals'};
 var pop,scrim,isopen=false;
 function esc(t){return (t==null?"":String(t)).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
 function hide(){if(!isopen)return;isopen=false;if(scrim)scrim.classList.remove('show');
  if(pop){pop.classList.remove('show');pop.classList.add('closing');
   var done=function(){pop.style.display='none';if(scrim)scrim.style.display='none';pop.classList.remove('closing');pop.removeEventListener('animationend',done);};
   pop.addEventListener('animationend',done);}}
 function ensure(){if(pop)return;
  scrim=document.createElement('div');scrim.className='gm-popup-scrim';scrim.addEventListener('click',hide);
  pop=document.createElement('div');pop.className='gm-popup';pop.style.display='none';
  document.body.appendChild(scrim);document.body.appendChild(pop);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')hide();});
  window.addEventListener('scroll',function(){if(isopen)hide();},{passive:true});
  window.addEventListener('resize',function(){if(isopen)hide();});}
 window.showProjectPopup=function(cx,cy,d){ensure();var col=C[d.cat]||'#5FC6E8';
  pop.style.borderColor=col;pop.style.borderTopColor=col;
  pop.innerHTML=BTN
   +CAT(col)+esc(L[d.cat]||"")+"</div>"
   +'<div class="gm-popup-name">'+esc(d.name)+"</div>"
   +(d.place?'<div class="gm-popup-place">'+esc(d.place)+"</div>":"")
   +(d.work?'<div class="gm-sec work"><div class="gm-sec-h">The work</div><p>'+esc(d.work)+"</p></div>":"")
   +(d.value?'<div class="gm-sec value"><div class="gm-sec-h">The value</div><p>'+esc(d.value)+"</p></div>":"");
  pop.querySelector('.gm-popup-x').onclick=hide;
  pop.classList.remove('closing');pop.style.display='block';
  var pw=pop.offsetWidth,ph=pop.offsetHeight,vw=innerWidth,vh=innerHeight,m=12;var px=cx+16,py=cy-20;
  if(px+pw>vw-m)px=cx-pw-16;if(px<m)px=m;if(px+pw>vw-m)px=vw-pw-m;if(py+ph>vh-m)py=vh-ph-m;if(py<m)py=m;
  pop.style.left=px+'px';pop.style.top=py+'px';
  pop.classList.remove('show');void pop.offsetWidth;pop.classList.add('show');
  scrim.style.display='block';requestAnimationFrame(function(){scrim.classList.add('show');});isopen=true;};
 var BTN='<button class="gm-popup-x" aria-label="Close">\u00d7</button>';
 function CAT(col){return '<div class="gm-popup-cat" style="color:'+col+'"><span style="background:'+col+'"></span>';}
})();
