(function(){
  function loadOnce(id,src){if(document.getElementById(id))return;var s=document.createElement('script');s.id=id;s.src=src;s.async=true;document.body.appendChild(s);}
  var p=document.getElementById('vposter'),f=document.getElementById('vframe');
  if(p&&f){p.addEventListener('click',function(){f.src=f.dataset.src;f.hidden=false;p.style.display='none';});}
  var box=document.querySelector('.hs-form-frame');
  if(box){
    var loaded=false;
    var load=function(){if(loaded)return;loaded=true;loadOnce('hs-form','https://js-eu1.hsforms.net/forms/embed/147994349.js');};
    if('IntersectionObserver' in window){new IntersectionObserver(function(e,o){if(e[0].isIntersecting){load();o.disconnect();}},{rootMargin:'400px'}).observe(box);}else{load();}
    var dlg=document.getElementById('cal'),opened=false;
    var open=function(){if(opened||!dlg)return;opened=true;loadOnce('hs-meet','https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js');if(dlg.showModal)dlg.showModal();else dlg.setAttribute('open','');};
    window.addEventListener('hs-form-event:on-submission:success',function(e){
      var id=e&&e.detail&&e.detail.formId;
      if(!id||id==='302a9dc1-44eb-4a73-abe2-047f1c1cc730')open();
    });
    var close=function(){dlg.close();opened=false;};
    var x=document.getElementById('calx');
    if(x)x.addEventListener('click',close);
    if(dlg)dlg.addEventListener('click',function(e){if(e.target===dlg)close();});
  }
})();
