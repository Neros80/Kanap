

// // // //---------------------------------------------------------------------
// // // //Integration des produits sur la page d'accueil
// // // //---------------------------------------------------------------------
function createProduct(product) {

  let productHTML = document.createElement('div');
  let productQuantity = product.price * product.quantity
  productHTML.innerHTML = `
                                              <article class="cart__item" data-id="${product.id}">
                                              <div class="cart__item__img">
                                              <img src="${product.img}" alt="${product.alt}">
                                            </div>
                                            <div class="cart__item__content">
                                              <div class="cart__item__content__titlePrice">
                                                <h2>${product.name}</h2>
                                                <p>${product.color}</p>
                                                <p class='price'>${productQuantity} €</p>
                                              </div>
                                              <div class="cart__item__content__settings">
                                                <div class="cart__item__content__settings__quantity">
                                                  <p>Qté :  </p>
                                                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                                                </div>
                                                <div class="cart__item__content__settings__delete">
                                                  <p class="deleteItem" id="${product.id}">Supprimer</p>
                                                </div>
                                              </div>
                                            </div>
                                              </article>
                                                `;
  return productHTML;
}
//-------------------------------------------------------------------
//calcul quantité et prix total
//-------------------------------------------------------------------
function total() {
  let totalProduct = document.querySelectorAll('.price');
  let totalCart = 0;
  totalProduct.forEach(product => {

    totalCart = parseFloat(product.innerText) + totalCart

    console.log(product.innerText);
  });
  return totalCart;
}

function totalcartQuantity() {
  let totalQuantity = document.querySelectorAll('.itemQuantity')
  let totalCartQuantity = 0;
    totalQuantity.forEach(product => {

    totalCartQuantity = parseInt(product.value) + totalCartQuantity

    console.log(product.value)
  });
  console.log(totalCartQuantity);
  return totalCartQuantity
}

function displayTotal() {
  let totalPrice = document.getElementById('totalPrice')
  totalPrice.innerText = total();
  let totalQuantity = document.getElementById('totalQuantity')
  totalQuantity.textContent = totalcartQuantity();
}


//-------------------------------------------------------------------
//-------------------------------------------------------------------

// Rechercher l'élément du tableau qui a l'id et la couleur du noeud
function selectLine() {
  let cardProducts = JSON.parse(localStorage.getItem("product"));
  let indexProduct = cardProducts.findIndex(element => element.color === 'Blue');
  let cardWithProductDelete = cardProducts.splice(indexProduct, 1);
  console.log(cardWithProductDelete);
}

// Tu le supprime du panier


//-------------------------------------------------------------------
//selection de la ligne pour la supprimer
//------------------------------------------------------------------- 
function deleteProduct() {
  document.getElementsByClassName("deleteItem")
  document.addEventListener('click', () => selectLine());
}

deleteProduct();
//-------------------------------------------------------------------
//-------------------------------------------------------------------



function createProducts() {
  let products = JSON.parse(localStorage.getItem("product"));
  products.forEach(product => {
    let productHTML = createProduct(product);
    document.getElementById('cart__items')
      .appendChild(productHTML)
  });
  return true;
}

createProducts();
displayTotal();



