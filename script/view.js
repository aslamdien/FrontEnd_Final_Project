let products = []
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

function showProductList(products) {
    let view = document.querySelector(".show-items");
      products.forEach((item) => {
        view.innerHTML += `<div class="container" type=${item.type}>
          <img class="info image" src="${item.image}" alt="image"/>
          <h3 class="info">${item.title}</h3>
          <p class="info">${item.type}</p>
          <p class="info"><strong>R${item.price}</strong></p>
          <button onclick="loginUser(${item.id})"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
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

function loginUser(){
 alert('You Have To Log In To Purchase');
 window.location = './login.html'
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Toggle Button<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function button(id) {
  document.getElementById(id).classList.toggle("active");
}