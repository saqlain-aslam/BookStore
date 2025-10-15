$(document).ready(function () {

    let cartBooks = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCartBooks() {
    const container = $("#bookList");
    container.empty();

    if (books.length === 0) {
      container.append(
        `<p class="text-white text-center mt-3">No books yet. Add one!</p>`
      );
      return;
    }

    // card
    cartBooks.forEach((book) => {
      const card = `
        <div class="col-md-3 mb-3">
          <div class="card h-100">
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

 





// cart
  $(document).on("click", ".add-to-cart", function () {
  const id = $(this).data("id");
  const selectedBook = books.find((b) => b.id === id);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(selectedBook);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${selectedBook.title} added to cart!`);
});


  

  renderCartBooks();
});
