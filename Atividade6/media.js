let nome = prompt("Digite seu nome: ");
let nota1 = prompt("Digite sua nota 1: ");
let nota2 = prompt("Digite sua nota 2: ");
let nota3 = prompt("Digite sua nota 3: ");
let nota4 = prompt("Digite sua nota 4: ");

let media = (parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3) + parseFloat(nota4)) / 4;

alert("Nome: " + nome + "  |  " + "Media : " + media.toFixed(2));