let main = document.querySelector(".main"),
    signUpLink = document.querySelector(".link .signup-link"),
    loginLink = document.querySelector(".link .login-link");

signUpLink.addEventListener("click", () => {
    main.classList.add("animated-login");
    main.classList.remove("animated-signup");
});

loginLink.addEventListener("click", () => {
    main.classList.add("animated-signup");
    main.classList.remove("animated-login");
});

// Utility functions
function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}
function isValidPassword(pass) {
    return pass.length >= 6;
}

// Random move function
function moveButtonRandomly(button) {
    const btnRect = button.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;

    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;

    // Calculate safe max X and Y so the button stays fully visible
    const maxX = viewportWidth - btnWidth;
    const maxY = viewportHeight - btnHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    button.style.position = "fixed";
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
    button.style.zIndex = "9999";
}


// Dodge logic
function enableButtonDodging(button, isValidFn, errorDiv) {
    button.addEventListener("mouseover", () => {
        if (!isValidFn()) {
            moveButtonRandomly(button);
            errorDiv.textContent = "Invalid input! Fix it to click the button.";
        } else {
            button.style.position = "static";
            errorDiv.textContent = "";
        }
    });

    // Also lock the button click
    button.addEventListener("click", (e) => {
        if (!isValidFn()) {
            e.preventDefault();
        }
    });
}

// Login validation
const loginBtn = document.getElementById("login-btn");
const loginError = document.getElementById("login-error");
enableButtonDodging(loginBtn, () => {
    const u = document.getElementById("login-username").value.trim();
    const p = document.getElementById("login-password").value.trim();
    return u !== "" && isValidPassword(p);
}, loginError);

// SignUp validation
const signupBtn = document.getElementById("signup-btn");
const signupError = document.getElementById("signup-error");
enableButtonDodging(signupBtn, () => {
    const u = document.getElementById("signup-username").value.trim();
    const e = document.getElementById("signup-email").value.trim();
    const p = document.getElementById("signup-password").value.trim();
    const c = document.getElementById("signup-confirm").value.trim();
    return u !== "" && isValidEmail(e) && isValidPassword(p) && p === c;
}, signupError);

// Prevent form submission if still invalid
document.getElementById("loginForm").addEventListener("submit", (e) => {
    if (!loginBtn.parentElement.contains(loginBtn)) return;
    if (!(document.getElementById("login-username").value && isValidPassword(document.getElementById("login-password").value))) {
        e.preventDefault();
        loginError.textContent = "Invalid login details!";
    }
});

document.getElementById("signupForm").addEventListener("submit", (e) => {
    const u = document.getElementById("signup-username").value.trim();
    const eVal = document.getElementById("signup-email").value.trim();
    const p = document.getElementById("signup-password").value.trim();
    const c = document.getElementById("signup-confirm").value.trim();
    if (!(u && isValidEmail(eVal) && isValidPassword(p) && p === c)) {
        e.preventDefault();
        signupError.textContent = "Invalid sign up details!";
    }
});
