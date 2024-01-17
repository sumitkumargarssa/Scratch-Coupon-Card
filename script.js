const canvas = document.getElementById('cover');
const ctx = canvas.getContext('2d');

// Setting Width & Height of Canvas
canvas.height = canvas.offsetHeight;
canvas.width = canvas.offsetWidth;

let isScratching = false,
    x = null,
    y = null,
    radius = 14;

const events = {
    touch: {
        down: 'touchstart',
        move: 'touchmove',
        up: 'touchend'
    },
    mouse: {
        down: 'mousedown',
        move: 'mousemove',
        up: 'mouseup'
    }
};

const eventType = 'ontouchstart' in window ? 'touch' : 'mouse';

function getPos(e) {
    const { left, top } = canvas.getBoundingClientRect();
    x = e.pageX - left;
    y = e.pageY - top;
}

function scratch(x, y) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.fillStyle = "gold";
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}

// Creating Linear Gradient Background Color
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, 'pink');
gradient.addColorStop(0.7, 'magenta');

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

canvas.addEventListener(events[eventType].down, () => isScratching = true);
canvas.addEventListener(events[eventType].up, () => isScratching = false);

// Detecting exact position of Mouse
canvas.addEventListener(events[eventType].move, (e) => {
    if (!isScratching) return;
    getPos(e);
    scratch(x, y);
});
