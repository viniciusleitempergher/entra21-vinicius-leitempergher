const authServices = require("../services/authServices");

async function showUserInfo(req, res, next) {
    try {

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    showUserInfo
};