// variables
var drag = false;
var dragOffset;
var gridSize = 50;
var movingShape;

const shapesFetch = fetch('../10-rush-hour/data/shapes.json')
    .then(response => response.json())
    .then(data => {
        for (const shape in data) {
            data[shape].length *= gridSize;
        }
        shapes = data;

    })
    .catch(err => console.error('Error loading shapes JSON:', err));

const levelLayoutsFetch = fetch('../10-rush-hour/data/levelLayouts.json')
    .then(response => response.json())
    .then(data => {
        // adjust coordinates to be multiples of gridSize
        for (const shape in data[0].shapes) {
            data[0].shapes[shape].x *= gridSize;
            data[0].shapes[shape].y *= gridSize;
        }
        allShapes = data[0].shapes;
        currentShapes = allShapes;
    })
    .catch(err => console.error('Error loading levelLayouts JSON:', err));

Promise.all([shapesFetch, levelLayoutsFetch]).then(() => {
    for (const rect in allShapes){
        movingShape = rect;
        snap();
        document.getElementById('shapeSelect').innerHTML+="<input type='checkbox' id='"+rect+"' name='"+rect+"' checked><label for='"+rect+"'>"+rect+"</label><br>"
    }
    draw();
});
    


// functions
function updateShapes(){
    currentShapes = {};
    for (const rect in allShapes){
        if(document.getElementById(rect).checked){
            currentShapes[rect] = Object.assign({}, allShapes[rect]);
        }
    }
    draw();
}

function copyMap(){
    let copiedText = ""
    for (const rect in currentShapes){
        copiedText+=""+rect+': {\n\t"x": '+currentShapes[rect].x+',\n\t"y": '+currentShapes[rect].y+',\n\t"orientation": "'+currentShapes[rect].orientation+'",\n},\n'
    }
    navigator.clipboard.writeText(copiedText.slice(0, -1));
}


function downloadMap(){
    let mapName = document.getElementById('mapName').value;
    if (mapName==""){
        mapName = "My Rush Hour Map"
    }

    const exportData = {
        name: mapName,
        shapes: currentShapes
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = mapName + ".rhm";
    a.click();

    URL.revokeObjectURL(url);

}

function deselectAll(){
    for (const rect in allShapes){
        document.getElementById(rect).checked = 0;
    }
}

function getShapeWidth(rect){
    return (currentShapes[rect].orientation == "horizontal") ? shapes[rect].length : gridSize
}

function getShapeHeight(rect){
    return (currentShapes[rect].orientation == "horizontal") ? gridSize : shapes[rect].length
}


function draw() {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(1, 1, canvas.width-2, canvas.height-2);
        ctx.clearRect(6*gridSize-2, 2*gridSize, 2, gridSize);
        
        for (let i = 0;i<6;i++){
            for (let j = 0;j<6;j++){
                ctx.strokeRect((gridSize*.1)+i*gridSize, (gridSize*.1)+j*gridSize, (gridSize*.8), (gridSize*.8));
            }
        }
        for (const rect in currentShapes){
            ctx.fillStyle = shapes[rect].colour;
            ctx.fillRect(
                currentShapes[rect].x+2,
                currentShapes[rect].y+2,
                getShapeWidth(rect)-4,
                getShapeHeight(rect)-4
            );
            // Draw the letter of the shape on its centre
            ctx.fillStyle = "white";
            ctx.font = "48px serif";
            ctx.fillText(rect, currentShapes[rect].x + getShapeWidth(rect)/2 - 15, currentShapes[rect].y + getShapeHeight(rect)/2 + 18);
        }
    }
}

function snap(){
    // need to make sure the movingShape isnt deselected
    
    // if shape is moved left of the canvas
    if(currentShapes[movingShape].x < 0){
        currentShapes[movingShape].x = 0;
    }
    
    else if(currentShapes[movingShape].x > (6-getShapeWidth(movingShape)/gridSize) * gridSize){
        currentShapes[movingShape].x = (6-getShapeWidth(movingShape)/gridSize)*gridSize;
    }

    // if shape is moved above the canvas
    if(currentShapes[movingShape].y<0){
        currentShapes[movingShape].y = 0;
    }else if(currentShapes[movingShape].y>(6-getShapeHeight(movingShape)/gridSize)*gridSize){
        currentShapes[movingShape].y = (6-getShapeHeight(movingShape)/gridSize)*gridSize;
    }

    if(currentShapes[movingShape].x%gridSize<gridSize/2){
        currentShapes[movingShape].x = Math.floor(currentShapes[movingShape].x/gridSize)*gridSize
    }
    else{
        currentShapes[movingShape].x = (Math.floor(currentShapes[movingShape].x/gridSize)+1)*gridSize
    }
    if(currentShapes[movingShape].y%gridSize<gridSize/2){
        currentShapes[movingShape].y = Math.floor(currentShapes[movingShape].y/gridSize)*gridSize
    }
    else{
        currentShapes[movingShape].y = (Math.floor(currentShapes[movingShape].y/gridSize)+1)*gridSize
    }
}

function updateDragOffset(event){
    dragOffset = {
        x: event.pageX - canvas.offsetLeft - currentShapes[movingShape].x,
        y: event.pageY - canvas.offsetTop - currentShapes[movingShape].y
    }
}

canvas.addEventListener('mousedown', function(event) {
    //console.log('mousedown');
    for (const rect in currentShapes){
        if(event.pageX - canvas.offsetLeft > currentShapes[rect].x
            && event.pageX - canvas.offsetLeft < currentShapes[rect].x+getShapeWidth(rect)
            && event.pageY - canvas.offsetTop > currentShapes[rect].y
            && event.pageY - canvas.offsetTop < currentShapes[rect].y+getShapeHeight(rect)
        ){
            //console.log('hovering')
            drag = true;
            movingShape = rect;
            updateDragOffset(event)
        }
    }
})

addEventListener('mousemove', function(event) {
    if (drag) {
        currentShapes[movingShape].y = event.pageY - canvas.offsetTop - dragOffset.y
        currentShapes[movingShape].x = event.pageX - canvas.offsetLeft - dragOffset.x
        draw();
    }
})

addEventListener('mouseup', function(event) {
    drag = false;
    snap();
    draw();
})

canvas.addEventListener("dblclick", function(event){
    for (const rect in currentShapes){
        if(event.pageX - canvas.offsetLeft > currentShapes[rect].x
            && event.pageX - canvas.offsetLeft < currentShapes[rect].x+getShapeWidth(rect)
            && event.pageY - canvas.offsetTop > currentShapes[rect].y
            && event.pageY - canvas.offsetTop < currentShapes[rect].y+getShapeHeight(rect)
        ){
            currentShapes[rect].orientation = (currentShapes[rect].orientation=="horizontal") ? "vertical" : "horizontal";
        }
    }
    draw()
})