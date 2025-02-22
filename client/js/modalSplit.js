function modalOpen(imageData) {
  const modalImage = document.getElementById("modalImage");
  const modalText = document.getElementById("modalText");
  const modal = document.getElementById("myModal");

  modalImage.src = imageData.webformatURL;
  modalText.innerHTML = ` 
    <p><strong>Comments:</strong> ${imageData.comments || "N/A"}</p>
    <p><strong>Likes:</strong> ${imageData.likes}</p>
    <p><strong>Views:</strong> ${imageData.views}</p>
  `;
  modal.style.display = "flex"; 
}

function modalClose() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
} 