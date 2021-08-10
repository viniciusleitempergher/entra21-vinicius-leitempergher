CREATE TABLE IF NOT EXISTS vendas(
	id_nf INTEGER NOT NULL,
	id_item INTEGER NOT NULL,
	cod_prod INTEGER NOT NULL,
	valor_unit NUMERIC NOT NULL,
	quantidade INTEGER NOT NULL,
	desconto NUMERIC,
	PRIMARY KEY(id_nf, id_item)
);

INSERT INTO vendas VALUES
	(1, 1, 1, 25, 10, 5),
	(1, 2, 2, 13, 3, NULL),
	(1, 3, 3, 15, 2, NULL),
	(1, 4, 4, 10, 1, NULL),
	(1, 5, 5, 30, 1, NULL),
	(2, 1, 3, 15, 4, NULL),
	(2, 2, 4, 10, 5, NULL),
	(2, 3, 5, 30, 7, NULL),
	(3, 1, 1, 25, 5, NULL),
	(3, 2, 4, 10, 4, NULL),
	(3, 3, 5, 30, 5, NULL),
	(3, 4, 2, 13.50, 7, NULL),
	(4, 1, 5, 30, 10, 15),
	(4, 2, 4, 10, 12, 5),
	(4, 3, 1, 25, 13, 5),
	(4, 4, 2, 13, 15, 5),
	(5, 1, 3, 15, 3, NULL),
	(5, 2, 5, 30, 6, NULL),
	(6, 1, 1, 25, 22, 15),
	(6, 2, 3, 15, 25, 20),
	(7, 1, 1, 25, 10, 3),
	(7, 2, 2, 13.5, 10, 4),
	(7, 3, 3, 15, 10, 4),
	(7, 4, 5, 30, 10, 1);
	
-- 1- a)
SELECT id_nf, id_item, cod_prod, valor_unit 
	FROM vendas
	WHERE desconto IS NULL;
	
-- 1- b)
SELECT id_nf, id_item, cod_prod, valor_unit, round((valor_unit*(desconto / 100)), 2) valor_vendido
	FROM vendas 
	WHERE desconto IS NOT NULL;

-- 1- c)
UPDATE vendas SET desconto = 0 WHERE desconto IS NULL;

-- 1- d)
SELECT *, round((quantidade * valor_unit), 2) valor_total, 
	round((valor_unit-(valor_unit*(desconto/100))), 2) valor_vendido
	FROM vendas;

-- 1- e)
SELECT id_nf, sum(round((quantidade * valor_unit), 2)) valor_total
	FROM vendas
	GROUP BY id_nf
	ORDER BY valor_total DESC;
	
-- 1- f)
SELECT id_nf, sum(round((quantidade * valor_unit), 2)) valor_total,
	sum(round(valor_unit-(valor_unit*(desconto/100)))) valor_vendido
	FROM vendas
	GROUP BY id_nf
	ORDER BY valor_total DESC;

-- 1- g)
SELECT cod_prod, sum(quantidade) quantidade
	FROM vendas
	GROUP BY cod_prod
	ORDER BY quantidade DESC;

-- 1- h)
SELECT id_nf, cod_prod, sum(quantidade) quantidade
	FROM vendas
	WHERE quantidade > 10
	GROUP BY id_nf, cod_prod;
	
-- 1- i)
SELECT id_nf, sum(round((quantidade * valor_unit), 2)) valor_total
	FROM vendas
	GROUP BY id_nf
	HAVING sum(round((quantidade * valor_unit), 2)) > 500;
	
-- 1- j)
SELECT cod_prod, round(avg(desconto), 2) media
	FROM vendas
	GROUP BY cod_prod;

-- 1- k)
SELECT cod_prod, min(desconto) menor, max(desconto) maior,
	round(avg(desconto), 2) media
	FROM vendas
	GROUP BY cod_prod;

-- 1- l)
SELECT id_nf, sum(quantidade) qtd_itens
	FROM vendas
	GROUP BY id_nf
	HAVING sum(quantidade) > 3;
