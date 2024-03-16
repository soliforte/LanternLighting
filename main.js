const fibonacci = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
let intervalId;
let line = null;
let index = fibonacci.length - 1;
const text = "r.oodl";

function caesarShift(fib) {
    let shift;
    if (fib < 26) {
        shift = fib;
    }
    else {
        shift = fib - 26
    }
    const shiftedText = text.split('').map(char => {
        const charCode = char.charCodeAt(0);
        if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
            const base = charCode < 97 ? 65 : 97;
            return String.fromCharCode((charCode - base + shift) % 26 + base);
        }
        return char;
    }).join('');

    const container = document.querySelector('.hexagon-container');
    container.innerHTML = '';
    for (let char of shiftedText) {
        const div = document.createElement('div');
        div.className = 'hexagon comfortaa-text no-select';
        div.textContent = char;
        container.appendChild(div);
    }
}

function createHexagonalLayout(size, distance) {
    const hexagons = document.querySelectorAll('.hexagon');
    hexagons.forEach((hexagon, index) => {
        hexagon.style.width = `${size}px`;
        hexagon.style.height = `${size}px`;
        hexagon.style.transform = `rotate(${60 * index + 30}deg) translate(${distance}px) rotate(${-60 * index - 30}deg)`;
    });
}

function shiftText() {
    clearInterval(intervalId);
    if (index == 0) {
        caesarShift(0);
        createHexagonalLayout(100, 300);
        setInterval(drawLineBetweenRandomHexagons, 10);
    } else {
        for (let i = 0; i < fibonacci[index]; i++) {
            caesarShift(fibonacci[index]);
        }
        createHexagonalLayout(100, 300);
        index--;
    }
    if (index >= 0) {
        intervalId = setInterval(shiftText, 1000 / fibonacci[index]);
    }
}

function getOffset(element) {
    const rect = element.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

function drawLineBetweenRandomHexagons() {
    const hexagons = document.querySelectorAll('.hexagon');
    const randomIndex1 = Math.floor(Math.random() * hexagons.length);
    let randomIndex2 = Math.floor(Math.random() * hexagons.length);
    while (randomIndex2 === randomIndex1) {
        randomIndex2 = Math.floor(Math.random() * hexagons.length);
    }
    const hexagon1 = hexagons[randomIndex1];
    const hexagon2 = hexagons[randomIndex2];
    const offset1 = getOffset(hexagon1);
    const offset2 = getOffset(hexagon2);
    if (!line) {
        line = document.createElement('div');
        line.className = 'line';
        line.style.position = 'absolute';
        line.style.zIndex = '-1';
        line.style.backgroundColor = 'cyan';
        line.style.height = '2px';
        line.style.transformOrigin = '0 0'; // Set the rotation point to the top-left corner
        document.body.appendChild(line);
    }
    const angle = Math.atan2(offset2.top - offset1.top, offset2.left - offset1.left);
    line.style.left = `${offset1.left + hexagon1.offsetWidth / 2 - Math.sin(angle) * line.offsetHeight / 2}px`;
    line.style.top = `${offset1.top + hexagon1.offsetHeight / 2 - (1 - Math.cos(angle)) * line.offsetHeight / 2}px`;
    line.style.width = `${Math.sqrt(Math.pow(offset2.left - offset1.left, 2) + Math.pow(offset2.top - offset1.top, 2))}px`;
    line.style.transform = `rotate(${angle}rad)`;
}

document.addEventListener('DOMContentLoaded', () => {
    intervalId = setInterval(shiftText, 1000 / fibonacci[index]);
});