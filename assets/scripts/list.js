let IDQ,IDP;
let totalItems = 0;
let totalPrice = 0;
let cout = [];

function addItemToCart(id, title, price, imageSrc) {
    calItems(price);
    for (var i = 0; i < counter.textContent ; i++) {
        var cartItemId = document.querySelector(`#${id}`);
        if (cartItemId){
        if (id == cartItemId.id && cartItemId) {

            if (cout[String(id)] == undefined){
                cout[String(id)] = 1;
            }
            IDQ = document.querySelector(`#Q${id}`);
            IDP = document.querySelector(`#P${id}`);
            cout[String(id)]++;
            IDP.textContent = cout[String(id)]*price;
            IDQ.value = cout[String(id)];
            return}
        }
    }
    itemsTemplate(id, imageSrc, title, price);
}

function calItems(price,check = true){
    if(check){
    totalPrice += Math.ceil(price);
    totalItems ++;}
    else{
        totalPrice -= Math.ceil(price);
        totalItems --;
    }
}

function quantityChanged(event) {
    var input = event.target;
    var totalBar = document.getElementById('total');
    let idn = (input.id).replace("Q","");
    if (db instanceof IDBDatabase) {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const booksStore = tx.objectStore(STORE_NAME);
        res = booksStore.getAll().onsuccess = function(event) {
            for (let ele of (event.target.result)){
                  if ( ele.itemId == idn){
                    if ( cout[idn] < +input.value){
                            addToDB(ele.itemName, ele.itemImage, ele.itemId, ele.price);
                            calItems(ele.price, true);}
                        else{
                            calItems(ele.price, false);
                            booksStore.delete(parseInt(ele.id));}
                            cout[idn] = +input.value;
                        IDP = document.querySelector(`#P${idn}`);
                        IDP.textContent = ele.price*+input.value;
                        break;
                    }
            }
        }
    }
    totalBar.remove();
    t = setTimeout("totalTemplate()",300);
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }

}

function removeCartItem(event) {
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
                    calItems(ele.price, false);
                    booksStore.delete(parseInt(ele.id));}
              }
    }
}
    totalBar.remove();
    buttonClicked.parentElement.parentElement.remove();
    t = setTimeout("totalTemplate()",300);
}

function buyItems(){
    localStorage.clear();
    document.getElementsByClassName('buy')[0].setAttribute("disabled", true);
    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("totalItems", totalItems);
}

function checkOrder(){
    if( +localStorage.getItem("totalPrice") == totalPrice && +localStorage.getItem("totalItems") == totalItems){
        return false;
    }else{
        return true;
    }
}

var t = setTimeout("totalTemplate()",1200);

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

    counter.textContent = totalItems;
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    cartRow.id = "total";
    var cartItems = document.getElementsByClassName('cart-items')[0];

    if ( totalItems > 0){
        var cartRowContents = 
        `<div class="cart-item cart-column">
            <span class="cart-item-title">Number of Items: ${totalItems}</span>
        </div>
        <span class="cart-price cart-column">${totalPrice}</span>
        <div class="cart-quantity cart-column">
        <button class="btn btn-primary buy" type="button">Buy Items</button>
        </div>`;
    }else{
        var cartRowContents = 
        `<div class="cart-item cart-column">
            <span class="cart-item-title">Number of Items: No items</span>
        </div>
        <span class="cart-price cart-column"> 0</span>
        <div class="cart-quantity cart-column">
        <button class="btn btn-primary buy" type="button" disabled>Buy Items</button>
        </div>`;    
    }
    
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    if(checkOrder()){
        cartRow.getElementsByClassName('btn-primary')[0].addEventListener('click', () => buyItems());
    }else{
        cartRow.getElementsByClassName('btn-primary')[0].setAttribute("disabled", true);
    }
}