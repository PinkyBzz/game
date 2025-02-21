const target = document.getElementById('target');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const gameContainer = document.querySelector('.game-container');

let score = 0;
let timeLeft = 30;
let gameActive = true;
let gameWidth = gameContainer.offsetWidth;
let gameHeight = gameContainer.offsetHeight;

// Update game area dimensions on resize
window.addEventListener('resize', () => {
    gameWidth = gameContainer.offsetWidth;
    gameHeight = gameContainer.offsetHeight;
});

// Mobile touch support
target.addEventListener('touchstart', handleClick, { passive: true });

function moveTarget() {
    if (!gameActive) return;
    
    const maxX = gameWidth - target.offsetWidth;
    const maxY = gameHeight - target.offsetHeight;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
}

function handleClick(e) {
    if (!gameActive) return;
    
    // Add click effect
    const clickEffect = document.createElement('div');
    clickEffect.classList.add('click-effect');
    clickEffect.style.left = `${e.clientX || e.touches[0].clientX}px`;
    clickEffect.style.top = `${e.clientY || e.touches[0].clientY}px`;
    document.body.appendChild(clickEffect);
    
    // Remove effect after animation
    setTimeout(() => {
        clickEffect.remove();
    }, 300);
    
    score++;
    scoreDisplay.textContent = score;
    moveTarget();
}

function updateTimer() {
    if (!gameActive) return;
    
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    
    if (timeLeft <= 0) {
        gameActive = false;
        alert(`Game Over! Skor akhir Anda: ${score}`);
    }
}

// Initialize game
function startGame() {
    score = 0;
    timeLeft = 30;
    gameActive = true;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    moveTarget();
    setInterval(updateTimer, 1000);
}

// Start game when page loads
window.addEventListener('load', startGame);
target.addEventListener('click', handleClick);
