let products = []
let user = JSON.parse(localStorage.getItem('user'))

products = JSON.parse(localStorage.getItem("cart"))

const total = JSON.parse(localStorage.getItem('total')) 

function cartItems(){
let view = document.querySelector('#cartItems')
let payment = document.querySelector('#total')    
console.log(products,total);
if(user == null){
    window.location="./login.html"
}

else if (products == null, total ==null) {
    view.innerHTML = 'You Have No Items In Cart'
    payment.innerHTML = ''
    document.getElementById('checkout').style.display = 'none'
}
else if (products.length == 0) {
    view.innerHTML = 'You Have No Items In Cart'
    payment.innerHTML = ''
    document.getElementById('checkout').style.display = 'none'
}
else{
    products.forEach((item) => {
    view.innerHTML +=  `
    <div class="container">
    <img class="image" src="${item.image}" alt="image"/>
    <h4 class="title">${item.title}</h4>
    <p class="type">${item.type}</p>
    <p class="price"><strong>R${item.price}</strong></p>
    <button class ="rmbtn" onclick="removeProduct(${item.id})"><i class="fas fa-trash"></i></button>
    </div>` 
   })
   payment.innerHTML =`Your Total Comes To R${total}`
  }
}
cartItems();

function removeProduct(id) {
    let cart = []
    let productLeft = products.filter(item => item.id != id)
    localStorage.setItem('cart', JSON.stringify(productLeft))
    cart = JSON.parse(localStorage.getItem('cart'))
    let newPrice = cart.reduce((total, item) => total + parseInt(item.price), 0)
    localStorage.setItem('total', newPrice)
    document.querySelector('#total').innerHTML = 'R'+newPrice
    window.location.reload()
}

function checkOut(){
    
    var out = "";
for (var key in products) {
  if (products.hasOwnProperty(key)) {
      out += '<br>'+products[key].title+'</br>'; 
  }
}
    Email.send({
	Host: "smtp.gmail.com",
	Username : "081698work@gmail.com",
	Password : "open@123",
	To : `${user.data.email}`,
	From : "081698work@gmail.com",
	Subject : "Thanks For Testing This Site",
	Body : "The Items You Purchased: "+out+'<br>with total Price R'+total+' will arrive in 2 weeks </br>'
	}).then(
		message => alert("Item(s) Checkout Successful\n Check Email For More")
	).then(erase => localStorage.removeItem('cart')).then(clear => localStorage.removeItem('total')).then(loctaion => window.location='./product.html')

}
    
    
