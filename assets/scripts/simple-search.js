//function for search 
const formSubmit=document.getElementById("form_search");
// search cat
const searchBtn=document.getElementById("searchBtn");
//event
formSubmit.addEventListener("submit",(ev)=>{
  
  event.preventDefault();
  console.log(searchBtn.value);
  // Simulate an HTTP redirect:
  window.location.href="./search.html?cat="+searchBtn.value;
})