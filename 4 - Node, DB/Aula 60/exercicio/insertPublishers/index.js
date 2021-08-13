async function insertPublishers(db, publishers) {
    let publishersInserted = []

    for (let publisher of publishers) {
        const publisherInserted = await db.query(`
            INSERT INTO editoras(nome_gerente, telefone)
                VALUES ($1, $2)
                RETURNING *
        `, [publisher.nome_gerente, publisher.telefone]);
        publishersInserted.push(publisherInserted.rows[0])
    }

    return publishersInserted
}

module.exports = insertPublishers;