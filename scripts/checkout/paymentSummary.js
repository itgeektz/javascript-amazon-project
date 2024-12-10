import {cart, additemstoCart, removeCartitem, totalCartqty,addDeliveryOptionToCart, 
    findCartitem, totalcartValue, totalshippingValue} from '../../data/cart.js';
import {products,matchProduct} from '../../data/products.js';
import { priceFormat } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../deliveryOptions.js'; 


export function payment(){
    const paymentSummary = document.querySelector('.payment-summary');
    let paymentHTML = '';
    let totalqty = totalCartqty();
    let totalValue = totalcartValue(products);
    let totalDeliverycharges = totalshippingValue(deliveryOptions);
    let total = totalValue + totalDeliverycharges;
    let estimatedTax = total * 0.1;
    let orderTotal = total + estimatedTax;
    paymentSummary.innerHTML = `<div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${totalqty}):</div>
        <div class="payment-summary-money">$${priceFormat(totalValue)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${priceFormat(totalDeliverycharges)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${priceFormat(total)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${priceFormat(estimatedTax)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">${priceFormat(orderTotal)}</div>
      </div>
      <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>
    `;

}