
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


const urlId = window.location.search;
const urlSearchParams = new URLSearchParams(urlId);
const id = urlSearchParams.get("id");

function setData() {
  let product = {};
  let selectColor = document.getElementById("colors");
  let quantity = document.getElementById("quantity");
  let name = document.getElementById("title");
  let price = document.getElementById("price");
  let img = document.querySelector(".item__img img");

  product.color = selectColor.value;
  product.quantity = quantity.value;
  product.name = name.textContent;
  product.price = price.textContent;
  product.img = img.src;
  product.alt = img.alt;
  product.id = id;
  let cart = JSON.parse(localStorage.getItem("product"));

  if (cart) {
 

    cart.push(product);
  } else {
    cart = [product];
  }

  console.log(product.color);

  localStorage.setItem("product", JSON.stringify(cart));
}

document.getElementById("addToCart").addEventListener("click", setData);

getProduct(id);


function verfiName(product, cartProducts) {
  let isNew = true;

  cartProducts.forEach((cartProduct) => {
    if (product.name == cartProduct.name
      && product.color == cartProduct.color) {
      cartProduct.quantity += product.quantity
      console.log(cartProduct.quantity)
      isNew = false
    }
  })

  if (isNew) {
    cartProducts.push(product);
  }
  return cartProducts
}
