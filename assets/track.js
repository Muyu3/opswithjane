/* OpsWithJane analytics: Google Analytics 4 + Microsoft Clarity, loaded only after the visitor accepts cookies. */
(function(){
  var GA_ID='G-RL9G4T93W1', CLARITY_ID='zi49o9pguz', KEY='owj_consent';
  var started=false;

  function getChoice(){try{return localStorage.getItem(KEY);}catch(e){return null;}}
  function setChoice(v){try{localStorage.setItem(KEY,v);}catch(e){}}

  function addScript(src){var s=document.createElement('script');s.async=true;s.src=src;document.head.appendChild(s);}

  function start(){
    if(started)return;started=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){dataLayer.push(arguments);};
    gtag('js',new Date());
    gtag('config',GA_ID);
    addScript('https://www.googletagmanager.com/gtag/js?id='+GA_ID);
    (function(c,l,a,r,i){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      var t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;
      var y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window,document,'clarity','script',CLARITY_ID);
    window.clarity('consent');
  }

  /* Send one event to both tools. Does nothing until consent is given. */
  function track(name,params){
    if(!started)return;
    params=params||{};params.page_path=location.pathname;
    try{window.gtag('event',name,params);}catch(e){}
    try{window.clarity('event',name);}catch(e){}
  }
  window.owjTrack=track;

  /* Clicks on calls to action */
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a');if(!a)return;
    var href=a.getAttribute('href')||'',text=(a.textContent||'').trim().slice(0,80);
    if(/^\/work-with-me/.test(href))track('cta_click',{link_text:text,cta_target:'enquiry_page'});
    else if(href.indexOf('meetings-eu1.hubspot.com')>-1)track('booking_link_click',{link_text:text});
    else if(href.indexOf('tally.so')>-1)track('leak_check_click',{link_text:text});
    else if(href.indexOf('mailto:')===0)track('email_click',{link_text:text});
  },true);

  /* HubSpot enquiry form submitted */
  window.addEventListener('hs-form-event:on-submission:success',function(){track('generate_lead',{form:'enquiry'});});

  /* HubSpot meeting booked inside the embedded calendar */
  window.addEventListener('message',function(e){
    if(!/hubspot\.com$/.test((e.origin||'').replace(/^https?:\/\//,'')))return;
    if(e.data&&e.data.meetingBookSucceeded)track('book_call',{method:'embedded_calendar'});
  });

  /* Consent banner */
  function css(){
    var s=document.createElement('style');
    s.textContent='#owj-cc{position:fixed;left:1rem;right:1rem;bottom:1rem;z-index:9999;max-width:520px;margin:0 auto;background:var(--bg,#FBF8F4);color:var(--ink,#46352E);border:1.5px solid var(--line,#e8dbcf);border-radius:14px;box-shadow:0 8px 30px rgba(70,53,46,.15);padding:1rem 1.2rem;font-size:.9rem;line-height:1.5}'+
      '#owj-cc p{margin:0 0 .8rem}#owj-cc .row{display:flex;gap:.6rem;flex-wrap:wrap}#owj-cc button{padding:.5rem 1.1rem}';
    document.head.appendChild(s);
  }
  function banner(){
    if(document.getElementById('owj-cc'))return;
    css();
    var d=document.createElement('div');d.id='owj-cc';d.setAttribute('role','dialog');d.setAttribute('aria-label','Cookie choice');
    d.innerHTML='<p>Can I use cookies to see which pages help agency owners most? It tells me what to improve. No ads, and your form answers are never recorded. <a href="/privacy">Privacy policy</a></p>'+
      '<div class="row"><button type="button" class="btn btn-p" data-c="granted">That\'s fine</button><button type="button" class="btn" data-c="denied">No thanks</button></div>';
    d.addEventListener('click',function(e){
      var v=e.target.getAttribute&&e.target.getAttribute('data-c');if(!v)return;
      setChoice(v);d.remove();
      if(v==='granted')start();
    });
    document.body.appendChild(d);
  }

  /* "Cookie settings" link in the footer so people can change their mind */
  function footerLink(){
    var f=document.querySelector('footer .flinks');if(!f)return;
    var a=document.createElement('a');a.href='#';a.textContent='Cookie settings';
    a.addEventListener('click',function(e){
      e.preventDefault();
      if(getChoice()==='granted'){setChoice('denied');location.reload();}
      else banner();
    });
    f.appendChild(a);
  }

  function init(){
    var c=getChoice();
    if(c==='granted')start();else if(!c)banner();
    footerLink();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
