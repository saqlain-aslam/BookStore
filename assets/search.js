$(document).ready(function () {
  const searchInput = $("input[type='search']");

  searchInput.on("input", function () {
    const query = $(this).val().toLowerCase();
    const books = JSON.parse(localStorage.getItem("storedBooks")) || [];
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );

    renderSearchResults(filteredBooks);
  });

  function renderSearchResults(books) {
    const container = $("#bookList");
    container.empty();

    
    if (books.length === 0) {
      container.append(`<p class="text-white text-center mt-3">No matching books found.</p>`);
      return;
    }

    books.forEach((book) => {
      const card = `
        <div class="col-md-3 mb-3">
          <div class="card h-100">
            <img src="${book.image}" class="card-img-top" alt="${book.title}">
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text">${book.author}</p>
              <p class="fw-bold text-success">$${book.price}</p>
              <div class="d-flex justify-content-between">
                <button class="btn btn-sm btn-warning add-to-cart" data-id="${book.id}">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>`;
      container.append(card);
    });
  }
});
