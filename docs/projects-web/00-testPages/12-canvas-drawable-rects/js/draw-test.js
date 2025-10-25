
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let rectangles = [];
let currentRect = null;
let selectedRect = null;
let dragOffsetX, dragOffsetY;
let isDrawing = false;
let isResizing = false;
let resizeHandle = null;

const HANDLE_SIZE = 8;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rectangles.forEach(rect => {
        // Colour rect grey unless it is selected
        ctx.fillStyle = rect === selectedRect ? '#3fa9f5' : '#777';
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    
        if (rect === selectedRect){
            const handles = getHandles(rect);
            ctx.fillStyle = '#fff';
            handles.forEach(h => {
                ctx.fillRect(h.x - HANDLE_SIZE / 2, h.y - HANDLE_SIZE / 2, HANDLE_SIZE, HANDLE_SIZE);
            });
        }
    });
}

function getHandles(rect) {
    return [
    { name: 'tl', x: rect.x, y: rect.y },
    { name: 'tr', x: rect.x + rect.w, y: rect.y },
    { name: 'bl', x: rect.x, y: rect.y + rect.h },
    { name: 'br', x: rect.x + rect.w, y: rect.y + rect.h },
    ];
}

function getRectAt(x, y) {
    for (let i = rectangles.length - 1; i >= 0; i--) {
        const rect = rectangles[i];
        if (x > rect.x && x < rect.x + rect.w && y > rect.y && y < rect.y + rect.h) {
            return rect;
        }
    }
    return null;
}

canvas.addEventListener('mousedown', e => {
    const { offsetX: x, offsetY: y } = e;

    // Prevent starting new actions while already drawing, this can happen if mouse leaves canvas and is released outside
    if (isDrawing || isResizing) {
        return;
    }

    // Check if clicking on resize handle
    if (selectedRect) {
        const handles = getHandles(selectedRect);
        const handle = handles.find(h =>
            Math.abs(x - h.x) < HANDLE_SIZE &&
            Math.abs(y - h.y) < HANDLE_SIZE
        );
        if (handle) {
            isResizing = true;
            resizeHandle = handle.name;
            return;
        }
    }

    // Check if clicking on existing rectangle
    const rect = getRectAt(x, y);
    if (rect) {
        selectedRect = rect;
        rectangles = rectangles.filter(r => r !== rect);
        rectangles.push(rect);
    
        dragOffsetX = x - rect.x;
        dragOffsetY = y - rect.y;
        isDrawing = false;
    } else {
        selectedRect = null;
        isDrawing = true;
        currentRect = { x, y, w: 0, h: 0 };
        rectangles.push(currentRect);
    }

    draw();
});

canvas.addEventListener('mousemove', e => {
    const { offsetX: x, offsetY: y } = e;

    if (isDrawing && currentRect) {
        // Draw new rectangle
        currentRect.w = x - currentRect.x;
        currentRect.h = y - currentRect.y;
        draw();
    } else if (isResizing && selectedRect) {
        // resize selected rectangle
        const r = selectedRect;
        switch (resizeHandle) {
            case 'tl':
                r.w += r.x - x;
                r.h += r.y - y;
                r.x = x;
                r.y = y;
                break;
            case 'tr':
                r.w = x - r.x;
                r.h += r.y - y;
                r.y = y;
                break;
            case 'bl':
                r.w += r.x - x;
                r.x = x;
                r.h = y - r.y;
                break;
            case 'br':
                r.w = x - r.x;
                r.h = y - r.y;
                break;
        }
        draw();
    } else if (selectedRect && e.buttons === 1 && !isResizing) {
        // move preexisting rectangle
        selectedRect.x = x - dragOffsetX;
        selectedRect.y = y - dragOffsetY;
        draw();
    }
});

function checkResizeBounds(rect) {
    // invert the width if its negative
    if (rect.w < 0 ) {
        rect.x += rect.w;
        rect.w *= -1;
    }
    if (rect.h < 0) {
        rect.y += rect.h;
        rect.h *= -1;
    }
}

canvas.addEventListener('mouseup', () => {
    // if the rectangle has no size, remove it
    if (isDrawing && currentRect && (currentRect.w === 0 || currentRect.h === 0)) {
        rectangles.pop();
    }

    // if the rectangle has negative width/height, adjust position and size
    if (isDrawing && currentRect) {
        checkResizeBounds(currentRect);
    }

    if (isResizing && selectedRect) {
        checkResizeBounds(selectedRect);
    }

    // reset states
    isDrawing = false;
    isResizing = false;
    currentRect = null;
    resizeHandle = null;
});

window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (isDrawing) {
            rectangles.pop();
            isDrawing = false;
            currentRect = null;
            draw();
        }
    }
    else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedRect) {
            rectangles = rectangles.filter(r => r !== selectedRect);
            selectedRect = null;
            draw();
        }
    }
});

draw();

