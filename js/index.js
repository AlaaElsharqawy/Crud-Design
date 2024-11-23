var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");
var searchInput = document.getElementById("searchInput");

var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");
// console.log(productNameInput,productPriceInput,productCategorynput,productDescriptionInput,productImageInput)
var productList = [];

var currentIndex = 0;

if (localStorage.getItem("productContainer") !== null) {
  productList = JSON.parse(localStorage.getItem("productContainer"));

  displayData();
}

function addProduct() {
  if (
    (validationInputs(productNameInput, "msg-Name"),
    validationInputs(productPriceInput, "msg-Price"),
    validationInputs(productCategoryInput, "msg-category"),
    validationInputs(productDescriptionInput, "msg-description"),
    validationInputs(productImageInput, "msg-img"))
    // validationName() &&
    // validationPrice() &&
    // validationCategory() &&
    // validationDescription() &&
    // validationImage()
  ) {
    var product = {
      name: productNameInput.value.trim(),
      price: productPriceInput.value,
      category: productCategoryInput.value.trim(),
      description: productDescriptionInput.value.trim(),
      image: productImageInput.files[0]
        ? `images/${productImageInput.files[0]?.name}`
        : "images/1.jpg",
    };

    productList.push(product);
    localStorage.setItem("productContainer", JSON.stringify(productList));
    displayData();
    console.log(productList);

    clearForm();
  }
}

function displayData() {
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    cartona += getCols(i);
  }

  document.getElementById("rowData").innerHTML = cartona;
}

function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("productContainer", JSON.stringify(productList));
  displayData();
}

function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescriptionInput.value = null;
  productImageInput.value = null;

  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-valid");
  productDescriptionInput.classList.remove("is-valid");
  productImageInput.classList.remove("is-valid");
}

function searchData() {
  var term = searchInput.value;

  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
      cartona += getCols(i);
    }
  }

  document.getElementById("rowData").innerHTML = cartona;
}

function setUpdateInfo(index) {
  productNameInput.value = productList[index].name;
  productPriceInput.value = productList[index].price;
  productCategoryInput.value = productList[index].category;
  productDescriptionInput.value = productList[index].description;

  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");

  currentIndex = index;
}

function updateProduct() {
  if (
    // validationName() &&
    // validationPrice() &&
    // validationCategory() &&
    // validationDescription() &&
    // validationImage()
    (validationInputs(productNameInput, "msg-Name"),
    validationInputs(productPriceInput, "msg-Price"),
    validationInputs(productCategoryInput, "msg-category"),
    validationInputs(productDescriptionInput, "msg-description"),
    validationInputs(productImageInput, "msg-img"))
  ) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      description: productDescriptionInput.value,
      image: productImageInput.files[0]
        ? `images/${productImageInput.files[0]?.name}`
        : "images/1.jpg",
    };

    productList.splice(currentIndex, 1, product);

    localStorage.setItem("productContainer", JSON.stringify(productList));

    displayData();
    clearForm();

    btnUpdate.classList.add("d-none");
    btnAdd.classList.remove("d-none");
  }
}

function getCols(i) {
  var regex = new RegExp(searchInput.value, "gi");
  return `
      
      
        <div class="col ">
              <div class="card h-100">
                <img height=150px class="card-img-top" src="${
                  productList[i].image
                }" alt="${productList[i].name}" />
                <div class="card-body">
                  <span class="badge bg-info">Index: ${i}</span>
                  <h3 class="card-title h6 py-3">name: ${productList[
                    i
                  ].name.replace(
                    regex,
                    (regex) => `<span class="bg-info">${regex}</span>`
                  )}</h3>
                  <div class="d-flex flex-column gap-2">
                    <h4 class="card-text small">prine: ${
                      productList[i].price
                    }</h4>
                    <h4 class="card-text small">category: ${
                      productList[i].category
                    }</h4>
                    <p class="card-text small">description: ${
                      productList[i].description
                    }</p>
                  </div>
                </div>

                <div class="card-footer text-center d-flex gap-2 justify-content-center">
                  <button  onClick="deleteProduct(${i})" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                  <button onClick="setUpdateInfo(${i})" class="btn btn-outline-warning"><i class="fas fa-edit"></i></button>
                </div>
              </div>
            </div>
      
      `;
}

// function validationName() {
//   var msgName = document.getElementById("msg-Name");
//   var text = productNameInput.value;

//   var regex = /^[a-zA-z][a-zA-Z0-9 _]{2,19}$/;

//   if (regex.test(text)) {
//     productNameInput.classList.add("is-valid");
//     productNameInput.classList.remove("is-invalid");
//     msgName.classList.add("d-none");
//     return true;
//   } else {
//     productNameInput.classList.add("is-invalid");
//     productNameInput.classList.remove("is-valid");
//     msgName.classList.remove("d-none");
//     return false;
//   }
// }

// function validationPrice() {
//   var msgPrice = document.getElementById("msg-Price");
//   var text = productPriceInput.value;

//   var regex = /^[1-9]{2,5}$/;

//   if (regex.test(text)) {
//     productPriceInput.classList.add("is-valid");
//     productPriceInput.classList.remove("is-invalid");
//     msgPrice.classList.add("d-none");
//     return true;
//   } else {
//     productPriceInput.classList.add("is-invalid");
//     productPriceInput.classList.remove("is-valid");
//     msgPrice.classList.remove("d-none");
//     return false;
//   }
// }

// function validationCategory() {
//   var msgCategory = document.getElementById("msg-category");
//   var text = productCategoryInput.value;

//   var regex = /^(tv|mobile|screens|electronic)$/i;

//   if (regex.test(text)) {
//     productCategoryInput.classList.add("is-valid");
//     productCategoryInput.classList.remove("is-invalid");
//     msgCategory.classList.add("d-none");
//     return true;
//   } else {
//     productCategoryInput.classList.add("is-invalid");
//     productCategoryInput.classList.remove("is-valid");
//     msgCategory.classList.remove("d-none");
//     return false;
//   }
// }

// function validationDescription() {
//   var msgDescription = document.getElementById("msg-description");
//   var text = productDescriptionInput.value;

//   var regex = /^.{3,}$/m;

//   if (regex.test(text)) {
//     productDescriptionInput.classList.add("is-valid");
//     productDescriptionInput.classList.remove("is-invalid");
//     msgDescription.classList.add("d-none");
//     return true;
//   } else {
//     productDescriptionInput.classList.add("is-invalid");
//     productDescriptionInput.classList.remove("is-valid");
//     msgDescription.classList.remove("d-none");
//     return false;
//   }
// }

// function validationImage() {
//   var msgImage = document.getElementById("msg-img");
//   var text = productImageInput.value;

//   var regex = /^.+\.(jpg|png|avif|jpeg|svg|gif)$/;

//   if (regex.test(text)) {
//     productImageInput.classList.add("is-valid");
//     productImageInput.classList.remove("is-invalid");
//     msgImage.classList.add("d-none");
//     return true;
//   } else {
//     productImageInput.classList.add("is-invalid");
//     productImageInput.classList.remove("is-valid");
//     msgImage.classList.remove("d-none");
//     return false;
//   }
// }

// advanced Validation

function validationInputs(element, msgId) {
  var text = element.value;
  var msg = document.getElementById(msgId);
  var regex = {
    productName: /^[a-zA-z][a-zA-Z0-9 _]{2,19}$/,
    productPrice: /^[1-9]{2,5}$/,
    productCategory: /^(tv|mobile|screens|electronic)$/i,
    productDescription: /^.{3,}$/m,
    productImage: /^.+\.(jpg|png|avif|jpeg|svg|gif)$/,
  };

  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    msg.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    msg.classList.remove("d-none");
    return false;
  }
}
