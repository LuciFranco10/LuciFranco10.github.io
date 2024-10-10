import { auth } from './firebase-config.js';nde o objeto auth
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const provider = new GoogleAuthProvider();



document.getElementById("googleLogin").addEventListener("click", function() {
    signInWithPopup(auth, provider).then((result) => {
        console.log(result.user);
        window.location.href = "form.html"; 
    }).catch((error) => {
        console.error('Erro ao fazer login com Google:', error);
    });
});




localStorage.setItem('username', 'luciane.franco');
localStorage.setItem('password', '1234');


document.getElementById('userLoginForm').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

   
     if (username === localStorage.getItem('username') && password === localStorage.getItem('password')) {
        
         window.location.href = 'form.html';
       
     } else {
        alert('Usuário ou senha incorretos.');
     }
 });
