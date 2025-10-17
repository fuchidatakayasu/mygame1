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
 * Finds the corner of the game container that is farthest from the mouse cursor.
 * @param {number} mouseX - The x-coordinate of the mouse.
 * @param {number} mouseY - The y-coordinate of the mouse.
 * @returns {{x: number, y: number}}
 */
function getFarthestCorner(mouseX, mouseY) {
    const containerRect = gameContainer.getBoundingClientRect();
    const buttonRect = unstableButton.getBoundingClientRect();

    const corners = [
        { x: 0, y: 0 }, // Top-left
        { x: containerRect.width - buttonRect.width, y: 0 }, // Top-right
        { x: 0, y: containerRect.height - buttonRect.height }, // Bottom-left
        { x: containerRect.width - buttonRect.width, y: containerRect.height - buttonRect.height } // Bottom-right
    ];

    let farthestCorner = null;
    let maxDistanceSq = -1;

    // Adjust mouse coordinates to be relative to the game container's viewport position
    const relativeMouseX = mouseX - containerRect.left;
    const relativeMouseY = mouseY - containerRect.top;

    corners.forEach(corner => {
        const dx = corner.x - relativeMouseX;
        const dy = corner.y - relativeMouseY;
        const distanceSq = dx * dx + dy * dy;

        if (distanceSq > maxDistanceSq) {
            maxDistanceSq = distanceSq;
            farthestCorner = corner;
        }
    });

    return farthestCorner;
}

/**
 * Moves the button to the corner farthest from the cursor.
 * @param {MouseEvent} event - The mouse event that triggered the move.
 */
function moveButtonStrategically(event) {
    const { x, y } = getFarthestCorner(event.clientX, event.clientY);
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
 * Handles the click on the unstable button.
 * @param {MouseEvent} event
 */
function handleButtonClick(event) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    moveButtonStrategically(event);
}

// Event Listeners
startButton.addEventListener('click', startGame);
playAgainButton.addEventListener('click', startGame);
unstableButton.addEventListener('click', handleButtonClick);

// The 'mouseover' event listener that made the button impossible to click has been removed
// to allow for strategic gameplay.
