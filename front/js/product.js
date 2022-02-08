
//-connection a l'API-----
//------------------------
function getProduct(id) {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      createProduct(data);
    })
    .catch(function (err) {
      // Une erreur est survenue
    });
}

//---------------------------------
//Récuperation des données de l'API pour créer les produits sur la page d'acceuil
//---------------------------------
function createProduct(product) {
  let productName = document.getElementById("title");
  let productPrice = document.getElementById("price");
  let productDescription = document.getElementById("description");
  let productImage = document.querySelector(".item__img");
  let createImg = document.createElement("img");

  //images
  createImg.src = product.imageUrl;
  createImg.alt = product.altTxt;

  //couleurs

  let typeOfColors = product.colors;
  let selectColor = document.getElementById("colors");
  let htmlColors = "";
  typeOfColors.forEach((color) => {
    htmlColors += `<option value="${color}">${color}</option>`;
  });
  selectColor.innerHTML = htmlColors;
  productName.innerHTML = product.name;
  productImage.appendChild(createImg);
  productPrice.innerHTML = product.price;
  productDescription.innerHTML = product.description;
  return product;
}


//---------------------------------------
// On verrifi les quantité avant de les envoyer dans le panier 
//---------------------------------------

function checkQuantity(product, cart) {
  let isUpdate = false
  cart.forEach(productCart => {
    if (productCart.color == product.color && productCart.id == product.id) {
      productCart.quantity = parseInt(product.quantity) + parseInt(productCart.quantity)
      isUpdate = true
    }
  })
  if (!isUpdate) {
    cart.push(product)
  }
  console.log(product)
  return cart;
}



const urlId = window.location.search;
const urlSearchParams = new URLSearchParams(urlId);
const id = urlSearchParams.get("id");

//---------------------------------------
//envoie des données dans le localStorage 
//---------------------------------------

function setData() {
  let product = {};
  let selectColor = document.getElementById("colors");
  let quantity = document.getElementById("quantity");
  let name = document.getElementById("title");
  let img = document.querySelector(".item__img img");

  product.color = selectColor.value;
  product.quantity = quantity.value;
  product.name = name.textContent;
  product.img = img.src;
  product.alt = img.alt;
  product.id = id;
  let cart = JSON.parse(localStorage.getItem("product"));

  if (cart) {
    cart = checkQuantity(product, cart)

  } else {
    cart = [product];
  }

  console.log(product.color);

  localStorage.setItem("product", JSON.stringify(cart));
}

document.getElementById("addToCart").addEventListener("click", setData);

getProduct(id);