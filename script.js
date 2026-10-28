(function(){
  var btn=document.querySelector('.menu-btn'), menu=document.getElementById('menu');
  function set(o){btn.setAttribute('aria-expanded',String(o));btn.setAttribute('aria-label',o?'Close menu':'Open menu');menu.classList.toggle('open',o);}
  btn.addEventListener('click',function(){set(btn.getAttribute('aria-expanded')!=='true');});
  menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){set(false);});});
  // Topic chips open their FAQ group.
  function openHash(){var h=location.hash;if(h.indexOf('#faq-')===0){var d=document.querySelector(h);if(d)d.open=true;}}
  window.addEventListener('hashchange',openHash);openHash();
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false);});

  // Contact form. The old form submitted to Squarespace's own form storage, which only works on Squarespace.
  // Until a form service is connected, this opens the visitor's email app with the same fields filled in.
  var form=document.getElementById('contact-form');
  form.addEventListener('submit',function(ev){
    ev.preventDefault();
    if(!form.reportValidity())return;
    var f=form.elements, name=(f.fname.value+' '+f.lname.value).trim();
    var body='Name: '+name+'\nEmail: '+f.email.value+'\n\n'+f.message.value;
    window.location.href='mailto:'+form.getAttribute('data-to')+'?subject='+encodeURIComponent('Website enquiry'+(name?' from '+name:''))+'&body='+encodeURIComponent(body);
    form.querySelector('.form-note').textContent='Opening your email app to send your message to our team.';
  });

  // Gentle fade-in on scroll, skipped for reduced motion.
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
    var els=document.querySelectorAll('.hero-head, .hero-media, .sec-head, .welcome-grid, .offer-media, .offer, .offer-foot, .band-head, .diagram, .band-card, .brand-card, .masks-media, .mask-row, .quote, .faq-group, .loc, .aff-copy, .contact-copy, .form');
    document.documentElement.classList.add('js-reveal');
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{rootMargin:'0px 0px -8% 0px',threshold:0.05});
    els.forEach(function(el,i){el.classList.add('reveal');el.style.transitionDelay=((i%3)*80)+'ms';io.observe(el);});
  }
})();
