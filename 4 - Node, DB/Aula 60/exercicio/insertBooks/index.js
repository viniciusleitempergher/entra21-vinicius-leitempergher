async function insertBooks(db, books) {
    let booksInserted = []

    for (let book of books) {
        const { isbn, nome_autor, assunto, preco, quantidade_estoque,
            id_editora } = book;

        const bookInserted = await db.query(`
            INSERT INTO livros(isbn, nome_autor, assunto, preco, quantidade_estoque, id_editora)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *
        `, [isbn, nome_autor, assunto, preco, quantidade_estoque, id_editora]);

        booksInserted.push(bookInserted.rows[0])
    }

    return booksInserted
}

module.exports = insertBooks;