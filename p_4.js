"use strict";

/*
  DOM SELECTION
  Demonstrates:
  getElementById()
  getElementsByClassName()
  getElementsByTagName()
  querySelector()
  querySelectorAll()
*/

// Selecting elements by ID
const storeTitle = document.getElementById("storeTitle");
const themeButton = document.getElementById("themeButton");
const searchBox = document.getElementById("searchBox");
const categoryFilter = document.getElementById("categoryFilter");
const feedback = document.getElementById("feedback");
const productContainer = document.getElementById("productContainer");
const cartList = document.getElementById("cartList");
const cartTotal = document.getElementById("cartTotal");
const clearCartButton = document.getElementById("clearCart");
const subscriptionForm = document.getElementById("subscriptionForm");
const formMessage = document.getElementById("formMessage");
const imagePreview = document.getElementById("imagePreview");
const previewImage = document.getElementById("previewImage");
const closePreviewButton = document.getElementById("closePreview");

// Selecting elements using other DOM methods
const productCards = document.getElementsByClassName("product-card");
const allImages = document.getElementsByTagName("img");
const firstProduct = document.querySelector(".product-card");
const allProducts = document.querySelectorAll(".product-card");
const addCartButtons = document.querySelectorAll(".add-cart");
const menuButtons = document.querySelectorAll("#mainMenu button");

// Cart data
let cart = [];

// Currency formatter for Indian rupees
const rupeeFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0
});

// Display feedback to the user
function showFeedback(message) {
  feedback.textContent = message;
}

// Convert category value into readable text
function getCategoryName(category) {
  const categoryNames = {
    all: "all categories",
    electronics: "Electronics",
    fashion: "Fashion",
    home: "Home"
  };

  return categoryNames[category] || category;
}

/*
  THEME SWITCHING
  Uses click event and dynamically changes CSS classes.
*/

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");

  const darkThemeEnabled =
    document.body.classList.contains("dark-theme");

  if (darkThemeEnabled) {
    themeButton.textContent = "Light Mode";
    showFeedback("Dark black theme enabled.");
  } else {
    themeButton.textContent = "Dark Mode";
    showFeedback("Light theme enabled.");
  }
});

/*
  DOUBLE-CLICK EVENT
  Changes the store title and an HTML attribute.
*/

storeTitle.addEventListener("dblclick", function () {
  storeTitle.textContent = "ShopEase Premium Store";
  storeTitle.setAttribute("title", "Premium ShopEase Store");

  showFeedback(
    "The store title was changed using a double-click."
  );
});

/*
  MOUSEOVER AND MOUSEOUT EVENTS
  Updates live feedback when the user points at a product.
*/

allProducts.forEach(function (card) {
  card.addEventListener("mouseover", function () {
    const productName = card.dataset.name;

    showFeedback(`Viewing ${productName}.`);
  });

  card.addEventListener("mouseout", function () {
    showFeedback("Move over a product to view its name.");
  });
});

/*
  ADD TO CART
  Uses click events, dataset attributes, createElement(),
  appendChild(), and dynamic content updates.
*/

addCartButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const productCard = button.closest(".product-card");

    const product = {
      name: productCard.dataset.name,
      category: productCard.dataset.category,
      price: Number(productCard.dataset.price)
    };

    cart.push(product);
    updateCart();

    showFeedback(
      `${product.name} was added to your cart.`
    );
  });
});

/*
  UPDATE CART
  Removes existing list content and creates new elements dynamically.
*/

function updateCart() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    const emptyItem = document.createElement("li");

    emptyItem.id = "emptyCart";
    emptyItem.textContent = "Your cart is empty.";

    cartList.appendChild(emptyItem);
    cartTotal.textContent = "0";

    return;
  }

  let total = 0;

  cart.forEach(function (product, index) {
    total += product.price;

    const cartItem = document.createElement("li");
    const productText = document.createElement("span");
    const removeButton = document.createElement("button");

    productText.textContent =
      `${product.name} - ₹${rupeeFormatter.format(product.price)}`;

    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.className = "remove-button";

    removeButton.addEventListener("click", function () {
      cart.splice(index, 1);
      updateCart();

      showFeedback(
        `${product.name} was removed from your cart.`
      );
    });

    cartItem.appendChild(productText);
    cartItem.appendChild(removeButton);
    cartList.appendChild(cartItem);
  });

  cartTotal.textContent = rupeeFormatter.format(total);
}

/*
  CLEAR CART
  Removes all dynamically created cart items.
*/

clearCartButton.addEventListener("click", function () {
  cart = [];
  updateCart();

  showFeedback("Your cart has been cleared.");
});

/*
  CATEGORY MENU
  Filters products according to their category.
*/

menuButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedCategory = button.dataset.category;

    categoryFilter.value = selectedCategory;
    filterProducts();
  });
});

/*
  CATEGORY SELECT CHANGE EVENT
*/

categoryFilter.addEventListener("change", function () {
  filterProducts();
});

/*
  FILTER PRODUCTS
  Combines category filtering with search filtering.
*/

function filterProducts() {
  const selectedCategory = categoryFilter.value;
  const searchTerm = searchBox.value.toLowerCase().trim();

  let visibleCount = 0;

  allProducts.forEach(function (card) {
    const productCategory = card.dataset.category;
    const productName = card.dataset.name.toLowerCase();

    const categoryMatches =
      selectedCategory === "all" ||
      productCategory === selectedCategory;

    const searchMatches =
      productName.includes(searchTerm);

    const shouldDisplay =
      categoryMatches && searchMatches;

    card.classList.toggle("hidden", !shouldDisplay);

    if (shouldDisplay) {
      visibleCount++;
    }
  });

  const categoryName =
    getCategoryName(selectedCategory);

  if (searchTerm.length > 0) {
    showFeedback(
      `${visibleCount} product(s) found in ${categoryName}.`
    );
  } else {
    showFeedback(
      `${visibleCount} product(s) displayed from ${categoryName}.`
    );
  }
}

/*
  KEYUP EVENT
  Provides live product search.
*/

searchBox.addEventListener("keyup", function () {
  filterProducts();
});

/*
  KEYDOWN EVENT
  Pressing Escape clears the search field.
*/

searchBox.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    searchBox.value = "";
    filterProducts();

    showFeedback("Search cleared.");
  }
});

/*
  IMAGE PREVIEW
  Clicking a product image opens a larger preview.
*/

Array.from(allImages).forEach(function (image) {
  image.addEventListener("click", function () {
    if (!image.closest(".product-card")) {
      return;
    }

    previewImage.src = image.src;
    previewImage.alt = image.alt;

    imagePreview.classList.add("show");
    imagePreview.setAttribute("aria-hidden", "false");

    showFeedback("Product image preview opened.");
  });
});

/*
  CLOSE IMAGE PREVIEW
*/

function closeImagePreview() {
  imagePreview.classList.remove("show");
  imagePreview.setAttribute("aria-hidden", "true");
  previewImage.src = "";
}

closePreviewButton.addEventListener("click", function () {
  closeImagePreview();
});

imagePreview.addEventListener("click", function (event) {
  if (event.target === imagePreview) {
    closeImagePreview();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeImagePreview();
  }
});

/*
  FORM SUBMISSION
  Prevents page reload and displays a feedback message.
*/

subscriptionForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const customerName =
    document.getElementById("customerName").value.trim();

  const customerEmail =
    document.getElementById("customerEmail").value.trim();

  if (customerName === "" || customerEmail === "") {
    formMessage.textContent =
      "Please complete all fields.";

    formMessage.classList.add("error");
    return;
  }

  formMessage.classList.remove("error");

  formMessage.textContent =
    `Thank you, ${customerName}! You are now subscribed.`;

  subscriptionForm.reset();
});

/*
  ATTRIBUTE MANIPULATION
*/

if (firstProduct) {
  firstProduct.setAttribute("data-featured", "true");

  const firstProductImage =
    firstProduct.querySelector("img");

  firstProductImage.setAttribute(
    "title",
    "Click to preview this product"
  );
}

/*
  INITIAL PAGE MESSAGE
*/

showFeedback(
  `${productCards.length} products are available across all categories.`
);