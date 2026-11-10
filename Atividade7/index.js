document.getElementById("pedra").addEventListener("click", () => {
  escolhaJogador = 1;
  verificar();
});
document.getElementById("papel").addEventListener("click", () => {
  escolhaJogador = 2;
  verificar();
});
document.getElementById("tesoura").addEventListener("click", () => {
  escolhaJogador = 3;
  verificar();  
});
// let escolhaJogador = Number(prompt("Qual sua escolha (1 - Pedra | 2 - Papel | 3 - Tesoura): "));

function verificar() {
  let adversario = Math.round(Math.random() * 2) + 1;
  if (escolhaJogador === adversario) {
    alert("Empate");
  } else {
    if (escolhaJogador === 1) {
      if (adversario === 2) {
        alert("Papel cobre Pedra | Você Perdeu!!!");
      } else if (adversario === 3) {
        alert("Pedra quebra tesoura | Você Venceu !!!");
      }
    } else if (escolhaJogador === 2) {
      if (adversario === 1) {
        alert("Papel cobre Pedra | Você Venceu !!!");
      } else if (adversario === 3) {
        alert("Tesoura corta Papel | Você Perdeu!!!");
      }
    } else if (escolhaJogador === 3) {
      if (adversario === 2) {
        alert("Tesoura corta Papel | Você Venceu !!!");
      } else if (adversario === 1) {
        alert("Pedra quebra Tesoura | Você Perdeu!!!");
      }
    }
  }
}
