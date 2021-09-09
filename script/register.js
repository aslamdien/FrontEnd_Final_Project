function show_password() {
    let x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}

function register(){
    let name = document.querySelector('#name').value;
    let surname = document.querySelector('#surname').value;
    let id_number = document.querySelector('#id_number').value;
    let email = document.querySelector('#email').value;
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;

    fetch('https://evening-fjord-01909.herokuapp.com/register/', {
        method:'POST',
        body: JSON.stringify({
            name:name,
            surname:surname,
            id_number:id_number,
            email:email,
            username:username,
            password:password,
        }),
        headers:{
            'Content-Type':'application/json'
        },
    })
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
        if (res['message'] == 'Invalid Email Address') {
            document.querySelector('.user-er').innerHTML='';
            document.querySelector('.id-er').innerHTML='';
            document.querySelector('#email-er').innerHTML='<strong><i class="fas fa-exclamation-circle"></i> Invalid Email Address</strong>';
        }

        else if (res['message'] == 'ID Number Invalid') {
            document.querySelector('#email-er').innerHTML='';
            document.querySelector('.user-er').innerHTML='';
            document.querySelector('.id-er').innerHTML='<strong><i class="fas fa-exclamation-circle"></i> ID Number Not Valid</strong>';
        }
        else if (res['message'] == 'This username has been taken') {
            document.querySelector('#email-er').innerHTML='';
            document.querySelector('.id-er').innerHTML='';
            document.querySelector('.user-er').innerHTML='<strong><i class="fas fa-exclamation-circle"></i> Sorry,That Username Has Been Taken</strong>';
        }
        else {
            alert('You Are Registered \n An Email Has Been Sent With Your Username and Password Information')
            window.location = './login.html'
        }
    })
}