'use strict';
var params = {
    roundsNumber: 0,
    roundsPlayed: 1,
    gameActive: false,
    compWins: 0,
    playerWins: 0,
    progress: [],
    playerName: "Player"
};
var output = document.getElementById("output");

function displayText(text) {
    output.innerHTML = text + "<br>";
}

function inactiveGame() {
    displayText(" Please press the Start new game button!");
}
// providing game's result
var result = document.getElementById("result");
var displayResult = function () {
    result.innerHTML =
        "<p> <strong>" +
        params.playerWins +
        "</strong> - <strong>" +
        params.compWins +
        "</strong></p>";
}; //<p> result of games//
displayResult();



// player choice function by click//
var playerMoves = document.querySelectorAll(".player-move");
for (var i = 0; i < playerMoves.length; i++) {
    playerMoves[i].addEventListener("click", function () {
        var playersChoice = this.getAttribute("data-move");
        if (params.gameActive) {
            // invoking playerMove function with a payer's choice parameter
            playerMove(playersChoice);
        } else {
            inactiveGame();
        }
    });
}

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

// determining who won the round
function win(playerChoice, compChoice) {
    if (playerChoice === compChoice) {
        return "Nobody ";
    } else if (
        (playerChoice === "paper" && compChoice === "rock") ||
        (playerChoice === "rock" && compChoice === "scissors") ||
        (playerChoice === "scissors" && compChoice === "paper")
    ) {
        params.playerWins++;
        return params.playerName;
    } else {
        params.compWins++;
        return "Computer";
    }
}
//
function createProgressTable() {
    var progressTableContent = "";
    for (var i = 0; i < params.progress.length; i++) {
        progressTableContent +=
            "<tr><td>" +
            params.progress[i].round +
            "</td><td>" +
            params.progress[i].winner +
            "</td><td>" +
            params.progress[i].playerMove +
            "</td><td>" +
            params.progress[i].compMove +
            "</td><td>" +
            params.progress[i].roundResult +
            "</td></tr>";
    }

    var progressTableHeading =
        "<table><tr><th>Games</th><th>Winner</th><th>Player</th><th>Computer</th><th>Result</th></tr>";

    var progressTable = progressTableHeading + progressTableContent + "</table>";
    return progressTable;
}
// displays text of the results of the game, who won each game//
function playerMove(playerChoice) {
    var compChoice = compMove();

    var gameResult = win(playerChoice, compChoice);
    displayResult();
    params.roundsPlayed++;

    var roundProgress = {
        round: params.roundsPlayed,
        winner: gameResult,
        playerMove: playerChoice,
        compMove: compChoice,
        roundResult: params.playerWins + " : " + params.compWins
    };
    params.progress.push(roundProgress);

    var resultText =
        " Round " +
        params.roundsPlayed +
        ": <strong>" +
        gameResult +
        "</strong> won." +
        params.playerName +
        " played <strong>" +
        playerChoice +
        "</strong>, computer played <strong>" +
        compChoice +
        "</strong> ";
    if (
        params.playerWins === params.roundsNumber ||
        params.compWins === params.roundsNumber
    ) {
        var progressTable = createProgressTable();
        var winner = gameResult.toUpperCase();
        var modalContent =
            "<p>" + winner + " won the entire game!!!</p>" + progressTable;
        var modalToBeDisplayed = "#modal-game-over";
        addModalContent(modalToBeDisplayed, modalContent);
        showModal(modalToBeDisplayed);
        params.gameActive = false;
        displayText(resultText);
    } else {
        displayText(resultText);
    }
}



//function starting new game//
newGame.addEventListener("click", function () {
    params.playerWins = 0;
    params.compWins = 0;
    params.roundsPlayed = 0;
    params.progress = [];
    displayResult();
    displayText(
        "Let's see who's going to win."
    );
    showModal("#modal-new-game"); //shows modal with no of wins and player's name//
});

// getting new game params//
var submitNewGame = document.getElementById("submit-new-game");

submitNewGame.addEventListener("click", function () {
    event.preventDefault();
    hideModal(event);
    //get player name//
    var playerInputName = document.getElementById("inputName").value;
    var player = document.getElementById("player");
    player.innerHTML = "<strong>" + playerInputName;
    if (playerInputName === null || playerInputName === "") {
        params.playerName = "Player";
    } else {
        params.playerName = playerInputName;
        displayResult();
    }

    // get wins number //
    var roundsInput = document.getElementById("inputRounds").value; //adding no of rounds from modal//
    if (roundsInput === null || roundsInput === "") {
        rounds.innerHTML = "You didn't provide a value";
    } else if (isNaN(roundsInput)) {
        rounds.innerHTML = "The value you provided is not a number";
    } else if (parseInt(roundsInput) <= 0) {
        rounds.innerHTML =
            "The value you provided is not a possible number of rounds";
    } else {
        params.gameActive = true;
        params.roundsNumber = parseInt(roundsInput); //returns no of rounds added in modal//

        rounds.innerHTML =
            "The game will end after <strong>" +
            params.roundsNumber +
            "</strong> wins";
    }
});

// remove "show" class from all modals //
function hideModals() {
    for (var i = 0; i < modals.length; i++) {
        modals[i].classList.remove("show");
    }
}

// function adding modal content //
var addModalContent = function (modalsID, modalContent) {
    var modalResult = document.querySelector(modalsID);
    modalResult.querySelector(".content").innerHTML = modalContent;
}; //adds content to result modal and displays result//

// function to open modal //
var showModal = function (modalShown) {
    hideModals();
    document.querySelector(modalShown).classList.add("show");
    document.querySelector("#modal-overlay").classList.add("show");
};

//close modal//
var hideModal = function (event) {
    event.preventDefault();
    document.querySelector("#modal-overlay").classList.remove("show");
};

var closeButtons = document.querySelectorAll(".modal .close");

for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener("click", hideModal);
}

// closing by clicking overlay //
document.querySelector("#modal-overlay").addEventListener("click", hideModal);

// stop propagation in overlay //
var modals = document.querySelectorAll(".modal");

for (var i = 0; i < modals.length; i++) {
    modals[i].addEventListener("click", function (event) {
        event.stopPropagation();
    });
}
