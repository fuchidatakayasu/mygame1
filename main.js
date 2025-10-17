
const gameContainer = document.getElementById('game-container');
const unstableButton = document.getElementById('unstable-button');
const startButton = document.getElementById('start-button');
const playAgainButton = document.getElementById('play-again-button');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const finalScoreDisplay = document.getElementById('final-score');

let score = 0;
let timeLeft = 30;
let timerInterval;

/**
 * Gets a random position within the game container.
 * @returns {{x: number, y: number}}
 */
function getRandomPosition() {
    const containerRect = gameContainer.getBoundingClientRect();
    const buttonRect = unstableButton.getBoundingClientRect();

    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    return { x: randomX, y: randomY };
}

/**
 * Moves the button to a random position.
 */
function moveButtonRandomly() {
    const { x, y } = getRandomPosition();
    unstableButton.style.left = `${x}px`;
    unstableButton.style.top = `${y}px`;
}

/**
 * Starts the game.
 */
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${timeLeft}`;

    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    unstableButton.style.display = 'block';

    moveButtonRandomly();

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

/**
 * Ends the game.
 */
function endGame() {
    clearInterval(timerInterval);
    unstableButton.style.display = 'none';
    gameOverScreen.style.display = 'flex';
    finalScoreDisplay.textContent = score;
}

/**
 * Handles the click on the unstable button, incrementing the score.
 */
function handleButtonClick() {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
}

// Event Listeners
startButton.addEventListener('click', startGame);
playAgainButton.addEventListener('click', startGame);
unstableButton.addEventListener('click', handleButtonClick);
unstableButton.addEventListener('mouseover', moveButtonRandomly);
