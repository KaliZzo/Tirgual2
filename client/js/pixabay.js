async function pixabayAPI(query) {
  const URL = `http://localhost:3001/api/v1?q=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    showImages(data.hits);
  } catch (error) {
    console.error("Failed to fetch:", error);
  }
}

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
    console.error("Failed to fetch:", error);
  }
} 