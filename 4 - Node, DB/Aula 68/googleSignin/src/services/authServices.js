const { OAuth2Client } = require('google-auth-library');
const createHttpError = require('http-errors');
const jwt = require("jsonwebtoken");
const ms = require("ms");

require("dotenv").config();
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

const { User, RefreshToken } = require('../db/models');

async function login(googleToken) {
    const [GoogleUserId, GoogleUserInfo] = await verify(googleToken);

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

    const { token, refreshToken } = await createTokens(user);

    return { token, refreshToken };
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
        await refreshToken.save();
    }
    
    return { token, refreshToken: newRefreshToken };
}

async function refreshToken({ refreshToken }) {
    const validRefreshToken = await RefreshToken.findOne({
        where: {
            token: refreshToken
        },
        include: "user"
    });

    console.log(validRefreshToken);

    if (!validRefreshToken) {
        throw new createHttpError(401, "Invalid Refresh Token");
    }

    const token = jwt.sign({
        sub: validRefreshToken.user.id,
        role: validRefreshToken.user.role
    }, process.env.TOKEN_SECRET, {
        expiresIn: "20m"
    });

    const isRefreshTokenExpirated = Date.now() > validRefreshToken.expiresIn;

    if (isRefreshTokenExpirated) {
        const refreshTokenExpiration = Date.now() + ms("30 days");

        const newRefreshToken = jwt.sign({
            sub: validRefreshToken.user.id,
            exp: refreshTokenExpiration,
        }, process.env.REFRESH_TOKEN_SECRET);

        validRefreshToken.token = newRefreshToken;
        validRefreshToken.expiresIn = refreshTokenExpiration;
        await validRefreshToken.save();

        return { token, refreshToken: newRefreshToken }
    }

    return { token };
}

module.exports = {
    login,
    refreshToken
};