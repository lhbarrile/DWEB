function funcao1() {
    let num1 = Number((prompt("Digite o primeiro numero: ")))
    let num2 = Number((prompt("Digite o segundo numero: ")))
    let num3 = Number((prompt("Digite o terceiro numero: ")))

    return alert(`Maior numero: ${Math.max(num1, num2, num3)}`)
}

function funcao2() {
    let a = Number(prompt("Digite o primeiro número:"))
    let b = Number(prompt("Digite o segundo número:"))
    let c = Number(prompt("Digite o terceiro número:"))
    let temp;

    if (a > b) { 
        temp = a
        a = b
        b = temp 
    }
    if (b > c) {
        temp = b 
        b = c 
        c = temp 
    }
    if (a > b) { 
        temp = a
        a = b
        b = temp 
    }

    alert(`Ordem crescente: ${a}, ${b}, ${c}`);    
}

function funcao3() {
    let string = prompt("Digite uma palavra qualquer")
    string = string.toLowerCase().replace(' ', '')
    
    if (string === string.split('').reverse().join('')) {
       alert('É palíndromo')
    } else {
        alert('Não é palíndromo')
    }
}


function funcao4() {
    let p1 = document.getElementById('palavra1').value
    let p2 = document.getElementById('palavra2').value
    if (!p1 || !p2) return alert('ERRO')

    if (p1.includes(p2)) {
        alert('É um subconjunto')
    } else {
        alert('Não é um subconjunto')
    }
}

function funcao5() {
    let data = prompt("Digite a data (aaaa-mm-dd):")
    let dias = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"]

    let criaData = new Date(data)

    alert(`Dia da semana: ${dias[criaData.getUTCDay()]}`)
}