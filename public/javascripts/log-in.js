async function init() {
    setupLoginButton();
    setupRegisterButton();
}

function setupLoginButton() {
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            window.location.href = '/signin'; 
        });
    }
}

function setupRegisterButton() {
    const registerButton = document.getElementById('registerButton');
    if (registerButton) {
        registerButton.addEventListener('click', () => {
            window.location.href = '/signinNewUser'; 
        });
    }
}

document.addEventListener('DOMContentLoaded', init);