//---------------------------------------//
//     Loading and Transition Screen     //
//---------------------------------------//
const scriptSrc = document.currentScript.src;
const BASE_PATH = new URL(scriptSrc).pathname.split("/js/")[0];

const FADE_DURATION = 300;
const CHIME_SHAKE_DURATION = 1600;

let messageTimer = null;
let timeoutTimer = null;

function createOverlay() { // Creates the loading screen
    const loadingScreen = document.createElement("div"); // Loading screen overlay background
    loadingScreen.id = "page-loading-screen";

    const loadingIcon = document.createElement("img"); // Loading screen icon
    loadingIcon.src = BASE_PATH + "/Images/Loading_Icon.png";
    loadingIcon.alt = "";
    loadingIcon.id = "page-loading-icon";

    const loadingMessage = document.createElement("p");
    loadingMessage.id = "page-loading-message";

    loadingScreen.appendChild(loadingIcon); // Puts the loading screen icon on the loading screen
    loadingScreen.appendChild(loadingMessage); // Puts the loading screen message on the loading screen
    document.body.prepend(loadingScreen); // Add loading screen element to body

    const isNavigating = sessionStorage.getItem("navigating");

    if (isNavigating) {
        const startTime = parseInt(sessionStorage.getItem("transitionStartTime"), 10);
        const elapsedMs = Date.now() - startTime;
        const offsetMs = elapsedMs % CHIME_SHAKE_DURATION;

        loadingIcon.style.animationDelay = `-${offsetMs}ms`; 
        loadingIcon.classList.add("is-loading");
        loadingScreen.style.opacity = "1";
        loadingScreen.style.pointerEvents = "auto";
    }
}

createOverlay();
const loadingScreen = document.getElementById("page-loading-screen");
const loadingIcon = document.getElementById("page-loading-icon");
const loadingMessage = document.getElementById("page-loading-message");

function fadeOutLoadingScreen() {
    loadingScreen.style.opacity = "0";
    loadingScreen.style.pointerEvents = "none";

    sessionStorage.removeItem("navigating");
    sessionStorage.removeItem("transitionStartTime");

    clearTimeout(messageTimer);
    clearTimeout(timeoutTimer);

    setTimeout(() => {
        loadingIcon.classList.remove("is-loading");
    }, FADE_DURATION);
}

document.addEventListener("click", function(event) { // Start the loading screen if an internal navigation link is clicked
    const link = event.target.closest("a");
    if (!link) return;

    const destination = new URL(link.href, window.location.href);
    const current = window.location;

    if (destination.hostname !== current.hostname) return; // If navigating to external links, loading isn't triggered

    event.preventDefault(); // Stops link from navigating instantly

    loadingScreen.style.opacity = "1";
    loadingScreen.style.pointerEvents = "auto";
    loadingIcon.style.animationDelay = "0s";
    loadingIcon.style.animationPlayState = "running";
    loadingIcon.classList.add("is-loading");
    loadingMessage.textContent = "";
    loadingMessage.style.opacity = "0";

    sessionStorage.setItem("navigating", "true");
    sessionStorage.setItem("transitionStartTime", Date.now());

    setTimeout(() => {
        window.location.href = destination.href;
    }, 300);

    messageTimer = setTimeout(() => {
        loadingMessage.textContent = "Taking longer than usual...";
        loadingMessage.style.opacity = "1";
    }, 5000);

    timeoutTimer = setTimeout(() => {
        loadingMessage.textContent = "Timed out, returning...";
        loadingIcon.style.animationPlayState = "paused";
        setTimeout(() => {
            window.stop();
            fadeOutLoadingScreen();
        }, 1000);
    }, 15000);
});

window.addEventListener("load", fadeOutLoadingScreen); // When page is loaded, remove the loading screen