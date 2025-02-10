const express = require("express")
const path = require("path")
const dotenv = require("dotenv")
const router = require("./routes/api")

dotenv.config()

const app = express()
const port = process.env.PORT;

//Need to fix צריך להיות סטטי?? -
app.use(express.static(path.join(__dirname, "../client")))
app.use("/api/v1", router);

//req.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"))
});

app.listen(port, () => {
  console.log(`server running on port ${port}`)
});
