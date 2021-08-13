const getBooks = require("../getBooks");

async function buy(db, buyInfo) {
    try {

        let { id_cliente, livros, data } = buyInfo;

        let buysInserted = [];
        let creditsSum = 0;

        livros = await getBooks(db, livros);

        await db.query("BEGIN");

        for (let livro of livros) {
            const buyInserted = await db.query(`
            INSERT INTO compras(id_cliente, id_livro, data, valor)
                VALUES ($1, $2, $3, $4)
                RETURNING *;
        `, [id_cliente, livro.isbn, data, livro.preco]);

            creditsSum += +livro.preco;

            buysInserted.push(buyInserted.rows[0]);
        }

        creditsSum = Math.floor(creditsSum / 10);

        const response = await db.query("SELECT * FROM clientes WHERE uuid = $1", [id_cliente]);
        creditsSum += response.rows[0].pontos;

        await db.query(`UPDATE clientes SET pontos = $1 WHERE uuid = $2`, [creditsSum, id_cliente]);

        await db.query("COMMIT");

        return buysInserted;

    } catch (e) {
        console.log(e.message);
    }
}

module.exports = buy;