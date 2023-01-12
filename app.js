const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const cors = require("cors");
const { addBlog, getBlog, deleteAll } = require("./controllers/Blog");
const fileUpload = require("express-fileupload");
const { dirname } = require("path");

// MiddleWares
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());
app.use(fileUpload());

dotenv.config({
  path: "./opt/.env",
});
const port = process.env.PORT || 3004;

//DB-Connection
mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => {
    console.log(e);
  });

//ExpressServer
app.listen(port, () => {
  console.log(`Server is running at: ${port}`);
});

// Deployment

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  app.get("/", (req, res) => {
    res.send("Api is running...");
  });
}

//Routes

app.post("/addBlog", addBlog);
app.get("/getBlog", getBlog);
app.post("/deleteAll", deleteAll);
app.use('/uploads', express.static(__dirname+"/controllers/images"));