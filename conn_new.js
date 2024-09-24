
const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('gamestat');
const restartButton = document.getElementById('restart');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');

let isXTurn = true;
let gameActive = true;
let scores = { X: 0, O: 0 };
//winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]  
];


cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});
// Handle click on a cell
function handleClick(e) {
    const cell = e.target;
    const currentPlayer = isXTurn ? 'X' : 'O';
    
    if (!gameActive) return;
    
    // Place the mark
    cell.textContent = currentPlayer;
    
    // Check for a win
    if (checkWin(currentPlayer)) {
        gameStatus.textContent = `Player ${currentPlayer} Wins!`;
        updateScore(currentPlayer);
        gameActive = false;
    } 
    // Check for a draw
    else if (isDraw()) {
        gameStatus.textContent = "It's a Draw!";
        gameActive = false;
    } 
    else {
        // Switch turns
        isXTurn = !isXTurn;
        gameStatus.textContent = `Player ${isXTurn ? 'X' : 'O'}'s turn`;
    }
}

function checkWin(currentPlayer) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function updateScore(winner) {
    scores[winner]++;
    scoreXElement.textContent = scores['X'];
    scoreOElement.textContent = scores['O'];
}

// Restart the game
restartButton.addEventListener('click', restartGame);

function restartGame() {
    isXTurn = true;
    gameActive = true;
    gameStatus.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
}
