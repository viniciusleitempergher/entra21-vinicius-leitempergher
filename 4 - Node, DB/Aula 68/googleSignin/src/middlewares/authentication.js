const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports = (permissions) => {
    return (req, res, next) => {
        
        const authToken = req.headers.authorization || "";
        

        if (!authToken) {
            next(createHttpError(401, "Token is missing"));
        }

        try {
            const payload = jwt.verify(authToken, process.env.TOKEN_SECRET);
            console.log("\n\n\n" + payload + "\n\n\n");
            
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