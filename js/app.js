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
   Home Screen Buttons
   ========================= */

const singlePlayerButton =
    document.getElementById("single-player-button");

singlePlayerButton.addEventListener("click", () => {
    showScreen(screens.mainMenu);
});


/* =========================
   Main Menu Game Buttons
   ========================= */

const crazyEightsButton =
    document.querySelector("#main-menu .game-button");

crazyEightsButton.addEventListener("click", () => {
    showScreen(screens.crazyEights);
});


/* =========================
   Crazy Eights In-Game Settings
   ========================= */

const crazyEightsSettingsButton =
    document.getElementById("crazy-eights-settings-button");

crazyEightsSettingsButton.addEventListener("click", () => {
    showScreen(screens.crazyEightsInGameSettings);
});


const crazyEightsSettingsClose =
    document.getElementById("crazy-eights-settings-close");

crazyEightsSettingsClose.addEventListener("click", () => {
    showScreen(screens.crazyEights);
});


const returnToMenuButton =
    document.getElementById("return-to-menu-button");

returnToMenuButton.addEventListener("click", () => {
    showScreen(screens.mainMenu);
});


const returnToHomeButton =
    document.getElementById("return-to-home-button");

returnToHomeButton.addEventListener("click", () => {
    showScreen(screens.home);
});


const gameSettingsButton =
    document.getElementById("game-settings-button");

gameSettingsButton.addEventListener("click", () => {
    showScreen(screens.crazyEightsGameSettings);
});


const crazyEightsGameSettingsClose =
    document.getElementById("crazy-eights-game-settings-close");

crazyEightsGameSettingsClose.addEventListener("click", () => {
    showScreen(screens.crazyEightsInGameSettings);
});


/* =========================
   Crazy Eights Settings Choices
   ========================= */

const choiceButtons =
    document.querySelectorAll(".choice-button");

choiceButtons.forEach(button => {

    button.addEventListener("click", () => {

        const setting = button.dataset.setting;

        choiceButtons.forEach(otherButton => {

            if (otherButton.dataset.setting === setting) {
                otherButton.classList.remove("selected");
            }

        });

        button.classList.add("selected");
    });

});


/* =========================
   Physical Button Interaction
   ========================= */

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("pointerdown", () => {
        button.classList.add("pressed");
    });

    button.addEventListener("pointerup", () => {
        button.classList.remove("pressed");
    });

    button.addEventListener("pointercancel", () => {
        button.classList.remove("pressed");
    });

    button.addEventListener("pointerleave", () => {
        button.classList.remove("pressed");
    });
});
