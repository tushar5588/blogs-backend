const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
});
const Blog = new mongoose.model("Blog", blogSchema);
module.exports=Blog;