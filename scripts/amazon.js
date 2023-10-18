let productsHTML = "";

products.forEach((product) => {
  let { id, name, priceCents, image, rating } = product;
  productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${rating.count}</div>
          </div>

          <div class="product-price">${(priceCents / 100).toFixed(2)}$</div>

          <div class="product-quantity-container">
            <select class="js-selected-quantity-${id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>
          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${id}">Add to Cart</button>
        </div> `;
});
document.querySelector(".js-products-grid").innerHTML = productsHTML;

const addedMessageTimeouts = {};

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;

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

    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

    const addedMessage = document.querySelector(
      `.js-added-to-cart-${productId}`
    );
    //added message becomes visible here
    addedMessage.classList.add("added-to-cart-visible");

    const previousTimeoutId = addedMessageTimeouts[productId];
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      addedMessage.classList.remove("added-to-cart-visible");
    }, 2000);

    // Save the timeoutId for this product
    // so we can stop it later if we need to.
    addedMessageTimeouts[productId] = timeoutId;
  });
});
