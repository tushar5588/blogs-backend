const fs = require('fs');
const path = require('path');
const Blog = require('../models/Blog');
exports.addBlog = async (req, res) => {
  try {
    const image = req?.files?.image;
    const title = req?.body?.title;
    const description = req?.body?.description;
    await Blog.create({title, description, image: image?.name});
    const filePath = path.join(__dirname, 'images', `${image.name}`);
    await image.mv(filePath, err => {
      if (err) return res.status(500).send(err)
    })
    res.status(200).send({ status: 1, message: "Blog added successfully" })
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: 0, message: "Something went wrong" });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const data = await Blog.find();
    res.status(200).send({ status: 1, data, message: "Blog fetched successfully" })
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: 0, message: "Something went wrong" });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    await Blog.deleteMany({});
    res.status(200).send({ status: 1, message: "Blog deleted successfully" })
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: 0, message: "Something went wrong" });
  }
};