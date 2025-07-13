// IMPORTANT: Use localStorage to Manage Cart Data

//* 1. Add data to localStorage
const addToDb = (id) => {
  let shoppingCart = {};

  // get the shopping cart from local storage
  const storedCart = localStorage.getItem('shopping-cart');
  if (storedCart) {
    shoppingCart = JSON.parse(storedCart);
  }

  // get product quantity [dynamically]
  const quantity = shoppingCart[id];

  // set product quantity
  if (quantity) {
    const newQuantity = quantity + 1;
    shoppingCart[id] = newQuantity; // [dynamically] set product new quantity
  } else {
    shoppingCart[id] = 1; // [dynamically] set product quantity to 1
  }

  // finally, set the shopping cart to local storage
  localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
};

//* 2. Get data from localStorage
const getStoredCart = () => {
  let shoppingCart = {};

  // get the shopping cart from local storage
  const storedCart = localStorage.getItem('shopping-cart');
  if (storedCart) {
    shoppingCart = JSON.parse(storedCart);
  }

  return shoppingCart;
};

//* 3. Remove Single data from localStorage
const removeFromDb = (id) => {
  const storedCart = localStorage.getItem('shopping-cart');

  if (storedCart) {
    const shoppingCart = JSON.parse(storedCart);
    if (id in shoppingCart) {
      delete shoppingCart[id];
      localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
    }
  }
};

//* 4. Remove all data from localStorage
const deleteShoppingCart = () => {
  localStorage.removeItem('shopping-cart');
};

export { addToDb, deleteShoppingCart, getStoredCart, removeFromDb };
