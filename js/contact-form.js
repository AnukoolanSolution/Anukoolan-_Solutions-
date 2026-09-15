/* Contact form — submit in the background (no page change) and confirm.
   Uses FormSubmit's AJAX endpoint so the visitor stays on the page. */
(function(){
  const form=document.getElementById('contactForm');
  if(!form) return;
  const btn=document.getElementById('contactSubmit');
  const statusEl=document.getElementById('formStatus');
  const btnHTML=btn.innerHTML;
  const ENDPOINT='https://formsubmit.co/ajax/info@anukoolan.com';

  const show=(msg,kind)=>{ statusEl.textContent=msg; statusEl.className=kind; statusEl.hidden=false; };

  form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    if(form._honey && form._honey.value) return;              // spam bot
    if(!form.checkValidity()){ form.reportValidity(); return; }

    statusEl.hidden=true; statusEl.className='';
    btn.disabled=true; btn.textContent='Sending…';

    try{
      const res=await fetch(ENDPOINT,{
        method:'POST',
        headers:{'Accept':'application/json'},
        body:new FormData(form)
      });
      let data={};
      try{ data=await res.json(); }catch(_){}
      const ok=res.ok && String(data.success).toLowerCase()==='true';
      if(ok){
        form.querySelectorAll('.field').forEach(el=>el.style.display='none');
        btn.style.display='none';
        show('✓ Message sent — thank you. We’ll reply within one business day.','ok');
      }else if(data && data.message){
        // The server answered but didn't accept it yet — most often the one-time
        // "confirm your email" step. Show its own words so it's actionable.
        btn.disabled=false; btn.innerHTML=btnHTML;
        show(data.message,'err');
      }else{
        throw new Error('no-response');
      }
    }catch(err){
      // fetch itself failed — usually offline, or the file is being opened
      // locally (file://) instead of from the live https site.
      btn.disabled=false; btn.innerHTML=btnHTML;
      show('Couldn’t reach the mail service. If you’re opening this file directly on your computer, try it on your live website link instead — otherwise please email us at info@anukoolan.com.','err');
    }
  });
})();
