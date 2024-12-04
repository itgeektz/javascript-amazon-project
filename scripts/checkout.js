import {cart, additemstoCart} from '../data/cart.js';
import {products,matchProduct} from '../data/products.js';
import { priceFormat } from './utils/money.js';

//export function checkout() {
    const cartItemContainer = document.querySelector('.order-summary');

    let checkoutProductsHTML = "";

    cart.forEach((item,index)=>{
        let productId = item.productId;
        //matchProduct(productId);
        
        let matchingItem;
        products.forEach((product,index) => {
        
        if(productId == product.id){
            matchingItem = product;
        }
        });
       console.log(matchingItem);
    
    checkoutProductsHTML += `<div class="cart-item-container">
                <div class="delivery-date">
                Delivery date: Tuesday, June 21
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matchingItem.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingItem.name} 
                    </div>
                    <div class="product-price">
                    $${priceFormat(matchingItem.priceCents)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">${item.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                        Update
                    </span>
                    <span class="delete-quantity-link link-primary">
                        Delete
                    </span>
                    </div>
                </div>
            
                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                    <input type="radio" checked
                        class="delivery-option-input"
                        name="delivery-option-${matchingItem.id}">
                    <div>
                        <div class="delivery-option-date">
                        Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                        FREE Shipping
                        </div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${matchingItem.id}">
                    <div>
                        <div class="delivery-option-date">
                        Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                        $4.99 - Shipping
                        </div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${matchingItem.id}">
                    <div>
                        <div class="delivery-option-date">
                        Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                        $9.99 - Shipping
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>`
    });

    cartItemContainer.innerHTML = checkoutProductsHTML;
//}