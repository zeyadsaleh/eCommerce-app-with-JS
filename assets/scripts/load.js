var t=setTimeout("newfunction()",1400);
      
function newfunction(){
  var mysrc=document.createElement('script');
  mysrc.src="assets/scripts/cart.js";
  document.getElementsByTagName('head')[0].appendChild(mysrc); 
}