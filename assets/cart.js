$(document).ready(function () {
  let cartBooks = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cartBooks));
  }

  function renderCartBooks() {
    const container = $("#bookList");
    container.empty();

    if (cartBooks.length === 0) {
      container.append(`<p class="text-white text-center mt-3">Your cart is empty.</p>`);
      return;
    }

    cartBooks.forEach((book, index) => {
      const card = `
        <div class="col-md-3 mb-3">
          <div class="card h-100">
            <img src="${book.image}" class="card-img-top" alt="${book.title}">
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text">${book.author}</p>
              <p class="fw-bold text-success">Total amount: $${book.price * book.quantity}</p>
              <div class="d-flex justify-content-between align-items-center mt-2">
                <div class="input-group input-group-sm" style="width:100px;">
                  <button class="btn btn-outline-secondary decrease-qty" data-index="${index}">−</button>
                  <input type="text" class="form-control text-center quantity" data-index="${index}" value="${book.quantity}">
                  <button class="btn btn-outline-secondary increase-qty" data-index="${index}">+</button>
                </div>
                <button class="btn btn-sm btn-danger remove-from-cart" data-index="${index}">Remove</button>
              </div>
            </div>
          </div>
        </div>`;
      container.append(card);
    });
  }
// increase-qty
  $(document).on("click", ".increase-qty", function () {
    const index = $(this).data("index");
    cartBooks[index].quantity++;
    saveCart();
    renderCartBooks();
  });
// .decrease-qty
  $(document).on("click", ".decrease-qty", function () {
    const index = $(this).data("index");
    if (cartBooks[index].quantity > 1) {
      cartBooks[index].quantity--;
    } else {
      cartBooks.splice(index, 1); 
    }
    saveCart();
    renderCartBooks();
  });

  $(document).on("change", ".quantity", function () {
    const index = $(this).data("index");
    const newQty = parseInt($(this).val()) || 1;
    cartBooks[index].quantity = Math.max(1, newQty);
    saveCart();
  });
//remov
  $(document).on("click", ".remove-from-cart", function () {
    const index = $(this).data("index");
    cartBooks.splice(index, 1); 
    saveCart();
    renderCartBooks();
  });

  renderCartBooks();
});
