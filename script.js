const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

const box = 20;
let snake = [{ x: 9 * box, y: 9 * box }];
let direction = 'RIGHT';
let food = { x: Math.floor(Math.random() * (canvas.width / box)) * box, y: Math.floor(Math.random() * (canvas.height / box)) * box };
let score = 0;

function draw() {
    ctx.fillStyle = '#000'; // Black background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw food (egg) in red
    ctx.fillStyle = '#e74c3c'; // Food color
    ctx.fillRect(food.x, food.y, box, box);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? '#2ecc71' : '#27ae60'; // Head and body colors
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = '#e74c3c'; // Radiant red border for the snake
        ctx.strokeRect(snake[i].x, snake[i].y, box, box); // Stroke around each segment
    }

    // Old snake position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Change snake direction
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    // Eat food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById('score').innerText = score;
        food = { x: Math.floor(Math.random() * (canvas.width / box)) * box, y: Math.floor(Math.random() * (canvas.height / box)) * box };
    } else {
        snake.pop(); // Remove tail
    }

    // New head
    const newHead = { x: snakeX, y: snakeY };

    // Game over conditions
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over! Your score was: " + score);
    }

    snake.unshift(newHead);
}

// Collision detection
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Control the snake
document.addEventListener('keydown', directionControl);
function directionControl(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') direction = 'LEFT';
    if (event.keyCode === 38 && direction !== 'DOWN') direction = 'UP';
    if (event.keyCode === 39 && direction !== 'LEFT') direction = 'RIGHT';
    if (event.keyCode === 40 && direction !== 'UP') direction = 'DOWN';
}

// Restart the game
document.getElementById('restart').addEventListener('click', () => {
    score = 0;
    document.getElementById('score').innerText = score;
    snake = [{ x: 9 * box, y: 9 * box }];
    direction = 'RIGHT';
    food = { x: Math.floor(Math.random() * (canvas.width / box)) * box, y: Math.floor(Math.random() * (canvas.height / box)) * box };
    game = setInterval(draw, 100);
});

// Start the game
let game = setInterval(draw, 100);
