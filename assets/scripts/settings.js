// HTML.
const settings = document.querySelector(".settings");
const settingsToggle = document.querySelector(".settings__button--toggle-settings");
const settingsToggleDescription = document.querySelector(".settings__button-description--toggle-settings");
const settingsList = document.querySelector(".settings__buttons");
const settingsItems = settingsList.querySelectorAll("a, button");

function toggleSettings() {
    const isExpanded = (settingsToggle.getAttribute("aria-expanded") == "true");

    if (isExpanded) {
        settings.setAttribute("data-expanded", false);
        settingsToggle.setAttribute("aria-expanded", false);
        settingsToggleDescription.innerText = "Press to open settings.";
        settingsList.setAttribute("aria-hidden", true);
        settingsList.tabIndex = -1;
        settingsItems.forEach(item => {item.tabIndex = -1});
    } else {
        settings.setAttribute("data-expanded", true);
        settingsToggle.setAttribute("aria-expanded", true);
        settingsToggleDescription.innerText = "Press to close settings.";
        settingsList.setAttribute("aria-hidden", false);
        settingsList.removeAttribute("tabIndex");
        settingsItems.forEach(item => {item.tabIndex = 0});
    };
};

settingsToggle.addEventListener("click", toggleSettings);

document.addEventListener("DOMContentLoaded", () => {
    // No tabbing and hide from screen reader until it is open.
    settingsList.setAttribute("aria-hidden", true);
    settingsItems.forEach(item => {item.tabIndex = -1});
});