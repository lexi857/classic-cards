"use strict";

console.log("Classic Cards initialized.");


/* =========================
   Screen Navigation
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
   Navigation History
   ========================= */

/*
   This stores the screens we came from.

   Example:

   Main Menu
       ↓
   Game Settings
       ↓
   House Rules

   House Rules → X
       ↓
   Game Settings

   Game Settings → X
       ↓
   Main Menu
*/

let navigationHistory = [];


/* =========================
   Show Screen
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
   Navigate Forward
   ========================= */

function navigateTo(screenToShow) {

    const currentScreen =
        Object.values(screens).find(
            screen =>
                screen.classList.contains(
                    "active-screen"
                )
        );

    if (
        currentScreen &&
        currentScreen !== screenToShow
    ) {

        navigationHistory.push(
            currentScreen
        );

    }

    showScreen(screenToShow);
}


/* =========================
   Navigate Back
   ========================= */

function navigateBack() {

    const previousScreen =
        navigationHistory.pop();

    if (previousScreen) {

        showScreen(previousScreen);

    }

}


/* =========================
   Navigation
   ========================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest("button");

        if (!button) {
            return;
        }


        /* =========================
           Home → Main Menu
           ========================= */

        if (
            button.id ===
            "single-player-button"
        ) {

            navigationHistory = [];

            navigateTo(
                screens.mainMenu
            );

            return;
        }


        /* =========================
           Main Menu → Crazy Eights
           ========================= */

        if (
            button.classList.contains(
                "game-button"
            ) &&
            button.dataset.game ===
                "crazy-eights"
        ) {

            navigateTo(
                screens.crazyEights
            );

            return;
        }


        /* =========================
           Main Menu → Crazy Eights
           Game Settings
           ========================= */

        if (
            button.classList.contains(
                "game-settings-button"
            ) &&
            button.dataset.game ===
                "crazy-eights"
        ) {

            navigateTo(
                screens.crazyEightsGameSettings
            );

            return;
        }


        /* =========================
           Crazy Eights → In-Game Settings
           ========================= */

        if (
            button.id ===
            "crazy-eights-settings-button"
        ) {

            navigateTo(
                screens.crazyEightsInGameSettings
            );

            return;
        }


        /* =========================
           Crazy Eights → Main Menu
           ========================= */

        if (
            button.id ===
            "crazy-eights-return-button"
        ) {

            navigationHistory = [];

            showScreen(
                screens.mainMenu
            );

            return;
        }


        /* =========================
           In-Game Settings → How To Play
           ========================= */

        if (
            button.id ===
            "how-to-play-button"
        ) {

            navigateTo(
                screens.crazyEightsHowToPlay
            );

            return;
        }


        /* =========================
           How To Play → Previous Screen
           ========================= */

        if (
            button.id ===
            "crazy-eights-how-to-play-close"
        ) {

            navigateBack();

            return;
        }


        /* =========================
           In-Game Settings → House Rules
           ========================= */

        if (
            button.id ===
            "crazy-eights-house-rules-button"
        ) {

            navigateTo(
                screens.crazyEightsHouseRules
            );

            return;
        }


        /* =========================
           House Rules → Previous Screen
           ========================= */

        if (
            button.id ===
            "crazy-eights-house-rules-close"
        ) {

            navigateBack();

            return;
        }


        /* =========================
           In-Game Settings → Previous Screen
           ========================= */

        if (
            button.id ===
            "crazy-eights-settings-close"
        ) {

            navigateBack();

            return;
        }


        /* =========================
           In-Game Settings → Game Settings
           ========================= */

        if (
            button.id ===
            "game-settings-button"
        ) {

            navigateTo(
                screens.crazyEightsGameSettings
            );

            return;
        }


        /* =========================
           In-Game Settings → Main Menu
           ========================= */

        if (
            button.id ===
            "return-to-menu-button"
        ) {

            navigationHistory = [];

            showScreen(
                screens.mainMenu
            );

            return;
        }


        /* =========================
           In-Game Settings → Home
           ========================= */

        if (
            button.id ===
            "return-to-home-button"
        ) {

            navigationHistory = [];

            showScreen(
                screens.home
            );

            return;
        }


        /* =========================
           Game Settings → Previous Screen
           ========================= */

        if (
            button.id ===
            "crazy-eights-game-settings-close"
        ) {

            navigateBack();

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
            .forEach(otherButton => {

                otherButton.classList.remove(
                    "selected"
                );

            });

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
