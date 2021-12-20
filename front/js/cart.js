
  
  // // // //---------------------------------------------------------------------
  // // // //Integration des produits sur la page d'accueil
  // // // //---------------------------------------------------------------------
  function createProduct(product) {

    let productHTML = document.createElement('div');
                      productHTML.innerHTML = `
                                              <article class="cart__item" data-id="${product.id}">
                                              <div class="cart__item__img">
                                              <img src="${product.img}" alt="${product.alt}">
                                            </div>
                                            <div class="cart__item__content">
                                              <div class="cart__item__content__titlePrice">
                                                <h2>${product.name}</h2>
                                                <p>${product.color}</p>
                                                <p class='price'>${product.price * product.quantity} €</p>
                                              </div>
                                              <div class="cart__item__content__settings">
                                                <div class="cart__item__content__settings__quantity">
                                                  <p>Qté :  </p>
                                                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                                                </div>
                                                <div class="cart__item__content__settings__delete">
                                                  <p class="deleteItem">Supprimer</p>
                                                </div>
                                              </div>
                                            </div>
                                              </article>
                                                `; 
    return productHTML;
  }

  function deleteProduct(){
    let cardProducts = JSON.parse(localStorage.getItem("product"));
    document.getElementsByClassName("deleteItem")
    document.addEventListener('click', () => console.log(cardProducts));
  }

  deleteProduct();
  // deleteProduct()
  

  function calculateTotal(){
      let quantity = document.querySelector('.itemQuantity').value;
      let price = parseFloat(document.querySelector('.price').textContent);
    }
  
  function createProducts(){
    let products = JSON.parse(localStorage.getItem("product")); // Tu récupères dans un format json tout 
      products.forEach(product => {
          let productHTML = createProduct(product);
          document.getElementById('cart__items')
                  .appendChild(productHTML)
      });
      return true;
  }

createProducts();
// Récupere tout ce qu'il y a dans le panier
let cardProducts = JSON.parse(localStorage.getItem("product"));
console.log(cardProducts);



// createProduct(product) Affiche 1 produit passé en paramètre

// createProducts() Affiche tout les produit qui sont déja contenu dans le localStorage



