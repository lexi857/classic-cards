"use strict";

console.log("Classic Cards initialized.");


/* =========================
   Screens
   ========================= */

const screens = {
    home: document.getElementById("home-screen"),
    mainMenu: document.getElementById("main-menu"),
    crazyEights: document.getElementById("crazy-eights-screen"),
    crazyEightsInGameSettings:
        document.getElementById("crazy-eights-in-game-settings"),
    crazyEightsGameSettings:
        document.getElementById("crazy-eights-game-settings"),
    crazyEightsHowToPlay:
        document.getElementById("crazy-eights-how-to-play"),
    crazyEightsHouseRules:
        document.getElementById("crazy-eights-house-rules")
};


/* =========================
   Navigation State
   ========================= */

/*
   These remember where certain settings
   screens were opened from.

   Game Settings:
   - "menu"
   - "game"

   House Rules:
   - "game-settings"
   - "in-game-settings"
*/

let gameSettingsOpenedFrom = "menu";
let houseRulesOpenedFrom = "game-settings";


/* =========================
   Screen Display
   ========================= */

function showScreen(screen) {

    Object.values(screens).forEach(currentScreen => {
        currentScreen.classList.remove("active-screen");
    });

    screen.classList.add("active-screen");

    window.scrollTo(0, 0);
}


/* =========================
   Navigation Helpers
   ========================= */

function openGameSettings(source) {

    gameSettingsOpenedFrom = source;

    showScreen(
        screens.crazyEightsGameSettings
    );
}


function openHouseRules(source) {

    houseRulesOpenedFrom = source;

    showScreen(
        screens.crazyEightsHouseRules
    );
}


function closeGameSettings() {

    if (gameSettingsOpenedFrom === "menu") {

        showScreen(
            screens.mainMenu
        );

    } else {

        showScreen(
            screens.crazyEights
        );

    }
}


function closeHouseRules() {

    if (houseRulesOpenedFrom === "game-settings") {

        showScreen(
            screens.crazyEightsGameSettings
        );

    } else {

        showScreen(
            screens.crazyEightsInGameSettings
        );

    }
}


/* =========================
   Main Navigation
   ========================= */

document.addEventListener("click", event => {

    const button = event.target.closest("button");

    if (!button) {
        return;
    }


    /* =========================
       Home
       ========================= */

    if (button.id === "single-player-button") {

        showScreen(
            screens.mainMenu
        );

        return;
    }


    /* =========================
       Main Menu
       ========================= */

    if (
        button.classList.contains("game-button") &&
        button.dataset.game === "crazy-eights"
    ) {

        showScreen(
            screens.crazyEights
        );

        return;
    }


    if (
        button.classList.contains("game-settings-button") &&
        button.dataset.game === "crazy-eights"
    ) {

        openGameSettings("menu");

        return;
    }


    /* =========================
       Crazy Eights Game
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
       In-Game Settings
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

        openGameSettings("game");

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

            openHouseRules(
                "game-settings"
            );

        } else {

            openHouseRules(
                "in-game-settings"
            );

        }

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
       How To Play
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
       House Rules
       ========================= */

    if (
        button.id ===
        "crazy-eights-house-rules-close"
    ) {

        closeHouseRules();

        return;
    }


    /* =========================
       Game Settings
       ========================= */

    if (
        button.id ===
        "crazy-eights-game-settings-close"
    ) {

        closeGameSettings();

        return;
    }

});


/* =========================
   Choice Buttons
   ========================= */

document.addEventListener("click", event => {

    const button =
        event.target.closest(".choice-button");

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
        event.target.closest(".toggle-button");

    if (!button) {
        return;
    }

    const isOn =
        button.getAttribute("aria-pressed") === "true";

    const newState = !isOn;

    button.setAttribute(
        "aria-pressed",
        String(newState)
    );

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

    const ruleName =
        button.dataset.houseRule;

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


/* =========================
   Service Worker
   ========================= */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./sw.js")
            .then(() => {

                console.log(
                    "Classic Cards service worker registered."
                );

            })
            .catch(error => {

                console.error(
                    "Classic Cards service worker registration failed:",
                    error
                );

            });

    });

}
