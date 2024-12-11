document.addEventListener("DOMContentLoaded", function () {
  const filterContainer = document.getElementById("categories"); 
  const allProducts = document.querySelectorAll(".product-container .box"); 
  const typeOfProductText = document.querySelector(".typeOfProduct"); 
  const productContainer = document.getElementById("products");
  const sortSelector = document.getElementById("sort"); 

  if (filterContainer) {
    filterContainer.addEventListener("click", function (event) {
      const categoryImage = event.target.closest(".image-container"); 
      if (!categoryImage) return; 

      const category = categoryImage.getAttribute("data-filter");

      filterProductsByCategory(category);
    });
  }

  function filterProductsByCategory(category) {
    let isCategorySelected = false; 

    allProducts.forEach(function (product) {
      const productCategory = product.getAttribute("data-filter");

      if (category === "all" || productCategory === category) {
        product.style.display = "block"; 
        if (category !== "all" && !isCategorySelected) {
          isCategorySelected = true;
          updateTypeOfProductText(category); 
        }
      } else {
        product.style.display = "none";
      }
    });

    if (category === "all") {
      updateTypeOfProductText("all");
    }
  }

  function updateTypeOfProductText(category) {
    const categoryNames = {
      "all": "ALL PRODUCTS",
      "boxes": "BOXES",
      "packaging": "PACKAGING"
    };

    if (typeOfProductText) {
      typeOfProductText.textContent = categoryNames[category] || "ALL PRODUCTS";
    }
  }

  if (sortSelector && productContainer) {
    const products = Array.from(productContainer.getElementsByClassName("box"));

    sortSelector.addEventListener("change", (e) => {
      const sortValue = e.target.value;

      const sortedProducts = products.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute("data-price"));
        const priceB = parseFloat(b.getAttribute("data-price"));
        const nameA = a.getAttribute("data-name").toLowerCase();
        const nameB = b.getAttribute("data-name").toLowerCase();

        switch (sortValue) {
          case "priceLowHigh":
            return priceA - priceB;
          case "priceHighLow":
            return priceB - priceA;
          case "name":
            return nameA.localeCompare(nameB);
          case "nameDesc":
            return nameB.localeCompare(nameA);
          default:
            return 0; 
        }
      });

      productContainer.innerHTML = "";
      sortedProducts.forEach((product) => {
        productContainer.appendChild(product);
      });
    });
  }
});
