const authServices = require("../services/authServices");

async function login(req, res, next) {
    try {
        const token = req.body.id_token;

        const createdTokens = await authServices.login(token);

        return res.json(createdTokens);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    login
};