let timerId;

// HTML.
const noteTitle = document.querySelector(".__title input");
const noteBody = document.querySelector(".__body textarea");

const selectAllButton = document.querySelector("._select-all");
const deleteAllButton = document.querySelector("._delete-all");
const confirmDeleteButton = document.querySelector("._delete-confirm");
const saveToLocalButton = document.querySelector("._save-to-local");

function selectAll() {
	noteBody.select();
};

function showDeleteConfirm() {
	confirmDeleteButton.style.display = "inline";
	deleteAllButton.style.display = "none";

	timerId = setTimeout(() => {
		confirmDeleteButton.style.display = "none";
		deleteAllButton.style.display = "inline";
	}, 2500);
};

function confirmDelete() {
	confirmDeleteButton.style.display = "none";
	deleteAllButton.style.display = "inline";

	noteTitle.value = "";
	noteBody.value = "";

	clearInterval(timerId);

	saveTitle();
	saveText();
};

function downloadNote() {
	let title = noteTitle.value || "Simple Note";
	let text = noteBody.value;

	let element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', title);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click(); // Not my code, I just changed it a bit haha.

	document.body.removeChild(element);
};


// Local Storage.
const note_title = "Note_Title";
const note_text = "Note_Text";

function saveTitle() {
	localStorage.setItem(note_title, noteTitle.value);
};

function saveText() {
	localStorage.setItem(note_text, noteBody.value);
};

function loadData() {
	let titleFromStorage = localStorage.getItem(note_title) || "";
	noteTitle.value = titleFromStorage;

	let textFromStorage = localStorage.getItem(note_text) || "";
	noteBody.value = textFromStorage;
};

noteTitle.addEventListener("input", saveTitle);
noteBody.addEventListener("input", saveText);

selectAllButton.addEventListener("click", selectAll);
deleteAllButton.addEventListener("click", showDeleteConfirm);
confirmDeleteButton.addEventListener("click", confirmDelete);
saveToLocalButton.addEventListener("click", downloadNote);

document.addEventListener("DOMContentLoaded", () => {
	loadData();
});