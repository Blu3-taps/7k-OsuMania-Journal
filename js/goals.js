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
    starRange: [ // Star Range Achievements
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

function updateOverlay(data) {
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

    // When medal is clicked, trigger animation and display it's achievement data on overlay
    medal.addEventListener("click", () => {
        const medalPulse = document.createElement("div");
        medalPulse.classList.add("medal-pulse");
        medal.appendChild(medalPulse);

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