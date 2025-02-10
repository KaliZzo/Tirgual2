const express = require("express");
const router = express.Router();

const API_Key = process.env.PixaBay_API_NEW;
const cache = {};


router.get("/", async (req, res) => {
  const query = req.query.q;
  const URL = `https://pixabay.com/api/?key=${API_Key}&q=${encodeURIComponent(query)}`;

  if (cache[query]) {
    console.log("cache:", query);
    return res.json(cache[query]);
  }

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("failed to fetcה");
    }
    const data = await response.json();
    cache[query] = data;
    console.log("cache saved:", query);
    res.json(data);
  } catch (err) {
    console.error("Error fetch", err);
    res.status(500).json({ error: "failed to fetc" });
  }
});


router.get("/randomPhotos", async (req, res) => {
  const URL = `https://pixabay.com/api/?key=${API_Key}&order=latest`;
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetch:", err);
    res.status(500).json({ error: "Failed to fetch" });
  }
});

module.exports = router;
