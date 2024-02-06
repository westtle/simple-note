// HTML.
const inputTitle = document.querySelector(".simple-note__input--title");
const inputBody = document.querySelector(".simple-note__input--body");

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