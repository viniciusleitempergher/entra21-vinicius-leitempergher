require("dotenv").config;
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = process.env.PORT || 3000;

const { User } = require("./models");

app.use(express.json());

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

        res.json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Oops! Something bag happened!" });
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