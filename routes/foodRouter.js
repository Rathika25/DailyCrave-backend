const express = require('express')
const foodRouter = express.Router()
const { addFood, listFood, removeFood } = require('../controllers/foodController')
const multer = require('multer')
const foodModel = require('../models/foodModel')  // ✅ Required for special items

// image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`)
  }
})

const uploads = multer({ storage })

foodRouter.post('/add', uploads.single("image"), addFood)
foodRouter.get('/list', listFood)
foodRouter.delete('/remove', removeFood)

// ✅ Specials route
foodRouter.get('/specials', async (req, res) => {
  try {
    const specials = await foodModel.find({ special: true });
    res.json({ success: true, data: specials });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching specials", error });
  }
});

module.exports = foodRouter
