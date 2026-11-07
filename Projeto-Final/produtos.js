let produtos = []
let idEditando


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

    let novoId = 1
    for(let i = 0; i < produtos.length; i++) {
        if(produtos[i].id >= novoId) {
            novoId = produtos[i].id + 1
        }
    }

    produtos.push({
        id: novoId,
        nome: nome,
        tamanho: tamanho,
        valor: Number(valor),
        minimo: minimo,
        local: local
    })

    mostrarTabela();

    document.getElementById('add-nome').value = ''
    document.getElementById('add-tamanho').value = ''
    document.getElementById('add-valor').value = ''
    document.getElementById('add-minimo').value = ''
    document.getElementById('add-local').value = ''
    fecharModal('modal-adicionar')
}

function mostrarTabela() {
    let html = ''
    
    for (let i = 0; i < produtos.length; i++) {
        let p = produtos[i]
        html += 
        `
        <tr>
        <td>${p.nome}</td>
        <td>${p.tamanho}</td>
        <td>${formataValor(p.valor)}</td>
        <td>${p.minimo}</td>
        <td>${p.local}</td>
        <td><button class="btn-editar" onclick="editarProduto(${p.id})">EDITAR</button></td>
        </tr>
        `
    }

    document.getElementById('lista-produtos').innerHTML = html
}

function formataValor(valor) {
    return `R$ ${Number(valor).toFixed(2).replace('.', ',')}`
}

function editarProduto(id) {
    for (let i = 0; i < produtos.length; i++) {
        if(produtos[i].id == id) {
            const p = produtos[i]

            document.getElementById('edit-nome').value = p.nome
            document.getElementById('edit-tamanho').value = p.tamanho
            document.getElementById('edit-valor').value = formataValor(p.valor)
            document.getElementById('edit-minimo').value = p.minimo
            document.getElementById('edit-local').value = p.local

            idEditando = id
            abrirModal('modal-editar')
        }
    }
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

    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].id == idEditando) {
            produtos[i].nome = nome
            produtos[i].tamanho = tamanho
            produtos[i].valor = Number(valor)
            produtos[i].minimo = Number(minimo)
            produtos[i].local = local
        }
    }

    mostrarTabela()
    fecharModal('modal-editar')
}


function excluirProduto() {
    for(let i = 0 ; i < produtos.length; i++) {
        
        if (produtos[i].id == idEditando) {
            const p = produtos[i]
            let html = 
            `
            <p>Tem Certeza que deseja excluir o produto ${p.nome} ${p.tamanho}?</p>
            `
            
            document.getElementById('texto-excluir').innerHTML = html
            
            abrirModal('modal-excluir')
        }
    }
}

function salvarExclusao() {
    produtos = produtos.filter(prod => prod.id != idEditando)
    
    
    mostrarTabela()
    fecharModal('modal-excluir')
    fecharModal('modal-editar')
}