

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
  let totalProduct = document.getElementById('cart__price');
  let cardProducts = JSON.parse(localStorage.getItem("product"));
}
total()
//-------------------------------------------------------------------
//-------------------------------------------------------------------

// Dans ton panier
// let cardTest =  [
//   {
//       "color": "Blue",
//       "quantity": "2",
//       "name": "Kanap Sinopé",
//       "price": "1849",
//       "img": "http://localhost:3000/images/kanap01.jpeg",
//       "alt": "Photo d'un canapé bleu, deux places",
//       "id": "107fb5b75607497b96722bda5b504926"
//   },
//   {
//       "color": "Black",
//       "quantity": "1",
//       "name": "Kanap Sinopé",
//       "price": "1849",
//       "img": "http://localhost:3000/images/kanap01.jpeg",
//       "alt": "Photo d'un canapé bleu, deux places",
//       "id": "107fb5b75607497b96722bda5b504926"
//   },
//   {
//       "color": "Red",
//       "quantity": "5",
//       "name": "Kanap Thyoné",
//       "price": "1999",
//       "img": "http://localhost:3000/images/kanap07.jpeg",
//       "alt": "Photo d'un canapé rouge, deux places",
//       "id": "034707184e8e4eefb46400b5a3774b5f"
//   },
//   {
//       "color": "Grey",
//       "quantity": "2",
//       "name": "Kanap Hélicé",
//       "price": "999",
//       "img": "http://localhost:3000/images/kanap06.jpeg",
//       "alt": "Photo d'un canapé gris, deux places",
//       "id": "77711f0e466b4ddf953f677d30b0efc9"
//   },
//   {
//       "color": "White",
//       "quantity": "4",
//       "name": "Kanap Autonoé",
//       "price": "1499",
//       "img": "http://localhost:3000/images/kanap04.jpeg",
//       "alt": "Photo d'un canapé rose, une à deux place",
//       "id": "a557292fe5814ea2b15c6ef4bd73ed83"
//   },
//   {
//       "color": "Blue",
//       "quantity": "3",
//       "name": "Kanap Hélicé",
//       "price": "999",
//       "img": "http://localhost:3000/images/kanap06.jpeg",
//       "alt": "Photo d'un canapé gris, deux places",
//       "id": "77711f0e466b4ddf953f677d30b0efc9"
//   }
// ];

// Rechercher l'élément du tableau qui a l'id et la couleur du noeud
let cardProducts = JSON.parse(localStorage.getItem("product"));
console.log(cardProducts);

// array1.find(element => element > 10);


let indexProduct = cardProducts.findIndex(element=> element.color === 'Black');
//console.log(indexProduct);
let cardWithProductDelete = cardProducts.splice(indexProduct,1);
console.log(cardWithProductDelete);
//console.log(cardTest.filter(element => element.color === 'Blue'))
// Tu le supprime du panier


//-------------------------------------------------------------------
//selection de la ligne pour la supprimer
//------------------------------------------------------------------- 
function deleteProduct() {
  let cardProducts = JSON.parse(localStorage.getItem("product"));

  document.getElementsByClassName("deleteItem")
  document.addEventListener('click', () => console.log(cardProducts));
}

deleteProduct();
//-------------------------------------------------------------------
//-------------------------------------------------------------------




// function calculateTotal() {
//   // let quantity = document.querySelector('.itemQuantity').value;
//   // let price = parseFloat(document.querySelector('.price').textContent);
//   let cardProducts = JSON.parse(localStorage.getItem("product"));
//   let sum = 0

//   for (let i = 0; i < array.length; i++) {
//     sum += cardProducts[i];
//   }
//   console.log(sum)
// }



function createProducts() {
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
// let cardProducts = JSON.parse(localStorage.getItem("product"));
// console.log(cardProducts);



// createProduct(product) Affiche 1 produit passé en paramètre

// createProducts() Affiche tout les produit qui sont déja contenu dans le localStorage



