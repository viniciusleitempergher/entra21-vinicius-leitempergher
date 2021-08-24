require("dotenv").config;
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = process.env.PORT || 3000;

const { User, RefreshToken } = require("../db/models");

app.use(express.json());

function authMiddleware(req, res, next) {
    const authToken = req.headers.authorization?.replace("Bearer ", "");

    if (!authToken) {
        res.status(401).json({ message: "Token is missing" });
    }

    try {
        const payload = jwt.verify(authToken, process.env.TOKEN_SECRET);

        res.locals.userId = payload.sub;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Invalid Token!" });
    }
};

app.get("/", (req, res) => {
    res.send("Olá mundo!");
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            res.status(400).json({ message: "E-mail or Password Incorrect! " });
        }

        if (!user.verifyPassword(password)) {
            res.status(400).json({ message: "E-mail or Password Incorrect! " });
        }

        // Emitindo o access-token
        const token = jwt.sign({ sub: user.id }, process.env.TOKEN_SECRET, {
            expiresIn: "20s"
        });

        const expiresIn = Date.now() + 1000 * 60;

        // Emitindo o refresh-token
        const refreshToken = jwt.sign({ sub: user.id }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn
        });

        const [dbRefreshToken, created] = await RefreshToken.findOrCreate({
            where: {
                user_id: user.id
            },
            defaults: {
                token: refreshToken,
                expiresIn
            }
        });

        if (!created) {
            dbRefreshToken.token = refreshToken;
            dbRefreshToken.expiresIn = expiresIn;

            await dbRefreshToken.save();
        }

        res.json({ token, refreshToken });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Oops! Something bag happened!" });
    }
});

app.post("/refresh", async (req, res) => {
    try {
        const token = req.body.refreshToken || "";
        const refreshToken = await RefreshToken.findOne({
            where: {
                token
            },
            include: "user"
        });
        // Validar o refreshToken
        if (!refreshToken) {
            res.status(401).json({ message: "Refresh Token invalid!" });
        }

        // Emitir um novo access-token
        const accessToken = jwt.sign({ sub: refreshToken.user.id }, process.env.TOKEN_SECRET, {
            expiresIn: "20s"
        });
        const expiresIn = Date.now() + 1000 * 60;
        // Emitir um novo refresh-token
        const newRefreshToken = jwt.sign({ sub: refreshToken.user.id }, process.env.TOKEN_SECRET, {
            expiresIn
        });
        refreshToken.token = newRefreshToken;
        refreshToken.expiresIn = expiresIn;
        refreshToken.save();
        res.send({ accessToken, newRefreshToken });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Oops! Something bag happened!" });
    }
});

app.get("/users", authMiddleware, async (req, res) => {
    try {
        console.log(res.locals.userId);

        const users = await User.findAll();

        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Oops! Something bad happened!" });
    }
});

app.post("/users", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const [user, created] = await User.findOrCreate({
            where: {
                email
            },
            defaults: {
                name,
                password
            }
        })

        if (!created) {
            res.status(409).json({ message: "E-mail already exists! " });
        }

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Failed!" });
    }
});

app.listen(PORT, () => console.log("Servidor rodando na porta: " + PORT));