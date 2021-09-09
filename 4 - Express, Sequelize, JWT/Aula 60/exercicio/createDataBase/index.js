function createDataBase(db) {
    db.query(`
            CREATE TABLE IF NOT EXISTS clientes(
                uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                nome TEXT NOT NULL,
                email TEXT NOT NULL,
                telefone TEXT NOT NULL,
                numero_documento INTEGER NOT NULL,
                tipo_pessoa TEXT NOT NULL,
                pontos INTEGER DEFAULT NULL
            );
            CREATE TABLE IF NOT EXISTS enderecos(
                uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                rua TEXT NOT NULL,
                numero TEXT NOT NULL,
                cidade TEXT NOT NULL,
                estado TEXT NOT NULL,
                cep TEXT NOT NULL,
                id_cliente UUID NOT NULL,
                FOREIGN KEY (id_cliente)
                    REFERENCES clientes
            );
            CREATE TABLE IF NOT EXISTS editoras(
                uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                nome_gerente TEXT NOT NULL,
                telefone TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS livros(
                isbn TEXT PRIMARY KEY,
                nome_autor TEXT NOT NULL,
                assunto TEXT NOT NULL,
                quantidade_estoque INTEGER NOT NULL,
                preco NUMERIC NOT NULL,
                id_editora UUID NOT NULL,
                FOREIGN KEY (id_editora)
                    REFERENCES editoras
            );
            CREATE TABLE IF NOT EXISTS compras(
                uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                id_cliente UUID NOT NULL,
                    FOREIGN KEY (id_cliente)
                        REFERENCES clientes,
                id_livro TEXT NOT NULL,
                    FOREIGN KEY (id_livro)
                        REFERENCES livros,
                data DATE NOT NULL,
                valor NUMERIC NOT NULL
            ); 
        `)
}

module.exports = createDataBase;