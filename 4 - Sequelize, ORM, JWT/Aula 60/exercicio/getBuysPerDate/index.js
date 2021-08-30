async function getBuysPerDate(db, date) {
    let response = await db.query(`
        SELECT * FROM compras WHERE data = $1
    `, [date]);
    return response.rows
}

module.exports = getBuysPerDate;