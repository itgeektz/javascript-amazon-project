function Cart(localStorageKey){
    const cart = {
        
      cartItems: undefined,
      
      loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
        if (!this.cartItems) {this.cartItems  = [];}
      },

      savetoCart(){
        
        localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));

      },
      
      totalCartqty(){
        let totalqty = 0;
        this.cartItems.forEach((item)=>{
            totalqty += item.quantity;
        })
        this.savetoCart();
        return totalqty;
      },
      
      removeCartitem(productId){
        let newCart = [];
        this.cartItems.forEach((cartItem)=>{
          if(cartItem.productId !== productId){
            newCart.push(cartItem);
          }
        });
        this.cartItems = newCart;
        this.savetoCart();
      },

      additemstoCart(productId,quantity){
        let matchingItem;
        this.cartItems.forEach((item,index) => {
          if(productId == item.productId){
            matchingItem = item;
          } });
        matchingItem ? matchingItem.quantity += Number(quantity) : 
          this.cartItems.push({
            productId: productId,
            quantity: Number(quantity)
          }); 
          this.savetoCart();
        }, 

    addDeliveryOptionToCart(productId, deliveryOptionId) {
      // Find the cart item by productId
      const cartItem = this.cartItems.find(item => item.productId === productId);
      if (cartItem) {
        // Add the deliveryOptionId to the found item
        cartItem.deliveryOptionId = deliveryOptionId;
        this.savetoCart();
      } else {
        console.log("Product not found in the cart.");
      }
      
    } ,
      
    findCartitem(productId) {
      // Find the cart item by productId
      const cartItem = this.cartItems.find(item => item.productId === productId);
      if (cartItem) {
          return cartItem;
      }   else 
      {
        console.log("Product not found in the cart.");
      }
    }, 

    totalcartValue(products){
      let totalValue = 0;
      this.cartItems.forEach((cartItem)=>{
        let productId = cartItem.productId;
        let matchingItem = products.find(product => product.id === productId);
        if(matchingItem){
            totalValue += (matchingItem.priceCents * cartItem.quantity);
          }
      });
      return totalValue;
    },

    totalshippingValue(deliveryOptions){
      let deliveryCharges = 0;
      this.cartItems.forEach((cartItem)=>{
        let deliveryOptionId = cartItem.deliveryOptionId;
        let matchingDelivery = deliveryOptions.find(delivery => delivery.deliveryOptionId === deliveryOptionId);
        if(matchingDelivery){
          deliveryCharges += matchingDelivery.pricecents;
          }
        });
        return deliveryCharges;
    },

  };
  return cart;
}

let cart = Cart('cart');

let businessCart = Cart('BCart');

cart.loadFromStorage();

businessCart.loadFromStorage()

console.log(cart);

console.log(businessCart);