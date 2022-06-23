let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let count = document.getElementById("count");
let deletAll = document.getElementById("deleteAll");

let submit = document.getElementById("submit");
let mood = 'update';
let tmp;

// get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "tomato";
  }
}

//create product

let dataPro;

if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  }



  if(title.value != '' && price.value != ''){


if(mood === 'create'){

 if(newPro.count > 1){
    for(let i = 0;  i < newPro.count; i++ ){
      dataPro.push(newPro);
    }
  }else{dataPro.push(newPro);
  }

 }else{
  dataPro[ tmp  ] = newPro;
  mood = 'create';
  submit.innerHTML = 'create'
  count.style.display = 'block';
  
 }


 clearData();

  }


 
 

  
  //اللوكال داتا مبتاختش غير String فهنهندل الداتا عن طريق ال json.stringify
  //save local storage
  localStorage.setItem("product", JSON.stringify(dataPro));

  // console.log(newPro);

  showData();
};

//clear inputes

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//read

function showData() {
  table = "";
  for (i = 0; i < dataPro.length; i++) {

    table += `
   <tr>
   <td>${i}</td>
   <th>${dataPro[i].title}</th>
   <th>${dataPro[i].price}</th>
   <th>${dataPro[i].taxes}</th>
   <th>${dataPro[i].ads}</th>
   <th>${dataPro[i].discount}</th>
   <th>${dataPro[i].total}</th>

   <th>${dataPro[i].category}</th>
   <td><button onclick='updateData(${i})' id = 'update'>update</button></td>
   <td><button onclick='delateData(${i})' id = 'Delate'>delate</button></td>

 </tr>

   `;
  
  }

  document.getElementById("tbody").innerHTML = table;
}

let btnDelete = document.getElementById('deleteAll');

  if(dataPro.length > 0) {
   
    btnDelete.innerHTML = `
    <button  onclick='deleteAll()'> deleteAll (${dataPro.length})</button>
    `
  }else{
    btnDelete.innerHTML= '';
  }

showData();

//delate

// i is index for element
function delateData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}


function deleteAll(){
  localStorage.clear();
  dataPro.splice(0);
  showData();

}



//count


   

//update

function updateData(i){
  title.value = dataPro[i].title.toLowerCase();
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category.toLowerCase();
getTotal();
count.style.display = 'none';
submit.innerHTML = 'update'
tmp = i;
mood= 'update';
scroll({
  top:0,
  behavior: "smooth",
})
}



//search

let  searchMood = 'title'

function getSearchMood(id)
{

  let search= document.getElementById('search');
  if(id == 'searchTitle'){
    searchMood = 'title';
    search.placeholder= 'search by title'

  }else {
    searchMood = 'category';
    search.placeholder = 'search by category'
  }

  search.focus()
  search.value ='';
  showData();

} 


function searchData(value)
{

let table = '';

  if(searchMood=='title'){

for(let i  = 0; i < dataPro.length; i++){
  if(dataPro[i].title.includes(value.toLowerCase())){



    table += `
    <tr>
    <td>${i}</td>
    <th>${dataPro[i].title}</th>
    <th>${dataPro[i].price}</th>
    <th>${dataPro[i].taxes}</th>
    <th>${dataPro[i].ads}</th>
    <th>${dataPro[i].discount}</th>
    <th>${dataPro[i].total}</th>
 
    <th>${dataPro[i].category}</th>
    <td><button onclick='updateData(${i})' id = 'update'>update</button></td>
    <td><button onclick='delateData(${i})' id = 'Delate'>delate</button></td>
 
  </tr>
 
    `;





  }


}









  }else{





    for(let i  = 0; i < dataPro.length; i++){
      if(dataPro[i].category.includes(value.toLowerCase())){
    
    
    
        table += `
        <tr>
        <td>${i}</td>
        <th>${dataPro[i].title}</th>
        <th>${dataPro[i].price}</th>
        <th>${dataPro[i].taxes}</th>
        <th>${dataPro[i].ads}</th>
        <th>${dataPro[i].discount}</th>
        <th>${dataPro[i].total}</th>
     
        <th>${dataPro[i].category}</th>
        <td><button onclick='updateData(${i})' id = 'update'>update</button></td>
        <td><button onclick='delateData(${i})' id = 'Delate'>delate</button></td>
     
      </tr>
     
        `;
    
    
    
    
    
      }
    
    
    }




  }
  document.getElementById("tbody").innerHTML = table;

}



  


//clean data