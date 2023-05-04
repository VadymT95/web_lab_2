const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clearButton');
const pointColor = document.getElementById('pointColor');
const drawPoints = document.getElementById('drawPoints');
const drawTriangles = document.getElementById('drawTriangles');

const drawCircles = document.getElementById('drawCircles');

let circleMode = false;
let circleCenter = null;
// Масиви для індексів точок та кіл
let pointIndices = [];
let circleIndices = [];


drawCircles.addEventListener('click', () => {
    drawingMode = 'circles';
});

let drawingMode = 'points';
let points = [];

canvas.addEventListener('click', (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const color = pointColor.value;

    if (drawingMode === 'points') {
        drawPoint(x, y, color);
        points.push({ x, y, color });
    } else if (drawingMode === 'triangles' && points.length >= 2) {
        drawTriangle(points[points.length - 2], points[points.length - 1], { x, y, color });
        points.push({ x, y, color });
    }
    if (drawingMode === 'circles') {
        if (!circleCenter) {
            circleCenter = { x, y, color };
            drawPoint(x, y, color);
            points.push({ x, y, color });
            pointIndices.push(points.length - 1);
        } else {
            drawCircle(circleCenter, { x, y, color });
            circleIndices.push(pointIndices.pop());
            circleCenter = null;
        }
    }
});


// Функція для очищення канваса
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points = [];
    pointIndices = [];
    circleIndices = [];
});
pointColor.addEventListener('change', () => {
    // Оновлюємо колір для майбутніх точок
});

drawPoints.addEventListener('click', () => {
    drawingMode = 'points';
});

drawTriangles.addEventListener('click', () => {
    drawingMode = 'triangles';
});

function drawPoint(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawTriangle(p1, p2, p3) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.closePath();

    const color = p1.color;
    ctx.fillStyle = color;
    ctx.fill();
}


// Функція для рисування кола
function drawCircle(center, edge) {
    const radius = Math.sqrt(Math.pow(edge.x - center.x, 2) + Math.pow(edge.y - center.y, 2));
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = center.color;
    ctx.stroke();
}
