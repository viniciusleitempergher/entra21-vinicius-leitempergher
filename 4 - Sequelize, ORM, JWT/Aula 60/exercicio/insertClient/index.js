async function insertClient(db, client) {
    const { nome, email, telefone, numero_documento, tipo_pessoa,
        rua, numero, cidade, estado, cep } = client;

    const clientInserted = await db.query(`
        INSERT INTO clientes(nome, email, telefone, numero_documento, tipo_pessoa, pontos)
            VALUES
                ($1, $2, $3, $4, $5, 0)
            RETURNING *;
    `, [nome, email, telefone, numero_documento, tipo_pessoa]);

    const addressInserted = await db.query(`
        INSERT INTO enderecos(rua, numero, cidade, estado, cep, id_cliente)
            VALUES
                ($1, $2, $3, $4, $5, $6)
            RETURNING *;
    `, [rua, numero, cidade, estado, cep, clientInserted.rows[0].uuid]);

    return [clientInserted.rows[0], addressInserted.rows[0]];
}

module.exports = insertClient;