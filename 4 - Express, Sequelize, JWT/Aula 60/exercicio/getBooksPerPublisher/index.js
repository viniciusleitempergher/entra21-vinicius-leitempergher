async function getBooksPerPublisher(db, id) {
    const response = await db.query(`SELECT * FROM livros WHERE id_editora = $1`, [id]);
    return response.rows;
}

module.exports = getBooksPerPublisher;