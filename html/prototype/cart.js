// Initialize cart array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add an item to the cart
function addToCart(product) {
  const existingItem = cart.find(
    (item) => item.id === product.id && item.store === product.store
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Remove an item from the cart
function removeFromCart(productId, store) {
  cart = cart.filter(
    (item) => !(item.id === productId && item.store === store)
  );

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  displayCartItems();
}

// Update the cart count in the navbar
function updateCartCount() {
  const cartCountEl = document.getElementById("cart-count");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartCountEl) {
    cartCountEl.textContent = totalItems;
  }
}

// Display cart items grouped by store and update total
function displayCartItems() {
  const cartStoresEl = document.getElementById("cart-stores");
  const subtotalEl = document.getElementById("subtotal");
  const taxEl = document.getElementById("tax");
  const finalTotalEl = document.getElementById("final-total");

  if (!cartStoresEl) return;

  cartStoresEl.innerHTML = ""; // Clear previous content

  const stores = [...new Set(cart.map((item) => item.store))]; // Get unique stores
  let subtotal = 0; // Accumulate subtotal across all stores

  stores.forEach((store) => {
    const storeSection = document.createElement("section");
    storeSection.classList.add("store-section");

    const storeHeader = document.createElement("h3");
    storeHeader.textContent = store;
    storeSection.appendChild(storeHeader);

    const storeList = document.createElement("ul");
    storeList.classList.add("store-list");

    cart
      .filter((item) => item.store === store)
      .forEach((item) => {
        const li = document.createElement("li");

        const itemDescription = document.createElement("span");
        itemDescription.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        li.appendChild(itemDescription);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");
        removeBtn.addEventListener("click", () =>
          removeFromCart(item.id, item.store)
        );
        li.appendChild(removeBtn);

        storeList.appendChild(li);

        // Add item's total price to the subtotal
        subtotal += item.price * item.quantity;
      });

    storeSection.appendChild(storeList);
    cartStoresEl.appendChild(storeSection);
  });

  // Calculate tax (8%) and final total
  const tax = (subtotal * 0.08).toFixed(2);
  const finalTotal = (subtotal + parseFloat(tax)).toFixed(2);

  // Update total fields
  subtotalEl.textContent = subtotal.toFixed(2);
  taxEl.textContent = tax;
  finalTotalEl.textContent = finalTotal;
}

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const productEl = button.closest(".product");
    const product = {
      id: productEl.dataset.id,
      name: productEl.dataset.name,
      price: parseFloat(productEl.dataset.price),
      store: productEl.dataset.store, // Store information added here
    };

    addToCart(product);
  });
});

// Display cart items on cart.html and update count
displayCartItems();
updateCartCount();
