// active links
const navLinks = document.querySelectorAll(".nav-link");
const windowPathnameNavLinks = window.location.pathname;
navLinks.forEach((link) => {
  if (link.getAttribute("href") === windowPathnameNavLinks) {
    link.classList.add("active");
  }
});
const navLinksIcons = document.querySelectorAll(".iconsLink");
const windowPathnameIconsLinks = window.location.pathname;
navLinksIcons.forEach((link) => {
  if (link.href.includes(windowPathnameIconsLinks)) {
    link.classList.add("active");
  }
});


// heartIcons (A)
const heartIcons = document.querySelectorAll(".hartIcon");

//
heartIcons.forEach((iconDiv) => {
  const iconId = iconDiv.getAttribute("data-id");
  const icon = iconDiv.querySelector("i");
  const isActive = localStorage.getItem(`heartActive_${iconId}`);
  //
  if (isActive === "true") {
    icon.classList.add("active");
  }

  //
  iconDiv.addEventListener("click", function () {
    if (icon.classList.contains("active")) {
      //
      icon.classList.remove("active");
      //
      localStorage.setItem(`heartActive_${iconId}`, "false");
    } else {
      //
      icon.classList.add("active");
      //
      localStorage.setItem(`heartActive_${iconId}`, "true");
    }
  });
});



///modal/
document.addEventListener("show.bs.modal", function (event) {
  var openModals = document.querySelectorAll(".modal.show");

  openModals.forEach(function (modal) {
    var modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
  });
});

 

//////
let lists;
if (localStorage.getItem("list") !== null) {
  lists = JSON.parse(localStorage.getItem("list"));
} else {
  lists = [];
}

//closeBtn.list

userBtn.addEventListener("click", function () {
  logginBox.classList.replace("d-none", "d-flex");
  lightbox.classList.replace("d-none", "d-flex");
});

///hartIcon
heartBtn.addEventListener("click", function () {
  //  hartIcon.style.add("color: #ec094d")
  hartIcon.classList.add("text-danger");
});


//funcation localstroge
function addLocalStroge() {
  localStorage.setItem("list", JSON.stringify(lists));
}


/*  heartBtn.addEventListener("click",function(){
    hartIcon.classList.remove("bg-danger")
    hartIcon.classList.add("bg-danger")
    
  })
/*

var row = document.getElementById("row")

var icon=document.getElementsByClassName("icon")
//console.log(icon);
var  herolist;

if (localStorage.getItem("products")){
    herolist =JSON.parse(localStorage.getItem("products"));

    dispalyProducts( herolist)
  }else{
    herolist =[]
  }

 


 


    row.innerHTML = content
}

dispalyProducts()
 //local
 function addStorg(){
    localStorage.setItem("products",JSON.stringify(herolist))
    
  }
  //chengButton//
  function chengButton(i) {
     
    let icon = document.getElementsByClassName("icon")
    if (icon.style.color === "red") {
        icon.style.color = "black"
        herolist.splice(i, 1)
    } else {
        icon.style.color = "red"
        herolist.push(products[i])
    }
    addStorg()
    dispalyProducts()
    // alert(herolist)  //for check herolist  //
  
    
}

/*
var lightbox = document.getElementById("lightbox")
var list= document.getElementById("list")
var infor= document.getElementById("infor")
var InformationList=document.getElementById("InformationList")
var  passList=document.getElementById(" passList")
 
let password = document.getElementById("password")
 
let passicon = document.getElementById("passicon")
let Login = document.getElementById("Login")
let warning = document.getElementById("warning")
let emilInput = document.getElementById("emilInput")
let warningmessage = document.getElementById("warningmessage")
let warningemail = document.getElementById("warningemail")
let successMessage=document.getElementById("successMessage")

 /**/

/*submit.addEventListener("click",function(){
    lightbox.classList.replace("d-none","d-flex");
})
//*edit*/
/*infor.addEventListener("click",function(){
    InformationList.classList.replace ("d-none","d-flex")
    passList.classList.replace ("d-flex","d-none")
     
})*/

/////////////////////////////////////////////////////////**login */
/*
 
Login.addEventListener("click", function () {
    for (let i = 0;  i<  herolist.length; i++) {
        if (validtionumberInput() === true && validtionPasswordl() === true) {
           
                homePage()
            }else {
               warning.classList.replace("d-none", "d-flex")
            }
        } 
   
}) 
//passicon
passicon.addEventListener("click", function (e) {
    if (passicon.classList.contains("fa-eye-slash")) {
        passicon.classList.replace("fa-eye-slash", "fa-eye")
        passicon.setAttribute('type', 'text')
    } else {
        passicon.classList.replace("fa-eye", "fa-eye-slash")
        passicon.setAttribute('type', 'password')
    }
})

// validtion for  password

function validtionPasswordl() {
    //var regex = /^(A-Z)(a-z)(0-9){6,}$/
    let passRegex =/^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,}$/
    if (passRegex.test(password.valu)) {
        return true;
    } else {

        return false;
    }
}
//validtion for  phone
function validtionumberInput(){

} 

  //date
  setInterval(function(){
    let date =new Date()
    let mins=date.getMinutes()
    let sec=date.getSeconds()
    document.querySelector(".sec").innerHTML= `${sec}`
    document.querySelector(".mins").innerHTML= `${mins}`
    
  })
  
  var addBalance =document.getElementById("addBalance")
  console.log("addBalance");*/



///
