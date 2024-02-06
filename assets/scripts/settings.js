// HTML.
const settingsToggle = document.querySelector(".settings__button--toggle-settings");
const settingsList = document.querySelector(".settings__buttons");
const settingsItems = settingsList.querySelectorAll("a, button");

function toggleSettings() {
    const isExpanded = (settingsToggle.getAttribute("aria-expanded") == "true");

    if (isExpanded) {
        settingsToggle.setAttribute("aria-expanded", false);
        settingsList.setAttribute("aria-hidden", true);
        settingsItems.forEach(item => {item.tabIndex = -1});
    } else {
        settingsToggle.setAttribute("aria-expanded", true);
        settingsList.setAttribute("aria-hidden", false);
        settingsItems.forEach(item => {item.tabIndex = 0});
    };
};

settingsToggle.addEventListener("click", toggleSettings);