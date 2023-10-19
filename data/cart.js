const cart = [];

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
}
