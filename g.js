var roundsNumber;
var roundsPlayed = 0;
var gameActive = true;
var playerName = window.prompt('What is your name ?');
var name = playerName;
// providing game's output
var output = document.getElementById("output");
var player = document.getElementById("player");
player.innerHTML = "<strong>" + name;


function displayText(text) {
    output.innerHTML = text + "<br>";
}


// providing game's result
var compWins = 0,
    playerWins = 0,
    result = document.getElementById("result");
var displayResult = function (playerWins, compWins) {
    result.innerHTML =
        "<strong>" +
        playerWins +
        "</strong> - <strong>" +
        compWins +
        "</strong>";
};
displayResult(playerWins, compWins);

// when game is no longer active
function inactiveGame() {
    displayText("Game over, please press the new game button!");
}

// Buttons allowing player to chose a move
var playerMoveRock = document.getElementById("playerMove_rock"),
    playerMovePaper = document.getElementById("playerMove_paper"),
    playerMoveScissors = document.getElementById("playerMove_scissors");

// invoking playerMove function with a payer's choice parameter
playerMoveRock.addEventListener("click", function () {
    if (gameActive) {
        playerMove("rock");
    } else {
        inactiveGame();
    }
});
playerMovePaper.addEventListener("click", function () {
    if (gameActive) {
        playerMove("paper");
    } else {
        inactiveGame();
    }
});
playerMoveScissors.addEventListener("click", function () {
    if (gameActive) {
        playerMove("scissors");
    } else {
        inactiveGame();
    }
});

// Computer move function randomizing the move
function computerMove() {
    var computerMoveRandom = Math.floor(Math.random() * 3) + 1;
    switch (computerMoveRandom) {
        case 1:
            return "rock";
        case 2:
            return "paper";
        case 3:
            return "scissors";
    }
}

// determining who won the round
function win(playerMoveChosen, computerMoveChoice) {
    if (playerMoveChosen === computerMoveChoice) {
        return "Ups, nobody ";
    } else if (
        (playerMoveChosen === "paper" && computerMoveChoice === "rock") ||
        (playerMoveChosen === "rock" && computerMoveChoice === "scissors") ||
        (playerMoveChosen === "scissors" && computerMoveChoice === "paper")
    ) {
        playerWins++;
        return name;
    } else {
        compWins++;
        return "Computer";
    }
}

// game mechanics invoked after player's choice
function playerMove(playerMoveChosen) {
    var computerMoveChoice = computerMove();
    var gameResult = win(playerMoveChosen, computerMoveChoice);
    displayResult(playerWins, compWins);
    roundsPlayed++;
    if (playerWins === roundsNumber) {
        displayText(
            "<srtong>" +
            name +
            " Won the entire game!!! Round " +
            roundsPlayed +
            ": <strong>" +
            gameResult +
            "</strong> won. played <strong>" +
            playerMoveChosen +
            "</strong>, computer played <strong>" +
            computerMoveChoice +
            "</strong> "
        );
        gameActive = false;
    } else if (compWins === roundsNumber) {
        displayText(
            " Computer won the entire game!!! Round " +
            roundsPlayed +
            ": <strong>" +
            gameResult +
            "</strong> won.You played <strong>" +
            playerMoveChosen +
            "</strong>, computer played <strong>" +
            computerMoveChoice +
            "</strong> "
        );
        gameActive = false;
    } else {
        displayText(
            "Round " +
            roundsPlayed +
            ": <strong>" +
            gameResult +
            "</strong> won. You played <strong>" +
            playerMoveChosen +
            "</strong>, computer played <strong>" +
            computerMoveChoice +
            "</strong>"
        );
    }
}

// new game button starting a game consisting of a number of game provided by player
var newGame = document.getElementById("newGame"),
    rounds = document.getElementById("rounds");

newGame.addEventListener("click", function () {
    playerWins = 0;
    compWins = 0;
    roundsPlayed = 0;
    displayResult(playerWins, compWins);
    displayText(
        "Let's see who's going to win."
    );
    var userInput = window.prompt("How many rounds do you want to play?");
    if (userInput === null || userInput === "") {
        rounds.innerHTML = "You didn't provide any value";
    } else if (isNaN(userInput)) {
        rounds.innerHTML = "The value you provided is not a number";
    } else if (parseInt(userInput) <= 0) {
        rounds.innerHTML =
            "The value you provided is not a possible number of rounds";
    } else {
        gameActive = true;
        roundsNumber = parseInt(userInput);
        rounds.innerHTML =
            "The game will end after <strong>" + roundsNumber + "</strong> wins";
    }
});
