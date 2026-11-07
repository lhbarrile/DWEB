-- listar_produtos
SELECT id, nome, tamanho, valor, estoque_minimo, local
FROM produtos;

-- buscar_produto
SELECT id, nome, tamanho, valor, estoque_minimo, local
FROM produtos
WHERE id = ?;