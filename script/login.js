function login(){
    let username = document.querySelector('#username').value;
    let password = document.querySelector("#password").value;
    console.log(username, password)

    fetch("https://evening-fjord-01909.herokuapp.com/login/",{
        method: 'PATCH',
        body: JSON.stringify({
            username:username,
            password:password
        }),
        headers: {
            'Content-Type':'application/json'
        },
    })
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
        if (!res.data) {
            alert('Incorrect Username Or Password');
        }
        else{
            localStorage.setItem("user", JSON.stringify(res));
            window.location = './product.html'
        }
    })
}