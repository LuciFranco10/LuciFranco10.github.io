import { auth } from './firebase-config.js';
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

