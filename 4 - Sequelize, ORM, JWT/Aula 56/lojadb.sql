DROP TABLE IF EXISTS pedidos_produtos;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS pedidos;

CREATE TABLE IF NOT EXISTS produtos(
	id SERIAL PRIMARY KEY,
	nome text NOT NULL UNIQUE,
	preco numeric NOT NULL CHECK (preco > 0)
);

CREATE TABLE IF NOT EXISTS pedidos( 
	id SERIAL PRIMARY KEY,
	total_pedido numeric NOT NULL
);

CREATE TABLE IF NOT EXISTS pedidos_produtos (
	id_pedido integer,
	id_produto integer,
	quantidade integer NOT NULL,
	PRIMARY KEY (id_pedido, id_produto),
	FOREIGN KEY (id_pedido) REFERENCES pedidos (id),
	FOREIGN KEY (id_produto) REFERENCES produtos(id)
);

INSERT INTO produtos(nome, preco) VALUES('caneta', 2.5);
INSERT INTO produtos(nome, preco) VALUES('lápis', 10);

INSERT INTO pedidos(total_pedido) VALUES(12.5);
INSERT INTO pedidos(total_pedido) VALUES(10);

INSERT INTO pedidos_produtos VALUES(1, 1, 3);
INSERT INTO pedidos_produtos VALUES(2, 1, 7);

UPDATE produtos SET preco = 15 WHERE id = 1;

SELECT * FROM produtos;
SELECT * FROM pedidos;
SELECT * FROM pedidos_produtos;

SELECT p.id, p.total_pedido FROM pedidos p, pedidos_produtos pp WHERE p.id = pp.id_pedido AND pp.id_pedido = 1;