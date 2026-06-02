//---------------------------------------//
//          Date Drag Scrolling          //
//---------------------------------------//

// Problems to fix!
// 1. Using the simpler version is slightly better
// There is a small chance for it to snap properly but it still vibrates and still auto scrolls

const carousel = document.querySelector(".date-carousel");
const track = document.querySelector(".selector-track");

const GAP = 64;
const DRAG_THRESHOLD = 5;

let originalDates = [];
let snapOffset = 0;

let xScroll = 0;
let dragScrollX;
let isDragging = false;
let previousX;
let velocity = 0;
let animationId = null;

function buildTrack() { // Make 5 total sets of dates and place them on to the Selector Track (1 orignal + 4 duplicates)
    originalDates = [...track.children];

    for (let count = 0; count < 4; count++) {
        originalDates.forEach(date => {
            const clone = date.cloneNode(true); // duplicates the corresponding date 
            track.appendChild(clone); // Adds the corresponding duplicate to the track
        })
    }

    const step = track.firstElementChild.offsetWidth + GAP;
    const carouselCenter = carousel.offsetWidth / 2;
    const dateCenter = track.firstElementChild.offsetWidth / 2;
    snapOffset = carouselCenter - dateCenter;
    xScroll = -(step * originalDates.length * 2) + snapOffset;

    updatePerspective();
    renderTrack();
    requestAnimationFrame(render3D);
}

function renderTrack() { // Apply and update changes and position of the track
    track.style.transform = `translateX(${xScroll}px)`;
    render3D(); // Applies 3D to the dates
}

function render3D() { // Applies 3D to the dates position on the z-axis based on their distance from the center
    const carouselRect = carousel.getBoundingClientRect();
    const carouselCenter = (carouselRect.left + carouselRect.right) / 2;

    const dates = document.querySelectorAll(".date");

    dates.forEach(date => {
        const dateRect = date.getBoundingClientRect();
        const dateCenter = (dateRect.left + dateRect.right) / 2;

        const centerOffset = dateCenter - carouselCenter;
        const zOffset = Math.max(-(Math.abs(centerOffset)) * 1.5, -600);

        date.style.transform = `translateZ(${zOffset}px)`;
    })
}

function updatePerspective() { // Sets the perspective based on the carousel's width
    carousel.style.perspective = `${carousel.offsetWidth * 3}px`;
}

function recycleDates() { // Shuffle Dates orderly and shift them to the opposite side of the dragging
    const step = track.firstElementChild.offsetWidth + GAP;
    const firstDate = track.firstElementChild;
    const lastDate = track.lastElementChild;

    if (firstDate.getBoundingClientRect().right < carousel.getBoundingClientRect().left - step) {
        track.appendChild(firstDate);
        xScroll += step;

    } else if (lastDate.getBoundingClientRect().left > carousel.getBoundingClientRect().right + step) {
        track.prepend(lastDate);
        xScroll -= step;

    }
}

function findSnapTarget() { // Finds the date closet to the center of the carousel
    const step = track.firstElementChild.offsetWidth + GAP;
    return Math.round((xScroll - snapOffset) / step) * step + snapOffset;
}

function snapToCenter(targetX) { // Slowly moves the track to align the nearest card to the center and "snaps" to it
    if (Math.abs(targetX - xScroll) < 0.5) {
        xScroll = targetX;
        recycleDates();
        renderTrack();
        animationId = null;
        return;
    }

    const t = 0.1;
    xScroll = xScroll + (targetX - xScroll) * t;

    renderTrack();
    animationId = requestAnimationFrame(() => snapToCenter(targetX));
}

function onDragStart(mouseEvent) { // Starts the dragging state and reset values
    mouseEvent.preventDefault();

    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    document.body.style.userSelect = "none";
    velocity = 0;
    isDragging = true;
    dragStartX = mouseEvent.clientX;
    previousX = mouseEvent.clientX;
}

function onDrag(mouseEvent) { // Moves the dates while dragging and tracks velocity
    if (isDragging) {
        const displacement = mouseEvent.clientX - previousX;
        xScroll += displacement;
        velocity = displacement;
        previousX = mouseEvent.clientX;
        console.log(mouseEvent.clientX - dragStartX);

        if (!carousel.classList.contains("dragging") && Math.abs(mouseEvent.clientX - dragStartX) > DRAG_THRESHOLD) {
            carousel.classList.add("dragging"); // .dragging class prevents browser behaviour from interfering
        }

        recycleDates();
        renderTrack();
    }
}

function onDragEnd() { // When dragging stops, applies inertia (Sliding)
    if (!isDragging) return;
    document.body.style.userSelect = "";
    isDragging = false;
    carousel.classList.remove("dragging");

    inertia();
}

function inertia() { // Applies inertial momentum from drag velocity
    velocity *= 0.92;

    if (Math.abs(velocity) < 0.5) {
        animationId = null;
        snapToCenter(findSnapTarget());
        return;
    }

    xScroll += velocity;
    recycleDates();
    renderTrack();

    animationId = requestAnimationFrame(inertia);
}

if (carousel) { // Checks if .carousel exists before initializing
    carousel.addEventListener("mousedown", onDragStart);
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", onDragEnd);
    window.addEventListener("resize", updatePerspective);

    buildTrack();
}

//---------------------------------------//
//            Graphs & Charts            //
//---------------------------------------//
const weekHeaders = document.querySelectorAll(".week-header");
const chart = document.getElementById("chart");

//===== Data Points extracted from the DOM that is used for plotting =====//
const weeks = [];
const performancePoints = [];
const lowerStarRatings = [];
const upperStarRatings = [];

let activeChart = null; // The current chart being displayed

weekHeaders.forEach(header => {
    const week = header.querySelector(".week-title").dataset.week;
    const pp = Number(header.querySelector(".week-stat.pp").dataset.pp);
    const lowerSR = Number(header.querySelector(".week-stat.SR").dataset.lower);
    const upperSR = Number(header.querySelector(".week-stat.SR").dataset.upper);

    weeks.push(week);
    performancePoints.push(pp);
    lowerStarRatings.push(lowerSR);
    upperStarRatings.push(upperSR);
})

const legendConfig = { // Axis label style
    labels: {
        color: "rgba(225, 225, 225, 0.8)"
    }
}

const tooltipConfig = { // Data point tooltip style
    backgroundColor: "rgba(20, 25, 40, 0.9)",
    titleColor: "rgba(225, 225, 225, 0.9)",
    bodyColor: "rgba(225, 225, 225, 0.7)"
}

const axisConfig = { // Background grid style
    ticks: {color: "rgba(225, 225, 225, 0.6)" },
    grid: {color: "rgba(255, 255, 255, 0.05)"},
    border: {color: "rgba(255, 255, 255, 0.1)"}
}

const ppChart = { // Configuration for Performance Point Chart
        type: "line",

        data: {
            labels: weeks,
            datasets: [{
                label: "pp",
                data: performancePoints,
                fill: true,
                backgroundColor: "rgba(100, 160, 255, 0.2)",
                borderColor: "rgba(100, 160, 255, 0.8)",
                tension: 0.4
            }]
        },

        options: {
            responsive: true,

            animation: {duration: 500},

            plugins: {
                legend: legendConfig,
                tooltip: tooltipConfig
            },

            scales: {
                x: axisConfig,
                y: axisConfig
            }

        }
    }

const starRangeChart = { // Configuration for Star Range Chart
        type: "line",

        data: {
            labels: weeks,
            datasets: [
                {
                    label: "Lower ★ Range",
                    data: lowerStarRatings,
                    borderColor: "rgba(100, 180, 255, 0.8)",
                    backgroundColor: "transparent",
                    fill: false,
                },
                {
                    label: "Upper ★ Range",
                    data: upperStarRatings,
                    borderColor: "rgba(255, 100, 100, 0.8)",
                    backgroundColor: "rgba(180, 100, 255, 0.15)",
                    fill: "-1",
                }
            ]
        },

        options: {
            responsive: true,

            animation: {duration: 500},

            plugins: {
                legend: legendConfig,
                tooltip: tooltipConfig
            },

            scales: {
                x: axisConfig,
                y: axisConfig
            }

        }
    }

function switchChart(type) { // Changes the chart according to the type selected
    if (activeChart) {
        activeChart.destroy();
    }

    document.querySelectorAll(".chart-type").forEach(chartType => {
        chartType.classList.remove("active");
    })

    document.querySelector(`[onclick="switchChart('${type}')"]`).classList.add("active");

    if (type == "pp") {
        activeChart = new Chart(chart, ppChart);

    } else if (type == "sr") {
        activeChart = new Chart(chart, starRangeChart);

    }
}

switchChart("pp"); // Initiate Default as pp chart

//---------------------------------------//
//         Callout Functionality         //
//---------------------------------------//
const callouts = document.querySelectorAll(".callout");

callouts.forEach(callout => { // Get all callouts on the page
    const title = callout.querySelector(".callout-title"); // Get the title element in said callout

    if (!title) return;

    title.addEventListener("click", () => { // If callout title is clicked...
        const isOpen = callout.classList.toggle("opened"); 

        if (isOpen) {
            callout.style.height = callout.scrollHeight + "px";
            
        } else {
            const collapsedHeight = 
                title.offsetHeight + 
                parseFloat(getComputedStyle(callout).paddingTop) + 
                parseFloat(getComputedStyle(callout).paddingBottom);

            callout.style.height = collapsedHeight + "px";

        }
    })
});

//---------------------------------------//
//          Difficulty Coloring          //
//---------------------------------------//
const songDifficulties = document.querySelectorAll(".song-difficulty"); // Get all elements with class "song-title"
const weekSR = document.querySelectorAll(".week-stat.SR");

const difficultyAnchors = [0.1, 1.25, 2, 2.5, 3.3, 4.2, 4.9, 5.8, 6.7, 7.7, 9]; // Difficulty Anchor Points
const difficultyColors = [ // Difficulty Anchor Point colors
    '#4290FB', '#4FC0FF', '#4FFFD5', '#7CFF4F',
    '#F6F05C', '#FF8068', '#FF4E6F', '#C645BB',
    '#6563DE', '#18158E', '#000000'
];

const textAnchors = [9.0, 9.9, 10.6, 11.5, 12.4];
const textColors = [
    '#F6F05C', '#FF8068', '#FF4E6F', '#C645B8', '#6563DE'
];

function findInterval(value, anchors) { // Finds the corresponding Index and Boundaries and gets the value
    for (let i = 0; i < anchors.length - 1; i++) {
        const lowerBoundary = anchors[i];
        const upperBoundary = anchors[i + 1];

        if (value >= lowerBoundary && value <= upperBoundary) { // Checks if the difficulty is within the proper range
            return {i, lowerBoundary, upperBoundary};
        } 
    }

    if (value <= anchors[0]) {
        return {i: 0, lowerBoundary: anchors[0], upperBoundary: anchors[0]};
    }

    if (value >= anchors[anchors.length - 1]) {
        const last = anchors.length - 2;
        return {i: last, lowerBoundary: anchors[last], upperBoundary: anchors[last]};
    }
}

function getTextColor(starRating) {
    if (starRating < 6.5) {
        return "0, 0, 0";
    }

    if (starRating <= 9) {
        const rgb = hexToRgb('#F6F05C');
        return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    }

    const {i, lowerBoundary, upperBoundary} = findInterval(starRating, textAnchors);

    const t = (lowerBoundary === upperBoundary)
        ? 1
        : (starRating - lowerBoundary) / (upperBoundary - lowerBoundary);

    const colorLower = hexToRgb(textColors[i]);
    const colorUpper = hexToRgb(textColors[i + 1]);

    const r = lerpGamma(colorLower.r, colorUpper.r, t);
    const g = lerpGamma(colorLower.g, colorUpper.g, t);
    const b = lerpGamma(colorLower.b, colorUpper.b, t);

    return `${r}, ${g}, ${b}`;
}

function hexToRgb(hex) { // Converts hex code to RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return {r, g, b};
}

function gammaCorrect(colorValue, gamma = 2.2) { // Apply Gamma to RGB value
    return Math.pow(colorValue / 255, gamma);
}

function gammaInverse(colorValue, gamma = 2.2) { // Change Gamma back to RGB value
    return Math.pow(colorValue, 1 / gamma) * 255;
}

function lerpGamma(color1, color2, t) { // Linearly interpolate Gamma values and convert back to RGB
    const color1Gamma = gammaCorrect(color1);
    const color2Gamma = gammaCorrect(color2);

    const colorBlended = color1Gamma + (color2Gamma - color1Gamma) * t;

    return gammaInverse(colorBlended);
}

function getDifficultyColor(starRating) {
    const {i, lowerBoundary, upperBoundary} = findInterval(starRating, difficultyAnchors);

    const t = lowerBoundary === upperBoundary
        ? 1
        : (starRating - lowerBoundary) / (upperBoundary - lowerBoundary);

    const colorLower = hexToRgb(difficultyColors[i]);
    const colorUpper = hexToRgb(difficultyColors[i + 1]);

    const r = lerpGamma(colorLower.r, colorUpper.r, t);
    const g = lerpGamma(colorLower.g, colorUpper.g, t);
    const b = lerpGamma(colorLower.b, colorUpper.b, t);

    const textColor = getTextColor(starRating);

    return {r, g, b, textColor};
}

songDifficulties.forEach(title => {
    const starRating = Number(title.dataset.difficulty);

    const {r, g, b, textColor} = getDifficultyColor(starRating);

    title.style.setProperty("--diff-color", `${r}, ${g}, ${b}`);
    title.style.setProperty("--diff-text-color", textColor);
})

weekSR.forEach(weeklySR => {
    const lowerSR = Number(weeklySR.dataset.lower);
    const upperSR = Number(weeklySR.dataset.upper);
    const midSR = (lowerSR + upperSR) / 2;

    const lowerColor = getDifficultyColor(lowerSR);
    const upperColor = getDifficultyColor(upperSR);

    const color1 = `rgb(${lowerColor.r}, ${lowerColor.g}, ${lowerColor.b})`;
    const color2 = `rgb(${upperColor.r}, ${upperColor.g}, ${upperColor.b})`;

    weeklySR.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
    weeklySR.style.color = `rgb(${getDifficultyColor(midSR).textColor})`;
    
})


