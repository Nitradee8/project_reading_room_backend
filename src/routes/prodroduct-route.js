const express = require('express');
const { createProduct } = require('../controllers/product-controller');
const uploadMiddleware = require("../middlewares/upload");
const authenticate = require("../middlewares/authenMiddleware");

const router = express.Router();

router.post('/createproduct',createProduct);
// router.patch("/update", productController.updateProduct);
// router.delete("/delete/:productId", productController.deleteProduct);

module.exports = router;