import {cart, additemstoCart,totalCartqty,savetoCart} from '../data/cart.js';
import {products} from '../data/products.js';


const productDisplay = document.querySelector('.js-products-grid');

let productsHTML = "";


products.forEach((product, index) => {
    
    productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating['count']}
            </div>
          </div>
          
          <div class="product-price">
           ${product.getPrice()}
           </div>
           
           <div>${product.info()}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1" class="js-selected-value">1</option>
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

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`
    
});

productDisplay.innerHTML = productsHTML;

const addtoCart = document.querySelectorAll('.js-add-to-cart');

document.querySelector('.js-cart-quantity').innerHTML = totalCartqty();



addtoCart.forEach((button,index)=>{
    button.addEventListener('click',()=>{
    
    let {productId: productId} = button.dataset;
    const quantity = document.querySelector(`.js-quantity-selector-${productId}`).value;
    let opacity;
    const addedtoCart = document.querySelector(`.js-added-to-cart-${productId}`).classList;
    
    opacity = setInterval(addedtoCart.remove("added-to-cart"),2000);
    additemstoCart(productId,quantity);
    clearInterval(opacity);
     location.reload();
    });
});

// const productDisplay = document.querySelector('.js-checkout-link');


