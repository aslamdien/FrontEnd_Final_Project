// Get admin data from localStorage
function getUser(){
    const admin = JSON.parse(localStorage.getItem("admin"))
    console.log(admin)
    document.querySelector('#greeting').innerHTML = `Welcome Back Admin ${admin.data.name}`   
}
getUser();

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Show Items<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
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
          <p class="info">ID: ${item.id}</p>
          <h3 class="info">${item.title}</h3>
          <p class="info">${item.type}</p>
          <p class="info"><strong>R${item.price}</strong></p>
          <button onclick="event.preventDefault(); deleteProduct(${item.id})">Delete</button>
          </div>`;
        });
      });
  }

  showProductList();
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Filter Products<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
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

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function previewFile() {
  const image = document.querySelector(".imageup");
  const file = document.querySelector("#image").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      // convert image file to base64 string
      image.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

function addproduct() {
  let title = document.getElementById("title").value;
  let price = document.getElementById("price").value;
  let type = document.getElementById("type").value;
  let image = document.querySelector(".imageup").src;

  if (title && price && image && type) {
    fetch("https://evening-fjord-01909.herokuapp.com/add-product/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        price: price,
        image: image,
        type: type,
      }),
    })
      .then((res) => res.json)
      .then((data) => {
        console.log(data);
        console.log("success");
        window.location.reload();
      })
      .catch((err) => alert("Error. Please try again, or log in again"));
  } else {
    alert("Please Fill out all Information");
  }
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Delete product<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function deleteProduct(item) {
  fetch('https://evening-fjord-01909.herokuapp.com/show-products/')
  .then((res) => res.json())
  .then(data => {
    let products = data.data
    let deleteProduct = products.find((item) => {
      return item[0] == item
    })
    if (confirm('Are you sure you want to delete this?')) {
      fetch(`https://evening-fjord-01909.herokuapp.com/delete-product/${item}`)
      .then((res) => res.json())
      .then(data => {
        window.location.reload();
      })
    }
    else(
      console.log('delete cancelled')
    )
  })
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function button(id) {
  document.getElementById(id).classList.toggle("active");
}
