'use strict';

const loadAllProducts = async () => {
  const url = `https://fakestoreapi.com/products`;

  const response = await fetch(url);
  const data = await response.json();
  //   console.log(data);
  return data;
};

const setAllMenu = async () => {
  const products = await loadAllProducts(); //* get all Products Data
  //   console.log(products);

  const menu = document.getElementById('all-menu');

  const uniqueArray = [];

  products.forEach((product) => {
    // console.log(product);

    if (uniqueArray.indexOf(product.category) === -1) {
      uniqueArray.push(product.category);
      //   console.log(uniqueArray);

      const li = document.createElement('li');
      li.innerHTML = `<a>${product.category}</a>`; //? loop keno kormal na
      menu.appendChild(li);
    }
  });
};

setAllMenu();

// loadAllProducts();

//* handle input search
const searchField = document.getElementById('search-field');
searchField.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') {
    // console.log(e.target.value); //* both work same
    // console.log(searchField.value); //* both work same
    const searchValue = searchField.value;
    searchField.value = '';

    const allProducts = await loadAllProducts(); //* get all Products Data
    // console.log(allProducts);

    //* get searched category products from all Products Data
    const foundProducts = allProducts.filter((product) => {
      return product.category.includes(searchValue);
    });
    // console.log(foundProducts);

    const productsContainer = document.getElementById('products-container');
    const notFound = document.getElementById('not-found');
    productsContainer.textContent = '';
    notFound.textContent = '';

    if (foundProducts.length === 0) {
      notFound.innerHTML = `<h2 class="text-2xl text-orange-500 text-center"> Not Found</h2>`;
      return;
    }

    foundProducts.forEach((product) => {
      const { category, image, title, description } = product;
      //   console.log(product);
      const div = document.createElement('div');
      div.innerHTML = `
         <div class="card card-compact w-full bg-base-100 shadow-xl">
            <figure><img src="${image}" class="h-60 w-full"    alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${category}</h2>
                <p>${title.length > 20 ? title.slice(0, 20) + '...' : title}</p>
                <div class="card-actions justify-end">
                    <label for="my-modal-3"
                    onclick="showModal('${description}', '${image}')" class="btn btn-primary modal-button"> Show Detail</label>
                </div>
            </div>
         </div>
          `;

      productsContainer.appendChild(div);
    });
  }
});

const showModal = (description, image) => {
  //   console.log(description, image);

  const modalBody = document.getElementById('modal-body');
  modalBody.textContent = '';
  modalBody.innerHTML = `
        <p>${description}</p>
        <img src="${image}" />
        `;
};
