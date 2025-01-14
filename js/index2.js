/* myFavourite*/

let  favouriteBtn1= document.getElementById("favouriteBtn1");
let DivBtn1 = document.getElementById("DivBtn1");
 


favouriteBtn1.addEventListener("click", () => {

  if (DivBtn1.classList.contains("hidden")) {
    DivBtn1.classList.remove("hidden");
  } else {
    DivBtn1.classList.add("hidden");
  }
});
/* myFavourite*/

let  favouriteBtn2= document.getElementById("favouriteBtn2");
let DivBtn2 = document.getElementById("DivBtn2");
 


favouriteBtn2.addEventListener("click", () => {

  if (DivBtn2.classList.contains("hidden")) {
    DivBtn2.classList.remove("hidden");
  }  else {
    DivBtn1.classList.add("hidden");
  } 
});
/* myFavourite*/

let  favouriteBtn4= document.getElementById("favouriteBtn4");
let DivBtn4 = document.getElementById("DivBtn4");
 


favouriteBtn4.addEventListener("click", () => {

  if (DivBtn4.classList.contains("hidden")) {
    DivBtn4.classList.remove("hidden");
  }   else {
    DivBtn1.classList.add("hidden");
  }
  
});
