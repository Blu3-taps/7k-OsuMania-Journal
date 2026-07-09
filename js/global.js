//---------------------------------------//
//     Loading and Transition Screen     //
//---------------------------------------//
const scriptSrc = document.currentScript.src;
const BASE_PATH = new URL(scriptSrc).pathname.split("/js/")[0];

const loadingScreen = document.createElement("div"); // Loading screen overlay background
loadingScreen.id = "page-loading-screen";

const loadingIcon = document.createElement("img"); // Loading screen icon
loadingIcon.src = BASE_PATH + "/Images/Loading_Icon.png";
loadingIcon.alt = "";
loadingIcon.id = "page-loading-icon";

const loadingMessage = document.createElement("p"); // Loading screen text
loadingMessage.id = "page-loading-message";

const FADE_DURATION = 300;
const CHIME_SHAKE_DURATION = 1000;
const STATUS_TIMER = 5000;
const TIMEOUT_TIMER = 15000;

let displayStatusMessage = null;
let displayTimeoutMessage = null;

function createOverlay() { // Creates the loading screen
    loadingScreen.appendChild(loadingIcon); // Puts the loading screen icon on the loading screen
    loadingScreen.appendChild(loadingMessage); // Puts the loading screen message on the loading screen
    document.body.prepend(loadingScreen); // Add loading screen element to body

    const isNavigating = sessionStorage.getItem("navigating");

    if (isNavigating) {
        const startTime = parseInt(sessionStorage.getItem("navigationStartTime"), 10);
        const elapsedMs = Date.now() - startTime;
        const offsetMs = elapsedMs % CHIME_SHAKE_DURATION;

        loadingScreen.style.opacity = "1";
        loadingScreen.style.pointerEvents = "auto";
        loadingIcon.style.animationDelay = `-${offsetMs}ms`; // Start the animation where it left off on previous page
        loadingIcon.classList.add("is-loading");

        // Restart timer for loading functions on the new page based on remaining time left from previous page
        displayStatusMessage = setTimeout(() => {
            loadingMessage.textContent = "Taking longer than usual...";
            loadingMessage.style.opacity = "1";
        }, STATUS_TIMER - elapsedMs);

        displayTimeoutMessage = setTimeout(() => {
            loadingMessage.textContent = "Timed out, returning...";
            loadingIcon.style.animationPlayState = "paused";
            setTimeout(() => {
                history.back();
                fadeOutLoadingScreen();
            }, 1000)
        }, TIMEOUT_TIMER - elapsedMs);
    }
}

function fadeOutLoadingScreen() { // Fade out the loading screen and clear any running processes
    loadingScreen.style.opacity = "0";

    sessionStorage.removeItem("navigating");
    sessionStorage.removeItem("transitionStartTime");

    clearTimeout(displayStatusMessage);
    clearTimeout(displayTimeoutMessage);

    setTimeout(() => {
        loadingScreen.style.pointerEvents = "none";
        loadingIcon.classList.remove("is-loading");
    }, FADE_DURATION);
}

createOverlay();

document.addEventListener("click", function(event) { // Start the loading screen if an internal navigation link is clicked
    const link = event.target.closest("a");
    if (!link) return;

    const destination = new URL(link.href, window.location.href);
    const current = window.location;

    if (destination.hash !== "" && destination.pathname === current.pathname) return; // If navigating to a # link on the same page, loading isn't triggered

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
    sessionStorage.setItem("navigationStartTime", Date.now());

    // Start navigation and timer for loading functions after loading screen fully fades in
    setTimeout(() => {
        window.location.href = destination.href;

        displayStatusMessage = setTimeout(() => {
            loadingMessage.textContent = "Taking longer than usual...";
            loadingMessage.style.opacity = "1";
        }, STATUS_TIMER);

        displayTimeoutMessage = setTimeout(() => {
            loadingMessage.textContent = "Timed out, returning...";
            loadingIcon.style.animationPlayState = "paused";
            setTimeout(() => {
                window.stop();
                fadeOutLoadingScreen();
            }, 1000);
        }, TIMEOUT_TIMER);
    }, FADE_DURATION);
});

window.addEventListener("load", fadeOutLoadingScreen); // When page is loaded, remove the loading screen