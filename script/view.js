let base_URL = "https://evening-fjord-01909.herokuapp.com/show-products/"

function showProductList(url) {
    fetch(url)
      // Convert data from JSON
      .then((response) => response.json())
      //Stuff to do with data
      .then((data) => {
        // Console log to make sure I am getting the data
        console.log(data);
  
        product = data.data;
        console.log(product);
  
        let view = document.querySelector(".show-items");
        product.forEach((item) => {
          console.log(item);
          view.innerHTML += `<div class="container">
          <img class="info image" src="${item.image}" alt="image"/>
          <p class="info">ID: ${item.id}</p>
          <h3 class="info">${item.title}</h3>
          <p class="info">${item.type}</p>
          <p class="info"><strong>R${item.price}</strong></p>
          </div>`;
        });
      });
  }

  showProductList(base_URL);

  function filter(type){
    let filtered = product.filter(item => {
      return item.type.toLowerCase() == type.toLowerCase();
    })
    showProductList(filtered.slice(0, 4));
  
  }