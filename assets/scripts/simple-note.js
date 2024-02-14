// HTML.
const inputTitle = document.querySelector(".simple-note__input--title");
const inputBody = document.querySelector(".simple-note__input--body");

const clearButton = document.querySelector(".settings__button--clear");
const downloadButton = document.querySelector(".settings__button--download");

const printHelperTitle = document.querySelector(".print-helper__title");
const printHelperBody = document.querySelector(".print-helper__body");

function clearNote() {
    const confirmDelete = confirm("Are you sure you want to clear your note? Press OK to clear.");

    if (confirmDelete) {
        inputTitle.value = "";
        inputBody.value = "";

        saveTitle();
        saveBody();
        updatePrint();
    };
};

function downloadNote() {
    const noteTitle = inputTitle.value || "Simple Note";
    const noteBody = inputBody.value;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(noteBody));
    element.setAttribute('download', noteTitle);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

function updatePrint() {
    printHelperTitle.innerText = inputTitle.value;
    printHelperBody.innerText = inputBody.value;
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
inputTitle.addEventListener("change", updatePrint);
inputBody.addEventListener("change", updatePrint);

downloadButton.addEventListener("click", downloadNote);
clearButton.addEventListener("click", clearNote);

document.addEventListener("DOMContentLoaded", () => {
    loadNote();
    updatePrint();
});