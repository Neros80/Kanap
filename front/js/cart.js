

// // // //---------------------------------------------------------------------
// // // //Integration des produits sur la page panier
// // // //---------------------------------------------------------------------
function createProduct(product) {

  let productHTML = document.createElement('div');
  let productPriceTotal = product.price * product.quantity
  productHTML.innerHTML = `
                                              <article class="cart__item" data-id="${product.id}">
                                              <div class="cart__item__img">
                                              <img src="${product.img}" alt="${product.alt}">
                                            </div>
                                            <div class="cart__item__content">
                                              <div class="cart__item__content__titlePrice">
                                                <h2>${product.name}</h2>
                                                <p>${product.color}</p>
                                                <p class='price'>${productPriceTotal} €</p>
                                              </div>
                                              <div class="cart__item__content__settings">
                                                <div class="cart__item__content__settings__quantity">
                                                  <p>Qté :  </p>
                                                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                                                </div>
                                                <div class="cart__item__content__settings__delete">
                                                  <p class="deleteItem" id="${product.id}" data-color="${product.color}">Supprimer</p>
                                                </div>
                                              </div>
                                            </div>
                                              </article>
                                                `;
  productHTML.querySelector('.itemQuantity').addEventListener('change', function () {
    product.quantity = this.value
    let total = calculatePrice(product)

    productHTML.querySelector('.price').textContent = total
    displayTotal();
    updateCard(product);
  })
  return productHTML;
}
function updateCard(product) {
  let cardProducts = JSON.parse(localStorage.getItem("product"));
  let indexProduct = cardProducts.findIndex(element => element.color === product.color);
  let cardWithProductDelete = cardProducts.splice(indexProduct, 1);
  cardProducts.push(product);
  localStorage.setItem("product", JSON.stringify(cardProducts));
}

//-------------------------------------------------------------------
//calcul prix total
//-------------------------------------------------------------------
function total() {
  let totalProduct = document.querySelectorAll('.price');
  let totalCart = 0;
  totalProduct.forEach(product => {

    totalCart = parseFloat(product.innerText) + totalCart

  });
  return totalCart;
}
//-------------------------------------------------------------------
//calcul quantité total
//-------------------------------------------------------------------

function totalcartQuantity() {
  let totalQuantity = document.querySelectorAll('.itemQuantity')
  let totalCartQuantity = 0;
  totalQuantity.forEach(product => {

    totalCartQuantity = parseInt(product.value) + totalCartQuantity
  });
  return totalCartQuantity
}
//-------------------------------------------------------------------
//Ajout des résultats en bas de page(quantité et prix totale)
//-------------------------------------------------------------------

function displayTotal() {
  let totalPrice = document.getElementById('totalPrice')
  totalPrice.innerText = total();
  let totalQuantity = document.getElementById('totalQuantity')
  totalQuantity.textContent = totalcartQuantity();
}


//-------------------------------------------------------------------
//-------------------------------------------------------------------
function calculatePrice(product) {
  let total = product.price * product.quantity
  return total
}
// Rechercher l'élément du tableau qui a l'id et la couleur du noeud
function deleteLine(color) {
  let cardProducts = JSON.parse(localStorage.getItem("product"));
  let indexProduct = cardProducts.findIndex(element => element.color === color);
  let cardWithProductDelete = cardProducts.splice(indexProduct, 1);
  localStorage.setItem("product", JSON.stringify(cardProducts));
  location.reload()
  console.log(cardWithProductDelete);
}




//-------------------------------------------------------------------
//selection de la ligne pour la supprimer
//------------------------------------------------------------------- 
function deleteProduct() {
  let deleteItems = document.querySelectorAll(".deleteItem")
  deleteItems.forEach(item => {
    item.addEventListener('click', function () {
      deleteLine(this.getAttribute("data-color"))
    });
  })
}

//-------------------------------------------------------------------
//-------------------------------------------------------------------



function createProducts() {
  let products = JSON.parse(localStorage.getItem("product"));
  products.forEach(product => {
    let productHTML = createProduct(product);
    document.getElementById('cart__items')
      .appendChild(productHTML)
  });
  deleteProduct()
  return true;
}

createProducts();
displayTotal();





function postData(url = '/order', data = {}) {
  const response = fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json()
}



document.querySelector('#order').addEventListener('click', (e) => {
  e.preventDefault();
  let data = setData();
  let response = postData('http://localhost:3000/api', data)
  console.log(response)
})
function setData(){
  let cardProducts = JSON.parse(localStorage.getItem("product"));
  let products = []
  cardProducts.forEach(product => {
    products.push(product.id)
  })
  let data = {
    contact: {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      email: document.getElementById('email').value,
    },
    products: products
  }
  return data
}


function onPost(e) {
  e.preventDefault();
  let data = {
    firstname: form.elements['firstname'].value,
    lastName: form.elements['lastName'].value,
    address: form.elements['address'].value,
    city: form.elements['city'].value,
    email: form.elements['email'].value
  };

  postData('back/controlleurs/product.js', data)
    .then(data => {
      alertElement.classlist.remove('success', 'error');
      alertElement.innerHTML = data.message;
      console.log(data);

      if (data.success) {
        alertElement.classlist.add('success');
      }
      else {
        alertElement.classlist.add('error');
      }
    });
}
