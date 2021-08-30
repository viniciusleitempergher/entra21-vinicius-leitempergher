async function getBestClient(db) {
    let response = db.query(`
        SELECT * FROM clientes 
            ORDER BY pontos DESC
            LIMIT 1
    `);
    return response
}

module.exports = getBestClient;