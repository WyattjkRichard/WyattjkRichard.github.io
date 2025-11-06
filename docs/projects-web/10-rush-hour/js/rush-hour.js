// variables
const canvas = document.getElementById("canvas");

var drag = false;       // Is the user currently dragging a shape
var dragOffset;         // The x & y offset of the mouse and the upper right corner of the shape being dragged
var gridSize = 50;      // The gridSize of the canvas
var movingShape;        // the identifier of the shape that is being moved
var movementRange = {   // The range that the moving shape can move
    xMin: 0,
    xMax: canvas.width,
    yMin: 0,
    yMax: canvas.height
}

// load shapes and level layouts
var shapes = {};
var levelLayouts = {};
var currentLevel = {};
var currentLevelIndex = 0;

const shapesFetch = fetch('data/shapes.json')
    .then(response => response.json())
    .then(data => {
        for (const shape in data) {
            data[shape].length *= gridSize;
        }
        shapes = data;
    })
    .catch(err => console.error('Error loading shapes JSON:', err));

const levelLayoutsFetch = fetch('data/levelLayouts.json')
    .then(response => response.json())
    .then(data => {
        // adjust coordinates to be multiples of gridSize
        for (const level in data) {
            for (const shape in data[level].shapes) {
                data[level].shapes[shape].x *= gridSize;
                data[level].shapes[shape].y *= gridSize;
            }
        }
        levelLayouts = data;
    })
    .catch(err => console.error('Error loading levelLayouts JSON:', err));

Promise.all([shapesFetch, levelLayoutsFetch]).then(() => {
    initializeDropdown();
    draw();
});

// functions
function resetCookies(){
    document.cookie = "levelStatus=0000000000; path=/";
    initializeDropdown()
}

function getShapeWidth(rect){
    return (currentLevel.shapes[rect].orientation == "horizontal") ? shapes[rect].length : gridSize
}

function getShapeHeight(rect){
    return (currentLevel.shapes[rect].orientation == "horizontal") ? gridSize : shapes[rect].length
}

function loadLevel(index) {
    currentLevelIndex = Number(index);
    currentLevel = structuredClone(levelLayouts[currentLevelIndex]);
    document.getElementById('levelSelect').value = currentLevelIndex;
    draw();
}

function initializeDropdown(){
    // Reset level select dropdown
    document.getElementById('levelSelect').innerHTML= "<option value='default' disabled selected>Select a Level</option>"

    // set currentLevel to default
    loadLevel(0);

    // Split site cookies into an array
    let splitCookie = document.cookie.split('; ')

    for(let i = 0; i < splitCookie.length; i++){
        // Look for the levelStatus cookie
        if (splitCookie[i].split('=')[0] == "levelStatus"){
            splitCookie = splitCookie[i].split('=');
            
            // For each hex character in the cookie string 
            for (let j = 0; j < splitCookie[1].length; j++){
                // parseInt(splitCookie[1][i], 16) converts the hex string into an int
                // .toString(2) converts the number into a string in base 2
                // .padStart(4, '0') pads the start of the string with 0s untill the string is 4 characters long
                var currentWord = parseInt(splitCookie[1][j], 16).toString(2).padStart(4, '0')

                // For each binary character in the currentWord string
                for (let k = 0; k < 4; k++){
                    levelLayouts[j*4+k + 1].completed = (currentWord[k] == '1') ? true:false
                }
            }
        }
    }

    // Update the level select dropdown
    for (const level in levelLayouts){
        if(levelLayouts[level].name!="default"){
            let dropdownString = `<option id="level-${level}" value="${level}">${levelLayouts[level].name}`;
            dropdownString += (levelLayouts[level].completed) ? " &#x2714;</option>" : "</option>";
            document.getElementById('levelSelect').innerHTML += dropdownString;
        }
    }
    document.getElementById('levelSelect').innerHTML+="<option id='level-add' value='Add New Level'>Add New Level</option>";
}

function draw() {
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // draw border
        ctx.strokeRect(1, 1, canvas.width-2, canvas.height-2);
        // clear exit area
        ctx.clearRect(6*gridSize-2, 2*gridSize, 2, gridSize);
        // draw grid
        for (let i = 1; i<6; i++){
            for (let j = 1; j<6; j++){
                ctx.strokeRect((.1)+i*gridSize, (.1)+j*gridSize, (.8), (.8));
            }
        }
        // draw shapes
        for (const rect in currentLevel.shapes){
            ctx.fillStyle = shapes[rect].colour;
            
            ctx.fillRect(
                currentLevel.shapes[rect].x+2,
                currentLevel.shapes[rect].y+2,
                getShapeWidth(rect)-4,
                getShapeHeight(rect)-4
            );
        }
    }
}

function snap(){
    if(currentLevel.shapes[movingShape].x % gridSize<gridSize/2){
        currentLevel.shapes[movingShape].x = Math.floor(currentLevel.shapes[movingShape].x/gridSize)*gridSize
    }
    else{
        currentLevel.shapes[movingShape].x = (Math.floor(currentLevel.shapes[movingShape].x/gridSize)+1)*gridSize
    }
    if(currentLevel.shapes[movingShape].y%gridSize<gridSize/2){
        currentLevel.shapes[movingShape].y = Math.floor(currentLevel.shapes[movingShape].y/gridSize)*gridSize
    }
    else{
        currentLevel.shapes[movingShape].y = (Math.floor(currentLevel.shapes[movingShape].y/gridSize)+1)*gridSize
    }
}

function updateDragOffset(e){
    dragOffset = {
        x: e.pageX - canvas.offsetLeft - currentLevel.shapes[movingShape].x,
        y: e.pageY - canvas.offsetTop - currentLevel.shapes[movingShape].y
    }
}

function updateMovementRange(){
    movementRange = {
        xMin: 0,
        xMax: canvas.width,
        yMin: 0,
        yMax: canvas.height
    }
    for (const rect in currentLevel.shapes){
        if(rect!=movingShape){
            // if moving shape is vertical
            if (currentLevel.shapes[movingShape].orientation == "vertical"){
                // check to see of the shape is in the samme column as the moving shape
                if(currentLevel.shapes[rect].x==currentLevel.shapes[movingShape].x
                   || currentLevel.shapes[rect].x<currentLevel.shapes[movingShape].x
                   && currentLevel.shapes[rect].x+getShapeWidth(rect)>currentLevel.shapes[movingShape].x
                ){
                    if(currentLevel.shapes[rect].y<currentLevel.shapes[movingShape].y
                       && currentLevel.shapes[rect].y+getShapeHeight(rect)>movementRange.yMin
                    ){
                        movementRange.yMin = currentLevel.shapes[rect].y + getShapeHeight(rect);
                    }
                    else if(currentLevel.shapes[rect].y>currentLevel.shapes[movingShape].y
                        && currentLevel.shapes[rect].y<movementRange.yMax
                    ){
                        movementRange.yMax = currentLevel.shapes[rect].y;
                    }
                }
            }
            else{ // if moving shape is horizontal
                //check for any rectangle that is in the same row, set max and min range of movement
                if(currentLevel.shapes[rect].y == currentLevel.shapes[movingShape].y
                   || (currentLevel.shapes[rect].y < currentLevel.shapes[movingShape].y
                   && currentLevel.shapes[rect].y+getShapeHeight(rect) > currentLevel.shapes[movingShape].y)
                ){
                    // if the shape is to the left & its limit would be greater then the current min movement range, update the min
                    if(currentLevel.shapes[rect].x < currentLevel.shapes[movingShape].x
                       && currentLevel.shapes[rect].x + getShapeWidth(rect) > movementRange.xMin
                    ){
                        movementRange.xMin = currentLevel.shapes[rect].x+getShapeWidth(rect);
                    }
                    else if(
                        currentLevel.shapes[rect].x > currentLevel.shapes[movingShape].x
                        && currentLevel.shapes[rect].x < movementRange.xMax
                   ){
                        movementRange.xMax = currentLevel.shapes[rect].x;
                    }
                }
            }
        }
    }
}

canvas.addEventListener('mousedown', function(event) {
    // check if user is clicking on a shape
    for (const rect in currentLevel.shapes){
        if(event.pageX - canvas.offsetLeft > currentLevel.shapes[rect].x
            && event.pageX - canvas.offsetLeft < currentLevel.shapes[rect].x + getShapeWidth(rect)
            && event.pageY - canvas.offsetTop > currentLevel.shapes[rect].y
            && event.pageY - canvas.offsetTop < currentLevel.shapes[rect].y + getShapeHeight(rect)
           )
        {
            drag = true;
            movingShape = rect;
            updateDragOffset(event)
            updateMovementRange()
        }
    }
})

addEventListener('mousemove', function(event) {
    if (drag) {
        if(currentLevel.shapes[movingShape].orientation == "vertical"){ // vertical
            currentLevel.shapes[movingShape].y = event.pageY - canvas.offsetTop - dragOffset.y
            if(currentLevel.shapes[movingShape].y<movementRange.yMin){
                currentLevel.shapes[movingShape].y = movementRange.yMin
            }
            else if(currentLevel.shapes[movingShape].y > movementRange.yMax - getShapeHeight(movingShape)){
                currentLevel.shapes[movingShape].y = movementRange.yMax-getShapeHeight(movingShape)
            }
        }
        else if(currentLevel.shapes[movingShape].orientation == "horizontal"){ // horizontal
            // update the shapes x position
            currentLevel.shapes[movingShape].x = event.pageX - canvas.offsetLeft - dragOffset.x
            if(currentLevel.shapes[movingShape].x < movementRange.xMin){
                currentLevel.shapes[movingShape].x = movementRange.xMin
            }
            else if(currentLevel.shapes[movingShape].x>movementRange.xMax-getShapeWidth(movingShape)){
                if(movingShape=="X" && movementRange.xMax == canvas.width && currentLevel.shapes["X"].y == 2*gridSize){
                    //console.log("");
                }
                else{
                    currentLevel.shapes[movingShape].x = movementRange.xMax-getShapeWidth(movingShape)
                }
            }
        }
        draw();
    }
})

addEventListener('mouseup', function(event) {
    if (drag){
        drag = false;
        snap();
        draw();
    }
    // Win condition
    if(currentLevel.shapes["X"].x >= canvas.width-gridSize){
        levelLayouts[currentLevelIndex].completed = true;

        // Update the cookie used to store level status
        let levelStatusString = ""
        for (const lvl in levelLayouts){
            // only record status for the core 40 levels
            const lvlIndex = Number(lvl);
            if(lvlIndex > 0 && lvlIndex < 41){ // theres def a better way to do this but thats ok
                levelStatusString += (levelLayouts[lvl].completed) ? '1' : '0' 
            }
        }
        // Convert to Hex
        levelStatusString = parseInt(levelStatusString , 2).toString(16).toUpperCase();
        // Update Cookie
        document.cookie = "levelStatus="+levelStatusString+"; path=/";

        // add checkmark to completed level
        document.getElementById("level-"+currentLevelIndex).innerHTML=`${levelLayouts[currentLevelIndex].name} &#x2714;`

        // Switch to the next level
        if (levelLayouts[currentLevelIndex+1]!=null){
            loadLevel(currentLevelIndex + 1)
        }
        else{
            initializeDropdown();
        }
        draw();
    }
})

// When a new level is selected from the dropdown
document.getElementById("levelSelect").onchange = function(event) {
    if (event.target.value=="Add New Level"){
        // prompt user for a level file
        document.getElementById("fileInput").click();
    }
    else{
        loadLevel(event.target.value)
    }
};


document.getElementById("fileInput").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    // check file type, must be a .rhm file
    if (!file.name.endsWith(".rhm")) {
        document.getElementById('levelSelect').value = "";
        alert('Please select a valid file.');
        return;
    }
    let mapName = file.name.replace(".rhm", "");

    const reader = new FileReader();

    reader.addEventListener('load', (event) => {
        // make sure there is no other level with the same name
        // Find the key (index) of the level with a matching name
        const duplicateIndex = Object.keys(levelLayouts).find(
            key => levelLayouts[key].name === mapName
        );

        if (typeof(duplicateIndex) === 'undefined'){
            // Add map to the levelLayouts object
            levelLayouts.push(JSON.parse(event.target.result));
            
            // Update the dropdown list
            document.getElementById('level-add').insertAdjacentHTML('beforebegin', `<option id='level-${levelLayouts.length - 1}' value="${levelLayouts.length - 1}">${mapName}</option>`);
            loadLevel(levelLayouts.length - 1);
        }
        else{
            alert("A map with this name already exists");
            loadLevel(Number(duplicateIndex));
        }
    });

    reader.readAsText(file);
    }
    fileInput.value = "";
});

// Todo:
// newly added levels are bellow the add levels option in the dropdown, they should be above it
// test what happens when you finish lvl 40 and add a new level
