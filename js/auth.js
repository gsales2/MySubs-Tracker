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