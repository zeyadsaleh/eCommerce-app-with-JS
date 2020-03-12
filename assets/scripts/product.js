//prodcut details
const urlParams = new URLSearchParams(window.location.search);
var productId = urlParams.get('id');

(async function getProduct() {
    //getting the productId from the local storage

    console.log(productId);
    
    //get the product
    let product = await fetch(`https://afternoon-falls-30227.herokuapp.com/api/v1/products/${productId}`);
    //parse the json  
    let jsonProduct = await product.json();
    //get all the data 
    jsonProduct = jsonProduct.data;
    //append the data to the html elements
    document.getElementById("Category").innerHTML = jsonProduct.Category;
    document.getElementById("ProductPicUrl").innerHTML = `<img src="${jsonProduct.ProductPicUrl}" class= "d-block w-100 img-fluid mt-2 image" alt="...">`;
    document.getElementById("Name").innerHTML = jsonProduct.Name;
    document.getElementById("Description").innerHTML = jsonProduct.Description;
    document.getElementById("Status").innerHTML = `${jsonProduct.Status} <span class="text-secondary">In stock</span>`;
    document.getElementById("Price").innerHTML = `${Number(jsonProduct.Price)} <span class="font-weight-bold text-uppercase" >${jsonProduct.CurrencyCode}</span>`;
    localStorage.removeItem('pId');
    //console.log(jsonProduct);   
})();

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
