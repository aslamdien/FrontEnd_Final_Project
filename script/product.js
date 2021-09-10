let products = [];
const user = JSON.parse(localStorage.getItem("user"));

function getUser() {
  console.log(user);
  if (user == null) {
    window.location = "./login.html";
  } else {
    document.querySelector(
      "#greeting"
    ).innerHTML = `Welcome Back ${user.data.name}`;
  }
}
getUser();

function showProfile() {
  let pro = document.querySelector("#profile");
  pro.innerHTML = `<div id="profile1">
  <h3 class="pro">My Info</h3>
  <p class="pro">Name: <span class="data">${user.data.name}</span></p>
  <br>
  <p class="pro">Surname: <span class="data">${user.data.surname}</span></p>
  <br>
  <p class="pro">ID No: <span class="data">${user.data.id_number}</span></p>
  <br>
  <p class="pro">Email : <span class="data">${user.data.email}</span></p>
  </div>`;
}
showProfile();

fetch("https://evening-fjord-01909.herokuapp.com/show-products/")
  // Convert data from JSON
  .then((res) => res.json())
  //Stuff to do with data
  .then((data) => {
    // Console log to make sure I am getting the data
    console.log(data);
    products = data.data;
    showProductList(products);
  });

function showProductList(item) {
  let view = document.querySelector(".show-items");
  view.innerHTML = "";
  products.forEach((item) => {
    view.innerHTML += `<div class="container" type=${item.type}>
          <img class="info image" src="${item.image}" alt="image"/>
          <h3 class="info">${item.title}</h3>
          <p class="info">${item.type}</p>
          <p class="info"><strong>R${item.price}</strong></p>
          <button class="btn" onclick="event.preventDefault(); addTocart(${item.id})">Add to Cart</button>
          </div>`;
  });
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function productFilter(type) {
  // Display All Types
  let productCards = document.querySelectorAll(".container");
  if (type == "All") {
    for (let i = 0; i < productCards.length; i++) {
      productCards[i].style.display = "flex";
    }
    return;
  }

  // Get all cards and hide
  for (let i = 0; i < productCards.length; i++) {
    productCards[i].style.display = "none";
  }

  // Get selected types to display
  let selectedProducts = document.querySelectorAll(`[type=${type}]`);
  for (let i = 0; i < selectedProducts.length; i++) {
    selectedProducts[i].style.display = "flex";
  }
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Add to Cart<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function addTocart(id) {
  let product = products.find((item) => {
    return item.id == id;
  });

let loCart = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : []
  
if (user == null) {
    alert("You Are Not Log In");
    window.location = "./login.html";
  } 
  
  else {
    loCart.push(product);
    console.log(loCart);
    localStorage.setItem("cart", JSON.stringify(loCart));
    let totalPrice = loCart.reduce((total, item) => total + parseInt(item.price),0.0);
    let cartSize = JSON.parse(localStorage.getItem('cart')).length
    document.querySelector('.cartTotal').innerHTML = cartSize
    localStorage.setItem("total", JSON.stringify(totalPrice));
    console.log(totalPrice);
  }
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Check<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function checkCart() {
  
    let container = document.querySelector('.cartTotal')
    let InCart = JSON.parse(localStorage.getItem('cart')).length
    if (InCart == null) {
      addTocart();
    }
    
    else{
      container.innerHTML = InCart
    }
}

checkCart();

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function button(id) {
  document.querySelector(id).classList.toggle("active");
}

function toggleCart() {
  document.querySelector("#cart").classList.toggle("active");
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>LogOut<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function logOut() {
  if (confirm("You want to Log Out?")) {
    localStorage.removeItem("user");
    window.location = "./index.html";
  } else {
    console.log("Log Out Cancelled");
  }
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Toggle Button<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function button(id) {
  document.getElementById(id).classList.toggle("active");
}
