-- inserir_produto
INSERT INTO produtos (nome, tamanho, valor, estoque_minimo, local)
VALUES (?, ?, ?, ?, ?);

-- atualizar_produto
UPDATE produtos
SET nome = ?, tamanho = ?, valor = ?, estoque_minimo = ?, local = ?
WHERE id = ?;

-- excluir_produto
DELETE FROM produtos
WHERE id = ?;