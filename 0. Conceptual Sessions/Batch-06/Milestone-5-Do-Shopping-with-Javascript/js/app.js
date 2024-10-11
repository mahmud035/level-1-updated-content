'use strict';

const cartArray = []; // array ta function er baire keno declare kora holo

function addToCart(element) {
  // console.log(element.parentNode.parentNode.children[0].innerText);
  // console.log(element.parentNode.parentNode.children[1].children[0].innerText);

  const productName = element.parentNode.parentNode.children[0].innerText;
  const productPrice =
    element.parentNode.parentNode.children[1].children[0].innerText;

  const productObject = {
    productName: productName,
    productPrice: parseFloat(productPrice),
  };

  cartArray.push(productObject);
  // console.log(cartArray);
  document.getElementById('total-products').innerText = cartArray.length;

  display(cartArray);
}

function display(cartProducts) {
  const tableBody = document.getElementById('products-cart');
  //  Clearing the table body.
  tableBody.innerHTML = '';

  let totalPrice = 0;

  for (const product of cartProducts) {
    const name = product.productName;
    const price = product.productPrice;
    // console.log(cartProducts.indexOf(product) + 1);

    totalPrice = totalPrice + price;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${cartProducts.indexOf(product) + 1}</td>
      <td> ${name}</td>
      <td> ${price}</td>
     `;
    tableBody.appendChild(tr);
  }

  const tr = document.createElement('tr');

  tr.innerHTML = `
    <td></td>
    <td> Total Price </td>
    <td> ${totalPrice}</td>`;

  tableBody.appendChild(tr);
}
