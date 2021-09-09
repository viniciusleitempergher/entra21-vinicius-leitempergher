CREATE TABLE IF NOT EXISTS departamento(
	id SERIAL PRIMARY KEY,
	nome TEXT NOT NULL,
	localizacao TEXT NOT NULL,
	id_gerente INTEGER
);

CREATE TABLE IF NOT EXISTS funcionarios(
	id SERIAL PRIMARY KEY,
	nome TEXT NOT NULL,
	sobrenome TEXT NOT NULL,
	data_nascimento DATE NOT NULL,
	cpf TEXT NOT NULL,
	rg INTEGER NOT NULL,
	logradouro TEXT NOT NULL,
	cep INTEGER NOT NULL,
	cidade TEXT NOT NULL,
	telefone TEXT NOT NULL,
	funcao TEXT NOT NULL,
	salario NUMERIC NOT NULL,
	id_departamento INTEGER NOT NULL,
	FOREIGN KEY (id_departamento) REFERENCES departamento
);

ALTER TABLE departamento ADD
	FOREIGN KEY (id_gerente) REFERENCES funcionarios;

INSERT INTO departamento(nome, localizacao, id_gerente) VALUES
	('vendas', 'blumenau', null),
	('produção', 'timbó', null),
	('distribuição', 'blumenau', null),
	('logística', 'são josé', null),
	('vendas', 'navegantes', null);
	
INSERT INTO funcionarios (nome, sobrenome, data_nascimento, cpf, rg, logradouro, cep, cidade, telefone, funcao, salario, id_departamento)
	VALUES
	('Vinícius', 'Naiofhf', '2004-07-01', '11099002777', 12341234, 'Rua da esquina', 89120000, 'Timbó', '(47) 98415-8284', 'Web Dev', '100000000', 1),
	('Jhon', 'IDK', '2003-07-05', '11099002776', 43214321, 'Rua beco', 89120001, 'Blumenau', '(47) 98415-8284', 'Pedreiro', '500', 2),
	('Lemon', 'Seila', '2002-07-06', '11099003775', 43211234, 'Rua basihcg', 89120002, 'Navegantes', '(47) 98415-8284', 'Engenheiro', '50', 3),
	('Silva', 'Boa Pergunta', '2004-07-07', '11099002774', 1234321, 'Rua whfqiug', 89120003, 'Araponga', '(47) 98415-8284', 'Web Dev', '60', 4),
	('Gilbert', 'Não Sei', '2003-07-08', '11099002773', 3214531, 'Rua suapowih', 89120004, 'Timbó', '(47) 98415-8284', 'Menor Aprendiz', '500', 5);

SELECT * FROM departamento;
SELECT * FROM funcionarios;

-- 2- a)
SELECT * 
	FROM funcionarios
	WHERE salario > 1000
	ORDER BY CONCAT(nome, sobrenome);
	
-- 2- b)
SELECT nome, sobrenome, data_nascimento
	FROM funcionarios
	ORDER BY data_nascimento DESC;

-- 2- c)
SELECT SUM(salario) total_gasto
	FROM funcionarios;

-- 2- d)
SELECT f.nome, d.nome departamento, f.funcao 
	FROM departamento d INNER JOIN funcionarios f
	ON d.id = f.id_departamento;

-- 2- e)
SELECT d.nome, f.nome gerente 
	FROM departamento d INNER JOIN funcionarios f
	ON d.id_gerente = f.id;

-- 2- f)
SELECT d.nome, sum(f.salario)
	FROM departamento d INNER JOIN funcionarios f
	ON d.id = f.id_departamento
	GROUP BY d.nome;
	
-- 2- g)
SELECT count(id) FROM funcionarios;

-- 2- h)
SELECT round(avg(salario),2) media_salario
	FROM funcionarios; 
	
-- 2- i)
SELECT d.nome, round(avg(f.salario), 2)
	FROM departamento d INNER JOIN funcionarios f
	ON d.id = f.id_departamento
	GROUP BY d.nome;

-- 2- j)
SELECT d.nome, max(f.salario)
	FROM departamento d INNER JOIN funcionarios f
	ON d.id = f.id_departamento
	GROUP BY d.nome;
