"use strict";

console.log("Classic Cards initialized.");


/* =========================
   Screen Navigation
   ========================= */

const screens = {
    home: document.getElementById("home-screen"),
    mainMenu: document.getElementById("main-menu")
};

function showScreen(screen) {
    Object.values(screens).forEach(currentScreen => {
        currentScreen.hidden = currentScreen !== screen;
    });
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
