// creates variables to refrence the HTML elements
const numField = document.getElementById("num-field");
const guessButton = document.getElementById("guess-button");
const resetButton = document.getElementById("reset-button");
const messageText = document.getElementById("message-text");
const guessCountText = document.getElementById("guess-count-text");

// creates min and max variables
let min = 41;
let max = 67;

// creates a variable to hold the random number and guess count 
let secret;
let guessCount = 0;

let myConfetti = null;
if (window.confetti) {
    myConfetti = confetti.create(null, {
        rezise: true,
        useWorker: true
    });
}

function loadGame () {
    numField.min = min;
    numField.max = max;
    numField.value = "";
    secret = Math.floor(Math.random() * (max - min + 1)) + min;
    guessCount = 0;
    messageText.innerHTML = `Enter a number between ${min} and ${max}.`;
    guessCountText.innerHTML = "Guesses: 0"; 
    numField.focus();
}

function makeGuess() {
    const guess = parseInt(numField.value);
    if (Number.isNaN(guess) || guess < min || guess > max) {
        messageText.innerHTML = `Please enter a valid number between ${min} and ${max}.`;
        return;
    }

    guessCount++;
    guessCountText.innerHTML = `Guesses: ${guessCount}`;

    const hooraySound = new Audio('tunetank.com_yahoo-celebration.wav')
    const wompSound = new Audio('tunetank.com_kazoo-sad-pitch-down.wav')
    if (guess === secret) {
        messageText.innerHTML = `Congratulations! ${secret} is the correct number!`;

        hooraySound.currentTime = 0;
        hooraySound.play();

        if (myConfetti) myConfetti({
            particleCount: 100,
            spread: 160
        });
    } else if (guess < secret) {
        messageText.innerHTML = `${guess} Too Low! Try again.`;

        wompSound.currentTime = 0;
        wompSound.play();

    } else {
        messageText.innerHTML = `${guess} Too High! Try again.`;

        wompSound.currentTime = 0;
        wompSound.play();
    
    }
}

guessButton.addEventListener("click", makeGuess)
resetButton.addEventListener("click", loadGame)

numField.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        makeGuess();
    }
});
// load the game when the page loads
loadGame();