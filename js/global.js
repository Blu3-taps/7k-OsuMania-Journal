//---------------------------------------//
//     Loading and Transition Screen     //
//---------------------------------------//
const scriptSrc = document.currentScript.src;
const BASE_PATH = new URL(scriptSrc).pathname.split("/js/")[0];

const mainContainer = document.querySelector(".container");
const pageTitle = document.querySelector(".page-title");

const loadingScreen = document.createElement("div"); // Loading screen overlay background
loadingScreen.classList.add("page-loading-screen");

const loadingIcon = document.createElement("img"); // Loading screen icon
loadingIcon.src = BASE_PATH + "/Images/Loading_Icon.png";
loadingIcon.alt = "";
loadingIcon.classList.add("page-loading-icon");

const loadingSkipButton = document.createElement("button");
loadingSkipButton.textContent = "Skip loading";
loadingSkipButton.classList.add("page-loading-skip-button");
loadingSkipButton.addEventListener("click", fadeOutLoadingScreen);

const loadingMessage = document.createElement("p"); // Loading screen text
loadingMessage.classList.add("page-loading-message");

const FADE_DURATION = 300;
const CHIME_SHAKE_DURATION = 1000;
const NAV_SLOW_MESSAGE_TIMER = 5000;
const NAV_TIMEOUT_TIMER = 15000;
const ASSETS_LOADING_TIMER = 2000;
const ASSETS_SKIP_PROMPT_TIMER = 10000;

let displaySlowNavMessage = null;
let displayTimeoutMessage = null;
let displayAssetLoadingMessage = null;
let displaySkipPromptMessage = null;

function createOverlay() { // Creates the loading screen
    loadingScreen.appendChild(loadingIcon); // Puts the loading screen icon on the loading screen
    loadingScreen.appendChild(loadingMessage); // Puts the loading screen message on the loading screen
    loadingScreen.appendChild(loadingSkipButton);
    document.body.prepend(loadingScreen); // Add loading screen element to body

    const isNavigating = sessionStorage.getItem("navigating");

    if (isNavigating) {
        const startTime = parseInt(sessionStorage.getItem("navigationStartTime"), 10);
        const elapsedMs = Date.now() - startTime;
        const offsetMs = elapsedMs % CHIME_SHAKE_DURATION;

        mainContainer.inert = true;
        loadingScreen.style.opacity = "1";
        loadingScreen.style.pointerEvents = "auto";
        loadingIcon.style.animationDelay = `-${offsetMs}ms`; // Start the animation where it left off on previous page
        loadingIcon.classList.add("is-loading");

        // Restart timer for loading functions on the new page based on remaining time left from previous page
        displayAssetLoadingMessage = setTimeout(() => {
            loadingMessage.textContent = "Loading Assets...";
            loadingMessage.style.opacity = "1";
        }, ASSETS_LOADING_TIMER);

        displayTimeoutMessage = setTimeout(() => {
            loadingMessage.textContent = "Still loading...Skip ahead?";
            loadingSkipButton.classList.add("active");
        }, ASSETS_SKIP_PROMPT_TIMER);
    }
}

function fadeOutLoadingScreen() { // Fade out the loading screen and clear any running processes
    loadingScreen.style.opacity = "0";

    // Trigger the page title reveal animation only when
    // page has fully loaded and when fading out
    if (pageTitle) {
        pageTitle.classList.add("reveal");
    }

    sessionStorage.removeItem("navigating");
    sessionStorage.removeItem("transitionStartTime");

    clearTimeout(displayAssetLoadingMessage);
    clearTimeout(displayTimeoutMessage);

    setTimeout(() => {
        mainContainer.inert = false;
        loadingScreen.style.pointerEvents = "none";
        loadingIcon.classList.remove("is-loading");
        loadingSkipButton.classList.remove("active");
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
    if (link.hasAttribute("download")) return;

    event.preventDefault(); // Stops link from navigating instantly

    mainContainer.inert = true;
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
        window.location.replace(destination.href);

        displaySlowNavMessage = setTimeout(() => {
            loadingMessage.textContent = "Taking longer than usual...";
            loadingMessage.style.opacity = "1";
        }, NAV_SLOW_MESSAGE_TIMER);

        displayTimeoutMessage = setTimeout(() => {
            loadingMessage.textContent = "Timed out, returning...";
            loadingIcon.style.animationPlayState = "paused";
            setTimeout(() => {
                window.stop();
                fadeOutLoadingScreen();
            }, 1000);
        }, NAV_TIMEOUT_TIMER);
    }, FADE_DURATION);
});

window.addEventListener("load", fadeOutLoadingScreen); // When page is loaded, remove the loading screen