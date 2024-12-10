
export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {cart  = [
  /*{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 10
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 5
  },

  */]; }

  export function savetoCart(){
    localStorage.setItem('cart',JSON.stringify(cart));

  }
  export function totalCartqty(){

    let totalqty = 0;
  
        cart.forEach((item)=>{
            totalqty += item.quantity;
        })
        savetoCart();
        return totalqty;
  }
  
export function removeCartitem(productId){
  let newCart = [];
  
  cart.forEach((cartItem)=>{
  
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  savetoCart();
  
}

export function additemstoCart(productId,quantity){
    let matchingItem;
      cart.forEach((item,index) => {
        if(productId == item.productId){
          matchingItem = item;
        } });
        matchingItem ? matchingItem.quantity += Number(quantity) : 
          cart.push({
            productId: productId,
            quantity: Number(quantity)
          }); 
          savetoCart();
  }

  export function addDeliveryOptionToCart(productId, deliveryOptionId) {
    // Find the cart item by productId
    const cartItem = cart.find(item => item.productId === productId);
    
    if (cartItem) {
      // Add the deliveryOptionId to the found item
      cartItem.deliveryOptionId = deliveryOptionId;
    } else {
      console.log("Product not found in the cart.");
    }
    savetoCart();
  }


  export function findCartitem(productId) {
    // Find the cart item by productId
    const cartItem = cart.find(item => item.productId === productId);
    
    if (cartItem) {
      // Add the deliveryOptionId to the found item
      return cartItem;
    } else {
      console.log("Product not found in the cart.");
    }
  }

export function totalcartValue(products){
  let totalValue = 0;
  cart.forEach((cartItem)=>{
    let productId = cartItem.productId;
    let matchingItem = products.find(product => product.id === productId);
    if(matchingItem){
        totalValue += (matchingItem.priceCents * cartItem.quantity);
      }
    });
   
    return totalValue;
}

export function totalshippingValue(deliveryOptions){
  let deliveryCharges = 0;
  cart.forEach((cartItem)=>{
    let deliveryOptionId = cartItem.deliveryOptionId;
    let matchingDelivery = deliveryOptions.find(delivery => delivery.deliveryOptionId === deliveryOptionId);
    if(matchingDelivery){
      deliveryCharges += matchingDelivery.pricecents;
      }
    });
    
    return deliveryCharges;
}