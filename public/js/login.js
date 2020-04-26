let signIform = document.querySelector('.sign-in-form');
let registerform = document.querySelector('.register-form');

signIform.addEventListener('submit', function (e) {  
    e.preventDefault();
    let email = document.getElementById('sign-in-email').value;
    let password = document.getElementById('sign-in-password').value;
    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password}) // Javascrypt will understand that the two will be created and the value are found up here 
    }).then((resp) => {
        if(resp.status === 400) {
            throw new Error();
        }
        return resp.json();
    }).then((data) => {
        window.location.href = data.redirectURL;
    }).catch(() => alert('Wrong email or password'));

})

registerform.addEventListener('submit', function(e) {  
    e.preventDefault();
    let email = document.getElementById('register-email').value;
    let password = document.getElementById('register-password').value;
    let rePassword = document.getElementById('register-re-enter-password').value;
    // when the user submit the pasword and the repassord they have to be indentical, let check that
    if(password !== rePassword){
        return; // this will return the operation if this condition is 
    }
    fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password}) 
    }).then((resp) => resp.text()).then((data) => alert(data));
})  