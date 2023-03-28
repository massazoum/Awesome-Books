
const bookList = document.getElementById('book-list');

let books = JSON.parse(localStorage.getItem('books')) || [];


function displayBooks() {

	bookList.innerHTML = '';
	books.forEach(function(book, index) {
		const div = document.createElement('div');
		div.innerHTML = `<div>${book.title}</div> <div> ${book.author}</div><div> <button data-index="${index}" class="remove-button">Remove</button></div><div><hr></div>`;
		bookList.appendChild(div);
	});
}

function addBook(title, author) {
	const book = {title, author};
	books.push(book);
	localStorage.setItem('books', JSON.stringify(books));
	displayBooks();
}
function removeBook(index) {
	books = books.filter(function(book, bookIndex) {
		return bookIndex !== index;
	});
	localStorage.setItem('books', JSON.stringify(books));
	displayBooks();
}

// handle the form submission to add a new book
const addBookForm = document.getElementById('add-book-form');
addBookForm.addEventListener('submit', function(event) {
	event.preventDefault();
	const titleInput = document.getElementById('title-input');
	const authorInput = document.getElementById('author-input');
	addBook(titleInput.value, authorInput.value);
	titleInput.value = '';
	authorInput.value = '';
});

bookList.addEventListener('click', function(event) {
	if (event.target.classList.contains('remove-button')) {
		const index = parseInt(event.target.dataset.index);
		removeBook(index);
	}
});

displayBooks();
