// nav bar script

const toggleButton = document.getElementsByClassName("toggle-button")[0];
const nav = document.getElementsByClassName("navbar-links")[0];

toggleButton.addEventListener("click", () => {
    nav.classList.toggle("active");
});

// shopping cart script
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}
function ready() {
    var removeCartItemButtons = document.getElementsByClassName("btn-danger");
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName("cart-quantity-input");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    var addCartItemButtoms = document.getElementsByClassName("order-btn");
    for (var i = 0; i < addCartItemButtoms.length; i++) {
        var button = addCartItemButtoms[i];
        button.addEventListener("click", addToCartClicked);
    }
    document.getElementsByClassName("btn-purchase")[0].addEventListener("click", purchaseClicked);
}
function purchaseClicked() {
    alert("thank you for your purchase");
    var cartItems = document.getElementsByClassName("cart-items")[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}
function addToCartClicked(event) {
    var button = event.target;
    var shopitem = button.parentElement;
    var title = shopitem.getElementsByClassName("prodHead")[0].innerText;
    var price = shopitem.getElementsByClassName("shop-price")[0].innerText;
    var size = shopitem.getElementsByClassName("size")[0].value;
    addItemToCart(title, price, size);
    updateCartTotal();
}
function addItemToCart(title, price, size) {
    var cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title + " size:" + size) {
            var itemsRow = cartItemNames[i].parentElement.parentElement;
            var quantityElement = itemsRow.getElementsByClassName("cart-quantity-input")[0];
            var quantity = parseInt(quantityElement.value);
            quantity = quantity + 1;
            quantityElement.value = quantity;
            alert("This item is already added to the cart... your quantity has been updated");
            return;
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title} size:${size}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value=1 />
            <button class="btn btn-danger" type="button">REMOVE</button>
    `;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem);
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged);
}
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-row");
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName("cart-price")[0];
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = parseInt(quantityElement.value);
        total = total + price * quantity;
        var tax = total * 0.05;
        var grandTotal = total + tax;
    }
    if (tax == undefined) {
        tax = 0;
        grandTotal = 0;
    }

    total = parseInt(Math.round(total * 100) / 100);
    document.getElementsByClassName("cart-total-price")[0].innerText = "Subtotal: $" + total;
    document.getElementsByClassName("cart-total-tax")[0].innerText = "Tax(5%)-$" + tax;
    document.getElementsByClassName("cart-grand-total")[0].innerText = "Grand Total: $" + grandTotal;
}
