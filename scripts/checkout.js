import { cart, removeFromCart, updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

updateCart();

let cartSummaryHTML = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${
    matchingProduct.id
  }">
            <div class="delivery-date">Delivery date: Tuesday, June 21</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                 ${matchingProduct.name}
                </div>
                <div class="product-price">$${formatCurrency(
                  matchingProduct.priceCents
                )}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label js-quantity-label-${
                    matchingProduct.id
                  }">${cartItem.quantity}</span> </span>
                  <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${
                    matchingProduct.id
                  }">
                    Update
                  </span> <input placeHolder="0-10" class="quantity-input js-quantity-input js-quantity-input-${
                    matchingProduct.id
                  }" data-product-id="${
    matchingProduct.id
  }"> <span class="save-quantity-link link-primary js-save-link" data-product-id="${
    matchingProduct.id
  }">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                    matchingProduct.id
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Tuesday, June 21</div>
                    <div class="delivery-option-price">FREE Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Wednesday, June 15</div>
                    <div class="delivery-option-price">$4.99 - Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Monday, June 13</div>
                    <div class="delivery-option-price">$9.99 - Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
});
document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
    updateCart();
  });
});
export function updateCart() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  document.querySelector(
    ".js-return-to-home-link"
  ).textContent = `${cartQuantity} items`;
}

document.querySelectorAll(".js-update-quantity").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    document
      .querySelector(`.js-cart-item-container-${productId}`)
      .classList.add("is-editing-quantity");
  });
});
document.querySelectorAll(".js-save-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    document
      .querySelector(`.js-cart-item-container-${productId}`)
      .classList.remove("is-editing-quantity");

    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );
    const newQuantity = Number(quantityInput.value);

    updateCartQuantity(productId, newQuantity);
    console.log(newQuantity);

    updateCart();
  });
});

document.querySelectorAll(".js-quantity-input").forEach((link) => {
  link.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const productId = link.dataset.productId;
      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      const newQuantity = Number(quantityInput.value);
      updateCartQuantity(productId, newQuantity);
      document
        .querySelector(`.js-cart-item-container-${productId}`)
        .classList.remove("is-editing-quantity");
    }
  });
});
