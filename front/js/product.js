function getProduct(id) {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (data) {
        createProduct(data)
        console.log(data);
      })
      .catch(function (err) {
        // Une erreur est survenue
      });
  }

 

function createProduct(product){
    let productName = document.getElementById('title')
    let productPrice = document.getElementById('price')
    let productDescription = document.getElementById('description')
    let productImage  = document.querySelector('.item__img')
    let createImg = document.createElement("img");





//images
    createImg.src = product.imageUrl;
    createImg.alt = product.altTxt;
//couleurs
    let typeOfColors = product.colors;
    let selectColor = document.getElementById("colors");
    let colorsHyml = selectColor.innerHTML = `
                                            <option value="${typeOfColors[0]}">${typeOfColors[0]}</option>
                                            <option value="${typeOfColors[1]}">${typeOfColors[1]}</option>
                                            <option value="${typeOfColors[2]}">${typeOfColors[2]}</option>
                                              `;
                                              console.log(selectColor);
                                              
for (i = 0; i < typeOfColors.length; i++) {
  if (typeOfColors[i] === typeOfColors.length){
   break;
  }
};



    productName.innerHTML = product.name;
    productImage.appendChild(createImg);
    productPrice.innerHTML = product.price;
    productDescription.innerHTML = product.description;

    
  
  
}
const urlId = window.location.search;
const urlSearchParams = new URLSearchParams(urlId);
const id = urlSearchParams.get("id")

getProduct(id);


// creer des options et récupérer les infos dans colors
// const productColors = document.getElementById("colors");
// const selectColor = document.createElement ("option")
//                     selectColor.innerHTML = `
//                                             <option value="${typeOfColors}">${typeOfColors}</option>
//                                               `;
