const { User } = require('../db/models');

async function getUserInfo(userId) {
    const user = await User.findOne({
        where: { id: userId }
    });

    return {
        name: user.name,
        email: user.email,
        picture: user.profile_url,
    }
}

module.exports = {
    getUserInfo
}