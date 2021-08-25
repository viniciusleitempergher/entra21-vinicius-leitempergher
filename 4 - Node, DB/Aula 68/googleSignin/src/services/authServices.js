const { OAuth2Client } = require('google-auth-library');
const createHttpError = require('http-errors');

require("dotenv").config();
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

const { User } = require('../db/models');

async function loginOrCreate(token) {
    const [GoogleUserId, GoogleUserInfo] = await verify(token);

    if (!GoogleUserId) {
        throw new createHttpError(401, "Something went wrong...");
    }

    const newUser = {
        google_id: GoogleUserId,
        name: GoogleUserInfo.name,
        email: GoogleUserInfo.email,
        profile_url: GoogleUserInfo.picture
    };

    const [user, userCreated] = await User.findOrCreate({
        where: { email: newUser.email },
        defaults: newUser
    });

    if (!userCreated) {
        throw new createHttpError(409, "E-mail already registered");
    }

    return user;
}

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    return [userid, payload];
}

module.exports = {
    loginOrCreate
};