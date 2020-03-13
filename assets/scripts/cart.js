const DB_NAME = 'store';
const DB_V = 1;
const STORE_NAME = 'souq';
let cartBtn = document.querySelector('#cart');
let counter = document.querySelector('#count');
let prodQuantity = 1;
let count = 0;
let db,title,prodId,price,imageUrl,index;

if ('indexedDB' in window) {
    openDB();
    if(String(window.location.href).includes("index.html")){
      // console.log("ok");
    var data = JSON.parse(oReq.responseText);
    }
}

function openDB() {

    const dbReq = indexedDB.open(DB_NAME, DB_V);

    dbReq.onerror = (ev) => {
        console.error('onerror', ev.target.errorCode);
    };

    dbReq.onupgradeneeded = (ev) => {
        console.log('onupgradeneeded');
        const db = ev.target.result;

        if (!db.objectStoreNames.contains(STORE_NAME)) {
            souqStore = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
    };

    dbReq.onsuccess = (ev) => {
        count = 0;
        console.log('onsucces');
        db = ev.target.result;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const souqStore = tx.objectStore(STORE_NAME);
        res = souqStore.getAll().onsuccess = function(event) {
        (event.target.result).forEach((val) => {
          if(String(window.location.href).includes("cart.html")){
          addItemToCart(val.itemId, val.itemName, val.price, val.itemImage);}
          count ++;
          counter.textContent = count;
        });
      }
    };
}

// count items of cart
function countItems(ths){

  if(String(window.location.href).includes("index.html")){

    index = (Number((ths.path[0].id).slice(7,8)));
    title = data["data"][index]["Name"];
    prodId = data["data"][index]["ProductId"];
    price = [ data["data"][index]["Price"] , data["data"][index]["CurrencyCode"]];
    imageUrl = data["data"][index]["ProductPicUrl"];
    
  }else if (String(window.location.href).includes("Product_details.html")){

    prodQuantity = document.querySelector('#prodQ').value;
    console.log(prodQuantity);

    title = document.querySelector('#Name').textContent;
    prodId = productId;
    price = document.querySelector('#Price').textContent;
    price = price.split(" ");
    imageUrl = document.querySelector('.image').src;
  }

    Array.from({length:+prodQuantity},()=> {
    let check = addToDB(title, imageUrl, prodId, +price[0]);

    if(check){
      count ++;
      counter.textContent = count;}
    else{
      alert("Can not added to Cart");
    }
  });
}


// add item to indexDb
function addToDB(title, imageUrl, prodId, price){
  if (db instanceof IDBDatabase) {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const souqStore = tx.objectStore(STORE_NAME);
    souqStore.add({
        itemId: prodId, 
        itemName: title,
        price: price,
        itemImage: imageUrl,
    });
  return true;
}else{
  return false;
}
}


let addBtn = document.querySelectorAll('.shop-item-button');
addBtn.forEach((v,i)=> {
addBtn[i].addEventListener("click", countItems);
});
