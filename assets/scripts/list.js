let totalItems = 0;
let totalPrice = 0;
let cout = [];
var t = setTimeout("totalTemplate()",250);

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
    let idn = (input.id).replace("Q","");
    if (db instanceof IDBDatabase) {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const booksStore = tx.objectStore(STORE_NAME);
        res = booksStore.getAll().onsuccess = function(event) {
            for (let ele of (event.target.result)){
                  if ( ele.itemId == idn){
                    let idx = Math.abs(+input.value-cout[idn]);
                    if ( cout[idn] < +input.value || input.value == 2){
                            cartItems(ele.price, true);
                            addToDB(ele.itemName, ele.itemImage, ele.itemId, ele.price);
                            if (cout[idn] != undefined){
                                cout[idn] ++;
                            }else{
                                cout[idn] = input.value;
                            }
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
    t = setTimeout("refreshTotal(totalItems, totalPrice)",60);
}

function removeCartItem(event) {
    localStorage.clear();
    var buttonClicked = event.target;
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
    t = setTimeout("refreshTotal(totalItems, totalPrice)",60);
    buttonClicked.parentElement.parentElement.remove();
}

function buyOrder(){
    localStorage.clear();
    localStorage.setItem("proccess", "Proccessing");     
    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("totalItems", totalItems);
    cancelBtn();
}

function cancelBtn(){
    let buyBtn = document.querySelector('#buyBtn');
    let cancelBtn = document.querySelector('#cancelBtn');
    buyBtn.setAttribute("disabled", true);
    cancelBtn.disabled = false;
    cancelBtn.addEventListener("click", () => {
        cancelOrder();
        cancelBtn.setAttribute("disabled", true);}); 
}
function buyBtn(){
    let cancelBtn = document.querySelector('#cancelBtn');
    let buyBtn = document.querySelector('#buyBtn');
    cancelBtn.setAttribute("disabled", true);
    buyBtn.disabled = false;
    buyBtn.addEventListener("click", () => {
        buyOrder();
        buyBtn.setAttribute("disabled", true);}); 
}

function cancelOrder(){
    localStorage.clear();
    localStorage.setItem("proccess", "Canceled");     
    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("totalItems", totalItems); 
    buyBtn();
}


function refreshTotal(totalItems, totalPrice){
    if ( totalItems > 0){
        let totitms = document.querySelector('.totitems');
        let itmspri = document.querySelector('.itemspri');
        counter.textContent = totalItems;
        totitms.textContent ="Number of Items: " + totalItems;
        itmspri.textContent = totalPrice;
        if (  (localStorage.getItem("proccess") == "Proccessing") && 
            ( (+localStorage.getItem("totalPrice") == totalPrice)
             && (+localStorage.getItem("totalItems") == totalItems) ) ) {
            cancelBtn(); 
        }else{
            buyBtn();
        }
    }else{
        counter.textContent = totalItems;
        emptyTemplate();
    }
}

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

    if ( totalItems > 0){
        var cartRow = document.createElement('div');
        cartRow.classList.add('cart-row');
        cartRow.id = "total";
        var cartItems = document.getElementsByClassName('cart-items')[0];

        var cartRowContents = 
        `<div class="cart-item cart-column">
            <span class="cart-item-title totitems">Number of Items: ${totalItems}</span>
        </div>
        <span class="cart-price cart-column itemspri">${totalPrice}</span>
        <div class="cart-quantity cart-column" id="orderBtn">
            <button class="btn btn-primary buy mr-4" id="buyBtn">Buy</button>
            <button class="btn btn-danger cancel" id="cancelBtn">Cancel</button>
        </div>`;

    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    
    loadHistory();
    refreshTotal(totalItems, totalPrice);
}else{
    emptyTemplate();
}
}

function emptyTemplate(){
        var cartRow = document.createElement('div');
        cartRow.classList.add('cart-row');
        cartRow.id = "total";
        document.querySelector('.items').remove();
        var cartRowContents = 
        `<img src="assets/img/oops_cart.png" alt="No items" class="center"/>`;
        cartRow.innerHTML = cartRowContents;
        document.querySelector('.cartitems').append(cartRow);
}
