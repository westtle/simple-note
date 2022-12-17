// HTML
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

	// setTimeout is leaving a little bug, but I will fix it later (maybe).
	setTimeout(() => {
		confirmDeleteButton.style.display = "none";
		deleteAllButton.style.display = "inline";
	}, 2500);
};

function confirmDelete() {
	confirmDeleteButton.style.display = "none";
	deleteAllButton.style.display = "inline";

	noteTitle.value = "";
	noteBody.value = "";

	saveText();
	saveTitle();
};

function downloadNote() {
	let title = localStorage.getItem(storageNoteTitle);
	let text = localStorage.getItem(storageNoteText);

	let element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', title);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click(); // Not my code, I just changed it a bit haha.

	document.body.removeChild(element);
};


// Local Storage.
const storageNoteTitle = "Note_Title";
const storageNoteText = "Note_Text";

function saveTitle() {
	localStorage.setItem(storageNoteTitle, noteTitle.value);
};

function saveText() {
	localStorage.setItem(storageNoteText, noteBody.value);
};

function loadData() {
	let titleFromStorage = localStorage.getItem(storageNoteTitle) || "";
	noteTitle.value = titleFromStorage;

	let textFromStorage = localStorage.getItem(storageNoteText) || "";
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