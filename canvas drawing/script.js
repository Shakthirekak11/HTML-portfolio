const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

let drawing = false;
let selectedColor = 'black';
let brush= 5;
let canvasStates = [];
let redoStates = [];
let currentstate=[];

document.querySelectorAll('.colorOption').forEach(colorOption => {
    colorOption.addEventListener('click', function() {
        selectedColor = this.style.backgroundColor;
    });
});

document.querySelectorAll('.brush').forEach(brushButton => {
    brushButton.addEventListener('click', function() {
        brush = this.dataset.size;
    });
});

canvas.addEventListener('mousedown', function(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
});

canvas.addEventListener('mousemove', function(e) {
    if (!drawing) return;
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = brush;
    ctx.stroke();
});

canvas.addEventListener('mouseup', function() {
    drawing = false;
    saveCanvasState();
});
function saveCanvasState() {
    canvasStates.push(canvas.toDataURL());
    redoStates = []; 
}

document.getElementById('undo').addEventListener('click', undo);
document.getElementById('redo').addEventListener('click', redo);

function undo() {
    if (canvasStates.length > 0) {
        redoStates.push(canvas.toDataURL());
        let lastState = canvasStates.pop();
        let img = new Image();
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.src = lastState;
    }
}

function redo() {
    if (redoStates.length > 0) {
        canvasStates.push(canvas.toDataURL());
        let lastState = redoStates.pop();
        let img = new Image();
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.src = lastState;
    }
}
