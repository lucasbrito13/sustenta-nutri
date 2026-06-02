// Banco de dados com as 10 perguntas do Quiz técnico
const bancoPerguntas = [
    {
        pergunta: "Beber água durante as refeições faz mal?",
        respostaCorreta: false,
        explicacao: "O ideal é apenas evitar excessos (mais de 200ml) para não diluir excessivamente o suco gástrico, mas não faz mal."
    },
    {
        pergunta: "O ovo aumenta drasticamente o colesterol ruim de todas as pessoas?",
        respostaCorreta: false,
        explicacao: "Para a maioria da população, o colesterol dos alimentos tem pouco impacto no colesterol sanguíneo. O ovo é um excelente alimento."
    },
    {
        pergunta: "Alimentos integrais possuem praticamente as mesmas calorias que os brancos/refinados?",
        respostaCorreta: true,
        explicacao: "Verdadeiro! A vantagem do integral não é ter menos caloria, mas sim ter mais fibras, vitaminas e dar mais saciedade."
    },
    {
        pergunta: "Suco de caixinha natural/integral é tão saudável quanto comer a fruta fresca?",
        respostaCorreta: false,
        explicacao: "Falso. O suco perde grande parte das fibras da fruta, fazendo com que o açúcar (frutose) seja absorvido muito mais rápido."
    },
    {
        pergunta: "O óleo de coco é a gordura mais saudável que existe para cozinhar?",
        respostaCorreta: false,
        explicacao: "Falso. O óleo de coco é rico em gorduras saturadas. O azeite de oliva extra virgem ainda é superior para a saúde cardiovascular."
    },
    {
        pergunta: "Chás detox são capazes de emagrecer e desintoxicar o corpo sozinhos?",
        respostaCorreta: false,
        explicacao: "Falso. Quem desintoxica o corpo diariamente são o fígado e os rins. Chás ajudam apenas na retenção de líquidos (efeito diurético)."
    },
    {
        pergunta: "Comer carboidrato após as 18h engorda mais do que comer de manhã?",
        respostaCorreta: false,
        explicacao: "Falso. O ganho de peso está relacionado ao total de calorias consumidas no dia inteiro, e não ao horário específico."
    },
    {
        pergunta: "A beterraba é a maior e melhor fonte de ferro existente na alimentação?",
        respostaCorreta: false,
        explicacao: "Falso. Carnes vermelhas e miúdos têm ferro de melhor absorção. Vegetais escuros como espinafre e couve têm mais ferro que a beterraba."
    },
    {
        pergunta: "Sal rosa do Himalaia é infinitamente mais nutritivo que o sal comum?",
        respostaCorreta: false,
        explicacao: "Falso. A quantidade de minerais extras no sal rosa é ínfima e irrelevante para a saúde. Sal deve ser consumido com moderação, independente da cor."
    },
    {
        pergunta: "A vitamina C previne que você pegue um resfriado comum?",
        respostaCorreta: false,
        explicacao: "Falso. Ela fortalece o sistema imunológico e pode reduzir a duração ou a gravidade do resfriado, mas não impede que você o contraia."
    }
];

let perguntaAtualIndex = 0;

// Função para renderizar a pergunta na tela
function renderizarPergunta() {
    // Garante que só roda se os elementos existirem na página (evita erros na página 2)
    const txtPergunta = document.getElementById('pergunta');
    const txtContador = document.getElementById('quiz-contador');
    const txtResultado = document.getElementById('resultado-quiz');
    const btnProximo = document.getElementById('btn-proximo-quiz');
    const botoesResposta = document.getElementById('quiz-botoes-resposta');

    if (txtPergunta && txtContador) {
        // Limpa estados anteriores
        txtResultado.innerText = "";
        btnProximo.style.display = "none";
        botoesResposta.style.display = "flex"; // Mostra os botões Verdadeiro/Falso de novo

        // Atualiza textos
        txtContador.innerText = `Pergunta ${perguntaAtualIndex + 1} de ${bancoPerguntas.length}`;
        txtPergunta.innerText = bancoPerguntas[perguntaAtualIndex].pergunta;
    }
}

// Lógica de resposta do usuário
function responderQuiz(respostaUsuario) {
    const perguntaAtual = bancoPerguntas[perguntaAtualIndex];
    const txtResultado = document.getElementById('resultado-quiz');
    const btnProximo = document.getElementById('btn-proximo-quiz');
    const botoesResposta = document.getElementById('quiz-botoes-resposta');

    // Esconde os botões de resposta para o usuário não clicar duas vezes
    botoesResposta.style.display = "none";

    // Valida se acertou
    if (respostaUsuario === perguntaAtual.respostaCorreta) {
        txtResultado.innerText = `✅ Correto! ${perguntaAtual.explicacao}`;
        txtResultado.style.color = "#2ec4b6";
    } else {
        txtResultado.innerText = `❌ Incorreto. ${perguntaAtual.explicacao}`;
        txtResultado.style.color = "#e71d36";
    }

    // Exibe o botão de próxima pergunta ou reiniciar
    if (perguntaAtualIndex === bancoPerguntas.length - 1) {
        btnProximo.innerText = "Fazer novo quiz (Voltar ao início)";
    } else {
        btnProximo.innerText = "Próxima Pergunta ➔";
    }
    btnProximo.style.display = "block";
}

// Avança o índice e renderiza a próxima
function proximaPergunta() {
    perguntaAtualIndex++;
    
    // Se passar da décima pergunta, volta para a primeira (índice 0)
    if (perguntaAtualIndex >= bancoPerguntas.length) {
        perguntaAtualIndex = 0;
    }
    
    renderizarPergunta();
}

// Código para inicializar a primeira pergunta assim que a página abrir
document.addEventListener("DOMContentLoaded", function() {
    renderizarPergunta();
});


/* =========================================================================
   FUNÇÕES DAS RECEITAS
   ========================================================================= */

function irParaReceita(id) {
    window.location.href = `receitas.html?id=${id}`;
}

function carregarDetalhesReceita() {

    const titulo = document.getElementById('receita-titulo');

    // Se não existir, significa que não estamos na página da receita
    if (!titulo) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (id && receitasDB[id]) {

        const receita = receitasDB[id];

        // Título
        titulo.innerText = receita.titulo;

        // Imagem
        const imagem = document.getElementById('receita-imagem');

        imagem.src = receita.imagem;
        imagem.alt = receita.titulo;

        // Preparo
        document.getElementById('receita-preparo').innerText =
            receita.preparo;

        // Ingredientes
        const listaIngredientes =
            document.getElementById('receita-ingredientes');

        listaIngredientes.innerHTML = "";

        receita.ingredientes.forEach(ingrediente => {

            const li = document.createElement('li');

            li.innerText = ingrediente;

            listaIngredientes.appendChild(li);

        });

        // Rendimento
        document.getElementById('receita-rendimento').innerText =
            receita.rendimento;

        // Nutricional
        const tabelaNutricional =
            document.getElementById('receita-nutricional');

        tabelaNutricional.innerHTML = "";

        Object.entries(receita.nutricional).forEach(([chave, valor]) => {

            const nomeFormatado = chave
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, letra => letra.toUpperCase());

            const li = document.createElement('li');

            li.innerHTML =
                `<strong>${nomeFormatado}:</strong> ${valor}`;

            tabelaNutricional.appendChild(li);

        });

    } else {

        titulo.innerText = "Receita não encontrada";

    }
}

// Inicializa automaticamente
document.addEventListener("DOMContentLoaded", () => {

    renderizarPergunta();

    carregarDetalhesReceita();

});