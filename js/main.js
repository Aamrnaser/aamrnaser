let titel = document.getElementById("titel");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let temp;

let dataPro = [];
if (localStorage.getItem("product") != null) {
  dataPro = JSON.parse(localStorage.getItem("product"));
  displayData();
} else {
  dataPro = [];
}

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d20";
  }
}

submit.onclick = function () {
  let dataObject = {
    titel: titel.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (
    titel.value != "" &&
    price.value != "" &&
    category.value != "" &&
    dataObject.count < 20
  ) {
    if (mood == "create") {
      if (dataObject.count > 1) {
        for (let i = 0; i < dataObject.count; i++) {
          dataPro.push(dataObject);
        }
      } else {
        dataPro.push(dataObject);
      }
    } else {
      dataPro[temp] = dataObject;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clear();
  }

  displayData();
  localStorage.setItem("product", JSON.stringify(dataPro));
};
function clear() {
  titel.value = null;
  price.value = null;
  taxes.value = null;
  ads.value = null;
  discount.value = null;
  total.innerHTML = null;
  count.value = null;
  category.value = null;
}

function displayData() {
  getTotal();
  let cartona = "";

  for (let i = 0; i < dataPro.length; i++) {
    cartona += `
  <tr>
              <td>${i + 1}</td>
              <td>${dataPro[i].titel}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button  onclick="updateData(${i})" id="update">Update</button></td>
              <td><button  onclick="deletData(${i})" id="delete">Delete</button></td>
            </tr>
`;
  }
  let btnDelet = document.getElementById("deletAll");
  if (dataPro.length > 0) {
    btnDelet.innerHTML = `
<button onclick="deletAll()" >DeleteAll</button>
`;
  } else {
    btnDelet.innerHTML = "";
  }
  document.getElementById("tbody").innerHTML = cartona;
}

function deletData(index) {
  dataPro.splice(index, 1);
  displayData();
  localStorage.setItem("product", JSON.stringify(dataPro));
}

function deletAll() {
  dataPro = [];
  displayData();
  localStorage.setItem("product", JSON.stringify(dataPro));
}

function updateData(index) {
  titel.value = dataPro[index].titel;
  price.value = dataPro[index].price;
  taxes.value = dataPro[index].taxes;
  ads.value = dataPro[index].ads;
  discount.value = dataPro[index].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataPro[index].category;
  submit.innerHTML = "Update";
  mood = "update";
  temp = index;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
