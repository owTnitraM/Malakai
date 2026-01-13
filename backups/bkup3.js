const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

// Function to calculate the Greatest Common Divisor (GCD)
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function getViewportAspectRatio() {
    const commonDivisor = gcd(viewportWidth, viewportHeight);
    const aspectRatioWidth = viewportWidth / commonDivisor;
    const aspectRatioHeight = viewportHeight / commonDivisor;
    const aspectRatio = `${aspectRatioWidth}:${aspectRatioHeight}`;

    console.log(`Viewport Aspect Ratio: ${aspectRatio}`);
    return aspectRatio;
}

// atribute_mod = Math.floor((atribute_value - 10) / 2))
// const meuTimer = setInterval(minhaFuncao, 100);

const life_bar = document.getElementById('life-amount');
const max_life = document.getElementById('max-life');
const current_life = document.getElementById('current_life');
let life_percent = current_life / max_life * 100

if (life_percent > 100) { life_percent = 100 }

life_bar.style.width = `${Math.round(life_percent)}%`;
life_bar.style.backgroundColor = 'red';

