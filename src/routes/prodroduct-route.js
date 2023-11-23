const express = require('express');
const productController = require('../controllers/product-controller');
const uploadMiddleware = require("../middlewares/upload");
const authenticate = require("../middlewares/authenMiddleware");

const router = express.Router();

router.post('/createproduct',authenticate,uploadMiddleware.single("image"),productController.createProduct);
router.get('/allproduct',productController.getAllProduct)
router.delete("/delete/:productId", productController.deleteProduct);
router.patch("/update/:productId", productController.updateProduct);
router.get('/:getProductById',productController.getBookname)

module.exports = router;