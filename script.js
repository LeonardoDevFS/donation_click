// E:\donation_click\script.js

const gameArea = document.getElementById('gameArea');
const ball = document.getElementById('ball');
const messageText = document.getElementById('messageText');
const donationLinkContainer = document.getElementById('donationLinkContainer');
const donationCongratsText = document.getElementById('donationCongratsText');
const comboCounterText = document.getElementById('comboCounter'); // Corrigido para 'comboCounter'

// --- Variáveis para as Novas Mecânicas ---
let currentCombo = 0;
const STREAK_THRESHOLD_FOR_SPECIAL_MESSAGE = 3;
const INITIAL_BALL_SIZE = 50; // px, deve bater com o CSS inicial (width/height de #ball)
let currentBallSize = INITIAL_BALL_SIZE;
const BALL_GROWTH_FACTOR = 1.05; // Bola cresce 5% do tamanho ATUAL
let ballIsDominating = false;

// As arrays successMessages e failMessagesSarcastic são carregadas de phrases.js
// Certifique-se que phrases.js é incluído ANTES de script.js no seu HTML.

let canShowDonationLink = false;

// Função para pegar uma mensagem aleatória
function getRandomMessage(messagesArray) {
    if (!messagesArray || messagesArray.length === 0) {
        return "Uma mensagem padrão aqui!";
    }
    return messagesArray[Math.floor(Math.random() * messagesArray.length)];
}

// Função para mover a bola para uma posição aleatória
function moveBallRandomly() {
    if (ballIsDominating) return;

    const gameAreaRect = gameArea.getBoundingClientRect();
    const ballWidth = currentBallSize; // Usar o tamanho gerenciado pelo JS
    const ballHeight = currentBallSize;

    const maxX = gameAreaRect.width - ballWidth;
    const maxY = gameAreaRect.height - ballHeight;

    const padding = 10;
    let randomX = Math.random() * maxX; // Simplificado, maxX já considera padding implicitamente
    let randomY = Math.random() * maxY;

    // Ajuste para garantir que a bola não fique muito colada nas bordas ou fora se for grande
    // Se maxX/maxY for negativo (bola maior que área), o cálculo abaixo ajuda a centralizar.
    randomX = Math.max(padding, Math.min(randomX, maxX - padding));
    randomY = Math.max(padding, Math.min(randomY, maxY - padding));

    // Se a bola for maior que a área disponível (maxX ou maxY < padding), centralize.
    if (maxX < padding * 2) {
        randomX = gameAreaRect.width / 2 - ballWidth / 2;
    }
    if (maxY < padding * 2) {
        randomY = gameAreaRect.height / 2 - ballHeight / 2;
    }

    ball.style.left = Math.max(0, randomX) + 'px';
    ball.style.top = Math.max(0, randomY) + 'px';
}

// Função para atualizar o display do combo
function updateComboDisplay() {
    if (comboCounterText) { // Verifica se o elemento existe
        comboCounterText.textContent = `Combo: ${currentCombo}x`;
    }
}

// Função para resetar o tamanho da bola
function resetBallSize() {
    currentBallSize = INITIAL_BALL_SIZE;
    ball.style.width = currentBallSize + 'px';
    ball.style.height = currentBallSize + 'px';
    ball.classList.remove('dominating');
}

// Função auxiliar para atualizar e animar o messageText
function updateMessageText(newText) {
    messageText.classList.remove('new-message-animate');
    void messageText.offsetWidth; // Trigger reflow
    messageText.textContent = newText;
    messageText.classList.add('new-message-animate');
}

// Evento de clique na bola
ball.addEventListener('click', function(event) {
    event.stopPropagation();

    if (ballIsDominating) {
        ballIsDominating = false;
        resetBallSize();
        currentCombo = 0;
        updateComboDisplay();
        canShowDonationLink = false;
        donationLinkContainer.style.display = 'none';
        updateMessageText("Ufa! A bola voltou ao tamanho de gente. Tente de novo!");
        moveBallRandomly();
        // Remove efeito de clique para não tocar duas vezes a animação da bola
        ball.classList.remove('ball-clicked-effect'); // Garante que não fique preso
        return;
    }

    // Lógica de Sucesso Normal
    currentCombo++;
    updateComboDisplay();

    let successMsg = getRandomMessage(successMessages);
    if (currentCombo >= STREAK_THRESHOLD_FOR_SPECIAL_MESSAGE) {
        successMsg = `UAU! COMBO ${currentCombo}x! ${successMsg}`; // Adiciona info do combo à mensagem
    }

    updateMessageText("VITÓRIA!");
    donationCongratsText.textContent = successMsg;
    donationLinkContainer.style.display = 'block';
    canShowDonationLink = true;

    resetBallSize(); // Reseta o tamanho da bola ao acertar

    ball.classList.add('ball-clicked-effect');
    setTimeout(() => {
        ball.classList.remove('ball-clicked-effect');
    }, 400); // Deve corresponder à duração da animação 'ballClickPulse' em CSS

    moveBallRandomly();
});

// Evento de clique na área do jogo (para detectar erros)
gameArea.addEventListener('click', function() {
    if (ballIsDominating) return;

    // Lógica de Falha
    let failMsgPrefix = "";
    if (currentCombo > 0) {
        failMsgPrefix = `Combo ${currentCombo}x quebrado! `;
    }
    currentCombo = 0;
    updateComboDisplay();

    if (!canShowDonationLink) { // Só mostra mensagem de falha se não estiver mostrando o link de doação
        updateMessageText(failMsgPrefix + getRandomMessage(failMessagesSarcastic));
    }


    donationLinkContainer.style.display = 'none';
    canShowDonationLink = false;

    // Lógica de crescimento da bola
    currentBallSize *= BALL_GROWTH_FACTOR;
    // Limitar o tamanho máximo para evitar problemas de performance/renderização extremos
    // Este limite é antes de entrar no modo "dominating"
    const maxPracticalSize = Math.max(gameArea.offsetWidth, gameArea.offsetHeight) * 1.5;
    currentBallSize = Math.min(currentBallSize, maxPracticalSize);

    ball.style.width = currentBallSize + 'px';
    ball.style.height = currentBallSize + 'px';

    const gameAreaRect = gameArea.getBoundingClientRect();
    // Verifica se a bola ocupou a área do jogo (pode ser um pouco antes de cobrir 100% para o efeito)
    if (currentBallSize >= gameAreaRect.width * 0.9 && currentBallSize >= gameAreaRect.height * 0.9) {
        ballIsDominating = true;
        ball.classList.add('dominating');
        // Força a bola a preencher a gameArea
        ball.style.width = gameAreaRect.width + 'px';
        ball.style.height = gameAreaRect.height + 'px';
        ball.style.left = '0px';
        ball.style.top = '0px';
        updateMessageText("A BOLA ENGOLIU A ÁREA DE JOGO! Clique nela para ela sossegar.");
        // Não chama moveBallRandomly aqui, espera o clique na bola gigante
    } else {
        moveBallRandomly();
    }
});

// Inicializar Jogo
function initializeGame() {
    resetBallSize();
    currentCombo = 0;
    updateComboDisplay();
    ballIsDominating = false;
    canShowDonationLink = false;
    donationLinkContainer.style.display = 'none';

    // Garante que o tamanho inicial da bola no JS e CSS estejam sincronizados
    ball.style.width = INITIAL_BALL_SIZE + 'px';
    ball.style.height = INITIAL_BALL_SIZE + 'px';
    currentBallSize = INITIAL_BALL_SIZE; // Redefine currentBallSize

    moveBallRandomly();
    updateMessageText("Clique na bola vermelha para tentar me doar R$1!");
}

initializeGame();