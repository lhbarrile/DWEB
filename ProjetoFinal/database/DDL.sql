CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    tamanho TEXT NOT NULL,
    valor REAL NOT NULL,
    estoque_minimo INTEGER NOT NULL,
    local TEXT NOT NULL
);
