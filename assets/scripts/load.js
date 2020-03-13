var t=setTimeout("newfunction()",1000);
      
function newfunction(){
  var mysrc=document.createElement('script');
  mysrc.src="assets/scripts/cart.js";
  document.getElementsByTagName('head')[0].appendChild(mysrc); 
}

var t=setTimeout("func()",3000);
      
function func(){
  var script=document.createElement('script');
  script.src="assets/scripts/history.js";
  document.getElementsByTagName('head')[0].appendChild(script); 
}