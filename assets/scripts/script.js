// HTML.
const inputTitle = document.querySelector(".simple-note__input--title");
const inputBody = document.querySelector(".simple-note__input--body");

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

// Local Storage.
const note_title = "Note_Title";
const note_body = "Note_Body";

function saveTitle() {
    localStorage.setItem(note_title, inputTitle.value);
};

function saveBody() {
    localStorage.setItem(note_body, inputBody.value);
};

function loadNote() {
    let titleFromStorage = localStorage.getItem(note_title) || "";
    inputTitle.value = titleFromStorage;

    let bodyFromStorage = localStorage.getItem(note_body) || "";
    inputBody.value = bodyFromStorage;
};

function debounce(func, delay = 250) {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

const debouncedSaveTitle = debounce(saveTitle);
const debouncedSaveBody = debounce(saveBody);

inputTitle.addEventListener("input", debouncedSaveTitle);
inputBody.addEventListener("input", debouncedSaveBody);

document.addEventListener("DOMContentLoaded", () => {
    loadNote();
});

settingsToggle.addEventListener("click", toggleSettings);

// function showDeleteConfirm() {
//     confirmDeleteButton.style.display = "inline";
//     deleteAllButton.style.display = "none";

//     timerId = setTimeout(() => {
//         confirmDeleteButton.style.display = "none";
//         deleteAllButton.style.display = "inline";
//     }, 2500);
// };

// function confirmDelete() {
//     confirmDeleteButton.style.display = "none";
//     deleteAllButton.style.display = "inline";

//     noteTitle.value = "";
//     noteBody.value = "";

//     clearInterval(timerId);

//     saveTitle();
//     saveBody();
// };

// function downloadNote() {
//     let title = noteTitle.value || "Simple Note";
//     let text = noteBody.value;

//     let element = document.createElement('a');
//     element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
//     element.setAttribute('download', title);

//     element.style.display = 'none';
//     document.body.appendChild(element);

//     element.click(); // Not my code, I just changed it a bit haha.

//     document.body.removeChild(element);
// }