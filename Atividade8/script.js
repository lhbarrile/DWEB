
let pessoas = [];

function adicionarPessoa() {

    let idade = Number(document.getElementById("idade").value);
    let sexo = document.getElementById("sexo").value;
    let opiniao = Number(document.getElementById("opiniao").value);

    if (idade <= 0 || !sexo || !opiniao) {
        alert("Preencha todos os campos!");
        return;
    }

    pessoas.push({
        idade: idade,
        sexo: sexo,
        opiniao: opiniao
    });

    document.getElementById("idade").value = "";
    document.getElementById("sexo").value = "";
    document.getElementById("opiniao").value = "";

    document.getElementById("contador").innerHTML =
        `Pessoas cadastradas: ${pessoas.length} / 45`;

    if (pessoas.length === 45) {
        calcularResultados();
    }
}

function calcularResultados() {

    let soma = 0;
    let maior = 0;
    let menor = Infinity;

    let pessimo = 0;
    let otimo = 0;
    let bom = 0;

    let mulheres = 0;
    let homens = 0;
    let outros = 0;

    for (let i = 0; i < pessoas.length; i++) {

        soma += pessoas[i].idade;

        if (pessoas[i].idade > maior) {
            maior = pessoas[i].idade;
        }

        if (pessoas[i].idade < menor) {
            menor = pessoas[i].idade;
        }

        if (pessoas[i].opiniao === 1) {
            pessimo++;
        }

        if (pessoas[i].opiniao === 4) {
            otimo++;
        }

        if (pessoas[i].opiniao === 3) {
            bom++;
        }

        if (pessoas[i].sexo === "feminino") {
            mulheres++;
        } else if (pessoas[i].sexo === "masculino") {
            homens++;
        } else {
            outros++;
        }
    }

    let media = soma / 45;
    let porcentagem = ((otimo + bom) / 45) * 100;

    document.getElementById("resultado").innerHTML = `
        <h2>Resultados da pesquisa</h2>

        <p>Média das idades: ${media.toFixed(2)}</p>
        <p>Maior idade: ${maior}</p>
        <p>Menor idade: ${menor}</p>
        <p>Respostas péssimo: ${pessimo}</p>
        <p>Porcentagem de ótimo e bom: ${porcentagem.toFixed(2)}%</p>
        <p>Mulheres: ${mulheres}</p>
        <p>Homens: ${homens}</p>
        <p>Outros: ${outros}</p>
    `;

}
