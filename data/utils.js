export function getRandomDarkColor() {
    return generateRandomColorFromRange(0, 100);
}

export function getRandomLightColor() {
    return generateRandomColorFromRange(200, 255);
}

export function getRandomColor() {
    return generateRandomColorFromRange(0, 255);
}

function generateRandomColorFromRange(min, max) {
    const r = getRandomFromRange(min, max);
    const g = getRandomFromRange(min, max);
    const b = getRandomFromRange(min, max);
    return `rgb(${r}, ${g}, ${b})`;
}

export function withOpacity(rgbColor, opacity) {
    return `rgba(${getTextBetween(rgbColor, '(', ')')}, ${opacity})`;
}

export function getRandomFromRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function getTextBetween(text, char1, char2) {
    const idx1 = text.indexOf(char1);
    const idx2 = text.indexOf(char2);
    if (idx1 == -1 || idx2 == -1 || (idx1 >= idx2)) return '';
    return text.split(char1)[1].split(char2)[0];
}