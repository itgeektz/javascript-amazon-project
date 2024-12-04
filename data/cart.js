export const cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 10
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 5
  },
];

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