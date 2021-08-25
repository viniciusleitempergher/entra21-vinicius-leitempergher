const express = require("express");
const app = express();
const cors = require('cors')

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors({
    origin: "http://localhost:5501"
}));

app.use("/auth", authRoutes);
app.use("/", userRoutes);

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Servidor iniciou!");
});