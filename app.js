// get the book list element
const bookList = document.getElementById('book-list');

// load books from local storage or use default books

let books = JSON.parse(localStorage.getItem('books')) || [];

// display the books in the book list element
function displayBooks() {
	// clear the book list element
	

	bookList.innerHTML = '';
	// iterate through the books and create a list item for each book
	books.forEach(function(book, index) {
		const div = document.createElement('div');
		div.innerHTML = `<div>${book.title}</div> <div> ${book.author}</div><div> <button data-index="${index}" class="remove-button">Remove</button></div><div><hr></div>`;
		bookList.appendChild(div);
	});
}

// add a new book to the books array and display it
function addBook(title, author) {
	const book = {title, author};
	books.push(book);
	localStorage.setItem('books', JSON.stringify(books));
	displayBooks();
}

// remove a book from the books array and display the updated list
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

// handle the click event on the remove button to remove a book
bookList.addEventListener('click', function(event) {
	if (event.target.classList.contains('remove-button')) {
		const index = parseInt(event.target.dataset.index);
		removeBook(index);
	}
});

// display the initial list of books
displayBooks();
