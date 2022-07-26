const html = {
	noteTitle: document.querySelector(".note-title input"),
	noteText: document.querySelector(".note-text textarea"),
	noteSelectAll: document.querySelector(".select-all-text"),
	noteDeleteAll: document.querySelector(".delete-all-text"),
	noteSaveLocal: document.querySelector(".save-to-local"),
};

let deleteChoices = document.querySelector(".delete-choices");

// Local Storage.

const storageNoteTitle = "Note_Title";
const storageNoteText = "Note_Text";

let storage = {
	saveData: {
		saveTitle: function saveTitle() {
			let titleValue = html.noteTitle.value;
			localStorage.setItem(storageNoteTitle, titleValue);
		},
		saveText: function saveText() {
			let textValue = html.noteText.value;
			localStorage.setItem(storageNoteText, textValue);
		}
	},
	loadData: function loadData() {
		let titleFromStorage = localStorage.getItem(storageNoteTitle);
		html.noteTitle.value = titleFromStorage;

		let textFromStorage = localStorage.getItem(storageNoteText);
		html.noteText.value = textFromStorage;
	}
};

html.noteTitle.addEventListener("input", storage.saveData.saveTitle);
html.noteText.addEventListener("input", storage.saveData.saveText);

document.addEventListener("DOMContentLoaded", () => {
	storage.loadData();
});

// Extra Function.

let extraFunction = {
	selectAll: function selectAll() {
		html.noteText.select();
	},
	deleteAll: function deleteAll() {
		deleteChoices.classList.toggle("hidden");

		let yesDelete = document.querySelector(".yes-delete");
		let noDelete = document.querySelector(".no-delete");

		yesDelete.addEventListener("click", () => {
			deleteChoices.classList.add("hidden");

			html.noteTitle.value = "";
			html.noteText.value = "";

			storage.saveData.saveTitle();
			storage.saveData.saveText();
		});

		noDelete.addEventListener("click", () => {
			deleteChoices.classList.add("hidden");
		});
	},
	saveToLocal: function saveToLocal() {
		let title = localStorage.getItem(storageNoteTitle);
		let text = localStorage.getItem(storageNoteText);

		let element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', title);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click(); // Not my code, I just changed it a bit haha.

		document.body.removeChild(element);
	}
};

html.noteSelectAll.addEventListener("click", extraFunction.selectAll);
html.noteDeleteAll.addEventListener("click", extraFunction.deleteAll);
html.noteSaveLocal.addEventListener("click", extraFunction.saveToLocal);