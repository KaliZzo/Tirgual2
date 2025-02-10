  const searchForm = document.getElementById("searchForm");
  const searchBar = document.getElementById("searchBar");
  const imagesContainer = document.getElementById("images");
  const modal = document.getElementById("myModal");
  const modalImage = document.getElementById("modalImage");
  const modalText = document.getElementById("modalText");
  const modalCloseBtn = document.getElementById("closeModal");
  const tagsSearch = document.getElementById("tagsSearch");

  // Event Listeners
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

 


  async function pixabayAPI(query) {
    const URL = `http://localhost:3001/api/v1?q=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("'Failed to fetch");
      }
      const data = await response.json();
      showImages(data.hits);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  }

//Lastest photos on main PAGE
  async function randomPhoto() {
    const URL = `http://localhost:3001/api/v1/randomPhotos`;
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      showImages(data.hits);
    } catch (error) {
      console.error("Failed to fetcv:", error);
    }
  } 
  randomPhoto();


  function showImages(images) {
 //While ולא if.. 
    while (imagesContainer.firstChild) {
      imagesContainer.removeChild(imagesContainer.firstChild);
    }

    images.forEach((imageData) => {
      const card = document.createElement("div");
      card.className = "card";
      const img = document.createElement("img");
      img.src = imageData.webformatURL
      img.alt = imageData.tags
      img.addEventListener("click", () => modalOpen(imageData));

  
      const infoData = document.createElement("div");
      const tags = document.createElement("p");
      const likes = document.createElement("p");
      const views = document.createElement("p");
      //data part
      views.innerHTML = `<strong>Views:</strong> ${imageData.views}`;
      infoData.className = "info";
      tags.innerHTML = `<strong>Tags:</strong> ${imageData.tags || imageData.comments}`;
      likes.innerHTML = `<strong>Likes:</strong> ${imageData.likes}`;
      infoData.appendChild(tags);
      infoData.appendChild(likes);
      infoData.appendChild(views);
      //card part.
      card.appendChild(img);
      card.appendChild(infoData);
      imagesContainer.appendChild(card);
    });
  }

  function modalOpen(imageData) {
    modalImage.src = imageData.webformatURL;
    modalText.innerHTML = ` 
      <p><strong>Comments:</strong> ${imageData.comments || "N/A"}</p>
      <p><strong>Likes:</strong> ${imageData.likes}</p>
      <p><strong>Views:</strong> ${imageData.views}</p>
    `;
    modal.style.display = "flex"; 
  }

  function modalClose() {
    modal.style.display = "none";
  }




  
