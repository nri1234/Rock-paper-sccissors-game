var roundsNumber;
var roundsPlayed = 0;
var gameActive = true;
var playerName = window.prompt('What is your name ?');
var name = playerName;
var output = document.getElementById("output");
var player = document.getElementById("player");
player.innerHTML = "<strong>" + name;
var newGame = document.getElementById("newGame");
var rounds = document.getElementById("rounds");
// Buttons to choose move by player//
var playerMoveRock = document.getElementById("playerMove_rock"),
    playerMovePaper = document.getElementById("playerMove_paper"),
    playerMoveScissors = document.getElementById("playerMove_scissors");

// player choice function by click//
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
//displays information text about the game//
function displayText(text) {
    output.innerHTML = text + "<br>";
}

function inactiveGame() {
    displayText("Game over, please press the new game button!");
}

// displays game result//
var compWins = 0,
    playerWins = 0,
    result = document.getElementById("result");
var displayResult = function (playerWins, compWins) {
    result.innerHTML =
        "<strong>" + //makes words bold//
        playerWins +
        "</strong> - <strong>" +
        compWins +
        "</strong>";
};
displayResult(playerWins, compWins);

// Computer move function//
function compMove() {
    var compMoveRandom = Math.floor(Math.random() * 3) + 1;
    switch (compMoveRandom) {
        case 1:
            return "rock";
        case 2:
            return "paper";
        case 3:
            return "scissors";
    }
}

// determining who won the round//
function win(playerChoice, compChoice) {
    if (playerChoice === compChoice) { //draw//
        return "Ups, nobody ";
    } else if (
        (playerChoice === "paper" && compChoice === "rock") ||
        (playerChoice === "rock" && compChoice === "scissors") ||
        (playerChoice === "scissors" && compChoice === "paper")
    ) {
        playerWins++;
        return name;
    } else {
        compWins++;
        return "Computer";
    }
}
// displays text of the results of the game, who won each game//
function playerMove(playerChoice) {
    var compChoice = compMove();
    var gameResult = win(playerChoice, compChoice);
    displayResult(playerWins, compWins);
    roundsPlayed++;

    if (playerWins === roundsNumber) {
        displayText(
            "<srtong>" +
            name +
            "," +
            " You won the entire game!!! Round " +
            roundsPlayed +
            ": <strong>" +
            gameResult +
            "</strong> won. played <strong>" +
            playerChoice +
            "</strong>, computer played <strong>" +
            compChoice +
            "</strong> "
        );
        gameActive = false; //stops carry on playing after number of wins, START NEW GAME!!//
    } else if (compWins === roundsNumber) {
        displayText(
            " Computer won the entire game!!! Round " +
            roundsPlayed +
            ": <strong>" +
            gameResult +
            "</strong> won.You played <strong>" +
            playerChoice +
            "</strong>, computer played <strong>" +
            compChoice +
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
            playerChoice +
            "</strong>, computer played <strong>" +
            compChoice +
            "</strong>"
        );
    }
}
//function with starting new game//
newGame.addEventListener("click", function () {
    playerWins = 0;
    compWins = 0;
    roundsPlayed = 0;
    displayResult(playerWins, compWins);
    displayText(
        "Let's see who's going to win."
    );
    //what if player will choose not a number//
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
