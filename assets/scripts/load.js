function loadCart(){
  var mysrc=document.createElement('script');
  mysrc.src="assets/scripts/cart.js";
  document.getElementsByTagName('head')[0].appendChild(mysrc); 
}

function loadList(){
  var mysrc=document.createElement('script');
  mysrc.src="assets/scripts/list.js";
  document.getElementsByTagName('head')[0].appendChild(mysrc); 
}
      
function loadHistory(){
  var script=document.createElement('script');
  script.src="assets/scripts/history.js";
  document.getElementsByTagName('head')[0].appendChild(script); 
}