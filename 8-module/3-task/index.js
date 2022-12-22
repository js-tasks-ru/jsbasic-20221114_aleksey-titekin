export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {

    if (!product) return;
    
    let result = this.cartItems.find(item => item.product.id === product.id);
    if (result) {
      result.count++;
      return;
    }
    
    let item = {};
    item.product = product;
    item.count = 1;
    this.cartItems.push(item);

    this.onProductUpdate(this.cartItem);
  }

  updateProductCount(productId, amount) {
    let result = this.cartItems.findIndex(item => item.product.id === productId);
    this.cartItems[result].count += amount;

    if (this.cartItems[result].count == 0) {
      this.cartItems.splice(result,1);

    this.onProductUpdate(this.cartItem);
    }
   
  }

  isEmpty() {
    return this.cartItems.length === 0
  }

  getTotalCount() {
    return this.cartItems.reduce((total,item) => {
      return total + item.count;
    },0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total,item) => {
      return total + item.count * item.product.price;
    },0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

