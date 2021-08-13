async function getBooks(db, ids) {
    let booksSelected = [];
    for (let id of ids) {
        const response = await db.query(`
            SELECT * 
                FROM livros
                WHERE isbn = $1
        `, [id]);
        booksSelected.push(response.rows[0]);
    }

    return booksSelected;
}

module.exports = getBooks;