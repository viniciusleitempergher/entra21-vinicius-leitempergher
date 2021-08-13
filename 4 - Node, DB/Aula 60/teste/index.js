//const format = require("pg-format")

const db = require("./db");

(async () => {
    // try {
    //     await pool.query(`
    //         CREATE TABLE IF NOT EXISTS funcionarios (
    //             id SERIAL PRIMARY KEY,
    //             nome TEXT NOT NULL,
    //             email TEXT NOT NULL UNIQUE,
    //             telefone TEXT NOT NULL UNIQUE
    //         );
    //         CREATE TABLE IF NOT EXISTS enderecos (
    //             id SERIAL PRIMARY KEY,
    //             rua TEXT NOT NULL,
    //             numero INTEGER NOT NULL,
    //             cidade TEXT NOT NULL,
    //             estado TEXT NOT NULL,
    //             id_funcionario INTEGER NOT NULL REFERENCES funcionarios
    //         );
    //     `);
    //     console.log("Tabelas criadas.");
    // } catch (e) {
    //     console.log(e.message);
    // } finally {
    //     pool.end();
    // }
    // try {
    //     const nome = "pedro", email = "email@email.com", telefone = "(47) 9 9999-9999"

    //     await pool.query(`
    //             INSERT INTO funcionarios (nome, email, telefone)
    //                 VALUES ($1, $2, $3)
    //         `, [nome, email, telefone]);
    // } catch (e) {
    //     console.log(e.message);
    // } finally {
    //     pool.end();
    // }

    // try {
    //     const funcionarios = [
    //         ["joão", "joão@email.com", "(47) 9 8888-8888"],
    //         ["maria", "maria@email.com", "(47) 9 7777-7777"]
    //     ];

    //     const query = format("INSERT INTO funcionarios (nome, email, telefone) VALUES %L RETURNING *", funcionarios);

    //     const res = await db.query(query);

    //     console.log(res.rows);
    // } catch (error) {
    //     console.log(error.message);
    // } finally {
    //     db.end();
    // }

    try {
        const response = await db.query("select * from funcionarios;")
        console.log(response.rows);
    } catch (error) {
        console.log(error.message);
    } finally {
        db.end();
    }
})();