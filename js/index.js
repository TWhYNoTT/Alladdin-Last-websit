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

