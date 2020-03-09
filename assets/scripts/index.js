var p =document.querySelector("#p");
function reqListener () {
    //console.log(this.responseText);
    var data =JSON.parse(this.responseText);
    
    //p.innerHTML=data["data"][0]["Name"];
    //parents div
for(i=0;i<data["data"].length;i++){    
    const parentsDiv=document.createElement('div');
    parentsDiv.id=`test${i}`;
    parentsDiv.classList="col-lg-4 col-md-4 col-sm-12 col-xs-12  border mt-2 ";
    document.getElementById("data").appendChild(parentsDiv);
    //chield div
    var CurrentDev=document.createElement('div');
    CurrentDev.id=`pic${i}`;
    CurrentDev.classList="row";
    document.getElementById(`test${i}`).appendChild(CurrentDev); 
    //div for image
    const ImgDiv=document.createElement('div');
    ImgDiv.classList="img-hover-zoom img-hover-zoom--xyz";
    ImgDiv.id=`ImgDiv${i}`
    document.getElementById(`pic${i}`).appendChild(ImgDiv);
    var img=document.createElement('img');
    img.src=data["data"][i]["ProductPicUrl"];
    img.classList="img-fluid border";
    document.getElementById(`ImgDiv${i}`).appendChild(img); 
    // fill data
    const Title=document.createElement('a');
    Title.classList="text-center";
    Title.id=`titleLink${i}`;
    Title.title=data["data"][i]["Name"];
    Title.href="#";
    document.getElementById(`test${i}`).appendChild(Title)
    //add text to tilte
    const TextTitle=document.createElement('p');
    TextTitle.innerText=data["data"][i]["Name"];
    TextTitle.classList="text-center";
    document.getElementById(`titleLink${i}`).appendChild(TextTitle);
    //id of prodeuct
    const ProductId=document.createElement('p');
    ProductId.innerText="ProductId :"+data["data"][i]["ProductId"];
    ProductId.classList="text-left"
    document.getElementById(`test${i}`).appendChild(ProductId);
    //price of product
    const PriceProduct=document.createElement('p');
    PriceProduct.innerText="Price :"+data["data"][i]["Price"] +data["data"][i]["CurrencyCode"];
    PriceProduct.classList="text-left";
    document.getElementById(`test${i}`).appendChild(PriceProduct);

    //add to cart
    const AddButton=document.createElement('button');
    AddButton.classList="btn btn-primary mb-2";
    AddButton.id=`AddCart${i}`;
    AddButton.innerText="Add To Cart"
    document.getElementById(`test${i}`).appendChild(AddButton)
 
    }  

  //pagination
  const TotalPage=data["total_pages"];  
  for(i=0;i<TotalPage;i++){
      //pagination li
      const PaginationLi=document.createElement("li");
      PaginationLi.id=`page${i}`;
      document.getElementById("pagination").appendChild(PaginationLi)
     //pagination a
      const PaginationLink=document.createElement('a');
      PaginationLink.href="?page="+(i+1);
      //PaginationLink.classList="active"
      PaginationLink.id=`pag${i}`
      if(myParam == (i+1)){
        
          
        PaginationLink.classList="active";
      }
     
      
      document.getElementById(`page${i}`).appendChild(PaginationLink)
      //title of link 
      const PaginationText=document.createElement('p');
      PaginationText.innerText=`${i+1}`; 
      document.getElementById(`pag${i}`).appendChild(PaginationText)
  }
}
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  const urlParams = new URLSearchParams(window.location.search);
  var myParam = urlParams.get('page');
  console.log(myParam);
  if(myParam ==null){
    myParam=1;
  }
  oReq.open("GET", "https://afternoon-falls-30227.herokuapp.com/api/v1/products?page="+myParam,true);
  oReq.send();



