const { createProductSchema, updateProductSchema, deleteProductSchema } = require("../validators/product-validator");
const { upload } = require("../utils/couldinary-service");
const prisma = require("../models/prisma");

exports.createProduct = async (req, res, next) => {
  const { value, error } = createProductSchema.validate(req.body);
  try {
    console.log("lijuhuihiuhiyhgyhy55",req.user)
    console.log(req.file.path)
    if (req.user?.role !== "ADMIN")
      res.status(200).json({ message: "unauthenticated" });

    // if (error) {
    //   error.statusCode = 400;
    //   return next(error);
    // }
    if (req.file) {
      console.log("55555555555555555555555555555555")

    req.body.image  = await upload(req.file.path);
    


   await prisma.product.create({
      data: {
        categoryId: value.categoryId,
        bookname: value.bookname,
        price: value.price,
        description: value.description,
        content: value.content,
        authorId: value.authorId,
        image: req.body.image
      },
    })
    res.status(201).json({ msg: "created" });
  }}
  catch (error) {
    console.log(error)
    next(error);
  }
  // console.log(req.user);
}



exports.updateProduct = async (req, res, next) => {
  try {
    const { value, error } = updateProductSchema.validate(req.body);

    if (error) {
      error.statusCode = 400;
      return next(error);
    }

    const updateProduct = await prisma.product.update({
      data: {

        bookname: value.bookname,
        price: value.price,
        description: value.description,

      },
      where: {
        id: +req.params.productId,
      },
    });

    res.status(201).json({ updateProduct });
  } catch (error) {
    next(error);
  }
};



exports.deleteProduct = async (req, res, next) => {
  try {
    const { value, error } = deleteProductSchema.validate(req.params);
    console.log(value);

    if (error) {
      error.statusCode = 400;
      return next(error);
    }

    const deleteProduct = await prisma.product.delete({
      where: {
        id: value.productId,
      },
    });

    res.status(201).json({ deleteProduct });
  } catch (error) {
    next(error);
  }
};


exports.getAllProduct = async (req, res, next) => {
  try {
    const allProduct = await prisma.product.findMany()
    res.status(200).json({ allProduct });
  } catch (error) {
    next(error);
  }
};

exports.getBookname = async (req, res, next) => {
  try {
    const { getProductById } = req.params
    const bookname = await prisma.product.findMany(
      {
        // where: {

        //   id: +getProductById
        // }
      }
    )
    res.status(200).json({ bookname });
  } catch (error) {
    next(error)
  }
};


exports.addToCart = async (req, res, next) => {

  try {
    const { bookId } = req.params;
    await prisma.basket.create({
      data: {
        userId: req.user.id,
        productId: +bookId,
        amount: 1
      }
    })
    res.status(201).json({mes: "DONE"})
  } catch (error) {
    next(error)
  }
};

exports.getAllBasket = async ( req, res, next) => {

  try {
    const getAllBaskets = await prisma.Basket.findMany({
      include: {
        user: true,
        product: {
          include:{
            author:true,
            category:true
          }
        }
      }
    })
    console.log('getAllBaskets', getAllBaskets)
    res.status(201).json({getAllBaskets})
  } catch (error) {
    next(error)
  }
}

exports.getAllBookPage = async ( req,res,next) => {
  try {
    console.log(req.params)
    const getBookPage = await prisma.product.findFirst({
      where:{
        id: +req.params.pageId
      },
      include:{
        category:true,
        author:true,
      }
    })
    res.status(201).json({getBookPage})
  } catch (error) {
    next(error)
  }
}