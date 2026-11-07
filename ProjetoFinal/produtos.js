let db
let idEditando
let dml = ''
let dql = ''



function salvarBanco() {
    const dados = db.export()
    let texto = ''

    for (let i = 0; i < dados.length; i++) {
        texto += String.fromCharCode(dados[i])
    }

    localStorage.setItem('gms_banco', btoa(texto))
}

function carregarBanco(SQL) {
    const salvo = localStorage.getItem('gms_banco')

    if (salvo == null) {
        return null
    }

    const texto = atob(salvo)
    const dados = new Uint8Array(texto.length)

    for (let i = 0; i < texto.length; i++) {
        dados[i] = texto.charCodeAt(i)
    }

    return new SQL.Database(dados)
}

async function lerSql(caminho) {
    const resposta = await fetch(caminho)
    return await resposta.text()
}

function pegarComando(texto, nome) {
    const blocos = texto.split('-- ')

    for (let i = 0; i < blocos.length; i++) {
        const primeiraLinha = blocos[i].split('\n')[0].trim()

        if (primeiraLinha == nome) {
            return blocos[i].substring(blocos[i].indexOf('\n')).trim()
        }
    }
}

async function iniciarBanco() {
    const SQL = await initSqlJs({
        locateFile: arquivo => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${arquivo}`
    })

    db = carregarBanco(SQL)

    if (db == null) {
        db = new SQL.Database()
    }

    const ddl = await lerSql('./database/DDL.sql')
    dml = await lerSql('./database/DML.sql')
    dql = await lerSql('./database/DQL.sql')

    db.run(ddl)

    mostrarTabela()
}

iniciarBanco()

function abrirModal(id) {
    document.getElementById(id).classList.add('aberto')
}

function fecharModal(id) {
    document.getElementById(id).classList.remove('aberto')
}



function adicionarProduto() {
    const nome = document.getElementById('add-nome').value
    const tamanho = document.getElementById('add-tamanho').value
    const valor = document.getElementById('add-valor').value.replace('R$', '').replace(',', '.')
    const minimo = document.getElementById('add-minimo').value
    const local = document.getElementById('add-local').value
    const msgErro = document.getElementById('msg-erro')

    if (nome == '' || tamanho == '' || valor == '' || minimo == '' || local == '') {
        msgErro.classList.add('on')
        return
    }

    msgErro.classList.remove('on')

    const sql = pegarComando(dml, 'inserir_produto')
    db.run(sql, [nome, tamanho, Number(valor), Number(minimo), local])

    salvarBanco()
    mostrarTabela()

    document.getElementById('add-nome').value = ''
    document.getElementById('add-tamanho').value = ''
    document.getElementById('add-valor').value = ''
    document.getElementById('add-minimo').value = ''
    document.getElementById('add-local').value = ''
    fecharModal('modal-adicionar')
}



function mostrarTabela() {
    const sql = pegarComando(dql, 'listar_produtos')
    const resultado = db.exec(sql)
    let html = ''

    if (resultado.length > 0) {
        const linhas = resultado[0].values

        for (let i = 0; i < linhas.length; i++) {
            const l = linhas[i]
            html += `
            <tr>
            <td>${l[1]}</td>
            <td>${l[2]}</td>
            <td>${formataValor(l[3])}</td>
            <td>${l[4]}</td>
            <td>${l[5]}</td>
            <td><button class="btn-editar" onclick="editarProduto(${l[0]})">EDITAR</button></td>
            </tr>
            `
        }
    }

    document.getElementById('lista-produtos').innerHTML = html
}

function formataValor(valor) {
    return `R$ ${Number(valor).toFixed(2).replace('.', ',')}`
}



function buscarProduto(id) {
    const sql = pegarComando(dql, 'buscar_produto')
    const resultado = db.exec(sql, [id])

    if (resultado.length == 0) {
        return null
    }

    return resultado[0].values[0]
}

function editarProduto(id) {
    const p = buscarProduto(id)

    if (p == null) {
        return
    }

    document.getElementById('edit-nome').value = p[1]
    document.getElementById('edit-tamanho').value = p[2]
    document.getElementById('edit-valor').value = formataValor(p[3])
    document.getElementById('edit-minimo').value = p[4]
    document.getElementById('edit-local').value = p[5]

    idEditando = id
    abrirModal('modal-editar')
}

function salvarEdicao() {
    const nome = document.getElementById('edit-nome').value
    const tamanho = document.getElementById('edit-tamanho').value
    const valor = document.getElementById('edit-valor').value.replace('R$', '').replace(',', '.')
    const minimo = document.getElementById('edit-minimo').value
    const local = document.getElementById('edit-local').value
    const msgErro = document.getElementById('msg-erro-edit')

    if (nome == '' || tamanho == '' || valor == '' || minimo == '' || local == '') {
        msgErro.classList.add('on')
        return
    }

    msgErro.classList.remove('on')

    const sql = pegarComando(dml, 'atualizar_produto')
    db.run(sql, [nome, tamanho, Number(valor), Number(minimo), local, idEditando])

    salvarBanco()
    mostrarTabela()
    fecharModal('modal-editar')
}



function excluirProduto() {
    const p = buscarProduto(idEditando)

    if (p == null) {
        return
    }

    document.getElementById('texto-excluir').innerHTML =
        `<p>Tem Certeza que deseja excluir o produto ${p[1]} ${p[2]}?</p>`

    abrirModal('modal-excluir')
}

function salvarExclusao() {
    const sql = pegarComando(dml, 'excluir_produto')
    db.run(sql, [idEditando])

    salvarBanco()
    mostrarTabela()
    fecharModal('modal-excluir')
    fecharModal('modal-editar')
}
