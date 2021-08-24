const express = require("express");
const app = express();
const cors = require('cors')

app.use(express.json());

const authRoutes = require("./routes/authRoutes");

app.use(cors({
    origin: "http://localhost:5501"
}));

app.use("/auth", authRoutes);

app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor iniciou!");
});