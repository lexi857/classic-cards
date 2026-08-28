/* =========================
   Physical Button Interaction
   ========================= */

const buttons =
    document.querySelectorAll("button");

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
