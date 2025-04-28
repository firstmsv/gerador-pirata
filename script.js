const elements = {
    shipName: document.getElementById("shipName"),
    generateBtn: document.getElementById("generateBtn"),
    downloadBtn: document.getElementById("downloadBtn"),
    shareBtn: document.getElementById("shareBtn"),
    language: document.getElementById("language"),
    infoContainer: document.getElementById("infoContainer"),
    quizBtn: document.getElementById('quizMainBtn'),
    quizLink: document.querySelector('.quiz-link'),
    quizContainer: document.getElementById('quizContainer'),
    quizNameResult: document.getElementById('quizNameResult'),
    useQuizName: document.getElementById('useQuizName')
};

// Funções do gerador de nome
function generatePirateName() {
    const names = [
        "Barba Negra", "Capitão Tempestade", "Olho de Águia", "Jack Marujo", "Anzol Sangrento"
    ];
    const randomName = names[Math.floor(Math.random() * names.length)];
    elements.shipName.value = randomName;
    elements.infoContainer.innerHTML = `<p>Seu nome pirata é: <strong>${randomName}</strong></p>`;
}

function downloadName() {
    const name = elements.shipName.value;
    if (!name) {
        alert('Gere um nome primeiro!');
        return;
    }

    const blob = new Blob([name], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = "nome_pirata.txt";
    a.click();

    URL.revokeObjectURL(url);
}

function shareName() {
    const name = elements.shipName.value;
    if (!name) {
        alert('Gere um nome primeiro!');
        return;
    }

    if (navigator.share) {
        navigator.share({
            title: 'Meu Nome Pirata',
            text: `Olha meu nome pirata: ${name}`,
            url: window.location.href
        }).catch((error) => console.error('Erro ao compartilhar', error));
    } else {
        alert('Compartilhamento não suportado neste dispositivo.');
    }
}

// Eventos
elements.generateBtn.addEventListener('click', generatePirateName);
elements.downloadBtn.addEventListener('click', downloadName);
elements.shareBtn.addEventListener('click', shareName);

const quizQuestions = [
    "Qual seu animal favorito?",
    "Qual sua cor favorita?",
    "Você prefere terra ou mar?"
];

const pirateNames = [
    "Capitão Furacão", "Dama do Mar", "Corsário Sombrio", "Lobo dos Mares", "Víbora do Oceano"
];

// Lógica do Quiz
function startQuiz() {
    const randomName = pirateNames[Math.floor(Math.random() * pirateNames.length)];
    elements.quizNameResult.textContent = randomName;
    elements.quizLink.style.display = 'block';
}

function useQuizResult() {
    const name = elements.quizNameResult.textContent;
    elements.shipName.value = name;
    elements.infoContainer.innerHTML = `<p>Seu nome pirata é: <strong>${name}</strong></p>`;
}

// Eventos do Quiz
elements.quizBtn.addEventListener('click', startQuiz);
elements.useQuizName.addEventListener('click', useQuizResult);
