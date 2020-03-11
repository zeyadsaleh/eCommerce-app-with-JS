let IDQ,IDP;
let totalItems = 0;
let totalPrice = 0;
let cout = 0;

function addItemToCart(id, title, price, imageSrc) {
    cout = 1;
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItem = document.getElementsByClassName('cart-item');
    console.log(cartItemId);

    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');

    total(price);

    for (var i = 0; i < cartItemNames.length; i++) {

        var cartItemId = document.querySelector(`#${id}`);
        if (cartItemId){
        if (id == cartItemId.id && cartItemId) {
            IDQ = document.querySelector(`#Q${id}`);
            IDP = document.querySelector(`#P${id}`);
            cout++;
            IDP.textContent = cout*price;
            IDQ.value = cout;
            return
        }
    }
    }
    // console.log(cartItemId.id);
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
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

var t=setTimeout("tot()",2000);

function tot(){
var cartRow = document.createElement('div');
cartRow.classList.add('cart-row');
var cartItems = document.getElementsByClassName('cart-items')[0];

var cartRowContents = 
`<div class="cart-item cart-column">
    <span class="cart-item-title">Number of Items: ${totalItems}</span>
</div>
<span class="cart-price cart-column">${totalPrice}</span>
<div class="cart-quantity cart-column">
<button class="btn btn-primary" type="button">Buy Items</button>
</div>`

cartRow.innerHTML = cartRowContents;
cartItems.append(cartRow);
if( +localStorage.getItem("totalPrice") != totalPrice && +localStorage.getItem("totalItems") != totalPrice){
cartRow.getElementsByClassName('btn-primary')[0].addEventListener('click', buyItems);
}else{
    cartRow.getElementsByClassName('btn-primary')[0].setAttribute("disabled", true);
}
}
// console.log(localStorage.getItem("totalPrice"));

function total(price){
    totalPrice += price;
    totalItems ++;
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
}

function buyItems(){
    localStorage.clear();
    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("totalItems", totalItems);
}