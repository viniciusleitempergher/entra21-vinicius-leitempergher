const { OAuth2Client } = require('google-auth-library');
const createHttpError = require('http-errors');
const jwt = require("jsonwebtoken");
const ms = require("ms");

require("dotenv").config();
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

const { User, RefreshToken } = require('../db/models');

async function login(token) {
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
        
    }

    createTokens(user);

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

async function createTokens(user) {
    const { email } = user;

    const registeredUser = await User.findOne({ where: { email } });    

    if (!registeredUser) {
        throw new createHttpError(500, "Something went wrong...");
    }

    const token = jwt.sign({ 
        sub: registeredUser.id,
        role: registeredUser.role
    }, process.env.TOKEN_SECRET, {
        expiresIn: "20m"
    });

    const refreshTokenExpiration = Date.now() + ms("30 days");    

    const newRefreshToken = jwt.sign({
        sub: registeredUser.id,
        exp: refreshTokenExpiration,
    }, process.env.REFRESH_TOKEN_SECRET);

    const [refreshToken, created] = await RefreshToken.findOrCreate({
        where: { user_id: registeredUser.id },
        defaults: {
            token: newRefreshToken,
            expiresIn: refreshTokenExpiration
        }
    });

    if (!created) {
        refreshToken.token = newRefreshToken;
        refreshToken.save();
    }

    return { token, refreshToken: newRefreshToken };
}

module.exports = {
    login
};