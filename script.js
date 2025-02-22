const target = document.getElementById('target');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const announcement = document.getElementById('announcement');
const resultImage = document.getElementById('resultImage');
const gameContainer = document.querySelector('.game-container');

let score = 0;
let timeLeft = 30;
let gameActive = false;
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
    const randomY = Math.floor(Math.random() * (maxY - 20)); // Mengurangi 20 untuk mengangkat target
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
        displayResult();
    }
}

// Display result based on score
function displayResult() {
    announcement.innerHTML = `Skor akhir Anda: ${score}`;
    
    if (score < 75) {
        resultImage.src = 'kalah.jpg'; // Ganti dengan path gambar meledek
    } else if (score >= 75 && score < 80) {
        resultImage.src = 'biasa.jpg'; // Ganti dengan path gambar normal
    } else if (score >= 80 && score <= 85) {
        resultImage.src = 'menang.jpg'; // Ganti dengan path gambar bagus
    } else {
        resultImage.src = 'menang.jpg'; // Ganti dengan path gambar sangat bagus
    }
    
    resultImage.style.display = 'block'; // Tampilkan gambar hasil
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

// Reset game
function resetGame() {
    score = 0;
    timeLeft = 30;
    gameActive = false;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    target.style.left = '0px';
    target.style.top = '0px';
    resultImage.style.display = 'none'; // Sembunyikan gambar hasil
    announcement.innerHTML = ''; // Kosongkan pengumuman
}

// Event listeners for buttons
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

// Start game when page loads
window.addEventListener('load', resetGame);
target.addEventListener('click', handleClick);
