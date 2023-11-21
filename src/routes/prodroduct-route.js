const express = require('express');
const { getProduct } = require('../controllers/product-Controller');
// const authController = require('../controllers/auth-controller');

const router = express.Router();

router.post('/getproduct',getProduct);

module.exports = router;