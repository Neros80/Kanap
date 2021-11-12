// // //------------------------------
// // //Récupère les données de l'API
// // //------------------------------

function getProducts() {
  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
        createProducts(data)
    })
    .catch(function (err) {
      // Une erreur est survenue
    });
}


// // // //---------------------------------------------------------------------
// // // //Integration des produits sur la page d'accueil
// // // //---------------------------------------------------------------------
function createProduct(product) {
  let productHTML = document.createElement("a");
                    productHTML.href = `./product.html?id=${product._id}`;
                    productHTML.innerHTML = `
                                            <article>
                                              <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                <h3 class="productName">${product.name}</h3>
                                                  <p class="productDescription">${product.description}</p>
                                            </article>
                                              `;
  return productHTML;
}

function createProducts(products){
    products.forEach(product => {
        let productHTML = createProduct(product)
        document.getElementById('items')
                .appendChild(productHTML)
    });
}
getProducts();






