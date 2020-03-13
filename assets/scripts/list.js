let totalItems = 0;
let totalPrice = 0;
let cout = [];

function addItemToCart(id, title, price, imageSrc) {
    let IdQuantity,IdPrice;
    cartItems(price);
    for (var i = 0; i < counter.textContent ; i++) {
        var cartItemId = document.querySelector(`#${id}`);
        if (cartItemId){
        if (id == cartItemId.id && cartItemId) {

            if (cout[String(id)] == undefined){
                cout[String(id)] = 1;
            }
            IdQuantity = document.querySelector(`#Q${id}`);
            IdPrice = document.querySelector(`#P${id}`);
            cout[String(id)]++;
            IdPrice.textContent = cout[String(id)]*price;
            IdQuantity.value = cout[String(id)];
            return}
        }
    }
    itemsTemplate(id, imageSrc, title, price);
}

function cartItems(price,check = true){
    if(check){
    totalPrice += Math.ceil(price);
    totalItems ++;}
    else{
        totalPrice -= Math.ceil(price);
        totalItems --;
    }
}

function quantityChanged(event) {
    localStorage.clear();
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
        return 0;
    }
    var totalBar = document.getElementById('total');
    let idn = (input.id).replace("Q","");
    if (db instanceof IDBDatabase) {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const booksStore = tx.objectStore(STORE_NAME);
        res = booksStore.getAll().onsuccess = function(event) {
            for (let ele of (event.target.result)){
                  if ( ele.itemId == idn){
                    let idx = Math.abs(+input.value-cout[idn]);
                    if ( cout[idn] < +input.value){
                            cartItems(ele.price, true);
                            addToDB(ele.itemName, ele.itemImage, ele.itemId, ele.price);
                            cout[idn] ++;
                        }else{
                            cartItems(ele.price, false);
                            booksStore.delete(parseInt(ele.id));
                            cout[idn] --;}
                        IDP = document.querySelector(`#P${idn}`);
                        IDP.textContent = ele.price*+input.value;
                        if(idx == 1) break;
                    }
            }
        }
    }
    t = setTimeout("refreshTotal(totalItems, totalPrice)",100);
}

function removeCartItem(event) {
    localStorage.clear();
    var buttonClicked = event.target;
    var totalBar = document.getElementById('total');
    let idn = (buttonClicked.id).replace("B","");
    if (db instanceof IDBDatabase) {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const booksStore = tx.objectStore(STORE_NAME);
        res = booksStore.getAll().onsuccess = function(event) {
              for (let ele of (event.target.result)){
                  if ( ele.itemId == idn){
                    delete cout[String(ele.itemId)];
                    cartItems(ele.price, false);
                    booksStore.delete(parseInt(ele.id));}
              }
    }
}
    t = setTimeout("refreshTotal(totalItems, totalPrice)",100);
    buttonClicked.parentElement.parentElement.remove();
    // refreshTotal(totalItems, totalPrice);
}

function buyOrder(){
    localStorage.clear();
    localStorage.setItem("proccess", "Proccessing");     
    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("totalItems", totalItems);
    cancelBtn();
}

function cancelBtn(){
    var doc = document.getElementById('orderBtn');
    var cancelBtn=document.createElement('button');
    cancelBtn.classList="btn btn-danger cancel dummy";
    cancelBtn.textContent= "Cancel";
    cancelBtn.id = "cancelBtn";
    doc.append(cancelBtn);
    cancelBtn.addEventListener("click", () => {
        cancelOrder();
        cancelBtn.remove();
    });
}
function buyBtn(){
    var doc = document.getElementById('orderBtn');
    var buyBtn=document.createElement('button');
    buyBtn.classList="btn btn-primary buy dummy";
    buyBtn.textContent= "Buy";
    buyBtn.id = "buyBtn";
    doc.append(buyBtn);
    buyBtn.addEventListener("click", () => {
        buyOrder();
        buyBtn.remove();
    });  
}

function cancelOrder(){
    localStorage.clear();
    localStorage.setItem("proccess", "Cancel");     
    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("totalItems", totalItems); 
    buyBtn();
}


function refreshTotal(totalItems, totalPrice){
    let totitms = document.querySelector('.totitems');
    let itmspri = document.querySelector('.itemspri');
    counter.textContent = totalItems;
    totitms.textContent ="Number of Items: " + totalItems;
    itmspri.textContent = totalPrice;
    document.querySelector('.dummy').remove();
    if (  (localStorage.getItem("proccess") == "Proccessing") && 
        ( (+localStorage.getItem("totalPrice") == totalPrice)
         && (+localStorage.getItem("totalItems") == totalItems) ) ) {
        cancelBtn(); 
    }else{
        buyBtn();
    }
}

var t = setTimeout("totalTemplate()",1500);

function itemsTemplate(id, imageSrc, title, price){
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];

    var cartRowContents = `
    <div class="cart-item cart-column" id="${id}">
    <a href= "Product_details.html?id=${id}">
        <img class="cart-item-image" src=${imageSrc} width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </a>
    </div>
    <span class="cart-price cart-column" id="P${id}">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" id="Q${id}" type="number" value="1">
        <button class="btn btn-danger" id="B${id}" type="button">REMOVE</button>
    </div>`
cartRow.innerHTML = cartRowContents;
cartItems.append(cartRow);
let rmBtn = cartRow.querySelectorAll('.btn-danger');
rmBtn.forEach((v,i)=> {
    rmBtn[i].addEventListener('click', removeCartItem);
});
cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);

}

function totalTemplate(){

    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    cartRow.id = "total";
    var cartItems = document.getElementsByClassName('cart-items')[0];

    if ( totalItems > 0){
        var cartRowContents = 
        `<div class="cart-item cart-column">
            <span class="cart-item-title totitems">Number of Items: ${totalItems}</span>
        </div>
        <span class="cart-price cart-column itemspri">${totalPrice}</span>
        <div class="cart-quantity cart-column" id="orderBtn">
            <button class="dummy"></button>
        </div>`;

    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);

    t = setTimeout("refreshTotal(totalItems, totalPrice)",100);
}
}

