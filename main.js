//------------------------------------- Selector ---------------------------------------------------------------------------------------
let html = document.querySelector("html");
let dark = document.getElementById("darkMode");
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let input = document.querySelectorAll("input");
let arrow = document.getElementById("up");
let mood = "create";
let moodSearch = "title";
let countLoop ;
let search = document.getElementById("search");
  //------------------------- ------------ Simple Feture  ---------------------------------------------------------------------------------------
  dark.addEventListener("click", () => {
    html.classList.toggle("dark");
  });
window.onscroll = function () {
  if (window.scrollY >= 600) {
    arrow.style.right = "20px";
  } else {
    arrow.style.right = "-50px";
  }
};
arrow.onclick = function () {
  window.scrollTo({
    top: 0,
  });
};
//------------------------------------- getTotal ---------------------------------------------------------------------------------------
function getTotal() {
  if (price.value != "" && price.value != 0) {
    const result = +price.value + +taxes.value + +ads.value - discount.value;
    total.innerHTML = result;
    total.classList.remove("bg-red-600");
    total.classList.add("bg-green-500");
  } else {
    total.innerHTML = "";
    total.classList.remove("bg-green-500");
    total.classList.add("bg-red-600");
  }
}

// Create

let newProductdata = [];
if (localStorage.product != null) {
  newProductdata = JSON.parse(localStorage.product);
} else {
  newProductdata = [];
}
create.addEventListener("click", function createPro() {
  if (
    title.value != "" &&
    price.value != "" &&
    taxes.value != "" &&
    ads.value != "" &&
    discount.value != ""
  ) {
    let objData = {
      title: title.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value.toLowerCase(),
    };
    if ((mood === "create")) {
      if (objData.count > 1) {
        for (let i = 0; i < objData.count; i++) {
          newProductdata.push(objData);
        }
      } else newProductdata.push(objData);
    } 
    else {
      newProductdata[countLoop] = objData;
      mood = "create"; 
      create.textContent = "create" ;
      count.style.display = "block";
    }
  }
  localStorage.setItem("product", JSON.stringify(newProductdata));
  clearData();
  readData();
});
//clear
function clearData() {
  input.forEach((el) => {
    el.value = "";
    total.innerHTML = "";
  });
}
// read
function readData() {
  getTotal()
  let table = "";
  for (let i = 0; i < newProductdata.length; i++) {
    table += `
        <tr class="product">
        <td> ${i + 1}</td>
        <td>${newProductdata[i].title}</td>
        <td> ${newProductdata[i].price}</td>
        <td> ${newProductdata[i].taxes}</td>
        <td> ${newProductdata[i].ads}</td>
        <td> ${newProductdata[i].discount}</td>
        <td> ${newProductdata[i].total}</td>
        <td> ${newProductdata[i].category}</td>
        <td><button class="btn w-[60%]" onclick="updateData(${i})" >update</button></td>
        <td><button onclick="deletePro(${i})" class="btn w-[60%]" id="delete">delete</button></td>
    </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = table;
  let delAll = document.getElementById("delAll");
  if (newProductdata.length > 0) {
    delAll.innerHTML = `<button onclick="deleteAll()" class="btn" >delete All (${newProductdata.length})</button>`;
  } else {
    delAll.innerHTML = "";
  }
}
readData();

// delete

function deletePro(i) {
  newProductdata.splice(i, 1);
  localStorage.product = JSON.stringify(newProductdata);
  readData();
}

function deleteAll() {
  newProductdata = "";
  localStorage.clear();
  readData();
}
//update

function updateData(i) {
  title.value = newProductdata[i].title;
  price.value = newProductdata[i].price;
  taxes.value = newProductdata[i].taxes;
  ads.value = newProductdata[i].ads;
  discount.value = newProductdata[i].discount;
  getTotal();
  category.value = newProductdata[i].category;
  count.style.display = "none";
  create.innerHTML = "Update";
  mood = "update";
  countLoop = i ; 
}

function searchMood(id) {
  moodSearch = id ; 
  if ( id === "SearchTitle") {
    moodSearch === "title";
  }else{
    moodSearch === "category";
  search.placeholder = "Search By Category";
}
search.value = "";
readData()

}

function searchDate(v) {
  let table = "";
  for (let i = 0; i < newProductdata.length; i++) {
  
    if ( moodSearch === "title") {
      
        if (newProductdata[i].title.includes(v.toLowerCase())) {
          table += `
          <tr class="product">
          <td> ${i + 1}</td>
          <td>${newProductdata[i].title}</td>
          <td> ${newProductdata[i].price}</td>
          <td> ${newProductdata[i].taxes}</td>
          <td> ${newProductdata[i].ads}</td>
          <td> ${newProductdata[i].discount}</td>
          <td> ${newProductdata[i].total}</td>
          <td> ${newProductdata[i].category}</td>
          <td><button class="btn w-[60%]" onclick="updateData(${i})" >update</button></td>
          <td><button onclick="deletePro(${i})" class="btn w-[60%]" id="delete">delete</button></td>
      </tr>
          `;
        }
      
    }
    else{
      
        if (newProductdata[i].category.includes(v.toLowerCase())) {
          table += `
          <tr class="product">
          <td> ${i + 1}</td>
          <td>${newProductdata[i].title}</td>
          <td> ${newProductdata[i].price}</td>
          <td> ${newProductdata[i].taxes}</td>
          <td> ${newProductdata[i].ads}</td>
          <td> ${newProductdata[i].discount}</td>
          <td> ${newProductdata[i].total}</td>
          <td> ${newProductdata[i].category}</td>
          <td><button class="btn w-[60%]" onclick="updateData(${i})" >update</button></td>
          <td><button onclick="deletePro(${i})" class="btn w-[60%]" id="delete">delete</button></td>
      </tr>
          `;
        }
      
    }
    
  }
  document.getElementById("tbody").innerHTML = table;
}