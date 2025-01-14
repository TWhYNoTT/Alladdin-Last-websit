/*myOrder*/

 
 /////
 

let  orderBtn= document.getElementById("orderBtn");
let boxOrder = document.getElementById("boxOrder");
 


orderBtn.addEventListener("click", () => {

  if (boxOrder.classList.contains("hidden")) {
    boxOrder.classList.remove("hidden");
  }  else{
    boxOrder.classList.remove("hidden");
   }
});
/*myOrder*/

 
 /////
 

 let  orderBtn2= document.getElementById("orderBtn2");
 
  
 
 
 orderBtn2.addEventListener("click", () => {
 
   if (boxOrder.classList.contains("hidden")) {
     boxOrder.classList.remove("hidden");
   } else{
    boxOrder.classList.remove("hidden");
   } 
 });
 /*myOrder*/

 
 /////
 

 let  orderBtn4= document.getElementById("orderBtn4");
 
  
 
 
 orderBtn4.addEventListener("click", () => {
 
   if (boxOrder.classList.contains("hidden")) {
     boxOrder.classList.remove("hidden");
   }else{
    boxOrder.classList.remove("hidden");
   }  
 }); /*myOrder*/

 
 /////
 

 let  orderBtn5= document.getElementById("orderBtn5");
 
  
 
 
 orderBtn5.addEventListener("click", () => {
 
   if (boxOrder.classList.contains("hidden")) {
     boxOrder.classList.remove("hidden");
   }else{
    boxOrder.classList.remove("hidden");
   } 
 });
 //////////////////////////////////////////////////////////////////////
 /*myOrder*/

 
 /////
 

let  orderBtn21= document.getElementById("orderBtn21");
let boxOrder2 = document.getElementById("boxOrder2");
 


orderBtn21.addEventListener("click", () => {

  if (boxOrder2.classList.contains("hidden")) {
    boxOrder2.classList.remove("hidden");
  }  else{
    boxOrder2.classList.remove("hidden");
   }
});
/*myOrder*/

 
 /////
 

 let  orderBtn22= document.getElementById("orderBtn22");
 
  
 
 
 orderBtn22.addEventListener("click", () => {
 
   if (boxOrder2.classList.contains("hidden")) {
     boxOrder2.classList.remove("hidden");
   } else{
    boxOrder2.classList.remove("hidden");
   } 
 });
 /*myOrder*/

 
 /////
 

 let  orderBtn42= document.getElementById("orderBtn42");
 
  
 
 
 orderBtn42.addEventListener("click", () => {
 
   if (boxOrder2.classList.contains("hidden")) {
     boxOrder2.classList.remove("hidden");
   }else{
    boxOrder2.classList.remove("hidden");
   }  
 }); /*myOrder*/

 
 /////
 

 let  orderBtn52= document.getElementById("orderBtn52");
 
  
 
 
 orderBtn52.addEventListener("click", () => {
 
   if (boxOrder2.classList.contains("hidden")) {
     boxOrde2r.classList.remove("hidden");
   }else{
    boxOrder2.classList.remove("hidden");
   } 
 });

/////////////////////////
const pages = ["Home", "About Us", "Services", "Contact", "Blog", "Portfolio"]; // أسماء الصفحات

function showSuggestions() {
    const suggestionsDiv = document.getElementById('suggestions');
    const suggestionList = document.getElementById('suggestionList');
    suggestionList.innerHTML = ''; // تفريغ القائمة السابقة

    pages.forEach(page => {
        const li = document.createElement('li');
        li.textContent = page;
        li.style.padding = '8px';
        li.style.cursor = 'pointer';
        li.onclick = function() {
            document.getElementById('searchInput').value = page; // تعيين القيمة عند النقر
            suggestionsDiv.style.display = 'none'; // إخفاء القائمة
        };
        suggestionList.appendChild(li);
    });

    suggestionsDiv.style.display = 'block'; // عرض القائمة
    hideSearchIcon(); // إخفاء أيقونة البحث
}

function hideSuggestions() {
    document.getElementById('suggestions').style.display = 'none'; // إخفاء القائمة
}

function hideSearchIcon() {
    document.getElementById('searchIcon').style.display = 'none'; // إخفاء أيقونة البحث
}

function restoreSearchIcon() {
    if (document.getElementById('searchInput').value === '') {
        document.getElementById('searchIcon').style.display = 'flex'; // إعادة إظهار أيقونة البحث
    }
  }