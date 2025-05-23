// variables
let ballLoc = {
    x: 10,
    y: 10
}
let ballVel = {
    x: 5,
    y: 0
}
let radius = 5;
let drag = false;
let dragOffset;
let gravity = 0.2;
let resistance = 0.8;
let friction = 0.8;
let draggingVel = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0
}

// setup
draw();
setInterval(updateBall, 10);
// functions
function draw() {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(1, 1, canvas.width-2, canvas.height-2);
        
        ctx.beginPath();
        ctx.arc(ballLoc.x, ballLoc.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

function updateDragOffset(){
    dragOffset = {
        x: event.pageX - canvas.offsetLeft - ballLoc.x,
        y: event.pageY - canvas.offsetTop - ballLoc.y
    }
}

function updateBall(){
    limits()
    
    if (drag){
        // calculate velocities
        // called every 10ms
        draggingVel.x1 = draggingVel.x2;
        draggingVel.x2 = ballLoc.x;
        draggingVel.y1 = draggingVel.y2;
        draggingVel.y2 = ballLoc.y;
    }
    else{
        // let velocities move ball
        ballVel.y+=gravity
        ballLoc.y+=ballVel.y
        ballLoc.x+=ballVel.x
    }
    draw()
    //console.log(ballVel.x+", "+ballVel.y)
}

function limits(){
    if(ballLoc.x+radius<=0){ // ball hits left wall
        ballLoc.x = radius;
        ballVel.x = -ballVel.x * resistance
    }
    else if(ballLoc.x+radius>=canvas.width){ // ball hits right wall
        ballLoc.x = canvas.width-radius;
        ballVel.x = -ballVel.x * resistance
    }
    if(ballLoc.y+radius<=0){ // ball hits top
        ballLoc.y = radius;
        ballVel.y = -ballVel.y * resistance
    }
    else if(ballLoc.y+radius>=canvas.height){ // ball hits bottom
        ballLoc.y = canvas.height-radius;
        ballVel.y = -ballVel.y * resistance
        ballVel.x *= friction;
        //console.log("bottom")

    }
}

function updateCanvas(){
    document.getElementById("canvas").height = document.getElementById("canvasHeight").value
    document.getElementById("canvas").width = document.getElementById("canvasWidth").value
}

canvas.addEventListener('mousedown', function(event) {
    //console.log('mousedown');
    if(Math.sqrt(Math.pow(event.pageX - canvas.offsetLeft - ballLoc.x, 2) + Math.pow(event.pageY - canvas.offsetTop - ballLoc.y, 2))<radius){
        drag = true;
        updateDragOffset()
        draggingVel.x1 = 0;
        draggingVel.x2 = 0;
        draggingVel.y1 = 0;
        draggingVel.y2 = 0;
    }
    
    
})

addEventListener('mousemove', function(event) {
    if (drag) {
        ballLoc.y = event.pageY - canvas.offsetTop - dragOffset.y
        ballLoc.x = event.pageX - canvas.offsetLeft - dragOffset.x
        limits()
        draw();
    }
})

addEventListener('mouseup', function(event) {
    if(drag == true){
        //set horizontal and vertical velocities
        ballVel.x = draggingVel.x2 - draggingVel.x1
        ballVel.y = draggingVel.y2 - draggingVel.y1
    }
    drag = false;
})