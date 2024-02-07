let theme = localStorage.getItem("theme") || "light";

// HTML.
const themeButton = document.querySelector(".settings__button--theme");
const themeDescription = document.querySelector(".settings__button-description--theme");

function enableLightTheme() {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");

    themeDescription.innerText = "Press to change to dark theme.";
};

function enableDarkTheme() {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");

    themeDescription.innerText = "Press to change to light theme.";
};

themeButton.addEventListener("click", () => {
    theme = localStorage.getItem("theme");
	theme === "dark" ? enableLightTheme() : enableDarkTheme();
});

document.addEventListener("DOMContentLoaded", () => {
    if (theme === "dark") enableDarkTheme();
});