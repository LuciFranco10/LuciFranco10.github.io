
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyAD1GWQWZyXRip6ujyrImkNLTcMxcdkack",
    authDomain: "cadastro-b3998.firebaseapp.com",
    projectId: "cadastro-b3998",
    storageBucket: "cadastro-b3998.appspot.com",
    messagingSenderId: "383156758796",
    appId: "1:383156758796:web:5751deecb4ac1bdd228129"
  };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };


/*Aqui trata-se da configuração e inicialização do meu projeto que estou utilizando autenticação e banco de dados.
passo 1: importar o modulos
passo 2: copiar e colar as configurações retiradas diretamente do firebase.
passo 3: iniciar o firebase atraves da variavel firebaseConfig
passo 4: iniciar o banco
passo 5: iniciar a autenticação*/