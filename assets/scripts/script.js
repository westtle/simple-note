// HTML
const noteTitle = document.querySelector(".__title input")
const noteText = document.querySelector(".__body textarea")
const selectAllButton = document.querySelector("._select-all")
const deleteAllButton = document.querySelector("._delete-all")
const saveToLocalButton = document.querySelector("._save-to-local")

// Local Storage.

const storageNoteTitle = "Note_Title";
const storageNoteText = "Note_Text";

let storage = {
	saveData: {
		saveTitle: function saveTitle() {
			let titleValue = noteTitle.value;
			localStorage.setItem(storageNoteTitle, titleValue);
		},
		saveText: function saveText() {
			let textValue = noteText.value;
			localStorage.setItem(storageNoteText, textValue);
		}
	},
	loadData: function loadData() {
		let titleFromStorage = localStorage.getItem(storageNoteTitle);
		noteTitle.value = titleFromStorage;

		let textFromStorage = localStorage.getItem(storageNoteText);
		noteText.value = textFromStorage;
	}
};

noteTitle.addEventListener("input", storage.saveData.saveTitle);
noteText.addEventListener("input", storage.saveData.saveText);

document.addEventListener("DOMContentLoaded", () => {
	storage.loadData();
});

// Extra Function.

let extraFunction = {
	selectAll: function selectAll() {
		noteText.select();
	},
	deleteAll: function deleteAll() {
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

selectAllButton.addEventListener("click", extraFunction.selectAll);
deleteAllButton.addEventListener("click", extraFunction.deleteAll);
saveToLocalButton.addEventListener("click", extraFunction.saveToLocal);