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

function minhaFuncao() {
    document.getElementById('a').innerText = getViewportAspectRatio();
}

// const meuTimer = setInterval(minhaFuncao, 100);




