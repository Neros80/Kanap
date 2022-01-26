

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
  deleteItems.forEach(item => {
    item.addEventListener('click', function () {
      deleteLine(this.getAttribute("data-color"))
    });
  })
}

//-------------------------------------------------------------------
//Ajout d'un nouvelle ligne
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







// function postData(url = '/order', data = {}) {
//   const response = fetch(url, {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   });
//   return response.json()
// }



// document.querySelector('#order').addEventListener('click', (e) => {
//   e.preventDefault();
//   let data = setData();
//   let response = postData('http://localhost:3000/api/products', data)
//   console.log(response)
// })
// function setData(){
//   let cardProducts = JSON.parse(localStorage.getItem("product"));
//   let products = []
//   cardProducts.forEach(product => {
//     products.push(product.id)
//   })
//   let data = {
//     contact: {
//       firstName: document.getElementById('firstName').value,
//       lastName: document.getElementById('lastName').value,
//       address: document.getElementById('address').value,
//       city: document.getElementById('city').value,
//       email: document.getElementById('email').value,
//     },
//     products: products
//   }
//   return data
// }


// function onPost(e) {
//   e.preventDefault();
//   let data = {
//     firstname: form.elements['firstname'].value,
//     lastName: form.elements['lastName'].value,
//     address: form.elements['address'].value,
//     city: form.elements['city'].value,
//     email: form.elements['email'].value
//   };

//   postData('back/controlleurs/product.js', data)
//     .then(data => {
//       alertElement.classlist.remove('success', 'error');
//       alertElement.innerHTML = data.message;
//       console.log(data);

//       if (data.success) {
//         alertElement.classlist.add('success');
//       }
//       else {
//         alertElement.classlist.add('error');
//       }
//     });
//}


// const newCart = {
//   contact: {
//           firstName: document.getElementById('firstName').value,
//           lastName: document.getElementById('lastName').value,
//           address: document.getElementById('address').value,
//           city: document.getElementById('city').value,
//           email: document.getElementById('email').value,
// }
// }; console.log (newCart)

// const pObjects = {contact,product};
// const reqOption = {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json'},
//   body: JSON.stringify(pObjects)
// };console.log(reqOption)


//-------------------------------------------------
//envoie des données dans l'api
//-------------------------------------------------

 function postData(url = 'http://localhost:3000/api/products', data = {}) {
  const response =  fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',

    },
    body: JSON.stringify(data)
  });
  console.log(data)
  // return response.JSON()
  .then(response => response.json())
}

document.querySelector('#order').addEventListener('click', (e) => {
  e.preventDefault();
  let data = setData();
  let response = postData(url = "http://localhost:3000/api/products/order", data)
  console.log(response)
})


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

function command() {
  console.log(document.forms["commande"]["lastName"])
}

// command()
// function req(){
//   let xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function() {
//     console.log(this);
//     if (this.readyState == 4 && this.status == 200){
//      demo.innerHTML = JSON.stringify(this.response);
//     }
//   };
//   xhr.open("GET", "http://localhost:3000/api/products", true );
//   xhr.send();
// }

// req()









createProducts();
displayTotal();




//-----------------------------------------
//Validation du formulaire
//-----------------------------------------

function validation(){
  let valid = document.getElementById('order');

  //----validation prenom-------
  let firstName = document.getElementById('firstName');
  let firstNameErr = document.getElementById('firstNameErrorMsg');
  let firstNameReg = /^[A-Za-z]+((\s)?([A-Za-z])+)*$/;
  valid.addEventListener('click', firstName_valid)
    function firstName_valid(e){
      if (firstName.validity.valueMissing) {
        e.preventDefault();
        firstNameErr.textContent = 'Veulliez renseigner le Prenom';
        firstNameErr.style.color = 'red';
      // }else if (firstNameReg.test(firstName.value) == flase){
      //   e.preventDefault();
      //   firstNameErr.textContent = 'Format incorrect';
      //   firstNameErr.style.color = 'orange';
      }else{

      }

    }

   //---Validation Nom de famille-------
  let lastName = document.getElementById('lastName');
  let lastNameErr = document.getElementById('lastNameErrorMsg');
  let lastNameReg = /^[A-Za-z]+((\s)?([A-Za-z])+)*$/;
  valid.addEventListener('click', lastName_valid)
  function lastName_valid(e){
    if (lastName.validity.valueMissing) {
      e.preventDefault();
      lastNameErr.textContent = 'Veulliez renseigner le Nom de famille';
      lastNameErr.style.color = 'red';
    // }else if (lastNameReg.test(lastName.value) == flase){
    //   e.preventDefault();
    //   lastNameErr.textContent = 'Format incorrect';
    //   lastNameErr.style.color = 'orange';
    }else{

    }
  }
    //---Validation adresse----------
    let address = document.getElementById('address');
    let addressErr = document.getElementById('addressErrorMsg');
    let addressReg = /^[A-Za-z]+((\s)?([A-Za-z])+)*$/;
    valid.addEventListener('click', address_valid)
    function address_valid(e){
      if (address.validity.valueMissing) {
        e.preventDefault();
        addressErr.textContent = 'Veulliez renseigner votre adresse';
        addressErr.style.color = 'red';
      // }else if (addressReg.test(lastName.value) == flase){
      //   e.preventDefault();
      //   addressErr.style.color = 'orange';
      //   addressErr.textContent = 'Format incorrect';
      }else{
      }
    }
        //---Validation Ville----------
        let city = document.getElementById('city');
        let cityErr = document.getElementById('cityErrorMsg');
        let cityReg = /^[A-Za-z]+((\s)?([A-Za-z])+)*$/;
        valid.addEventListener('click', city_valid)
        function city_valid(e){
          if (city.validity.valueMissing) {
            e.preventDefault();
            cityErr.textContent = 'Veulliez renseigner votre ville';
            cityErr.style.color = 'red';
          // }else if (cityReg.test(city.value) == flase){
          //   e.preventDefault();
          //   cityErr.style.color = 'orange';
          //   cityErr.textContent = 'Format incorrect';
          }else{
          }
        }
          //---Validation Email----------
          let email = document.getElementById('email');
          let emailErr = document.getElementById('emailErrorMsg');
          let emailReg = /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}(;|$))/;
          valid.addEventListener('click', email_valid)
          function email_valid(e){
            if (email.validity.valueMissing) {
              e.preventDefault();
              emailErr.textContent = 'Veulliez renseigner votre Email';
              emailErr.style.color = 'red';
            // }else if (emailReg.test(email.value) == flase){
            //   e.preventDefault();
            //   emailErr.style.color = 'orange';
            //   emailErr.textContent = 'Format incorrect';
            }else{
            }
          }
  }



validation()
