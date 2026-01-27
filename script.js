// Elementi DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const categorySelect = document.getElementById('category');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const questionCounter = document.getElementById('question-counter');
const scoreElement = document.getElementById('score');
const progressBar = document.getElementById('progress');

// Stato del gioco
let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let selectedQuestions = [];
const QUESTIONS_PER_GAME = 10;
const POINTS_PER_CORRECT = 10;

// Funzione per mescolare un array (Fisher-Yates shuffle)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Funzione per filtrare le domande per categoria
function getQuestionsByCategory(category) {
    if (category === 'all') {
        return shuffleArray(questions).slice(0, QUESTIONS_PER_GAME);
    }
    const filtered = questions.filter(q => q.category === category);
    return shuffleArray(filtered).slice(0, QUESTIONS_PER_GAME);
}

// Funzione per mostrare una schermata
function showScreen(screen) {
    startScreen.classList.add('hidden');
    quizScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    screen.classList.remove('hidden');
}

// Funzione per iniziare il quiz
function startQuiz() {
    const category = categorySelect.value;
    selectedQuestions = getQuestionsByCategory(category);
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    wrongAnswers = 0;

    showScreen(quizScreen);
    showQuestion();
}

// Funzione per mostrare una domanda
function showQuestion() {
    const question = selectedQuestions[currentQuestionIndex];
    const letters = ['A', 'B', 'C', 'D'];

    // Aggiorna il contatore e il punteggio
    questionCounter.textContent = `Domanda ${currentQuestionIndex + 1}/${selectedQuestions.length}`;
    scoreElement.textContent = `Punteggio: ${score}`;

    // Aggiorna la barra di progresso
    const progress = ((currentQuestionIndex) / selectedQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;

    // Mostra la domanda
    questionElement.textContent = question.question;

    // Crea i bottoni delle risposte
    answersElement.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.classList.add('answer-btn');
        button.innerHTML = `<span class="answer-letter">${letters[index]}</span>${answer}`;
        button.addEventListener('click', () => selectAnswer(index));
        answersElement.appendChild(button);
    });

    // Nascondi il pulsante "Prossima Domanda"
    nextBtn.classList.add('hidden');
}

// Funzione per gestire la selezione di una risposta
function selectAnswer(selectedIndex) {
    const question = selectedQuestions[currentQuestionIndex];
    const buttons = answersElement.querySelectorAll('.answer-btn');

    // Disabilita tutti i bottoni
    buttons.forEach(btn => {
        btn.classList.add('disabled');
        btn.style.pointerEvents = 'none';
    });

    // Mostra la risposta corretta e quella sbagliata
    if (selectedIndex === question.correct) {
        buttons[selectedIndex].classList.add('correct');
        score += POINTS_PER_CORRECT;
        correctAnswers++;
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[question.correct].classList.add('correct');
        wrongAnswers++;
    }

    // Aggiorna il punteggio
    scoreElement.textContent = `Punteggio: ${score}`;

    // Mostra il pulsante per continuare
    if (currentQuestionIndex < selectedQuestions.length - 1) {
        nextBtn.textContent = 'Prossima Domanda';
    } else {
        nextBtn.textContent = 'Vedi Risultati';
    }
    nextBtn.classList.remove('hidden');
}

// Funzione per passare alla prossima domanda
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Funzione per mostrare i risultati
function showResults() {
    showScreen(resultScreen);

    const percentage = (correctAnswers / selectedQuestions.length) * 100;

    // Aggiorna le statistiche
    document.getElementById('correct-answers').textContent = correctAnswers;
    document.getElementById('wrong-answers').textContent = wrongAnswers;
    document.getElementById('final-score').textContent = score;

    // Determina emoji e messaggio in base al risultato
    const resultEmoji = document.getElementById('result-emoji');
    const resultText = document.getElementById('result-text');

    if (percentage >= 90) {
        resultEmoji.textContent = '🏆';
        resultText.textContent = 'Eccezionale! Sei un vero esperto!';
    } else if (percentage >= 70) {
        resultEmoji.textContent = '🌟';
        resultText.textContent = 'Ottimo lavoro! Grande conoscenza!';
    } else if (percentage >= 50) {
        resultEmoji.textContent = '👍';
        resultText.textContent = 'Buon risultato! Continua cosi!';
    } else if (percentage >= 30) {
        resultEmoji.textContent = '📚';
        resultText.textContent = 'Puoi fare di meglio! Studia un po!';
    } else {
        resultEmoji.textContent = '💪';
        resultText.textContent = 'Non mollare! Riprova ancora!';
    }

    // Aggiorna la barra di progresso al 100%
    progressBar.style.width = '100%';
}

// Funzione per ricominciare il quiz
function restartQuiz() {
    showScreen(startScreen);
}

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Permetti di iniziare anche premendo Enter
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (!startScreen.classList.contains('hidden')) {
            startQuiz();
        } else if (!nextBtn.classList.contains('hidden')) {
            nextQuestion();
        }
    }
});
