"use strict";

/* =========================
   SCREEN REFERENCES
   ========================= */

const screens = {
    home: document.getElementById("home-screen"),
    mainMenu: document.getElementById("main-menu-screen"),
    appSettings: document.getElementById("app-settings-screen"),
    crazyEightsGame: document.getElementById("crazy-eights-game-screen"),
    inGameSettings: document.getElementById("in-game-settings-screen"),
    gameSettings: document.getElementById("game-settings-screen"),
    howToPlay: document.getElementById("how-to-play-screen"),
    houseRules: document.getElementById("house-rules-screen")
};


/* =========================
   ROUTE MEMORY
   ========================= */

let previousScreen = "home";
let settingsReturnScreen = "mainMenu";


/* =========================
   SCREEN CONTROL
   ========================= */

function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove("active-screen");
    });

    screens[screenName].classList.add("active-screen");
}


/* =========================
   CARD DATA
   ========================= */

const suits = ["spades", "hearts", "clubs", "diamonds"];
const ranks = [
    "A", "2", "3", "4", "5", "6", "7",
    "8", "9", "10", "J", "Q", "K"
];

const suitSymbols = {
    spades: "♠",
    hearts: "♥",
    clubs: "♣",
    diamonds: "♦"
};


/* =========================
   DECK CREATION
   ========================= */

function createDeck() {
    const deck = [];

    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push({
                suit,
                rank
            });
        }
    }

    return deck;
}


/* =========================
   SHUFFLE
   ========================= */

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
}


/* =========================
   DEAL
   ========================= */

function dealCards() {
    const deck = shuffleDeck(createDeck());

    const playerHand = [];
    const opponentHand = [];

    for (let i = 0; i < 5; i++) {
        playerHand.push(deck.pop());
        opponentHand.push(deck.pop());
    }

    const stock = deck;

    const discardPile = [];

    let firstDiscard = stock.pop();

    /*
        In Crazy Eights, if the first discard is an Eight,
        we keep drawing until the starting discard is not
        an Eight. The unused cards go back into the stock.
    */
    while (firstDiscard && firstDiscard.rank === "8" && stock.length > 0) {
        stock.unshift(firstDiscard);
        firstDiscard = stock.pop();
    }

    if (firstDiscard) {
        discardPile.push(firstDiscard);
    }

    return {
        playerHand,
        opponentHand,
        stock,
        discardPile
    };
}


/* =========================
   CURRENT GAME
   ========================= */

let currentGame = null;


/* =========================
   CARD DISPLAY
   ========================= */

function getRankSymbol(rank) {
    return rank;
}


function createCardElement(card) {
    const cardElement = document.createElement("div");

    cardElement.className = "card";

    if (card.suit === "hearts" || card.suit === "diamonds") {
        cardElement.classList.add("red");
    }

    const symbol = suitSymbols[card.suit];

    const topCorner = document.createElement("div");
    topCorner.className = "card-corner";

    const topRank = document.createElement("span");
    topRank.textContent = getRankSymbol(card.rank);

    const topSuit = document.createElement("span");
    topSuit.className = "card-suit";
    topSuit.textContent = symbol;

    topCorner.appendChild(topRank);
    topCorner.appendChild(topSuit);


    const centerSuit = document.createElement("div");
    centerSuit.className = "card-center-suit";
    centerSuit.textContent = symbol;


    const bottomCorner = document.createElement("div");
    bottomCorner.className = "card-corner bottom";

    const bottomRank = document.createElement("span");
    bottomRank.textContent = getRankSymbol(card.rank);

    const bottomSuit = document.createElement("span");
    bottomSuit.className = "card-suit";
    bottomSuit.textContent = symbol;

    bottomCorner.appendChild(bottomRank);
    bottomCorner.appendChild(bottomSuit);


    cardElement.appendChild(topCorner);
    cardElement.appendChild(centerSuit);
    cardElement.appendChild(bottomCorner);

    return cardElement;
}


function createCardBackElement() {
    const cardBack = document.createElement("div");
    cardBack.className = "card-back";

    const logo = document.createElement("div");
    logo.className = "card-back-logo";

    ["♠", "♥", "♣", "♦"].forEach(symbol => {
        const suit = document.createElement("span");
        suit.textContent = symbol;
        logo.appendChild(suit);
    });

    cardBack.appendChild(logo);

    return cardBack;
}


/* =========================
   GAME RENDERING
   ========================= */

function renderGame() {
    if (!currentGame) {
        return;
    }

    const playerHandElement = document.getElementById("player-hand");
    const opponentHandElement = document.getElementById("opponent-hand");
    const stockPileElement = document.getElementById("stock-pile");
    const discardPileElement = document.getElementById("discard-pile");

    playerHandElement.innerHTML = "";
    opponentHandElement.innerHTML = "";
    stockPileElement.innerHTML = "";
    discardPileElement.innerHTML = "";


    /* Player cards */

    currentGame.playerHand.forEach(card => {
        playerHandElement.appendChild(
            createCardElement(card)
        );
    });


    /* Opponent cards */

    currentGame.opponentHand.forEach(() => {
        const cardContainer = document.createElement("div");
        cardContainer.className = "card";

        const back = createCardBackElement();

        cardContainer.appendChild(back);
        opponentHandElement.appendChild(cardContainer);
    });


    /* Stock */

    if (currentGame.stock.length > 0) {
        stockPileElement.appendChild(
            createCardBackElement()
        );
    }


    /* Discard */

    if (currentGame.discardPile.length > 0) {
        const topCard =
            currentGame.discardPile[
                currentGame.discardPile.length - 1
            ];

        discardPileElement.appendChild(
            createCardElement(topCard)
        );
    }
}


/* =========================
   START CRAZY EIGHTS
   ========================= */

function startCrazyEights() {
    currentGame = dealCards();

    renderGame();

    showScreen("crazyEightsGame");
}


/* =========================
   HOME NAVIGATION
   ========================= */

document
    .getElementById("single-player-btn")
    .addEventListener("click", () => {
        startCrazyEights();
    });


document
    .getElementById("multiplayer-btn")
    .addEventListener("click", () => {
        /*
            Multiplayer will be implemented later.
            For now this keeps the button from doing nothing.
        */
        showScreen("mainMenu");
    });


document
    .getElementById("tour-btn")
    .addEventListener("click", () => {
        alert("Classic Cards Tour will be added later.");
    });


/* =========================
   MAIN MENU
   ========================= */

document
    .getElementById("app-settings-btn")
    .addEventListener("click", () => {
        settingsReturnScreen = "mainMenu";
        showScreen("appSettings");
    });


document
    .querySelectorAll(".game-button")
    .forEach(button => {
        button.addEventListener("click", () => {
            const game = button.dataset.game;

            if (game === "crazy-eights") {
                startCrazyEights();
            }
        });
    });


document
    .querySelectorAll(".game-settings-button")
    .forEach(button => {
        button.addEventListener("click", () => {
            const game = button.dataset.game;

            if (game === "crazy-eights") {
                settingsReturnScreen = "mainMenu";
                showScreen("gameSettings");
            }
        });
    });


/* =========================
   APP SETTINGS
   ========================= */

document
    .getElementById("close-app-settings-btn")
    .addEventListener("click", () => {
        showScreen(settingsReturnScreen);
    });


document
    .getElementById("settings-home-btn")
    .addEventListener("click", () => {
        showScreen("home");
    });


document
    .querySelectorAll(".setting-choice")
    .forEach(button => {
        button.addEventListener("click", () => {
            const setting = button.dataset.setting;
            const value = button.dataset.value;

            document
                .querySelectorAll(
                    `.setting-choice[data-setting="${setting}"]`
                )
                .forEach(choice => {
                    choice.classList.remove("selected");
                });

            button.classList.add("selected");

            console.log(`Setting changed: ${setting} = ${value}`);
        });
    });


/* =========================
   IN-GAME SETTINGS
   ========================= */

document
    .getElementById("crazy-eights-in-game-settings-btn")
    .addEventListener("click", () => {
        previousScreen = "crazyEightsGame";
        showScreen("inGameSettings");
    });


document
    .getElementById("close-in-game-settings-btn")
    .addEventListener("click", () => {
        showScreen(previousScreen);
    });


document
    .getElementById("how-to-play-btn")
    .addEventListener("click", () => {
        previousScreen = "inGameSettings";
        showScreen("howToPlay");
    });


document
    .getElementById("tutorial-btn")
    .addEventListener("click", () => {
        alert("Tutorial will be added later.");
    });


document
    .getElementById("game-settings-btn")
    .addEventListener("click", () => {
        previousScreen = "inGameSettings";
        showScreen("gameSettings");
    });


document
    .getElementById("return-to-menu-btn")
    .addEventListener("click", () => {
        showScreen("mainMenu");
    });


document
    .getElementById("return-to-home-btn")
    .addEventListener("click", () => {
        showScreen("home");
    });


/* =========================
   HOW TO PLAY
   ========================= */

document
    .getElementById("close-how-to-play-btn")
    .addEventListener("click", () => {
        showScreen(previousScreen);
    });


/* =========================
   GAME SETTINGS
   ========================= */

document
    .getElementById("close-game-settings-btn")
    .addEventListener("click", () => {
        showScreen(previousScreen);
    });


document
    .querySelectorAll(".game-choice")
    .forEach(button => {
        button.addEventListener("click", () => {
            const setting = button.dataset.setting;

            document
                .querySelectorAll(
                    `.game-choice[data-setting="${setting}"]`
                )
                .forEach(choice => {
                    choice.classList.remove("selected");
                });

            button.classList.add("selected");
        });
    });


document
    .getElementById("house-rules-btn")
    .addEventListener("click", () => {
        previousScreen = "gameSettings";
        showScreen("houseRules");
    });


/* =========================
   HOUSE RULES
   ========================= */

document
    .getElementById("close-house-rules-btn")
    .addEventListener("click", () => {
        showScreen(previousScreen);
    });


document
    .querySelectorAll(".toggle")
    .forEach(toggle => {
        toggle.addEventListener("click", () => {
            toggle.classList.toggle("on");
        });
    });


/* =========================
   PHYSICAL BUTTON FEEL
   ========================= */

document
    .querySelectorAll("button")
    .forEach(button => {

        button.addEventListener("touchstart", () => {
            button.classList.add("pressed");
        }, { passive: true });

        button.addEventListener("touchend", () => {
            button.classList.remove("pressed");
        }, { passive: true });

        button.addEventListener("touchcancel", () => {
            button.classList.remove("pressed");
        }, { passive: true });
    });
