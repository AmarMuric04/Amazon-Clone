export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [];
}

export function addToCart(productId) {
  let matchingItems;
  cart.forEach((object) => {
    if (productId === object.productId) {
      matchingItems = object;
    }
  });

  let selectedValue = document.querySelector(
    `.js-selected-quantity-${productId}`
  ).value;

  if (matchingItems) {
    matchingItems.quantity += Number(selectedValue);
  } else {
    cart.push({ productId, quantity: Number(selectedValue) });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function updateCartQuantity(productId, newQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}
