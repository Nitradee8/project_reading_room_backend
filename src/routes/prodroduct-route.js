const express = require('express');
const productController = require('../controllers/product-controller');
const uploadMiddleware = require("../middlewares/upload");
const authenticate = require("../middlewares/authenMiddleware");

const router = express.Router();

router.post('/createproduct',authenticate,uploadMiddleware.single("image"),productController.createProduct);
router.get('/allproduct',productController.getAllProduct)
router.delete("/delete/:productId", productController.deleteProduct);
router.patch("/update/:productId", productController.updateProduct);
router.get('/getallbasket',authenticate,productController.getAllBasket);
router.get('/getBookpage/:pageId',authenticate,productController.getAllBookPage);
router.get('/:getProductById',productController.getBookname);
router.post('/postaddbook/:bookId',authenticate,productController.addToCart);

module.exports = router;