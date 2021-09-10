let products = [];
const user = JSON.parse(localStorage.getItem("user")); // Fetch the user information

function getUser() {
  console.log(user);

  if (user == null) {
    // if there is no user
    window.location = "./login.html";
  }
  // If there is a user
  else {
    document.querySelector(
      "#greeting"
    ).innerHTML = `Welcome Back ${user.data.name}`;
  }
}
getUser();

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>User Infomation<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
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

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

fetch("https://evening-fjord-01909.herokuapp.com/show-products/") // FETCH THE PRODUCTS
  // Convert data from JSON
  .then((res) => res.json())
  //Stuff to do with data
  .then((data) => {
    // Console log to make sure I am getting the data
    console.log(data);
    products = data.data;
    showProductList(products); // Render Products
  });

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Show Products <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function showProductList(item) {
  let view = document.querySelector(".show-items");
  view.innerHTML = "";
  products.forEach((item) => {
    // How it will be displayed
    view.innerHTML += `<div class="container" type=${item.type}> 
          <img class="info image" src="${item.image}" alt="image"/>
          <h3 class="info">${item.title}</h3>
          <p class="info">${item.type}</p>
          <p class="info"><strong>R${item.price}</strong></p>
          <button class="btn" onclick="event.preventDefault(); addTocart(${item.id})">Add to Cart</button>
          </div>`;
  });
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Filter Products<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

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

  let loCart = JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  if (user == null) {
    alert("You Are Not Log In");
    window.location = "./login.html";
  } else {
    loCart.push(product); // push into cart array
    console.log(loCart);

    localStorage.setItem("cart", JSON.stringify(loCart)); // localStorage the Items pushed

    // Total price
    let totalPrice = loCart.reduce(
      (total, item) => total + parseInt(item.price),
      0.0
    );
    // Show How many items in cart
    let cartSize = JSON.parse(localStorage.getItem("cart")).length;
    document.querySelector(".cartTotal").innerHTML = cartSize;

    localStorage.setItem("total", JSON.stringify(totalPrice)); // Store the Total Amount
    console.log(totalPrice);
  }
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Check Amount In Cart<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function checkCart() {
  let container = document.querySelector(".cartTotal");
  let InCart = JSON.parse(localStorage.getItem("cart")).length; // Grab from cart

  if (InCart == null) {
    // If empty display '0' or none
    addTocart();
  } else {
    container.innerHTML = InCart;
  }
}
checkCart();

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Log Out<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function logOut() {
  if (confirm("You want to Log Out?")) {
    localStorage.removeItem("user"); // Remove user
    window.location = "./index.html";
  } else {
    console.log("Log Out Cancelled");
  }
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Toggle Button<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function button(id) {
  document.getElementById(id).classList.toggle("active");
}
