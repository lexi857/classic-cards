"use strict";

console.log("Classic Cards initialized.");


/* =========================
   Screens
   ========================= */

const screens = {

    home:
        document.getElementById("home-screen"),

    mainMenu:
        document.getElementById("main-menu"),

    crazyEights:
        document.getElementById("crazy-eights-screen"),

    crazyEightsInGameSettings:
        document.getElementById(
            "crazy-eights-in-game-settings"
        ),

    crazyEightsGameSettings:
        document.getElementById(
            "crazy-eights-game-settings"
        ),

    crazyEightsHowToPlay:
        document.getElementById(
            "crazy-eights-how-to-play"
        ),

    crazyEightsHouseRules:
        document.getElementById(
            "crazy-eights-house-rules"
        )
};


/* =========================
   Settings Route Memory
   ========================= */

let gameSettingsOpenedFrom = "menu";

let houseRulesOpenedFrom = "game-settings";


/* =========================
   Screen Display
   ========================= */

function showScreen(screenToShow) {

    Object.values(screens).forEach(screen => {

        screen.classList.remove(
            "active-screen"
        );

    });

    screenToShow.classList.add(
        "active-screen"
    );

    window.scrollTo(0, 0);
}


/* =========================
   Crazy Eights Game Data
   ========================= */

const suits = [
    "Hearts",
    "Diamonds",
    "Clubs",
    "Spades"
];

const ranks = [
    "Ace",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Jack",
    "Queen",
    "King"
];

const suitSymbols = {

    Hearts: "♥",

    Diamonds: "♦",

    Clubs: "♣",

    Spades: "♠"

};


/* =========================
   Create Deck
   ========================= */

function createDeck() {

    const deck = [];

    suits.forEach(suit => {

        ranks.forEach(rank => {

            deck.push({
                suit: suit,
                rank: rank
            });

        });

    });

    return deck;
}


/* =========================
   Shuffle Deck
   ========================= */

function shuffleDeck(deck) {

    for (
        let i = deck.length - 1;
        i > 0;
        i--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            deck[i],
            deck[randomIndex]
        ] = [
            deck[randomIndex],
            deck[i]
        ];

    }

    return deck;
}


/* =========================
   Deal Cards
   ========================= */

function dealCards() {

    const deck =
        shuffleDeck(
            createDeck()
        );

    const playerHand = [];

    const opponentHand = [];

    for (let i = 0; i < 5; i++) {

        playerHand.push(
            deck.pop()
        );

        opponentHand.push(
            deck.pop()
        );

    }

    const stock = deck;

    const discardPile = [
        stock.pop()
    ];

    return {

        playerHand,

        opponentHand,

        stock,

        discardPile

    };
}


/* =========================
   Current Game
   ========================= */

let currentGame = null;


/* =========================
   Create Card Front
   ========================= */

function createCardElement(card) {

    const cardElement =
        document.createElement("div");

    cardElement.classList.add(
        "card"
    );


    if (
        card.suit === "Hearts" ||
        card.suit === "Diamonds"
    ) {

        cardElement.classList.add(
            "red"
        );

    }


    /* Top-left corner */

    const topLeft =
        document.createElement("div");

    topLeft.classList.add(
        "card-corner",
        "top-left"
    );


    const topLeftRank =
        document.createElement("span");

    topLeftRank.classList.add(
        "card-corner-rank"
    );

    topLeftRank.textContent =
        getRankSymbol(card.rank);


    const topLeftSuit =
        document.createElement("span");

    topLeftSuit.classList.add(
        "card-corner-suit"
    );

    topLeftSuit.textContent =
        suitSymbols[card.suit];


    topLeft.appendChild(
        topLeftRank
    );

    topLeft.appendChild(
        topLeftSuit
    );


    /* Center suit */

    const center =
        document.createElement("div");

    center.classList.add(
        "card-center"
    );

    center.textContent =
        suitSymbols[card.suit];


    /* Bottom-right corner */

    const bottomRight =
        document.createElement("div");

    bottomRight.classList.add(
        "card-corner",
        "bottom-right"
    );


    const bottomRightRank =
        document.createElement("span");

    bottomRightRank.classList.add(
        "card-corner-rank"
    );

    bottomRightRank.textContent =
        getRankSymbol(card.rank);


    const bottomRightSuit =
        document.createElement("span");

    bottomRightSuit.classList.add(
        "card-corner-suit"
    );

    bottomRightSuit.textContent =
        suitSymbols[card.suit];


    bottomRight.appendChild(
        bottomRightRank
    );

    bottomRight.appendChild(
        bottomRightSuit
    );


    cardElement.appendChild(
        topLeft
    );

    cardElement.appendChild(
        center
    );

    cardElement.appendChild(
        bottomRight
    );


    return cardElement;
}


/* =========================
   Card Rank Display
   ========================= */

function getRankSymbol(rank) {

    const symbols = {

        Ace: "A",

        Two: "2",

        Three: "3",

        Four: "4",

        Five: "5",

        Six: "6",

        Seven: "7",

        Eight: "8",

        Nine: "9",

        Ten: "10",

        Jack: "J",

        Queen: "Q",

        King: "K"

    };

    return symbols[rank];
}


/* =========================
   Create Card Back
   ========================= */

function createCardBackElement() {

    const cardElement =
        document.createElement("div");

    cardElement.classList.add(
        "card",
        "card-back"
    );


    const inner =
        document.createElement("div");

    inner.classList.add(
        "card-back-inner"
    );


    const logo =
        document.createElement("div");

    logo.classList.add(
        "card-back-logo"
    );


    const symbols = [
        "♠",
        "♥",
        "♣",
        "♦"
    ];


    symbols.forEach(symbol => {

        const suit =
            document.createElement("span");

        suit.textContent =
            symbol;

        logo.appendChild(
            suit
        );

    });


    inner.appendChild(
        logo
    );

    cardElement.appendChild(
        inner
    );


    return cardElement;
}


/* =========================
   Render Game
   ========================= */

function renderGame() {

    if (!currentGame) {
        return;
    }


    const playerHand =
        document.getElementById(
            "player-hand"
        );

    const opponentHand =
        document.getElementById(
            "computer-hand"
        );

    const stockPile =
        document.getElementById(
            "stock-pile"
        );

    const discardPile =
        document.getElementById(
            "discard-pile"
        );


    /* Clear existing cards */

    playerHand.innerHTML = "";

    opponentHand.innerHTML = "";

    stockPile.innerHTML = "";

    discardPile.innerHTML = "";


    /* Player hand */

    currentGame.playerHand.forEach(card => {

        playerHand.appendChild(
            createCardElement(card)
        );

    });


    /* Opponent hand */

    currentGame.opponentHand.forEach(() => {

        opponentHand.appendChild(
            createCardBackElement()
        );

    });


    /* Stock */

    if (
        currentGame.stock.length > 0
    ) {

        stockPile.appendChild(
            createCardBackElement()
        );

    }


    /* Discard pile */

    const topDiscard =
        currentGame.discardPile[
            currentGame.discardPile.length - 1
        ];


    if (topDiscard) {

        discardPile.appendChild(
            createCardElement(
                topDiscard
            )
        );

    }

}


/* =========================
   Start Crazy Eights
   ========================= */

function startCrazyEights() {

    currentGame =
        dealCards();

    renderGame();

    showScreen(
        screens.crazyEights
    );

}


/* =========================
   Navigation
   ========================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "button"
            );

        if (!button) {
            return;
        }


        /* =========================
           HOME
           ========================= */

        if (
            button.id ===
            "single-player-button"
        ) {

            showScreen(
                screens.mainMenu
            );

            return;
        }


        /* =========================
           MAIN MENU
           ========================= */

        if (
            button.classList.contains(
                "game-button"
            ) &&
            button.dataset.game ===
                "crazy-eights"
        ) {

            startCrazyEights();

            return;
        }


        if (
            button.classList.contains(
                "game-settings-button"
            ) &&
            button.dataset.game ===
                "crazy-eights"
        ) {

            gameSettingsOpenedFrom =
                "menu";

            showScreen(
                screens.crazyEightsGameSettings
            );

            return;
        }


        /* =========================
           CRAZY EIGHTS GAME
           ========================= */

        if (
            button.id ===
            "crazy-eights-settings-button"
        ) {

            showScreen(
                screens.crazyEightsInGameSettings
            );

            return;
        }


        /* =========================
           IN-GAME SETTINGS
           ========================= */

        if (
            button.id ===
            "how-to-play-button"
        ) {

            showScreen(
                screens.crazyEightsHowToPlay
            );

            return;
        }


        if (
            button.id ===
            "game-settings-button"
        ) {

            gameSettingsOpenedFrom =
                "game";

            showScreen(
                screens.crazyEightsGameSettings
            );

            return;
        }


        if (
            button.id ===
            "crazy-eights-house-rules-button"
        ) {

            if (
                screens.crazyEightsGameSettings
                    .classList
                    .contains(
                        "active-screen"
                    )
            ) {

                houseRulesOpenedFrom =
                    "game-settings";

            } else {

                houseRulesOpenedFrom =
                    "in-game-settings";
            }

            showScreen(
                screens.crazyEightsHouseRules
            );

            return;
        }


        if (
            button.id ===
            "return-to-menu-button"
        ) {

            showScreen(
                screens.mainMenu
            );

            return;
        }


        if (
            button.id ===
            "return-to-home-button"
        ) {

            showScreen(
                screens.home
            );

            return;
        }


        if (
            button.id ===
            "crazy-eights-settings-close"
        ) {

            showScreen(
                screens.crazyEights
            );

            return;
        }


        /* =========================
           HOW TO PLAY
           ========================= */

        if (
            button.id ===
            "crazy-eights-how-to-play-close"
        ) {

            showScreen(
                screens.crazyEightsInGameSettings
            );

            return;
        }


        /* =========================
           HOUSE RULES
           ========================= */

        if (
            button.id ===
            "crazy-eights-house-rules-close"
        ) {

            if (
                houseRulesOpenedFrom ===
                "game-settings"
            ) {

                showScreen(
                    screens.crazyEightsGameSettings
                );

            } else {

                showScreen(
                    screens.crazyEightsInGameSettings
                );

            }

            return;
        }


        /* =========================
           GAME SETTINGS
           ========================= */

        if (
            button.id ===
            "crazy-eights-game-settings-close"
        ) {

            if (
                gameSettingsOpenedFrom ===
                "menu"
            ) {

                showScreen(
                    screens.mainMenu
                );

            } else {

                showScreen(
                    screens.crazyEights
                );

            }

            return;
        }

    }
);


/* =========================
   Choice Buttons
   ========================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".choice-button"
            );

        if (!button) {
            return;
        }

        const setting =
            button.dataset.setting;

        document
            .querySelectorAll(
                `.choice-button[data-setting="${setting}"]`
            )
            .forEach(
                otherButton => {

                    otherButton.classList.remove(
                        "selected"
                    );

                }
            );

        button.classList.add(
            "selected"
        );

    }
);


/* =========================
   House Rule Toggles
   ========================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".toggle-button"
            );

        if (!button) {
            return;
        }

        const isOn =
            button.getAttribute(
                "aria-pressed"
            ) === "true";

        const newState =
            !isOn;

        button.setAttribute(
            "aria-pressed",
            String(newState)
        );

        const ruleName =
            button.dataset.houseRule;

        const labels = {

            "ace-reverse":
                "Ace Reverse",

            "two-draw-two":
                "Two Draw Two",

            "queen-skip":
                "Queen Skip",

            "stack-draw-twos":
                "Stack Draw Twos",

            "multiple-same-rank":
                "Multiple Same Rank"

        };

        button.setAttribute(
            "aria-label",
            `${labels[ruleName]} ${newState ? "On" : "Off"}`
        );

    }
);


/* =========================
   Physical Button Interaction
   ========================= */

document
    .querySelectorAll("button")
    .forEach(button => {

        button.addEventListener(
            "pointerdown",
            () => {

                button.classList.add(
                    "pressed"
                );

            }
        );


        const releaseButton = () => {

            button.classList.remove(
                "pressed"
            );

        };


        button.addEventListener(
            "pointerup",
            releaseButton
        );


        button.addEventListener(
            "pointercancel",
            releaseButton
        );


        button.addEventListener(
            "pointerleave",
            releaseButton
        );

    });
