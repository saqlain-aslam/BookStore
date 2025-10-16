class Book {
  constructor(id, title, author, price, image) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.price = price;
    this.image = image ;
  }
}

$(document).ready(function () {

  let books = JSON.parse(localStorage.getItem("storedBooks")) || [];
  
  console.log(Date.now())

  function renderBooks() {
    const container = $("#bookList");
    container.empty();

    if (books.length === 0) {
      container.append(
        `<p class="text-white text-center mt-3">No books yet. Add one!</p>`
      );
      return;
    }

    // card
    books.forEach((book) => {
      const card = `
        <div class="col-md-3 mb-3">
          <div class="card h-100 bg-white bg-opacity-50 " >
            <img src="${book.image}" class="card-img-top" alt="${book.title}">
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text">${book.author}</p>
              <p class="fw-bold text-success">$${book.price}</p>
              <div class="d-flex justify-content-between">
                <button class="btn btn-sm btn-primary edit-book" data-id="${book.id}">Edit</button>
                <button class="btn btn-sm btn-warning add-to-cart" data-id="${book.id}">Add to Cart</button>
                <button class="btn btn-sm btn-danger delete-book" data-id="${book.id}">Delete</button>
              </div>
            </div>
          </div>
        </div>`;
      container.append(card);
    });
  }

  function saveBooks() {
    localStorage.setItem("storedBooks", JSON.stringify(books));
  }


  // $("#addBookForm").on("submit", function (e) {
  //   e.preventDefault();

  //   const title = $("#bookTitle").val();
  //   const author = $("#bookAuthor").val();
  //   const price = $("#bookPrice").val();
  //   const image = $("#bookImage").val();

  //   if (!title || !author || !price) {
  //     alert("Please fill in all required fields!");
  //     return;
  //   }

  //   const newBook = new Book(Date.now(), title, author, price, image);
  //   books.push(newBook);
  //   saveBooks();
  //   renderBooks();

  //   this.reset();
  //   $("#addBookModal").modal("hide");
  // });

//   dlt book

// $("#addBookForm").on("submit", function (e) {
//   e.preventDefault();

//   const title = $("#bookTitle").val();
//   const author = $("#bookAuthor").val();
//   const price = $("#bookPrice").val();
//   const imageFile = $("#bookImage")[0].files[0];

//   if (!title || !author || !price) {
//     alert("Please fill in all required fields!");
//     return;
//   }

//   if (imageFile) {
//     const reader = new FileReader();
//     reader.onload = function (event) {
//       const newBook = new Book(Date.now(), title, author, price, event.target.result);
//       books.push(newBook);
//       saveBooks();
//       renderBooks();
//       $("#addBookForm")[0].reset();
//       $("#addBookModal").modal("hide");
//     };
//     reader.readAsDataURL(imageFile);
//   } else {
//     const newBook = new Book(Date.now(), title, author, price, "");
//     books.push(newBook);
//     saveBooks();
//     renderBooks();
//     $("#addBookForm")[0].reset();
//     $("#addBookModal").modal("hide");
//   }
// });


$("#addBookForm").on("submit", function (e) {
  e.preventDefault();

  const title = $("#bookTitle").val();
  const author = $("#bookAuthor").val();
  const price = $("#bookPrice").val();
  const imageFile = $("#bookImage")[0].files[0];
  const editId = $("#submitAddBook").data("edit-id"); 

  if (!title || !author || !price) {
    alert("Please fill in all required fields!");
    return;
  }

  if (editId) {
    const bookIndex = books.findIndex((b) => b.id === editId);
    if (bookIndex !== -1) {

      if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (event) {
          books[bookIndex].title = title;
          books[bookIndex].author = author;
          books[bookIndex].price = price;
          books[bookIndex].image = event.target.result; 

          saveBooks();
          renderBooks();
          resetForm();
        };
        reader.readAsDataURL(imageFile);
      } else {
        books[bookIndex].title = title;
        books[bookIndex].author = author;
        books[bookIndex].price = price;

        saveBooks();
        renderBooks();
        resetForm();
      }
    }
    return; 
  }

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const newBook = new Book(Date.now(), title, author, price, event.target.result);
      books.push(newBook);
      saveBooks();
      renderBooks();
      resetForm();
    };
    reader.readAsDataURL(imageFile);
  } else {
    const newBook = new Book(Date.now(), title, author, price, "");
    books.push(newBook);
    saveBooks();
    renderBooks();
    resetForm();
  }
});

function resetForm() {
  $("#addBookForm")[0].reset();
  $("#submitAddBook").text("Save Book").removeData("edit-id");
  $("#addBookModal").modal("hide");
}


$(document).on("click", ".delete-book", function () {
    const id = $(this).data("id");
    books = books.filter((book) => book.id !== id);
    saveBooks();
    renderBooks();
  });

//edit 
 $(document).on("click", ".edit-book", function () {
  const id = $(this).data("id");
  const book = books.find((b) => b.id === id);

  if (book) {
    $("#bookTitle").val(book.title);
    $("#bookAuthor").val(book.author);
    $("#bookPrice").val(book.price);
    $("#bookImage").val(""); 

    $("#submitAddBook").text("Update Book").data("edit-id", id);
    $("#addBookModal").modal("show");
  }
});


// cart
$(document).on("click", ".add-to-cart", function () {
  const id = $(this).data("id");
  const selectedBook = books.find((b) => b.id === id);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingBook = cart.find((b) => b.id === id);
  if (existingBook) {
    existingBook.quantity += 1;        
  } else {
    selectedBook.quantity = 1;        
    cart.push(selectedBook);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${selectedBook.title} added to cart!`);
});

  renderBooks();
});
