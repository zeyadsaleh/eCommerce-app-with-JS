const DB_NAME = 'store';
const DB_V = 1;
const STORE_NAME = 'souq';
let cartBtn = document.querySelector('#cart');
let counter = document.querySelector('#count');
// let cartBox = document.querySelector('#myDropdown');
// let delBtn = document.createElement("button");
let count = 0;
let db,title,productId,price,imageUrl,index;

if ('indexedDB' in window) {
    openDB();
    if(String(window.location.href).includes("index.html")){
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

    index = (Number((ths.path[0].id).slice(7,8)));
    title = data["data"][index]["Name"];
    productId = data["data"][index]["ProductId"];
    price = [ data["data"][index]["Price"] , data["data"][index]["CurrencyCode"]];
    imageUrl = data["data"][index]["ProductPicUrl"];

    let check = addToDB(title, imageUrl, productId, price[0]);

    if(check){
    count ++;
    counter.textContent = count;}
    else{
      alert("Can not added to Cart");
    }
}


// add item to indexDb
function addToDB(title, imageUrl, productId, price){
  if (db instanceof IDBDatabase) {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const souqStore = tx.objectStore(STORE_NAME);
    souqStore.add({
        itemId: productId, 
        itemName: title,
        itemImage: imageUrl,
        price: price,
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


