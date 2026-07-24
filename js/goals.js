//---------------------------------------//
//        Medals and Achievements        //
//---------------------------------------//
const achievementsOverlay = document.querySelector(".achievements-overlay");
const achievementsDisplay = document.querySelector(".achievements-display");
const achievementTitle = document.querySelector(".achievement-title");
const achievementTier = document.querySelector(".achievement-tier");
const achievementsList = document.querySelector(".achievements-list");

const tiers = [null, "Bronze", "Silver", "Gold", "Diamond", "Prismatic"];

const achievementData = { // Data of Achievements
    starRating: [ // Star Rating Achievements
        { // 1 Star
            id: "1star",
            name: "1★",
            achievements: [
                { goal: "Pass", achieved: true, date: "7th April 2025" },
                { goal: "Clear", achieved: true, date: "7th April 2025" },
                { goal: "Full Combo", achieved: true, date: "7th April 2025" },
                { goal: "Perfect Full Combo", achieved: true, date: "4th May 2025" },
                { goal: "All Marvelous", achieved: false, date: "" }
            ]
        },
        { // 2 Star
            id: "2star",
            name: "2★",
            achievements: [
                { goal: "Pass", achieved: true, date: "8th April 2025" },
                { goal: "Clear", achieved: true, date: "8th April 2025" },
                { goal: "Full Combo", achieved: true, date: "17th May 2025" },
                { goal: "Perfect Full Combo", achieved: true, date: "24th June 2025" },
                { goal: "All Marvelous", achieved: false, date: "" }
            ]
        },
        { // 3 Star
            id: "3star",
            name: "3★",
            achievements: [
                { goal: "Pass", achieved: true, date: "7th May 2025" },
                { goal: "Clear", achieved: true, date: "7th May 2025" },
                { goal: "Full Combo", achieved: true, date: "28th June 2025" },
                { goal: "Perfect Full Combo", achieved: true, date: "23rd September 2025" },
                { goal: "All Marvelous", achieved: false, date: "" }
            ]
        },
        { // 4 Star
            id: "4star",
            name: "4★",
            achievements: [
                { goal: "Pass", achieved: true, date: "4th July 2025" },
                { goal: "Clear", achieved: true, date: "4th July 2025" },
                { goal: "Full Combo", achieved: true, date: "4th October 2025" },
                { goal: "Perfect Full Combo", achieved: true, date: "1st November 2025" },
                { goal: "All Marvelous", achieved: false, date: "" }
            ]
        },
        { // 5 Star
            id: "5star",
            name: "5★",
            achievements: [
                { goal: "Pass", achieved: true, date: "26th May 2026" },
                { goal: "Clear", achieved: true, date: "26th May 2026" },
                { goal: "Full Combo", achieved: false, date: "" },
                { goal: "Perfect Full Combo", achieved: false, date: "" },
                { goal: "All Marvelous", achieved: false, date: "" }
            ]
        },
        { // 6 Star
            id: "6star",
            name: "6★",
            achievements: [
                { goal: "Pass", achieved: false, date: "" },
                { goal: "Clear", achieved: false, date: "" },
                { goal: "Full Combo", achieved: false, date: "" },
                { goal: "Perfect Full Combo", achieved: false, date: "" },
                { goal: "All Marvelous", achieved: false, date: "" }
            ]
        },
        { // 7 Star
            id: "7star",
            name: "7★",
            achievements: [
                { goal: "Pass", achieved: false, date: "" },
                { goal: "Clear", achieved: false, date: "" },
                { goal: "Full Combo", achieved: false, date: "" },
                { goal: "Perfect Full Combo", achieved: false, date: "" },
                { goal: "All Marvelous", achieved: false, date: "" }
            ]
        },
        { // 8 Star
            id: "8star",
            name: "8★",
            achievements: [
                { goal: "Pass", achieved: false, date: "" },
                { goal: "Clear", achieved: false, date: "" },
                { goal: "Full Combo", achieved: false, date: "" },
                { goal: "Perfect Full Combo", achieved: false, date: "" },
                { goal: "All Marvelous", achieved: false, date: "" }
            ]
        },
        { // 9 Star
            id: "9star",
            name: "9★",
            achievements: [
                { goal: "Pass", achieved: false, date: "" },
                { goal: "Clear", achieved: false, date: "" },
                { goal: "Full Combo", achieved: false, date: "" },
                { goal: "Perfect Full Combo", achieved: false, date: "" },
                { goal: "All Marvelous", achieved: false, date: "" }
            ]
        },
        { // 10 Star
            id: "10star",
            name: "10★",
            achievements: [
                { goal: "Pass", achieved: false, date: "" },
                { goal: "Clear", achieved: false, date: "" },
                { goal: "Full Combo", achieved: false, date: "" },
                { goal: "Perfect Full Combo", achieved: false, date: "" },
                { goal: "All Marvelous", achieved: false, date: "" }
            ]
        },
        { // 11 Star
            id: "11star",
            name: "11★",
            achievements: [
                { goal: "Pass", achieved: false, date: "" },
                { goal: "Clear", achieved: false, date: "" },
                { goal: "Full Combo", achieved: false, date: "" },
                { goal: "Perfect Full Combo", achieved: false, date: "" },
                { goal: "All Marvelous", achieved: false, date: "" }
            ]
        },
        { // 12 Star
            id: "12star",
            name: "12★",
            achievements: [
                { goal: "Pass", achieved: false, date: "" },
                { goal: "Clear", achieved: false, date: "" },
                { goal: "Full Combo", achieved: false, date: "" },
                { goal: "Perfect Full Combo", achieved: false, date: "" },
                { goal: "All Marvelous", achieved: false, date: "" }
            ]
        }
    ],
    performancePoints: [ // Total pp Achievements
        { // 1000pp
            id: "1kpp",
            name: "1,000pp",
            achievements: [
                { goal: "250pp", achieved: true, date: "???" },
                { goal: "500pp", achieved: true, date: "???" },
                { goal: "750pp", achieved: true, date: "???" },
                { goal: "1,000pp", achieved: true, date: "???" }
            ]
        },
        { // 2000pp
            id: "2kpp",
            name: "2,000pp",
            achievements: [
                { goal: "1,250pp", achieved: true, date: "???" },
                { goal: "1,500pp", achieved: true, date: "???" },
                { goal: "1,750pp", achieved: true, date: "???" },
                { goal: "2,000pp", achieved: true, date: "24th June 2025" }
            ]
        },
        { // 3000pp
            id: "3kpp",
            name: "3,000pp",
            achievements: [
                { goal: "2,250pp", achieved: true, date: "1st July 2025" },
                { goal: "2,500pp", achieved: true, date: "10th July 2025" },
                { goal: "2,750pp", achieved: true, date: "17th July 2025" },
                { goal: "3,000pp", achieved: true, date: "1st August 2025" }
            ]
        },
        { // 4000pp
            id: "4kpp",
            name: "4,000pp",
            achievements: [
                { goal: "3,250pp", achieved: true, date: "1st September 2025" },
                { goal: "3,500pp", achieved: true, date: "29th September 2025" },
                { goal: "3,750pp", achieved: true, date: "31st October 2025" },
                { goal: "4,000pp", achieved: true, date: "1st February 2026" }
            ]
        },
        { // 5000pp
            id: "5kpp",
            name: "5,000pp",
            achievements: [
                { goal: "4,250pp", achieved: true, date: "9th May 2026" },
                { goal: "4,500pp", achieved: true, date: "26th May 2026" },
                { goal: "4,750pp", achieved: true, date: "7th June 2026" },
                { goal: "5,000pp", achieved: true, date: "1st July 2026" }
            ]
        },
        { // 6000pp
            id: "6kpp",
            name: "6,000pp",
            achievements: [
                { goal: "5,250pp", achieved: true, date: "18th July 2026" },
                { goal: "5,500pp", achieved: false, date: "" },
                { goal: "5,750pp", achieved: false, date: "" },
                { goal: "6,000pp", achieved: false, date: "" }
            ]
        },
        { // 7000pp
            id: "7kpp",
            name: "7,000pp",
            achievements: [
                { goal: "6,250pp", achieved: false, date: "" },
                { goal: "6,500pp", achieved: false, date: "" },
                { goal: "6,750pp", achieved: false, date: "" },
                { goal: "7,000pp", achieved: false, date: "" }
            ]
        },
        { // 8000pp
            id: "8kpp",
            name: "8,000pp",
            achievements: [
                { goal: "7,250pp", achieved: false, date: "" },
                { goal: "7,500pp", achieved: false, date: "" },
                { goal: "7,750pp", achieved: false, date: "" },
                { goal: "8,000pp", achieved: false, date: "" }
            ]
        },
        { // 9000pp
            id: "9kpp",
            name: "9,000pp",
            achievements: [
                { goal: "8,250pp", achieved: false, date: "" },
                { goal: "8,500pp", achieved: false, date: "" },
                { goal: "8,750pp", achieved: false, date: "" },
                { goal: "9,000pp", achieved: false, date: "" }
            ]
        },
        { // 10000pp
            id: "10kpp",
            name: "10,000pp",
            achievements: [
                { goal: "9,250pp", achieved: false, date: "" },
                { goal: "9,500pp", achieved: false, date: "" },
                { goal: "9,750pp", achieved: false, date: "" },
                { goal: "10,000pp", achieved: false, date: "" }
            ]
        },
        { // 11000pp
            id: "11kpp",
            name: "11,000pp",
            achievements: [
                { goal: "10,250pp", achieved: false, date: "" },
                { goal: "10,500pp", achieved: false, date: "" },
                { goal: "10,750pp", achieved: false, date: "" },
                { goal: "11,000pp", achieved: false, date: "" }
            ]
        },
        { // 12000pp
            id: "12kpp",
            name: "12,000pp",
            achievements: [
                { goal: "11,250pp", achieved: false, date: "" },
                { goal: "11,500pp", achieved: false, date: "" },
                { goal: "11,750pp", achieved: false, date: "" },
                { goal: "12,000pp", achieved: false, date: "" }
            ]
        },
        { // 13000pp
            id: "13kpp",
            name: "13,000pp",
            achievements: [
                { goal: "12,250pp", achieved: false, date: "" },
                { goal: "12,500pp", achieved: false, date: "" },
                { goal: "12,750pp", achieved: false, date: "" },
                { goal: "13,000pp", achieved: false, date: "" }
            ]
        },
        { // 14000pp
            id: "14kpp",
            name: "14,000pp",
            achievements: [
                { goal: "13,250pp", achieved: false, date: "" },
                { goal: "13,500pp", achieved: false, date: "" },
                { goal: "13,750pp", achieved: false, date: "" },
                { goal: "14,000pp", achieved: false, date: "" }
            ]
        },
        { // 15000pp
            id: "15kpp",
            name: "15,000pp",
            achievements: [
                { goal: "14,250pp", achieved: false, date: "" },
                { goal: "14,500pp", achieved: false, date: "" },
                { goal: "14,750pp", achieved: false, date: "" },
                { goal: "15,000pp", achieved: false, date: "" }
            ]
        },
        { // 16000pp
            id: "16kpp",
            name: "16,000pp",
            achievements: [
                { goal: "15,250pp", achieved: false, date: "" },
                { goal: "15,500pp", achieved: false, date: "" },
                { goal: "15,750pp", achieved: false, date: "" },
                { goal: "16,000pp", achieved: false, date: "" }
            ]
        },
        { // 17000pp
            id: "17kpp",
            name: "17,000pp",
            achievements: [
                { goal: "16,250pp", achieved: false, date: "" },
                { goal: "16,500pp", achieved: false, date: "" },
                { goal: "16,750pp", achieved: false, date: "" },
                { goal: "17,000pp", achieved: false, date: "" }
            ]
        },
        { // 18000pp
            id: "18kpp",
            name: "18,000pp",
            achievements: [
                { goal: "17,250pp", achieved: false, date: "" },
                { goal: "17,500pp", achieved: false, date: "" },
                { goal: "17,750pp", achieved: false, date: "" },
                { goal: "18,000pp", achieved: false, date: "" }
            ]
        },
        { // 19000pp
            id: "19kpp",
            name: "19,000pp",
            achievements: [
                { goal: "18,250pp", achieved: false, date: "" },
                { goal: "18,500pp", achieved: false, date: "" },
                { goal: "18,750pp", achieved: false, date: "" },
                { goal: "19,000pp", achieved: false, date: "" }
            ]
        },
        { // 20000pp
            id: "20kpp",
            name: "20,000pp",
            achievements: [
                { goal: "19,250pp", achieved: false, date: "" },
                { goal: "19,500pp", achieved: false, date: "" },
                { goal: "19,750pp", achieved: false, date: "" },
                { goal: "20,000pp", achieved: false, date: "" }
            ]
        },
    ],
    topPlays: [ // Top play pp Achievements
        { // 100pp
            id: "100pp",
            name: "100pp",
            achievements: [
                { goal: "25pp", achieved: true, date: "???" },
                { goal: "50pp", achieved: true, date: "???" },
                { goal: "75pp", achieved: true, date: "16th June 2025"},
                { goal: "100pp", achieved: true, date: "23rd June 2025"}
            ]
        },
        { // 200pp
            id: "200pp",
            name: "200pp",
            achievements: [
                { goal: "125pp", achieved: true, date: "7th July 2025" },
                { goal: "150pp", achieved: true, date: "9th August 2025" },
                { goal: "175pp", achieved: true, date: "27th August 2025"},
                { goal: "200pp", achieved: true, date: "31st October 2025"}
            ]
        },
        { // 300pp
            id: "300pp",
            name: "300pp",
            achievements: [
                { goal: "225pp", achieved: true, date: "19th May 2026" },
                { goal: "250pp", achieved: true, date: "5th June 2026" },
                { goal: "275pp", achieved: true, date: "18th June 2026"},
                { goal: "300pp", achieved: true, date: "21st July 2026"}
            ]
        },
        { // 400pp
            id: "400pp",
            name: "400pp",
            achievements: [
                { goal: "325pp", achieved: false, date: "" },
                { goal: "350pp", achieved: false, date: "" },
                { goal: "375pp", achieved: false, date: ""},
                { goal: "400pp", achieved: false, date: ""}
            ]
        },
        { // 500pp
            id: "500pp",
            name: "500pp",
            achievements: [
                { goal: "425pp", achieved: false, date: "" },
                { goal: "450pp", achieved: false, date: "" },
                { goal: "475pp", achieved: false, date: ""},
                { goal: "500pp", achieved: false, date: ""}
            ]
        },
        { // 600pp
            id: "600pp",
            name: "600pp",
            achievements: [
                { goal: "525pp", achieved: false, date: "" },
                { goal: "550pp", achieved: false, date: "" },
                { goal: "575pp", achieved: false, date: ""},
                { goal: "600pp", achieved: false, date: ""}
            ]
        },
        { // 700pp
            id: "700pp",
            name: "700pp",
            achievements: [
                { goal: "625pp", achieved: false, date: "" },
                { goal: "650pp", achieved: false, date: "" },
                { goal: "675pp", achieved: false, date: ""},
                { goal: "700pp", achieved: false, date: ""}
            ]
        },
        { // 800pp
            id: "800pp",
            name: "800pp",
            achievements: [
                { goal: "725pp", achieved: false, date: "" },
                { goal: "750pp", achieved: false, date: "" },
                { goal: "775pp", achieved: false, date: ""},
                { goal: "800pp", achieved: false, date: ""}
            ]
        },
        { // 900pp
            id: "900pp",
            name: "900pp",
            achievements: [
                { goal: "825pp", achieved: false, date: "" },
                { goal: "850pp", achieved: false, date: "" },
                { goal: "875pp", achieved: false, date: ""},
                { goal: "900pp", achieved: false, date: ""}
            ]
        },
        { // 1000pp
            id: "1000pp",
            name: "1000pp",
            achievements: [
                { goal: "925pp", achieved: false, date: "" },
                { goal: "950pp", achieved: false, date: "" },
                { goal: "975pp", achieved: false, date: ""},
                { goal: "1000pp", achieved: false, date: ""}
            ]
        },
        { // 1100pp
            id: "1100pp",
            name: "1100pp",
            achievements: [
                { goal: "1025pp", achieved: false, date: "" },
                { goal: "1050pp", achieved: false, date: "" },
                { goal: "1075pp", achieved: false, date: ""},
                { goal: "1100pp", achieved: false, date: ""}
            ]
        },
        { // 1200pp
            id: "1200pp",
            name: "1200pp",
            achievements: [
                { goal: "1125pp", achieved: false, date: "" },
                { goal: "1150pp", achieved: false, date: "" },
                { goal: "1175pp", achieved: false, date: ""},
                { goal: "1200pp", achieved: false, date: ""}
            ]
        },
    ]
}

function findMedalData(id) { // Obtain a medal's corresponding data
    // Check through each achievement type and find an achievement with a matching id
    for (const category in achievementData) {
        const foundMedalData = achievementData[category].find(medal => medal.id === id);

        if (foundMedalData) return foundMedalData;
    }

    return null;
}

function updateOverlay(data) { // Fills the Achievement overlay with corresponding data
    // Display The medal's Title
    achievementTitle.textContent = `${data.name} Achievements`;
    
    // Displays the current medal's tier and colors it accordingly
    const tier = calculateTier(data.achievements);
    if (tier) {
        achievementTier.textContent = `| ${tier} Tier`;
        achievementTier.classList.add(tier.toLowerCase());
    } else {
        achievementTier.textContent = "| Unachieved";
    }

    // For every achievement of the medal, adds a tier from the lowest (bronze)
    // and increases the tier level by 1 for every next row and displays the achievement
    // in the achievements list, also triggers a staggered reveal animation.
    data.achievements.forEach((achievement, index) => {
        const row = document.createElement("p");

        const rowTier = tiers[index + 1];
        if (rowTier) row.classList.add(rowTier.toLowerCase());

        row.textContent = achievement.achieved
            ? `${achievement.goal} - Achieved on ${achievement.date}`
            : `${achievement.goal} - Not achieved yet`;

        row.style.transitionDelay = `${index * 0.1}s`;
        achievementsList.append(row);

        setTimeout(() => {
            row.classList.add("reveal");
        }, 150)
    });
}

function clearOverlay() { // Remove and clear all data on the overlay
    achievementTitle.textContent = ""; // Clears the title

    // Clears tier level and remove any tier classes used for coloring
    achievementTier.textContent = "";
    tiers.forEach(tier => {
        if (tier) achievementTier.classList.remove(tier.toLowerCase());
    });

    achievementsList.innerHTML = ""; // Clears all achievements being displayed
}

function calculateTier(achievements) { // Determine the tier of a medal based on achievement status
    let tier = 0;

    // Checks from lowest to highest achievement, if achieved add 1 to the tier
    // Stops once finished or reaches and unachieved achievement
    for (let i = 0; i < achievements.length; i++) {
        if (achievements[i].achieved) {
            tier = i + 1;

        } else {
            break;
        }
    }

    return tiers[tier] !== undefined ? tiers[tier] : "prismatic";
}

function randomNumber(min, max) { // Returns a random number within a given range
    return Math.random() * (max - min) + min;
}

function spawnSparkles(spawnTarget) { // Spawn sparkle elements for diamond tier medals
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");

    let sparkleX = Number(randomNumber(0, 100).toFixed(1));
    let sparkleY = Number(randomNumber(0, 100).toFixed(1));

    // Flips a 50/50 coinflip and determines what to do.
    // 1. Chooses a constraint value of 0% or 100% in parent element's grid positioning
    // 2. Chooses whether the x or y-axis gets constrained based on constraint value
    const edgeConstraint = Math.random() < 0.5 ? 0 : 100;

    if (Math.random() < 0.5) {
        sparkleX = edgeConstraint;
    } else {
        sparkleY = edgeConstraint;
    }
    //----------------------------------------------------------------------------------

    sparkle.style.left = `${sparkleX}%`;
    sparkle.style.top = `${sparkleY}%`;

    spawnTarget.appendChild(sparkle);

    sparkle.addEventListener("animationend", () => {
        sparkle.remove();

        const timeUntilNextSpawn = Math.round(randomNumber(250, 1000));
        setTimeout(() => spawnSparkles(spawnTarget), timeUntilNextSpawn);
    });
}

document.querySelectorAll(".medal").forEach(medal => {
    const medalId = medal.dataset.id;
    const MedalData = findMedalData(medalId);

    // Colors all medal frames based on their tier
    if (MedalData) {
        const medalTier = calculateTier(MedalData.achievements);
        if (medalTier) {
            medal.classList.add(medalTier.toLowerCase());
        }
    }

    // Adds a sparkle effect for medals that are diamond tier
    if (medal.classList.contains("diamond")) {
        const medalWrapper = medal.parentElement;
        spawnSparkles(medalWrapper);
    }

    // When medal is clicked, trigger animation and display it's achievement data on overlay
    medal.addEventListener("click", () => {
        const medalWrapper = medal.parentElement;
        const medalPulse = document.createElement("div");
        medalPulse.classList.add("medal-pulse");
        medalWrapper.appendChild(medalPulse);

        const foundMedalData = findMedalData(medalId);
        if (foundMedalData) {
            updateOverlay(foundMedalData);
        }

        medalPulse.addEventListener("animationend", () => {
            medalPulse.remove();
        });

        achievementsOverlay.classList.add("active");
    });
});

achievementsOverlay.addEventListener("click", (event) => {
    // When blank space on overlay is clicked, clear and reset data and close overlay
    if (event.target === achievementsOverlay) {
        achievementsOverlay.classList.remove("active");
        clearOverlay();
    }
});