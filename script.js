// E:\donation_click\script.js

// --- Elementos do DOM ---
const gameArea = document.getElementById('gameArea');
const ball = document.getElementById('ball');
const messageText = document.getElementById('messageText');
const donationLinkContainer = document.getElementById('donationLinkContainer');
const donationCongratsText = document.getElementById('donationCongratsText');
const comboCounterText = document.getElementById('comboCounter');
const fakeDonateButton = document.getElementById('fakeDonateButton');

// --- Variáveis de Jogo e Mecânicas ---
let currentCombo = 0;
const STREAK_THRESHOLD_FOR_SPECIAL_MESSAGE = 3; // Combo mínimo para menção "Combo Xx!"
const HIGH_COMBO_FOR_CONFETTI = 5; // Combo para disparar confetes (pode ser ajustado)
const EPIC_COMBO_MILESTONE = 50; // Múltiplos deste valor usam specialComboMessages

const INITIAL_BALL_SIZE = 50;
let currentBallSize = INITIAL_BALL_SIZE;
const BALL_GROWTH_FACTOR = 1.05;
let ballIsDominating = false;
let canShowDonationLink = false;

let totalClicks = 0;
const TOTAL_CLICKS_FOR_FAKE_BUTTON = 30;

let isBolaMalucaMode = false;
let bolaMalucaInterval = null;
let bolaMalucaTimer = null;
const BOLA_MALUCA_CHANCE = 0.03;

// As arrays successMessages, failMessagesSarcastic (de phrases.js)
// almostMissEffects (de onomatopoeia.js)
// e specialComboMessages (de comboPhrases.js) são carregadas globalmente.

// --- Funções Auxiliares ---
function getRandomMessage(messagesArray) {
    if (!messagesArray || messagesArray.length === 0) {
        return "Mensagem padrão!";
    }
    return messagesArray[Math.floor(Math.random() * messagesArray.length)];
}

function moveBallRandomly() {
    if (ballIsDominating || isBolaMalucaMode) return;
    const gameAreaRect = gameArea.getBoundingClientRect();
    const ballWidth = currentBallSize;
    const ballHeight = currentBallSize;
    const maxX = gameAreaRect.width - ballWidth;
    const maxY = gameAreaRect.height - ballHeight;
    const padding = 10;
    let randomX = Math.random() * maxX;
    let randomY = Math.random() * maxY;
    randomX = Math.max(padding, Math.min(randomX, maxX - padding));
    randomY = Math.max(padding, Math.min(randomY, maxY - padding));
    if (maxX < padding * 2) randomX = gameAreaRect.width / 2 - ballWidth / 2;
    if (maxY < padding * 2) randomY = gameAreaRect.height / 2 - ballHeight / 2;
    ball.style.left = Math.max(0, randomX) + 'px';
    ball.style.top = Math.max(0, randomY) + 'px';
}

function updateComboDisplay() {
    if (comboCounterText) {
        comboCounterText.textContent = `Combo: ${currentCombo}x`;
    }
}

function resetBallSize() {
    currentBallSize = INITIAL_BALL_SIZE;
    ball.style.width = currentBallSize + 'px';
    ball.style.height = currentBallSize + 'px';
    ball.classList.remove('dominating');
    ball.style.background = '';
}

function updateMessageText(newText) {
    messageText.classList.remove('new-message-animate');
    void messageText.offsetWidth;
    messageText.textContent = newText;
    messageText.classList.add('new-message-animate');
}

function incrementTotalClicks() {
    if (isBolaMalucaMode) return;
    totalClicks++;
    if (totalClicks === TOTAL_CLICKS_FOR_FAKE_BUTTON && fakeDonateButton && fakeDonateButton.style.display === 'none') {
        updateMessageText("Eita! Uma oportunidade ÚNICA surgiu!");
        fakeDonateButton.style.display = 'inline-block';
    }
}

// --- Funções para Efeitos Cômicos ---
function playComicBallAnimation() {
    const comicAnimations = ['ball-wobble', 'ball-squash-stretch'];
    const randomAnimation = comicAnimations[Math.floor(Math.random() * comicAnimations.length)];
    comicAnimations.forEach(animClass => ball.classList.remove(animClass));
    ball.classList.add(randomAnimation);
    setTimeout(() => {
        ball.classList.remove(randomAnimation);
    }, 600);
}

function showAlmostMissEffect(event) {
    const ballRect = ball.getBoundingClientRect();
    const clickX = event.offsetX;
    const clickY = event.offsetY;
    const ballCenterX = ball.offsetLeft + ball.offsetWidth / 2;
    const ballCenterY = ball.offsetTop + ball.offsetHeight / 2;
    const distanceToCenter = Math.sqrt(Math.pow(clickX - ballCenterX, 2) + Math.pow(clickY - ballCenterY, 2));
    const missThreshold = ball.offsetWidth / 2 + 35;

    if (distanceToCenter < missThreshold && distanceToCenter > ball.offsetWidth / 2) {
        if (typeof almostMissEffects !== 'undefined' && almostMissEffects.length > 0) {
            const effectData = almostMissEffects[Math.floor(Math.random() * almostMissEffects.length)];
            const effectElement = document.createElement('div');
            effectElement.classList.add('almost-miss-effect', effectData.class);
            effectElement.textContent = effectData.text;
            effectElement.style.left = (clickX - 15) + 'px';
            effectElement.style.top = (clickY - 15) + 'px';
            gameArea.appendChild(effectElement);
            setTimeout(() => {
                if (effectElement.parentNode) effectElement.remove();
            }, 700);
        }
    }
}

function createConfetti(originElement) {
    const confettiCount = 30;
    const colors = ['#FF00FF', '#00FFFF', '#FFD700', '#50fa7b', '#FF3D71'];
    const originRect = originElement.getBoundingClientRect();
    const gameContainerRect = gameContainer.getBoundingClientRect();
    for (let i = 0; i < confettiCount; i++) {
        const piece = document.createElement('div');
        piece.classList.add('confetti-piece');
        const startX = (originRect.left - gameContainerRect.left) + (originRect.width / 2);
        const startY = (originRect.top - gameContainerRect.top) + (originRect.height / 2);
        piece.style.left = startX + 'px';
        piece.style.top = startY + 'px';
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        const randomXEnd = (Math.random() - 0.5) * 200;
        const randomRotateEnd = (Math.random() - 0.5) * 720;
        const randomDelay = Math.random() * 0.5;
        piece.style.setProperty('--random-x-end', randomXEnd + 'px');
        piece.style.setProperty('--random-rotate-end', randomRotateEnd + 'deg');
        piece.style.animationDelay = randomDelay + 's';
        gameContainer.appendChild(piece);
        setTimeout(() => {
            if (piece.parentNode) piece.remove();
        }, 2000 + (randomDelay * 1000));
    }
}

function startBolaMalucaMode() {
    if (isBolaMalucaMode || ballIsDominating) return;
    isBolaMalucaMode = true;
    updateMessageText("BOLA MALUCA ATIVADA! Segura essa!");
    ball.classList.add('bola-maluca-active');
    const gameAreaRect = gameArea.getBoundingClientRect();
    let speed = 5;
    let directionX = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * speed + speed / 2);
    let directionY = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * speed + speed / 2);
    let preMalucaSize = currentBallSize;
    bolaMalucaInterval = setInterval(() => {
        if (!isBolaMalucaMode) {
            clearInterval(bolaMalucaInterval); return;
        }
        let currentX = ball.offsetLeft; let currentY = ball.offsetTop;
        let ballWidth = ball.offsetWidth; let ballHeight = ball.offsetHeight;
        currentX += directionX; currentY += directionY;
        if (currentX <= 0 || currentX + ballWidth >= gameAreaRect.width) {
            directionX *= -1; currentX = Math.max(0, Math.min(currentX, gameAreaRect.width - ballWidth));
        }
        if (currentY <= 0 || currentY + ballHeight >= gameAreaRect.height) {
            directionY *= -1; currentY = Math.max(0, Math.min(currentY, gameAreaRect.height - ballHeight));
        }
        ball.style.left = currentX + 'px'; ball.style.top = currentY + 'px';
        const r = Math.floor(Math.random() * 155) + 100; const g = Math.floor(Math.random() * 155) + 100; const b = Math.floor(Math.random() * 155) + 100;
        ball.style.background = `radial-gradient(circle, rgb(${r},${g},${b}), rgb(${r - 50 < 0 ? 0 : r - 50},${g - 50 < 0 ? 0 : g - 50},${b - 50 < 0 ? 0 : b - 50}))`;
        const newMalucaSize = INITIAL_BALL_SIZE * (0.7 + Math.random() * 0.6);
        ball.style.width = newMalucaSize + 'px'; ball.style.height = newMalucaSize + 'px';
    }, 25);
    bolaMalucaTimer = setTimeout(() => endBolaMalucaMode(preMalucaSize), 8000);
}

function endBolaMalucaMode(restoreSize = INITIAL_BALL_SIZE) {
    isBolaMalucaMode = false;
    clearInterval(bolaMalucaInterval); clearTimeout(bolaMalucaTimer);
    ball.classList.remove('bola-maluca-active');
    currentBallSize = restoreSize; // Restaura o tamanho que estava antes ou o inicial
    resetBallSize(); // Aplica o currentBallSize e limpa background
    if (!ballIsDominating) {
        updateMessageText("A bola sossegou... por ora.");
    }
    moveBallRandomly();
}

// --- Event Listeners ---
if (fakeDonateButton) {
    fakeDonateButton.addEventListener('click', function(e) {
        e.preventDefault();
        updateMessageText("HAHA! Que generosidade! Mas o de R$1 já me faz um programador feliz. 😉");
        fakeDonateButton.style.display = 'none';
        totalClicks = -999999;
    });
}

ball.addEventListener('click', function(event) {
    event.stopPropagation();
    incrementTotalClicks(); // Mover para cá para contar o clique na bola

    if (ballIsDominating) {
        ballIsDominating = false;
        resetBallSize();
        currentCombo = 0; updateComboDisplay();
        canShowDonationLink = false; donationLinkContainer.style.display = 'none';
        updateMessageText("Ufa! A bola voltou ao tamanho de gente. Tente de novo!");
        ball.classList.remove('ball-clicked-effect');
        moveBallRandomly();
        return;
    }

    if (isBolaMalucaMode) {
        updateMessageText("PEGOU A BOLA MALUCA! +5 Combo!");
        currentCombo += 5;
        endBolaMalucaMode(currentBallSize); // Passa o tamanho atual para restaurar corretamente
        updateComboDisplay();
        ball.classList.add('ball-clicked-effect');
        setTimeout(() => ball.classList.remove('ball-clicked-effect'), 400);
        // Opcional: Mostrar link de doação aqui também
        // donationCongratsText.textContent = "VOCÊ É DEMAIS! Dominou a loucura!";
        // donationLinkContainer.style.display = 'block';
        // canShowDonationLink = true;
        return;
    }

    // Lógica de Sucesso Normal
    currentCombo++;
    updateComboDisplay();

    // ***** INÍCIO DA LÓGICA DE MENSAGEM DE COMBO ATUALIZADA *****
    let baseSuccessMsg = getRandomMessage(successMessages);
    let finalCongratsText = "";

    if (currentCombo > 0 && currentCombo % EPIC_COMBO_MILESTONE === 0) {
        // Combo Épico - Múltiplo de EPIC_COMBO_MILESTONE!
        if (typeof specialComboMessages !== 'undefined' && specialComboMessages.length > 0) {
            const epicComboMsg = getRandomMessage(specialComboMessages);
            finalCongratsText = `${epicComboMsg} (Você atingiu ${currentCombo} combos!)`;
            updateMessageText("✨ COMBO ÉPICO!!! ✨"); // Mensagem principal mais chamativa
        } else {
            finalCongratsText = `INCRÍVEL! Combo de ${currentCombo}x! ${baseSuccessMsg}`;
            updateMessageText("VITÓRIA!");
        }
        createConfetti(ball); // Confetes para combos épicos!

    } else if (currentCombo >= STREAK_THRESHOLD_FOR_SPECIAL_MESSAGE) {
        // Combo regular (não múltiplo de EPIC_COMBO_MILESTONE, mas acima do threshold)
        finalCongratsText = `Combo ${currentCombo}x! ${baseSuccessMsg}`;
        updateMessageText("VITÓRIA!");
        if (currentCombo > 0 && currentCombo % HIGH_COMBO_FOR_CONFETTI === 0) { // Garante que HIGH_COMBO_FOR_CONFETTI não seja 0
             createConfetti(ball);
        }
    } else {
        // Sem streak significativo
        finalCongratsText = baseSuccessMsg;
        updateMessageText("VITÓRIA!");
    }

    // Lógica da "Inflação do Real"
    let inflationText = "";
    if (currentCombo > 5) {
        const virtualCentavos = currentCombo % 10;
        inflationText = ` Seu R$1 agora vale R$1,0${virtualCentavos} (virtualmente)!`;
    } else if (currentBallSize > INITIAL_BALL_SIZE * 1.3 && currentCombo > 0 && currentCombo <= 2 ) {
        inflationText = ` Ufa! Esse R$1 quase virou R$0,8${(9 - currentCombo)}, mas você salvou!`;
    }
    
    donationCongratsText.textContent = finalCongratsText + inflationText;
    // ***** FIM DA LÓGICA DE MENSAGEM DE COMBO ATUALIZADA *****

    donationLinkContainer.style.display = 'block';
    canShowDonationLink = true;

    resetBallSize();

    ball.classList.add('ball-clicked-effect');
    setTimeout(() => {
        ball.classList.remove('ball-clicked-effect');
    }, 400);
    
    // Chance de Bola Maluca após um acerto
    if (Math.random() < BOLA_MALUCA_CHANCE && !isBolaMalucaMode) {
        setTimeout(startBolaMalucaMode, 600); // Delay um pouco maior para dar tempo de ler a msg de sucesso
    } else {
        moveBallRandomly();
    }
});

gameArea.addEventListener('click', function(event) {
    if (ballIsDominating || isBolaMalucaMode) return;
    incrementTotalClicks(); // Mover para cá para contar o clique na área

    showAlmostMissEffect(event);
    playComicBallAnimation();

    let failMsgPrefix = "";
    if (currentCombo > 0) {
        failMsgPrefix = `Combo ${currentCombo}x quebrado! `;
    }
    currentCombo = 0;
    updateComboDisplay();

    if (!canShowDonationLink) {
        updateMessageText(failMsgPrefix + getRandomMessage(failMessagesSarcastic));
    }

    donationLinkContainer.style.display = 'none';
    canShowDonationLink = false;

    currentBallSize *= BALL_GROWTH_FACTOR;
    const maxPracticalSize = Math.max(gameArea.offsetWidth, gameArea.offsetHeight) * 1.5;
    currentBallSize = Math.min(currentBallSize, maxPracticalSize);
    ball.style.width = currentBallSize + 'px';
    ball.style.height = currentBallSize + 'px';

    const gameAreaRect = gameArea.getBoundingClientRect();
    if (currentBallSize >= gameAreaRect.width * 0.9 && currentBallSize >= gameAreaRect.height * 0.9) {
        ballIsDominating = true;
        ball.classList.add('dominating');
        ball.style.width = gameAreaRect.width + 'px';
        ball.style.height = gameAreaRect.height + 'px';
        ball.style.left = '0px';
        ball.style.top = '0px';
        updateMessageText("A BOLA ENGOLIU A ÁREA DE JOGO! Clique nela para sossegar.");
    } else {
        moveBallRandomly();
    }
    
    // Chance de Bola Maluca após um erro
    if (Math.random() < BOLA_MALUCA_CHANCE && !isBolaMalucaMode) {
        setTimeout(startBolaMalucaMode, 600); // Delay um pouco maior
    }
});

// --- Inicialização ---
function initializeGame() {
    resetBallSize();
    currentCombo = 0;
    updateComboDisplay();
    ballIsDominating = false;
    isBolaMalucaMode = false;
    clearInterval(bolaMalucaInterval);
    clearTimeout(bolaMalucaTimer);
    canShowDonationLink = false;
    donationLinkContainer.style.display = 'none';
    if (fakeDonateButton) fakeDonateButton.style.display = 'none';
    totalClicks = 0;
    ball.style.width = INITIAL_BALL_SIZE + 'px';
    ball.style.height = INITIAL_BALL_SIZE + 'px';
    currentBallSize = INITIAL_BALL_SIZE;
    moveBallRandomly();
    updateMessageText("Clique na bola vermelha para tentar me doar R$1!");
}

initializeGame();