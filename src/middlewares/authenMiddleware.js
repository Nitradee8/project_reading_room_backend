const createError = require("../utils/create-error");
const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma");

module.exports = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        console.log(req.headers)
        if (!authorization || !authorization.startsWith("Bearer ")) {
            return next(createError("unAuthenticate", 401));
        }
        const token = authorization.split(" ")[1];
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY || "nkwefnlkn23rlf32"
        );
        const user = await prisma.user.findUnique({
            where: {
                id: payload.userId,
            },
        });
        if (!user) {
            return next(createError("unAuthenticate", 401));
        }
        delete user.password;
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};
