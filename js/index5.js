document.addEventListener('DOMContentLoaded', () => {
  const infoButton = document.getElementById('favouriteBtn5');
  const passwordButton = document.getElementById('favouriteBtn66');
  const infoList = document.getElementById('InformationList');
  const passList = document.getElementById('passList');

  // Show Information section by default
  infoList.classList.remove('d-none');
  passList.classList.add('d-none');

  // Show Information section and hide Password section
  infoButton.addEventListener('click', () => {
      infoList.classList.remove('d-none');
      passList.classList.add('d-none');
  });

  // Show Password section and hide Information section
  passwordButton.addEventListener('click', () => {
      passList.classList.remove('d-none');
      infoList.classList.add('d-none');
  });
});
///////////////////wallet
function showDiv(divId) {
  // إخفاء جميع العناصر
  const divs = document.querySelectorAll('.col-md-4');
  divs.forEach(div => {
      div.classList.add('d-none');
  });

  // إظهار العنصر المطلوب
  const targetDiv = document.getElementById(divId);
  if (targetDiv) {
      targetDiv.classList.remove('d-none');
  }
}
