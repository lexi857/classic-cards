"use strict";

console.log("Classic Cards initialized.");


/* =========================
   Screen Navigation
   ========================= */

const screens = {
    home: document.getElementById("home-screen"),
    mainMenu: document.getElementById("main-menu"),
    crazyEights: document.getElementById("crazy-eights-screen"),
    crazyEightsInGameSettings:
        document.getElementById("crazy-eights-in-game-settings"),
    crazyEightsGameSettings:
        document.getElementById("crazy-eights-game-settings")
};


function showScreen(screenToShow) {

    Object.values(screens).forEach(screen => {
        screen.classList.remove("active-screen");
    });

    screenToShow.classList.add("active-screen");

    window.scrollTo(0, 0);
}


/* =========================
   Button Navigation
   ========================= */

document.addEventListener("click", event => {

    const button = event.target.closest("button");

    if (!button) {
        return;
    }


    /* Home → Main Menu */

    if (button.id === "single-player-button") {
        showScreen(screens.mainMenu);
        return;
    }


    /* Main Menu → Crazy Eights */

    if (
        button.classList.contains("game-button") &&
        button.dataset.game === "crazy-eights"
    ) {
        showScreen(screens.crazyEights);
        return;
    }


    /* Main Menu → Crazy Eights Game Settings */

    if (
        button.classList.contains("game-settings-button") &&
        button.dataset.game === "crazy-eights"
    ) {
        showScreen(screens.crazyEightsGameSettings);
        return;
    }


    /* Crazy Eights → In-Game Settings */

    if (button.id === "crazy-eights-settings-button") {
        showScreen(screens.crazyEightsInGameSettings);
        return;
    }


    /* Crazy Eights → Main Menu */

    if (button.id === "crazy-eights-return-button") {
        showScreen(screens.mainMenu);
        return;
    }


    /* In-Game Settings → Crazy Eights */

    if (button.id === "crazy-eights-settings-close") {
        showScreen(screens.crazyEights);
        return;
    }


    /* In-Game Settings → Game Settings */

    if (button.id === "game-settings-button") {
        showScreen(screens.crazyEightsGameSettings);
        return;
    }


    /* In-Game Settings → Main Menu */

    if (button.id === "return-to-menu-button") {
        showScreen(screens.mainMenu);
        return;
    }


    /* In-Game Settings → Home */

    if (button.id === "return-to-home-button") {
        showScreen(screens.home);
        return;
    }


    /* Game Settings → In-Game Settings */

    if (button.id === "crazy-eights-game-settings-close") {
        showScreen(screens.crazyEightsInGameSettings);
        return;
    }

});


/* =========================
   Setting Choices
   ========================= */

document.addEventListener("click", event => {

    const button = event.target.closest(".choice-button");

    if (!button) {
        return;
    }

    const setting = button.dataset.setting;

    document
        .querySelectorAll(
            `.choice-button[data-setting="${setting}"]`
        )
        .forEach(otherButton => {
            otherButton.classList.remove("selected");
        });

    button.classList.add("selected");

});


/* =========================
   Physical Button Interaction
   ========================= */

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("pointerdown", () => {
        button.classList.add("pressed");
    });

    const releaseButton = () => {
        button.classList.remove("pressed");
    };

    button.addEventListener("pointerup", releaseButton);
    button.addEventListener("pointercancel", releaseButton);
    button.addEventListener("pointerleave", releaseButton);

});
