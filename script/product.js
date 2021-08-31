function getUser(){
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    document.querySelector('#greeting').innerHTML = `Welcome Back ${user.data.username}`
    
}
getUser();

function showProductList() {
    fetch("https://evening-fjord-01909.herokuapp.com/show-products/")
      // Convert data from JSON
      .then((res) => res.json())
      //Stuff to do with data
      .then((data) => {
        // Console log to make sure I am getting the data
        console.log(data);
  
        product = data.data;
        console.log(product);
  
        let view = document.querySelector(".show-items");
        product.forEach((item) => {
          view.innerHTML += `<div class="container" type=${item.type}>
          <img class="info image" src="${item.image}" alt="image"/>
          <h3 class="info">${item.title}</h3>
          <p class="info">${item.type}</p>
          <p class="info"><strong>R${item.price}</strong></p>
          <button onclick="event.preventDefault(); addTocart(${item.id})">Add to Cart</button>
          </div>`;
        });
      });
  }

  showProductList();

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
function addTocart(id) {
  fetch(`https://evening-fjord-01909.herokuapp.com/view-product/${id}`, {
    method: "GET",
    body: JSON.stringify(),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let title = `${data.data[1]}`;
      let pic = `${data.data[2]}`;
      let type = `${data.data[4]}`;
      let price = `${data.data[3]}`;
      addToPlate(title, pic, type, price);
    });
}

function addToPlate(title, pic, type, price) {
  let platediv = document.createElement("div");
  platediv.classList.add("viewcart_items");
  let plateItems = document.getElementsByClassName("carts")[0];
  let plateItemName = plateItems.getElementsByClassName("plate_item_name");
  for (let i = 0; i < plateItemName.length; i++) {
    if (plateItemName[i].innerText == title) {
      alert("You already added to your plate");
      return;
    }
  }
  let PlateContent = `<div class="container">
  <img class="info image" src="${pic}" alt="image"/>
  <h2 class="info">${title}</h2>
  <p class="info">${type}</p>
  <p class="info"><strong>R${price}</strong></p>
  <button class ="rmbtn" onclick="removeFromCart()">Remove</button>`;
  platediv.innerHTML = PlateContent;
  plateItems.append(platediv);
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>removeCart<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function removeFromCart() {
  let removePlate = document.getElementsByClassName("rmbtn");
  for (let i = 0; i < removePlate.length; i++) {
    let button = removePlate[i];
    button.addEventListener("click", function (event) {
      let remBtn = event.target;
      remBtn.parentElement.parentElement.remove();
    });
  }
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function button(id) {
  document.getElementById(id).classList.toggle("active");
}
