async function getBuysPerClient(db, id) {
    let response = await db.query(`
        SELECT * 
            FROM compras 
            WHERE id_cliente = $1
    `, [id])

    return response.rows;
}

module.exports = getBuysPerClient;