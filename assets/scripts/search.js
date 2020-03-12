var p = document.querySelector("#p");
function reqListener() {
  //console.log(this.responseText);
  var data = JSON.parse(this.responseText);
    console.log(data["data"]);
    
   if(data["data"].length ==0){
    window.location.href="./404.html";
       
   } else{
        //p.innerHTML=data["data"][0]["Name"];
        //parents div
        for (i = 0; i < data["data"].length; i++) {
            //product-grid__wrapper
            const productGrid=document.createElement('div');
            productGrid.classList="product-grid__product-wrapper";
            productGrid.id=`productGrid${i}`;
            document.getElementById("product-grid").appendChild(productGrid);
            //product-grid__product
            const productGrid__product=document.createElement('div');
            productGrid__product.classList="product-grid__product wow bounceInUp";
            productGrid__product.id=`productgrid__product${i}`;
            document.getElementById(`productGrid${i}`).appendChild(productGrid__product);
            //product-grid__img-wrapper
            const productGrid__img=document.createElement('div');
            productGrid__img.classList="product-grid__img-wrapper";
            productGrid__img.id=`productImg${i}`;
            document.getElementById(`productgrid__product${i}`).appendChild(productGrid__img);
            //link ->`Product_details.html?id=${data["data"][i]["ProductId"]}`
            const productLink =document.createElement('a');
            productLink.id=`link${i}`
            productLink.href=`Product_details.html?id=${data["data"][i]["ProductId"]}`;
            document.getElementById(`productImg${i}`).appendChild(productLink)
            //productImg
            const productImg=document.createElement('img');
            productImg.src=data["data"][i]["ProductPicUrl"];
            productImg.classList="product-grid__img";
            document.getElementById(`link${i}`).appendChild(productImg);
            //link
            const productLink2 =document.createElement('a');
            productLink2.id=`link2${i}`
            productLink2.href=`Product_details.html?id=${data["data"][i]["ProductId"]}`;
            document.getElementById(`productgrid__product${i}`).appendChild(productLink2)
            //product-grid__title
            const productTitle=document.createElement('span');
            productTitle.innerText=data["data"][i]["Name"];
            productTitle.classList="product-grid__title";
            document.getElementById(`link2${i}`).appendChild(productTitle);
            //product-grid__price
            const productGrid__price=document.createElement('span');
            productGrid__price.innerText=data["data"][i]["Price"];
            productGrid__price.classList="product-grid__price";
            document.getElementById(`productgrid__product${i}`).appendChild(productGrid__price);
            //product-grid__extend-wrapper
            const productGrid__extend=document.createElement('div');
            productGrid__extend.classList="product-grid__extend-wrapper";
            productGrid__extend.id=`product-extend${i}`;
            document.getElementById(`productgrid__product${i}`).appendChild(productGrid__extend);
            //product-grid__extend
            const productIn__extend=document.createElement('div');
            productIn__extend.classList="product-grid__extend";
            productIn__extend.id=`Inextend${i}`;
            document.getElementById(`product-extend${i}`).append(productIn__extend);
            //product-grid__description
            const productGrid__description=document.createElement('p');
            productGrid__description.classList="product-grid__description";
            productGrid__description.innerText=data["data"][i]["Description"];
            document.getElementById(`Inextend${i}`).appendChild(productGrid__description);
        }
   }
}
var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
const urlParams = new URLSearchParams(window.location.search);
var myParam = urlParams.get('cat');
console.log(myParam);
if (myParam == null) {
    console.log("no data");
    
 // myParam = 1;
}
oReq.open("GET", "https://afternoon-falls-30227.herokuapp.com/api/v1/products?category=" + myParam, true);
oReq.send();

//setting he Product Id in the local storage
function getId(productId) {
  const pId = { id: productId };
  localStorage.setItem('pId', JSON.stringify(pId));
}

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
