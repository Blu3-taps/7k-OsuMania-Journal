document.querySelectorAll('a[href^="#"').forEach(link => { // Get all anchors with an id target and loops though them
    link.addEventListener('click', () => {
        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);

        if (!target) return;

        target.classList.remove('target-highlight');
        void target.offsetWidth;
        target.classList.add('target-highlight');
    });
});


//----------------------------------------------//
//       Making Clickable Modifier Icons        //
//----------------------------------------------//
const effectText = document.getElementById("effectText");
const modifiers = document.querySelectorAll(".modifier");

modifiers.forEach(function(modifier) { // Loops through all modifiers
    modifier.addEventListener("click", function() { // Checks if any modifier has been clicked

        // If the modifier clicked is active, deactivate and reset effect display
        if (modifier.classList.contains("active")) {
            modifier.classList.remove("active");
            effectText.textContent = "None";
        
        // If the modifier clicked is inactive, activate it display it's effect
        } else {
            modifiers.forEach(function(mod) {
                mod.classList.remove("active");
            });

            modifier.classList.add("active");

            effectText.textContent = modifier.dataset.effect;
        }

    })
});

console.log(effectText);
console.log(modifiers);