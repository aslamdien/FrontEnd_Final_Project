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
