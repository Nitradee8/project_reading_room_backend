const { createProductSchema, updateProductSchema, deleteProductSchema } = require("../validators/product-validator");
const { upload } = require("../utils/couldinary-service");
const prisma = require("../models/prisma");

exports.createProduct = async (req, res, next) => {
  try {
    console.log(req.user)
    if (req.user?.role !== "ADMIN")
      res.status(200).json({ message: "unauthenticated" });
    if (req.file) {
      
      req.body.image = await upload(req.file.path);
    }

    const { value, error } = createProductSchema.validate(req.body);
    console.log(value)

    if (error) {
      error.statusCode = 400;
      return next(error);
    }

    const createProduct = await prisma.product.create({
      data:{
        categoryId:value.categoryId,
        bookname:value.bookname,
        price:value.price,
        description:value.description,
        authorId:value.authorId,
        image:req.body.image
      },
    })
    res.status(201).json({ createProduct});
  }
  catch (error) {
    next(error);
  }
  console.log(req.user);
}

// exports.updateProduct = async (req, res, next) => {
//   try {
//     const { value, error } = updateProductSchema.validate(req.body);

//     if (error) {
//       error.statusCode = 400;
//       return next(error);
//     }

//     const updateProduct = await prisma.product.update({
//       data: {
//         name: value.name,
//         amount: value.amount,
//         price: value.price,
//       },
//       where: {
//         id: value.productId,
//       },
//     });

//     res.status(201).json({ updateProduct });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.deleteProduct = async (req, res, next) => {
//   try {
//     const { value, error } = deleteProductSchema.validate(req.params);
//     console.log(value);

//     if (error) {
//       error.statusCode = 400;
//       return next(error);
//     }

//     const deleteProduct = await prisma.product.delete({
//       where: {
//         id: value.productId,
//       },
//     });

//     res.status(201).json({ deleteProduct });
//   } catch (error) {
//     next(error);
//   }
// };


exports.getAllProduct = async (req, res, next) => {
  try {
    const allProduct = await prisma.product.findMany()
    res.status(200).json({allProduct});
  } catch (error) {
    next(error);
  }
};