const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

require('dotenv').config();
module.exports = (permissions) => {
    return (req, res, next) => {
        const authToken = req.headers.authorization?.replace("Bearer ", "") || "";

        if (!authToken) {
            return next(createHttpError(401, "Token is missing"));
        }

        try {
            const payload = jwt.verify(authToken, process.env.TOKEN_SECRET);

            if (!permissions.includes(payload.role)) {
                next(createHttpError(403, "You don't have permission"));
            }

            res.locals.userId = payload.sub;

            next();
        } catch (error) {
            console.log(error);
            next(createHttpError(401, "Invalid Token"));
        }
    }
}