const foodModel = require('../models/foodModel');
const fsPromises = require('fs').promises;
const path = require('path');

const addFood = async (req, res) => {
  const image_filename = `${req.file.filename}`;

  try {
    await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
      special: req.body.special === 'true'  // ✅ Handle special flag
    });

    res.status(201).json({ message: "Food added successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding food" });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ data: foods });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error listing food" });
  }
};

const removeFood = async (req, res) => {
  try {
    const { id } = req.query;
    const food = await foodModel.findById(id);

    if (!food)
      return res.status(404).json({ message: "Food not found" });

    const imagePath = path.join(__dirname, '..', 'uploads', food.image);

    try {
      await fsPromises.access(imagePath);
      await fsPromises.unlink(imagePath);
    } catch (err) {
      console.warn("Image not found, skipping delete:", imagePath);
    }

    await foodModel.deleteOne({ _id: id });
    res.status(200).json({ message: "Food deleted successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in deleting" });
  }
};

module.exports = { addFood, listFood, removeFood };
