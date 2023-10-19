export const cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

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
