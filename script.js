// E:\donation_click\script.js

const gameArea = document.getElementById('gameArea');
const ball = document.getElementById('ball');
const messageText = document.getElementById('messageText');
const donationLinkContainer = document.getElementById('donationLinkContainer');
const donationCongratsText = document.getElementById('donationCongratsText'); // Para personalizar a msg de sucesso

// As arrays successMessages e failMessagesSarcastic agora são carregadas de phrases.js

let canShowDonationLink = false;

// Função para pegar uma mensagem aleatória
function getRandomMessage(messagesArray) {
    if (!messagesArray || messagesArray.length === 0) {
        return "Uma mensagem padrão aqui!"; // Fallback
    }
    return messagesArray[Math.floor(Math.random() * messagesArray.length)];
}

// Função para mover a bola para uma posição aleatória
function moveBallRandomly() {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();

    const maxX = gameAreaRect.width - ballRect.width;
    const maxY = gameAreaRect.height - ballRect.height;

    // Garante que a bola não comece muito colada na borda
    const padding = 10; 
    const randomX = Math.max(padding, Math.random() * (maxX - padding * 2));
    const randomY = Math.max(padding, Math.random() * (maxY - padding * 2));

    ball.style.left = randomX + 'px';
    ball.style.top = randomY + 'px';
}

// Evento de clique na bola
ball.addEventListener('click', function(event) {
    event.stopPropagation(); 

    const successMsg = getRandomMessage(successMessages);
    messageText.textContent = "VITÓRIA!"; // Mensagem principal mais curta
    donationCongratsText.textContent = successMsg; // Mensagem de sucesso mais elaborada no container de doação
    donationLinkContainer.style.display = 'block';
    canShowDonationLink = true;

    moveBallRandomly();
});

// Evento de clique na área do jogo (para detectar erros)
gameArea.addEventListener('click', function() {
    if (!canShowDonationLink) {
        messageText.textContent = getRandomMessage(failMessagesSarcastic);
    }
    
    donationLinkContainer.style.display = 'none';
    canShowDonationLink = false;

    moveBallRandomly();
});

// Inicializar
moveBallRandomly();
messageText.textContent = "Clique na bola vermelha para tentar me doar R$1!";