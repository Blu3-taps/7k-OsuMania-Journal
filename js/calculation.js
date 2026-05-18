// Renders math symbols on html using syntax //
renderMathInElement(document.body);


//--------------------------------------//
//       Value Display Animation        //
//--------------------------------------//
function animateValue(value, end, suffix = "") {

    if (value.animationFrame) { // When function is called, stop the previous animation if any
        cancelAnimationFrame(value.animationFrame);
    }

    let currentText = value.textContent; // Obtains the text from value display
    let start = parseFloat(currentText); // Converts value display into float number
    end = parseFloat(end);
    
    if (isNaN(start)) {
        start = 0;
    }

    const duration = 400; // ms
    let startTime = null;

    function animate(timestamp) {

        if (!startTime) startTime = timestamp;

        let elapsed = timestamp - startTime;
        let progress = Math.min(elapsed / duration, 1);
        let current = start + (end - start) * progress;
        
        value.textContent = current.toFixed(2) + suffix;

        if (progress < 1) { // Continue the animation if not done yet
            value.animationFrame = requestAnimationFrame(animate);

        } else { // Display the end value when animation is done
            value.textContent = end.toFixed(2) + suffix;

        }

    }

    value.animationFrame = requestAnimationFrame(animate); // Starts the animation

}


//--------------------------------------//
//         Total pp Calculation         //
//--------------------------------------//
const ppInput = document.getElementById("ppInput");
const ppTotal = document.getElementById("ppTotal");

ppInput.addEventListener("input", function() {

    const pp = Number(ppInput.value);
    const n = 100;

    if (pp >= 0) { // Calculates total pp
        const total = Number(((pp * (1 - Math.pow(0.95, n))) / 0.05).toFixed(2));
        animateValue(ppTotal, total, "pp");

    } else {
        ppTotal.textContent = "Invalid value";

    }

})

//--------------------------------------//
//       pp Weightage Calculation       //
//--------------------------------------//
const ppScore = document.getElementById("ppScore");
const scorePos = document.getElementById("scorePos");
const ppWeight = document.getElementById("ppWeight");

ppScore.addEventListener("input", calculate_ppWeight);
scorePos.addEventListener("input", calculate_ppWeight);

function calculate_ppWeight() {

    if (ppScore.value === "" || scorePos.value === "") { // Only calculate if both inputs are filled
        animateValue(ppWeight, 0, "pp")
        return;

    }

    const pp = Number(ppScore.value);
    const pos = Number(scorePos.value);

    if (pp >= 0 && pos >= 1 ) { // Calculates pp Weightage
        const weight = Number((pp * Math.pow(0.95, pos - 1)).toFixed(2));
        animateValue(ppWeight, weight, "pp");

    } else {
        ppWeight.textContent = "Invalid Value";

    }

};

//--------------------------------------//
//      Score Accuracy Calculation      //
//--------------------------------------//
const marvellous = document.getElementById("marv");
const perfect = document.getElementById("perf");
const great = document.getElementById("great");
const good = document.getElementById("good");
const bad = document.getElementById("bad");
const miss = document.getElementById("miss");
const scoreV2 = document.getElementById("scoreV2");
const scoreAcc = document.getElementById("scoreAcc");
const scoreRatio = document.getElementById("scoreRatio");
const judgementInputs = [marvellous, perfect, great, good, bad, miss]

judgementInputs.forEach(input => {
    input.addEventListener("input", () => {
        input.value = input.value.replace(/[^0-9]/g, "");
        calculate_accuracy();
    })
})

function calculate_accuracy() {

    const marvAmt = Number(marvellous.value);
    const perfAmt = Number(perfect.value);
    const greatAmt = Number(great.value);
    const goodAmt = Number(good.value);
    const badAmt = Number(bad.value);
    const missAmt = Number(miss.value);
    const judgements = [marvAmt, perfAmt, greatAmt, goodAmt, badAmt, missAmt]
    const totalAmt = judgements.reduce((tally, next_num) => tally + next_num, 0);
    const ratio = marvAmt / perfAmt;

    console.log(ratio);

    if (judgements.some(hits => hits < 0)) { // Checks if any input is < 0
        scoreAcc.textContent = "Invalid Value";
        scoreRatio.textContent = "Invalid Value";
        return
    }

    if (perfAmt > 0) {
        animateValue(scoreRatio, ratio, "");

    } else {
        scoreRatio.textContent = "All Marvellous";

    }

    if (totalAmt === 0) { // Reset Display to 0% if all inputs are empty
        animateValue(scoreAcc, 0, "%");

        if (Number.isFinite(ratio)) {
            animateValue(scoreRatio, 0, "");

        } else {
            scoreRatio.textContent = 0.00;

        }

        return

    } else if (totalAmt > 0 && !scoreV2.checked) { // Calculate ScoreV1
        const totalHitsV1 = (300 * (marvAmt + perfAmt) + 200 * greatAmt + 100 * goodAmt + 50 * badAmt);
        const totalV1 = 300 * totalAmt;
        const accV1 = Number(((totalHitsV1 / totalV1) * 100).toFixed(2));
        animateValue(scoreAcc, accV1, "%");

    } else if (totalAmt > 0 && scoreV2.checked) { // Calculate ScoreV2
        const totalHitsV2 = (305 * marvAmt + 300 * perfAmt + 200 * greatAmt + 100 * goodAmt + 50* badAmt);
        const totalV2 = 305 * totalAmt;
        const accV2 = ((totalHitsV2 / totalV2) * 100).toFixed(2);
        animateValue(scoreAcc, accV2, "%");

    }

}
