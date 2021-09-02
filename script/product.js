let products = []
const user = JSON.parse(localStorage.getItem("user"))

function getUser(){
    console.log(user)
    if (user == null){
     window.location = './login.html' 
    }
    else{
      document.querySelector('#greeting').innerHTML = `Welcome Back ${user.data.name}`
    }
}
getUser();

fetch("https://evening-fjord-01909.herokuapp.com/show-products/")
      // Convert data from JSON
      .then((res) => res.json())
      //Stuff to do with data
      .then((data) => {
      // Console log to make sure I am getting the data
      console.log(data);
      products = data.data;
      showProductList(products);
      })

function showProductList(item) {
    let view = document.querySelector(".show-items");
    view.innerHTML = ''
      products.forEach((item) => {
        view.innerHTML += `<div class="container" type=${item.type}>
          <img class="info image" src="${item.image}" alt="image"/>
          <h3 class="info">${item.title}</h3>
          <p class="info">${item.type}</p>
          <p class="info"><strong>R${item.price}</strong></p>
          <button onclick="event.preventDefault(); addTocart(${item.id})">Add to Cart</button>
          </div>`;
        });
};


function productFilter(type){
    // Display All Types
    let productCards = document.querySelectorAll(".container");
    if (type == 'All') {
      for(let i = 0; i < productCards.length; i++){
        productCards[i].style.display = "flex"
    } 
    return;
    }

    // Get all cards and hide
    for(let i = 0; i < productCards.length; i++){
        productCards[i].style.display = "none"
    }

    // Get selected types to display
    let selectedProducts = document.querySelectorAll(`[type=${type}]`)
    for(let i = 0; i < selectedProducts.length; i++){
        selectedProducts[i].style.display = "flex"
    }
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Add to Cart<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// function addTocart(id) {
//   fetch(`https://evening-fjord-01909.herokuapp.com/view-product/${id}`, {
//     method: "GET",
//     body: JSON.stringify(),
//     headers: {
//       "content-type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       let title = `${data.data[1]}`;
//       let pic = `${data.data[2]}`;
//       let type = `${data.data[4]}`;
//       let price = `${data.data[3]}`;
//       addToPlate(title, pic, type, price);
//     });
// }

// function addToPlate(title, pic, type, price) {
//   let platediv = document.createElement("div");
//   platediv.classList.add("viewcart_items");
//   let plateItems = document.getElementsByClassName("carts")[0];
  
//   let PlateContent = `<div class="container">
//   <img class="info image" src="${pic}" alt="image"/>
//   <h2 class="info">${title}</h2>
//   <p class="info">${type}</p>
//   <p class="info"><strong>R${price}</strong></p>
//   <button class ="rmbtn" onclick="removeFromCart()">Remove</button>`;
//   platediv.innerHTML = PlateContent;
//   plateItems.append(platediv);
// }

// Better function and less Code
let cart = []
function addTocart(id){
  let product = products.find((item) =>{
    return item.id == id
  });
  if (user == null) {
    alert('You Are Not Log In')
    window.location = './login.html'
  }
  
  else {
  cart.push(product);
  console.log(cart);
  localStorage.setItem('cart', JSON.stringify(cart))
  let totalPrice = cart.reduce((total, item) => total + parseInt(item.price), .0);
  localStorage.setItem('total', JSON.stringify(totalPrice))
  console.log(totalPrice);
  }
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function button(id) {
  document.querySelector(id).classList.toggle("active");
}

function toggleCart(){
  document.querySelector('#cart').classList.toggle('active')
}

function logOut(){
  if (confirm('You want to Log Out?')){
    localStorage.removeItem('user')
    window.location = './index.html'
  }
  else {
    console.log('Log Out Cancelled')
  }
}
