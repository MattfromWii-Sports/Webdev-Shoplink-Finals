// Terms modal
const termsModal = document.getElementById("terms-modal");
function openTerms() {
  termsModal.classList.add("show");
  termsModal.style.display = "block";
}
function closeTerms() {
  termsModal.classList.remove("show");
  termsModal.style.display = "none";
}

//Privacy modal
const privacyModal = document.getElementById("privacy-modal");
function openPrivacy() {
  privacyModal.classList.add("show");
  privacyModal.style.display = "block";
}
function closePrivacy() {
  privacyModal.classList.remove("show");
  privacyModal.style.display = "none";
}
