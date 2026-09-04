"use strict";

console.log("Classic Cards initialized.");


/* =========================
   Screens
   ========================= */

const screens = {
    home: document.getElementById("home-screen"),

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
        screen.classList.remove("active-screen");
    });

    screenToShow.classList.add("active-screen");

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


/* =========================
   Create A Deck
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
            Math.floor(Math.random() * (i + 1));

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
        shuffleDeck(createDeck());

    const playerHand = [];
    const computerHand = [];

    for (let i = 0; i < 5; i++) {

        playerHand.push(
            deck.pop()
        );

        computerHand.push(
            deck.pop()
        );

    }

    const stock = deck;

    const discardPile = [
        stock.pop()
    ];

    console.log(
        "Player hand:",
        playerHand
    );

    console.log(
        "Computer hand:",
        computerHand
    );

    console.log(
        "Stock:",
        stock
    );

    console.log(
        "Discard pile:",
        discardPile
    );

    return {
        playerHand,
        computerHand,
        stock,
        discardPile
    };
}


/* =========================
   Current Game
   ========================= */

let currentGame = null;


/* =========================
   Start Crazy Eights
   ========================= */

function startCrazyEights() {

    currentGame =
        dealCards();

    showScreen(
        screens.crazyEights
    );

}


/* =========================
   Navigation
   ========================= */

document.addEventListener("click", event => {

    const button =
        event.target.closest("button");

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
        button.classList.contains("game-button") &&
        button.dataset.game === "crazy-eights"
    ) {

        startCrazyEights();

        return;
    }


    if (
        button.classList.contains("game-settings-button") &&
        button.dataset.game === "crazy-eights"
    ) {

        gameSettingsOpenedFrom = "menu";

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


    if (
        button.id ===
        "crazy-eights-return-button"
    ) {

        showScreen(
            screens.mainMenu
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

        gameSettingsOpenedFrom = "game";

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
                .contains("active-screen")
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

});


/* =========================
   Choice Buttons
   ========================= */

document.addEventListener("click", event => {

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
        .forEach(otherButton => {

            otherButton.classList.remove(
                "selected"
            );

        });

    button.classList.add(
        "selected"
    );

});


/* =========================
   House Rule Toggles
   ========================= */

document.addEventListener("click", event => {

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

});


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
