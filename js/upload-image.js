const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("img-view");

inputFile.addEventListener("change", uploadImage);

function uploadImage() {
  let imgLink = URL.createObjectURL(inputFile.files[0]);
  imageView.style.backgroundImage = `url(${imgLink})`;
  imageView.textContent = "";
  imageView.style.border = 0;
}

dropArea.addEventListener("dragover", function (e) {
  e.preventDefault();
});
dropArea.addEventListener("drop", function (e) {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;
  uploadImage();
});

// Increment / Decrement
function increment(id) {
  const input = document.getElementById(id);
  input.value = parseInt(input.value || 0) + 1;
}

function decrement(id) {
  const input = document.getElementById(id);
  if (parseInt(input.value || 0) > 0) {
    input.value = parseInt(input.value || 0) - 1;
  }
}
