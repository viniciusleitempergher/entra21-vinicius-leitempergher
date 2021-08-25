const authServices = require("../services/authServices");

async function login(req, res, next) {
    try {
        const token = req.body.id_token;

        const userid = await authServices.login(token);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    login
};