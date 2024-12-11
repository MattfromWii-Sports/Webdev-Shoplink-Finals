document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");

  if (query) {
    const lowerCaseQuery = query.toLowerCase();
    const productBoxes = document.querySelectorAll(".product-container .box");

    let hasMatches = false;

    productBoxes.forEach((box) => {
      const productName = box.dataset.name.toLowerCase();

      if (productName.includes(lowerCaseQuery)) {
        box.style.display = "";
        const regex = new RegExp(`(${lowerCaseQuery})`, "gi");
        const highlightedName = box.dataset.name.replace(regex, "<span style='background-color: yellow;'>$1</span>");
        box.querySelector("h4").innerHTML = highlightedName;
        hasMatches = true;
      } else {
        box.style.display = "none";
      }
    });

    if (!hasMatches) {
      const productContainer = document.querySelector("#products");
      const noResultsMessage = document.createElement("div");
      noResultsMessage.id = "no-products-message"; 
      noResultsMessage.textContent = "No matching products found.";
      noResultsMessage.style.color = "red";
      noResultsMessage.style.fontSize = "1.2rem";
      noResultsMessage.style.textAlign = "center";
      productContainer.appendChild(noResultsMessage);
    }
  }
});

document.querySelectorAll("#productNav-container, #productSide").forEach((element) => {
  element.addEventListener("click", function () {
    const searchInput = document.querySelector(".search-bar input");
    if (searchInput) {
      searchInput.value = "";
    }

    const productBoxes = document.querySelectorAll(".box");
    productBoxes.forEach((box) => {
      const productNameElement = box.querySelector("h4");
      productNameElement.innerHTML = box.dataset.name;

      box.style.display = "";
    });

    const categoryButtons = document.querySelectorAll("[data-category]");
    categoryButtons.forEach((button) => button.classList.remove("active"));

    const noProductsMessage = document.querySelector("#no-products-message");
    if (noProductsMessage) {
      noProductsMessage.remove(); 
    }
  });
});
