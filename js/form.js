import { db, auth } from './firebase-config.js'; 
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js"; 

const form = document.getElementById('cadastroForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value; 

    try {
       
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await sendEmailVerification(user);
        alert('Verifique seu e-mail para confirmar o cadastro.');
        
       
        const docRef = await addDoc(collection(db, "cadastros"), {
            nome: nome,
            telefone: telefone,
            email: email,
        });

        alert("Cadastro realizado com sucesso!");
        console.log("Documento salvo com ID: ", docRef.id);

        
        await sendEmail(nome, telefone, email, password); 
        form.reset();
    } catch (e) {
        console.error("Erro ao realizar o cadastro: ", e.code, e.message);
        alert("Erro ao realizar o cadastro. Tente novamente. Detalhes: " + e.message);
    }
});


export async function sendEmail(nome, telefone, email, password) {
    const templateParams = {
        from_name: nome, 
        phone: telefone, 
        to_email: email,     
        password: password,     
    };

    console.log("Enviando e-mail para:", templateParams.to_email); 

        try {
        const response = await emailjs.send("service_fa7o63i", "template_a14tyih", templateParams);
        alert("Email enviado com sucesso!");
        console.log("Email enviado", response.status, response.text);
    } catch (error) {
        console.error("Erro ao enviar email:", error);
        alert("Erro ao enviar o email. Tente novamente.");
    }
}
