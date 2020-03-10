//prodcut details
(async function getProduct() {
    //getting the productId from the local storage
    const urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get('id');
    console.log(productId);
    
    //get the product
    let product = await fetch(`https://afternoon-falls-30227.herokuapp.com/api/v1/products/${productId}`);
    //parse the json  
    let jsonProduct = await product.json();
    //get all the data 
    jsonProduct = jsonProduct.data;
    //append the data to the html elements
    document.getElementById("Category").innerHTML = jsonProduct.Category;
    document.getElementById("ProductPicUrl").innerHTML = `<img src="${jsonProduct.ProductPicUrl}" class= "d-block w-100 img-fluid mt-2" alt="...">`;
    document.getElementById("Name").innerHTML = jsonProduct.Name;
    document.getElementById("Description").innerHTML = jsonProduct.Description;
    document.getElementById("Status").innerHTML = `${jsonProduct.Status} <span class="text-secondary">In stock</span>`;
    document.getElementById("Price").innerHTML = `${jsonProduct.Price} <span class="font-weight-bold text-uppercase" >${jsonProduct.CurrencyCode}</span>`;
    localStorage.removeItem('pId');
    //console.log(jsonProduct);   
})();

