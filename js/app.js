"use strict";

console.log("Classic Cards initialized.");


/* =========================
   Screen Navigation
   ========================= */

const screens = {
    home: document.getElementById("home-screen"),
    mainMenu: document.getElementById("main-menu"),
    crazyEights: document.getElementById("crazy-eights-screen")
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
