// Show Password
function show_password() {
    let x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>LOg In<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
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
            document.querySelector('#error').innerHTML='<strong><i class="fas fa-exclamation-circle"></i> Incorrect Username Or Password</strong>';
        }

        else if(username == 'aslamdien90'){ // For Admin Page (password = 'turbostar1')
            localStorage.setItem('admin', JSON.stringify(res));
            window.location = './admin.html'
        }

        else{ // For Product Page
            localStorage.setItem("user", JSON.stringify(res));
            window.location = './product.html'
        }
    })
}