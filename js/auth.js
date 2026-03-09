import { auth, db, googleProvider, githubProvider } from './firebase-config.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const authForm = document.querySelector('.form');

const signUpLink = document.querySelector('.signup a');
const nameField = document.querySelector('.toggle-login');
const formTitle = document.querySelector('.title');
const submitBtn = document.querySelector('.sign');
const signupContainer = document.getElementById('signup-container');

signupContainer.addEventListener('click', (e) => {
    e.preventDefault();

    const modoCadastro = nameField.classList.contains('d-none');

    if(modoCadastro) {
        nameField.classList.remove('d-none');
        formTitle.innerText = 'Cadastro';
        submitBtn.innerText = 'Cadastrar';
        signupContainer.innerHTML = 'Já tem conta? <a href="#">Faça Login</a>';
    } else {
        nameField.classList.add('d-none');
        formTitle.innerText = "Login";
        submitBtn.innerText = "Entrar";
        signupContainer.innerHTML = 'Não tem conta? <a href="#">Registre-se</a>';
    }
})

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const isRegisterMode = !nameField.classList.contains('d-none');

    try {
        if (isRegisterMode) {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Corrigido: user.uid ao invés de user.id
            await setDoc(doc(db, "users", user.uid), {
                nome: name,
                email: email,
                createdAt: new Date()
            });
            alert("Cadastro realizado!");
        } else {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Login Realizado!');
        }

        window.location.href = "dashboard.html";
    } catch (error) {
        alert("Erro: " + error.message);
    }
});

document.querySelector('.icon[aria-label="Log in with Google"]').addEventListener('click', async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        window.location.href = "dashboard.html";
    } catch (error) {
        alert("Erro ao logar com Google: " + error.message);
    }
});