export const cart = [];

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
  }