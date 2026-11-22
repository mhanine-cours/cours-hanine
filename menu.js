/* Menu commun : bouton « Menu » sur téléphone */
(function(){
  var b=document.getElementById('burger'),m=document.getElementById('menu');
  if(!b||!m)return;
  b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o);});
  m.addEventListener('click',function(e){if(e.target.closest('a'))m.classList.remove('open');});
})();
