// HTML
const noteTitle = document.querySelector(".__title input")
const noteText = document.querySelector(".__body textarea")
const selectAllButton = document.querySelector("._select-all")
const deleteAllButton = document.querySelector("._delete-all")
const saveToLocalButton = document.querySelector("._save-to-local")

function selectAll() {
	noteText.select();
};

function deleteAll() {
	deleteChoices.classList.toggle("hidden");

	let yesDelete = document.querySelector(".yes-delete");
	let noDelete = document.querySelector(".no-delete");

	yesDelete.addEventListener("click", () => {
		deleteChoices.classList.add("hidden");

		noteTitle.value = "";
		noteText.value = "";

		storage.saveData.saveTitle();
		storage.saveData.saveText();
	});

	noDelete.addEventListener("click", () => {
		deleteChoices.classList.add("hidden");
	});
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
	localStorage.setItem(storageNoteText, noteText.value);
};

function loadData() {
	let titleFromStorage = localStorage.getItem(storageNoteTitle) || "";
	noteTitle.value = titleFromStorage;

	let textFromStorage = localStorage.getItem(storageNoteText) || "";
	noteText.value = textFromStorage;
};

noteTitle.addEventListener("input", saveTitle);
noteText.addEventListener("input", saveText);

selectAllButton.addEventListener("click", selectAll);
deleteAllButton.addEventListener("click", deleteAll);
saveToLocalButton.addEventListener("click", downloadNote);

document.addEventListener("DOMContentLoaded", () => {
	loadData();
});