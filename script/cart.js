const cart = JSON.parse(localStorage.getItem('cart'))
const total = JSON.parse(localStorage.getItem('total')) 

function cartItems(){
console.log(cart,total);
if (cart == null, total == null) {
    document.querySelector('#cartItems').innerHTML = 'You Have No Items'
    console.log(cart)
}
else{
    let view = document.querySelector('#cartItems'
    forEach((item) => {
        view.innerHTML +=  `
    <div class="container">
    <img class="info image" src="${cart.image}" alt="image"/>
    <h2 class="info">${cart.title}</h2>
    <p class="info">${cart.type}</p>
    <p class="info"><strong>R${cart.price}</strong></p>
    <button class ="rmbtn" onclick="removeFromCart()">Remove</button>
    </div>` 
}
}
cartItems();