
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
 * Finds a strategic position for the button to move to, adding variety to the movement.
 * The button will move to one of the top 3 farthest points from the mouse cursor,
 * including corners and edge midpoints.
 * @param {number} mouseX - The x-coordinate of the mouse.
 * @param {number} mouseY - The y-coordinate of the mouse.
 * @returns {{x: number, y: number}}
 */
function getStrategicPosition(mouseX, mouseY) {
    const containerRect = gameContainer.getBoundingClientRect();
    const buttonRect = unstableButton.getBoundingClientRect();

    const width = containerRect.width - buttonRect.width;
    const height = containerRect.height - buttonRect.height;

    // Define 8 potential target points: 4 corners and 4 edge midpoints
    const targetPoints = [
        { x: 0, y: 0 }, // Top-left
        { x: width, y: 0 }, // Top-right
        { x: 0, y: height }, // Bottom-left
        { x: width, y: height }, // Bottom-right
        { x: width / 2, y: 0 }, // Top-mid
        { x: width / 2, y: height }, // Bottom-mid
        { x: 0, y: height / 2 }, // Left-mid
        { x: width, y: height / 2 }  // Right-mid
    ];

    const relativeMouseX = mouseX - containerRect.left;
    const relativeMouseY = mouseY - containerRect.top;

    // Calculate the distance from the mouse to each target point
    targetPoints.forEach(point => {
        const dx = point.x - relativeMouseX;
        const dy = point.y - relativeMouseY;
        point.distanceSq = dx * dx + dy * dy;
    });

    // Sort points by distance in descending order
    targetPoints.sort((a, b) => b.distanceSq - a.distanceSq);

    // Randomly pick one of the top 3 farthest points
    const randomIndex = Math.floor(Math.random() * 3);
    return targetPoints[randomIndex];
}

/**
 * Moves the button strategically based on the cursor's position.
 * @param {MouseEvent} event - The mouse event that triggered the move.
 */
function moveButtonStrategically(event) {
    const { x, y } = getStrategicPosition(event.clientX, event.clientY);
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
unstableButton.addEventListener('mouseover', moveButtonStrategically);

