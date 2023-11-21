const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerSchema } = require('../validators/auth-validator');
const prisma = require('../models/prisma');
const createError = require('../utils/create-error');



exports.register = async (req, res, next) => {
    try {
        const { value, error } = registerSchema.validate(req.body);
        if (error) {
          return next(error);
        }
    
        value.password = await bcrypt.hash(value.password, 12);
        console.log(value);
        const user = await prisma.user.create({
          data: value
        });
    
        const payload = { userId: user.id };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY || 'bkjdzgdkgukgfekjgfkg', {
          expiresIn: process.env.JWT_EXPIRE
        });
    
        delete user.password;
    
        res.status(201).json({ accessToken, user });
      } catch (err) {
        next(err);
      }
};

exports.login = async (req, res, next) => {
    try {
      // const { value, error } = loginSchema.validate(req.body);
      // if (error) {
      //   return next(error);
      // }
      // console.log(value);

      const { email, password } = req.body

      const user = await prisma.user.findFirst({
        where: { email: email }
      });

      if (!user) {
        return next(createError('invalid credential', 400));
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return next(createError('invalid credential', 400));
      }
  
      const payload = { userId: user.id };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY || '1q2w3e4r5t6y7u8i9o0p', {
        expiresIn: process.env.JWT_EXPIRE
      });
      delete user.password
      res.status(200).json({ accessToken, user });
    } catch (err) {
      console.log(err)
      next(err);
    }
  };
  
  exports.getMe = (req, res) => {
    res.status(200).json({ user: req.user });
  };
