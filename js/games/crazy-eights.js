"use strict";


/* =========================
   Crazy Eights Card Data
   ========================= */

const CRAZY_EIGHTS_SUITS = [
    "spades",
    "hearts",
    "clubs",
    "diamonds"
];

const CRAZY_EIGHTS_RANKS = [
    "ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "jack",
    "queen",
    "king"
];


/* =========================
   Create a Standard Deck
   ========================= */

function createCrazyEightsDeck() {

    const deck = [];

    for (const suit of CRAZY_EIGHTS_SUITS) {

        for (const rank of CRAZY_EIGHTS_RANKS) {

            deck.push({
                suit,
                rank
            });

        }

    }

    return deck;
}


/* =========================
   Shuffle
   ========================= */

function shuffleDeck(deck) {

    const shuffledDeck = [...deck];

    for (
        let index = shuffledDeck.length - 1;
        index > 0;
        index--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() * (index + 1)
            );

        [
            shuffledDeck[index],
            shuffledDeck[randomIndex]
        ] = [
            shuffledDeck[randomIndex],
            shuffledDeck[index]
        ];

    }

    return shuffledDeck;
}


/* =========================
   Card Values
   ========================= */

function getCrazyEightsCardValue(card) {

    if (card.rank === "8") {
        return 50;
    }

    if (
        card.rank === "10" ||
        card.rank === "jack" ||
        card.rank === "queen" ||
        card.rank === "king"
    ) {
        return 10;
    }

    if (card.rank === "ace") {
        return 1;
    }

    return Number(card.rank);
}


/* =========================
   Basic Card Matching
   ========================= */

/*
   This function represents the
   standard Bicycle rules.

   An 8 can always be played.

   Otherwise, the card must match
   the current suit or rank.
*/

function canPlayCrazyEightsCard(
    card,
    topCard,
    activeSuit = null
) {

    if (card.rank === "8") {
        return true;
    }

    if (activeSuit !== null) {
        return card.suit === activeSuit;
    }

    return (
        card.suit === topCard.suit ||
        card.rank === topCard.rank
    );
}


/* =========================
   Standard Crazy Eights
   Rules
   ========================= */

const CRAZY_EIGHTS_DEFAULT_RULES = {
    cardsDealt: 5,

    allowDrawingWhenPlayable: true,

    drawUntilPlayable: true,

    eightIsWild: true,

    aceReverses: false,

    twoDrawsTwo: false,

    queenSkips: false,

    stackDrawTwos: false,

    multipleSameRank: false
};


/* =========================
   Crazy Eights Game Factory
   ========================= */

function createCrazyEightsGame(
    options = {}
) {

    const rules = {
        ...CRAZY_EIGHTS_DEFAULT_RULES,
        ...options
    };

    return {
        rules,

        deck: [],

        stock: [],

        discardPile: [],

        playerHand: [],

        aiHand: [],

        currentPlayer: "player",

        activeSuit: null,

        status: "not-started"
    };
}
