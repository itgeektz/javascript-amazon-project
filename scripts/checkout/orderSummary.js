import {cart, additemstoCart, removeCartitem, totalCartqty,addDeliveryOptionToCart, 
    findCartitem, totalcartValue, totalshippingValue} from '../../data/cart.js';
import {products,matchProduct} from '../../data/products.js';
import { priceFormat } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions,deliveryDatedisp} from '../deliveryOptions.js'; 
import {payment} from './paymentSummary.js';

export function cartDisplay() {
    const cartItemContainer = document.querySelector('.order-summary');
    

        let checkoutProductsHTML = "";
        cart.forEach((item,index)=>{
            let productId = item.productId;
            let matchingItem;
            products.forEach((product,index) => {
            
                if(productId == product.id){
                    matchingItem = product;
                }
            });
            let isDeliveryDate;
            if (item.deliveryOptionId){
                isDeliveryDate = 1;
                //deliveryDatedisp(item.productId,delivery.deliveryOptionId);
                //payment();
            }
            
            checkoutProductsHTML += `<div class="cart-item-container js-cart-item-container-${matchingItem.id}" data-product-id="${matchingItem.id}">
                        <div class="delivery-date js-dv-${matchingItem.id}">
                        ${isDeliveryDate ? `Delivery Date - ${deliveryDatedisp(item.productId,item.deliveryOptionId)}` : "Delivery Date: - Choose an Option" }
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
                            <span class="update-quantity-link link-primary js-update-link-${matchingItem.id}" data-product-id="${matchingItem.id}">
                                Update
                            </span>
                            <span class="is-editing-quantity js-save-quantity-link-${matchingItem.id}"> 
                                <input class="quantity-input js-inputqty-${matchingItem.id}" id="${matchingItem.id}">
                                <span class="link-primary js-save-${matchingItem.id}">Save</span></span>
                            <button class="delete-quantity-link link-primary js-delete-cart-items" data-product-id="${matchingItem.id}">
                                Delete
                            </button>
                            </div>
                        </div>
                        <div class="delivery-options">
                              <div class="delivery-options-title">
                             Choose a delivery option:
                            </div>
                                ${deliveryOptionhtml(matchingItem,item)}
                                </div>
                    </div>
                    </div>`;

        });

        cartItemContainer.innerHTML = checkoutProductsHTML;
        let totalqty = totalCartqty();
        const returntoHome = document.querySelector('.return-to-home-link');
        returntoHome.innerHTML= `Total Quantity is ${totalqty}`;
       
        const radioButton = document.querySelectorAll(".delivery-option-input");    
            radioButton.forEach((radio)=>{
                radio.addEventListener('change',()=>{
                        const selectedRadioButton = document.querySelectorAll('input[type="radio"]:checked');
                        selectedRadioButton.forEach((selected)=>{
                            const matchingItemId = selected.name; // Extract product ID
                            let dateString = deliveryDatedisp(selected.name,selected.id);
                            let dvdateContainer1 =  document.querySelector(`.js-dv-${selected.name}`);
                            dvdateContainer1.innerHTML = `Delivery Date: ${dateString}`;
                            addDeliveryOptionToCart(matchingItemId, deliveryOptions[selected.id-1].deliveryOptionId);
                            payment();
                        });
                    });
                });
        

        let deleteCheckoutitems = document.querySelectorAll('.js-delete-cart-items');
        deleteCheckoutitems.forEach( (span,index) => {
        
            span.addEventListener('click',()=>{
                const productId = span.dataset.productId;
                removeCartitem(productId);
                const cartContainer = document.querySelector(`.js-cart-item-container-${productId}`);
                cartContainer.remove();
                totalCartqty();
                location.reload();
                
            });
                
            }
        ); 
        
        let updateCheckoutitems = document.querySelectorAll(`.update-quantity-link`);
        updateCheckoutitems.forEach((update,index) => {
            const productId = update.dataset.productId;
            update.addEventListener('click',()=>{
        
                const cartudateContainer = document.querySelector(`.js-update-link-${productId}`);
                const cartsaveContainer = document.querySelector(`.js-save-quantity-link-${productId}`);
                cartudateContainer.classList.add("is-editing-quantity");
                cartsaveContainer.classList.add('editing-quantity');
                const savecartQty = document.querySelector(`.js-save-${productId}`);
                savecartQty.addEventListener('click',()=>{
                    const inputQtycontainer = document.querySelector(`.js-inputqty-${productId}`);
                    additemstoCart(productId,inputQtycontainer.value);
                    cartudateContainer.classList.remove("is-editing-quantity");
                    cartsaveContainer.classList.remove('editing-quantity');
                    location.reload();
                });
                
            });
            
            }
        ); 
    //addeventclosing
    }

    function deliveryOptionhtml(matchingItem,item){
        let deliveryHTML = '';
        deliveryOptions.forEach((delivery,index)=>{
                let deliveryDate = dayjs().add(delivery.days, 'day');
                let dateString = deliveryDate.format('dddd , D MMMM YYYY');
                let isChecked;
                //deliveryDatedisp(delivery);
                let deliveryCharges = delivery.pricecents === 0 ? `Free Shipping` : `$${priceFormat(delivery.pricecents)} - Shipping Charges`;
                if (item.deliveryOptionId === delivery.deliveryOptionId){
                    isChecked = 1;
                    //deliveryDatedisp(item.productId,delivery.deliveryOptionId);
                    payment();
                }
                deliveryHTML += `
                          
                            <div class="delivery-option">
                                <input type="radio" ${isChecked ? 'checked' : ''}
                                    class="delivery-option-input js-dv-opt-${matchingItem.id}-${delivery.deliveryOptionId}"
                                    id = "${matchingItem.id}-${delivery.deliveryOptionId}"
                                    name="${matchingItem.id}-${matchingItem.id}">
                                <div>
                                    <div class="delivery-option-date">
                                        ${dateString}
                                    </div>
                                    <div class="delivery-option-price">
                                        ${deliveryCharges}
                                    </div>
                                </div>
                            </div>
                            `;
                           
                            
            });
            
        return deliveryHTML;
        
    }


   