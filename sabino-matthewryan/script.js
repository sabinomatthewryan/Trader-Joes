// Key for saving theme preference in localStorage
const THEME_STORAGE_KEY = "portfolio_theme_mode";

function initTheme() {
    let savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    // Apply saved light-theme class if explicitly chosen previously
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
    }
}

function toggleTheme() {
    let isLightThemeActive = document.body.classList.toggle("light-theme");

    // Persist choice using guard clause logic
    if (isLightThemeActive) {
        localStorage.setItem(THEME_STORAGE_KEY, "light");
        return;
    }

    localStorage.setItem(THEME_STORAGE_KEY, "dark");
}

function handleFormSubmit(event) {
    event.preventDefault();

    let nameInput = document.getElementById("contact_name");
    let emailInput = document.getElementById("contact_email");
    let messageInput = document.getElementById("contact_message");

    // Guard clause: ensure all inputs exist and have content
    if (!nameInput.value.trim() || !emailInput.value.trim() ||
        !messageInput.value.trim()) {
        return;
    }

    // Reset form after submission
    document.getElementById("contact_form").reset();
    alert("Thank you! Your message has been sent successfully.");
}

function setupEventListeners() {
    let themeToggleButton = document.getElementById("theme_toggle");
    let contactForm = document.getElementById("contact_form");

    if (themeToggleButton) {
        themeToggleButton.addEventListener("click", toggleTheme);
    }

    if (contactForm) {
        contactForm.addEventListener("submit", handleFormSubmit);
    }
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    setupEventListeners();
});
