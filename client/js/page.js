const searchForm = document.getElementById("searchForm");
const searchBar = document.getElementById("searchBar");
const imagesContainer = document.getElementById("images");
const modalCloseBtn = document.getElementById("closeModal");
const tagsSearch = document.getElementById("tagsSearch");


searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  pixabayAPI(searchBar.value);
});

tagsSearch.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const tag = e.target.getAttribute("data-tag");
    searchBar.value = tag;
    pixabayAPI(tag);
  }
});

modalCloseBtn.addEventListener("click", modalClose);

function showImages(images) {
  while (imagesContainer.firstChild) {
    imagesContainer.removeChild(imagesContainer.firstChild);
  }

  images.forEach((imageData) => {
    const card = document.createElement("div");
    card.className = "card";
    const img = document.createElement("img");
    img.src = imageData.webformatURL;
    img.alt = imageData.tags;
    img.addEventListener("click", () => modalOpen(imageData));

    const infoData = document.createElement("div");
    const tags = document.createElement("p");
    const likes = document.createElement("p");
    const views = document.createElement("p");
    
    views.innerHTML = `<strong>Views:</strong> ${imageData.views}`;
    infoData.className = "info";
    tags.innerHTML = `<strong>Tags:</strong> ${imageData.tags || imageData.comments}`;
    likes.innerHTML = `<strong>Likes:</strong> ${imageData.likes}`;
    
    infoData.appendChild(tags);
    infoData.appendChild(likes);
    infoData.appendChild(views);
    
    card.appendChild(img);
    card.appendChild(infoData);
    imagesContainer.appendChild(card);
  });
}

randomPhoto(); 