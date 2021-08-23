const express = require("express");
const app = express();
const port = 80;

const usuariosRoutes = require("./routes/usuariosRoutes")
const usuariosControllers = require('./controllers/usuariosControllers');
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

app.use(express.json());
app.use(cors({
    origin: "http://127.0.0.1:5501"
}));
app.use(morgan("dev"));
app.use(helmet());

app.use("/usuarios", usuariosRoutes);

app.get("/", (req, res) => {
    res.send('hello, world!');
});

app.post("/", (req, res) => {
    res.send("post endpoint");
});

app.put("/", (req, res) => {
    res.send("put endpoint");
});

app.delete("/", (req, res) => {
    res.send("delete endpoint");
});

// MiddleWare de tratamento de erros        
app.use((error, req, res, next) => {
    res.status(error.status);
    res.json({ message: error.message });
})

app.listen(port, () => {
    console.log('Estou escutando :D');
});