import { auth } from './firebase-config.js';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const provider = new GoogleAuthProvider();



document.getElementById("googleLogin").addEventListener("click", function() {
    signInWithPopup(auth, provider).then((result) => {
        console.log(result.user);
        window.location.href = "menu.html"; 
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
        
         window.location.href = 'menu.html';
       
     } else {
        alert('Usuário ou senha incorretos.');
     }
 });



 document.getElementById('userLoginForm').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;  

    // Autenticar com Firebase
    signInWithEmailAndPassword(auth, email)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log('Login com sucesso:', user);
        window.location.href = 'form.html';
    })
    .catch((error) => {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Verifique suas credenciais.');
    });
});