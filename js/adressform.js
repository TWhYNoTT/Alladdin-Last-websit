// Get the overlay and form
const overlay = document.getElementById("overlay");
const form = document.getElementById("addressForm");
const newForm = document.getElementById("newAddressForm");


// Function to open the form
function openForm() {
  overlay.style.display = "block";
  form.style.display = "block";

}
function openNewForm() {
  form.style.display = "none";
  overlay.style.display = "block";
  newForm.style.display = "block";

}


const colors = ['rgba(255, 255, 0, 0.637)', 'rgba(255, 255, 0, 0)', 'rgba(20, 129, 247, 0.587)', 'rgba(194, 118, 248, 0.587)']; // Colors with transparency
const textColors = ['black', 'black', 'white', 'black']; // Text colors
let currentIndex = 0;

function changeOverlayColor() {
  const overlay = document.getElementById('overlay1');
  const overlayText = document.getElementById('overlayText');
  currentIndex = (currentIndex + 1) % colors.length;
  overlay.style.backgroundColor = colors[currentIndex];
  overlayText.style.color = textColors[currentIndex];
}

setInterval(changeOverlayColor, 2000); // Change overlay and text color every 2 seconds