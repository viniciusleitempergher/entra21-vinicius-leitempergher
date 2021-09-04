const userServices = require("../services/userServices");

async function showUserInfo(req, res, next) {
    try {
        const userInfo = await userServices.getUserInfo(res.locals.userId);

        return res.json(userInfo);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    showUserInfo
};