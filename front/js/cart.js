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
                                                <p class='unitPrice'>${product.price}</p>
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
    product.price = productHTML.querySelector('.unitPrice').textContent
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
  product.price = undefined;
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
// Calcul du prix Total 
//-------------------------------------------------------------------
function calculatePrice(product) {
  let total = product.price * product.quantity
  return total
}
//-------------------------------------------------------------------
// Rechercher l'élément du tableau qui a l'id et la couleur du noeud
//-------------------------------------------------------------------
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
  console.log('coucou2');
  deleteItems.forEach(item => {
    item.addEventListener('click', function (){
      console.log('test');
      deleteLine(this.getAttribute("data-color"))
      
    });
  });
};

//-------------------------------------------------------------------
//Ajout d'une nouvelle ligne
//-------------------------------------------------------------------
 function createProducts() {
  let products = JSON.parse(localStorage.getItem("product"));

  products.forEach(product => {
    console.log(product.id);
    getProduct(product);

  });
  return true;
};

async function getProduct(product) {
  await fetch(`http://localhost:3000/api/products/${product.id}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      product.price = data.price;
      let productHTML = createProduct(product);
      document.getElementById('cart__items')
        .appendChild(productHTML);

      let total = calculatePrice(product)

      productHTML.querySelector('.price').textContent = total
      displayTotal();
      deleteProduct();

    })
    .catch(function (err) {
      // Une erreur est survenue
    });
}


//-------------------------------------------------
//envoie des données dans l'api
//-------------------------------------------------

async function postData(url = 'http://localhost:3000/api/products', data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      let orderId = data.orderId
      console.log(orderId);
      if (orderId !== undefined) {
        window.location.href = 'confirmation.html?orderId=' + orderId
        return data
      } else {
      }
    })
  return response
}
//-------------------------------------
//Ajout de l'ID dans l'url et sur la page de validation
//-------------------------------------

let searchParams = new URLSearchParams(window.location.search);
if (searchParams.has('orderId')) {
  let orderId = searchParams.get('orderId')
  let orderNum = document.getElementById('orderId')
  orderNum.innerText = orderId
  console.log(orderNum)
} else {

};

createProducts();

function fomrValidation() {
  const form = document.querySelectorAll(
    'input[type="text"], input[type="email"]');
  let firstName, lastName, address, city, email;

  let errorDisplay = (tag, message, valid) => {
    let container = document.getElementById(tag)
    let error = document.querySelector("#" + tag + "ErrorMsg")
    if (!valid) {
      container.classList.add('error');
      error.textContent = message;
    } else {
      container.classList.remove('error');
      error.textContent = message;
    }
  };
  //----------------check firstName
  const firstNameCheck = (value) => {
    if (value.length <= 0) {
      errorDisplay('firstName', "veulliez remplir le champ");
      firstName = null;
    }
    else if (!value.match(/^[A-Za-z]+((\s)?([A-Za-z])+)*$/)) {
      errorDisplay('firstName', "Format non valide");
      firstName = null;
    }
    else {
      errorDisplay('firstName', "", true);
      firstName = value;
    }
  };
  //---------------check LastName
  const lastNameCheck = (value) => {
    if (value.length <= 0) {
      errorDisplay('lastName', "veulliez remplir le champ");
      lastName = null;
    }
    else if (!value.match(/^[A-Za-z]+((\s)?([A-Za-z])+)*$/)) {
      errorDisplay('lastName', "Format non valide");
      lastName = null;
    }
    else {
      errorDisplay('lastName', "", true);
      lastName = value;
    }
  };

  // //----------------------check address
  const addressCheck = (value) => {
    if (value.length <= 0) {
      errorDisplay('address', "veulliez remplir le champ");
      address = null;
    }
    else if (!value.match(/^[a-zA-Z0-9\s,.'-]{3,}$/)) {
      errorDisplay('address', "Format non valide");
      address = null;
    }
    else {
      errorDisplay('address', "", true);
      address = value;
    }
  };
  //-----------------check city
  const cityCheck = (value) => {
    if (value.length <= 0) {
      errorDisplay('city', "veulliez remplir le champ");
      city = null;
    }
    else if (!value.match(/^[A-Za-z]+((\s)?([A-Za-z])+)*$/)) {
      errorDisplay('city', "Format non valide");
      city = null;

    }
    else {
      errorDisplay('city', "", true);
      city = value;
    }
  };
  //-----------------check Email
  const emailCheck = (value) => {
    if (value.length <= 0) {
      errorDisplay('email', "veulliez remplir le champ");
      email = null;
      return false
    }
    else if (!value.match(/([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}(;|$))/)) {
      errorDisplay('email', "Format non valide");
      email = null;
      return false
    }
    else {
      errorDisplay('email', "", true);
      email = value;
    }
  };


  form.forEach((name) => {
    name.addEventListener("input", (e) => {
      switch (e.target.id) {
        case "firstName":
          firstNameCheck(e.target.value);
          break;
        case "lastName":
          lastNameCheck(e.target.value);
          break;
        case "address":
          addressCheck(e.target.value);
          break;
        case "city":
          cityCheck(e.target.value);
          break;
        case "email":
          emailCheck(e.target.value);
          break;
        default:
          null;
      }
    });
  });
  document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();

    if (firstName && lastName && address && city && email) {
      let data = setData();
      // console.log(data)
      let response = postData(url = "http://localhost:3000/api/products/order", data)
      console.log(response)


      function setData() {
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
    } else {
      alert("Les champs ne sont pas remplis correctement")
    }
  })
};

fomrValidation();