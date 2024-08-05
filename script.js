document.addEventListener("DOMContentLoaded", function () {
  const mainCategoryList = document.getElementById("main_category_list");
  const subcategoreContainer = document.getElementById("subcategory_container");
  const imgContainer = document.getElementById("img_id");
  const articleContainer = document.getElementById("article_id");
  let subCunter = 1;

  function createSubCategories(subCategories, container, parentLi = null) {
    const ul = document.createElement("ul");
    ul.classList.add("subcategory-list");
    ul.setAttribute("id", `subcategory-${subCunter}`);

    if (
      (subCunter === 1 && window.innerWidth < 520) ||
      (subCunter === 2 && window.innerWidth < 725) ||
      (subCunter === 3 && window.innerWidth < 920)
    ) {
      if (parentLi) {
        parentLi.classList.add("flex_col");
        parentLi.appendChild(ul);
      }
    } else {
      container.appendChild(ul);
    }
    subCategories.forEach((subCategory) => {
      const li = document.createElement("li");
      li.textContent = subCategory.name;
      li.classList.add("category-btn");

      if (subCategory.sub) {
        li.setAttribute("data-sub", JSON.stringify(subCategory.sub));
        li.addEventListener("click", handleClick);
      }

      ul.appendChild(li);
    });

    subCunter++;
  }

  function handleClick(event) {
    const li = event.currentTarget;
    const subCategories = JSON.parse(li.getAttribute("data-sub"));
    imgContainer.style.display = "none";
    articleContainer.style.justifyContent = "unset";
    articleContainer.style.gap = "unset";

    if (window.innerWidth > 520) {
      subcategoreContainer.style.display = "flex";
    }
    event.stopPropagation();
    const subcategoryId = li.parentElement.id;

    if (li.classList.contains("active_text")) {
      removeSubCategories(subcategoryId);
      li.classList.remove("active_text");
      return;
    }
    mainCategoryList.classList.remove("active");
    li.classList.add("active_text");

    if (
      (subCunter === 1 && window.innerWidth < 520) ||
      (subCunter === 2 && window.innerWidth < 725) ||
      (subCunter === 3 && window.innerWidth < 920)
    ) {
      createSubCategories(subCategories, null, li);
    } else {
      createSubCategories(subCategories, subcategoreContainer);
    }
    switch (true) {
      case document.getElementById("subcategory-3") !== null:
        document.getElementById("subcategory-1").classList.remove("active");
        document.getElementById("subcategory-2").classList.remove("active");
        document.getElementById("subcategory-3").classList.add("active");
        document.getElementById("subcategory-3").style.marginTop = "0";
        break;
      case document.getElementById("subcategory-2") !== null:
        document.getElementById("subcategory-1").classList.remove("active");
        document.getElementById("subcategory-2").classList.add("active");
        document.getElementById("subcategory-2").style.marginTop = "0";
        break;
      case document.getElementById("subcategory-1") !== null:
        document.getElementById("subcategory-1").classList.add("active");
        break;
      default:
        break;
    }
  }

  function removeSubCategories(subcategoryId) {
    switch (subcategoryId) {
      case "main_category_list":
        if (document.getElementById("subcategory-1"))
          document.getElementById("subcategory-1").remove();
        mainCategoryList.classList.remove("active");
        imgContainer.style.display = "block";
        subcategoreContainer.style.display = "none";
        mainCategoryList.classList.add("active");
        startCategories();
        break;
      case "subcategory-1":
        if (document.getElementById("subcategory-2"))
          document.getElementById("subcategory-2").remove();
        if (document.getElementById("subcategory-3"))
          document.getElementById("subcategory-3").remove();
        document.getElementById("subcategory-1").classList.add("active");
        break;
      case "subcategory-2":
        if (document.getElementById("subcategory-3"))
          document.getElementById("subcategory-3").remove();
        document.getElementById("subcategory-2").classList.add("active");
        break;
      case "subcategory-3":
        break;
      default:
        break;
    }
  }

  function startCategories() {
    subCunter = 1;
    subcategoreContainer.innerHTML = "";
    mainCategoryList
      .querySelectorAll(".category-btn")
      .forEach((btn) => btn.classList.remove("active_text"));
    articleContainer.style.gap = "10px";

    mainCategoryList
      .querySelectorAll(".category-btn")
      .forEach((categoryBtn) => {
        categoryBtn.addEventListener("click", handleClick);
      });
  }
  mainCategoryList.querySelectorAll(".category-btn").forEach((categoryBtn) => {
    categoryBtn.addEventListener("click", handleClick);
  });
});
