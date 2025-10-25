// variables
var drag = false;
var dragOffset;
var gridSize = 50;
var movingShape;
let allShapes = {
    A: {
        x: gridSize*0,
        y: gridSize*0,
        height: gridSize*1,
        width: gridSize*2,
        colour: 'LightGreen',
    },		
    B: {
        x: gridSize*2,
        y: gridSize*0,
        height: gridSize*1,
        width: gridSize*2,
        colour: 'DarkOrange',
    },
    C: {
        x: gridSize*4,
        y: gridSize*0,
        height: gridSize*1,
        width: gridSize*2,
        colour: 'Aqua',
    },
    D: {
        x: gridSize*0,
        y: gridSize*1,
        height: gridSize*1,
        width: gridSize*2,
        colour: 'Pink',
    },
    E: {
        x: gridSize*2,
        y: gridSize*1,
        height: gridSize*1,
        width: gridSize*2,
        colour: 'BlueViolet',
    },
    F: {
        x: gridSize*4,
        y: gridSize*1,
        height: gridSize,
        width: gridSize*2,
        colour: 'ForestGreen',
    },
    G: {
        x: gridSize*0,
        y: gridSize*2,
        height: gridSize,
        width: gridSize*2,
        colour: 'Black',
    },
    H: {
        x: gridSize*2,
        y: gridSize*2,
        height: gridSize,
        width: gridSize*2,
        colour: 'grey',
    },
    I: {
        x: gridSize*4,
        y: gridSize*2,
        height: gridSize,
        width: gridSize*2,
        colour: 'yellow',
    },
    J: {
        x: gridSize*4,
        y: gridSize*5,
        height: gridSize*1,
        width: gridSize*2,
        colour: 'DarkMagenta',
    },
    K: {
        x: gridSize*4,
        y: gridSize*3,
        height: gridSize*1,
        width: gridSize*2,
        colour: 'DimGrey',
    },
    O: {
        x: gridSize*0,
        y: gridSize*3,
        height: gridSize*3,
        width: gridSize,
        colour: 'Gold',
    },
    P: {
        x: gridSize*1,
        y: gridSize*3,
        height: gridSize*3,
        width: gridSize,
        colour: 'MediumPurple',
    },
    Q: {
        x: gridSize*2,
        y: gridSize*3,
        height: gridSize*3,
        width: gridSize,
        colour: 'RoyalBlue',
    },
    R: {
        x: gridSize*3,
        y: gridSize*3,
        height: gridSize*3,
        width: gridSize,
        colour: 'MediumSeaGreen',
    },
    X: {
        x: gridSize*4,
        y: gridSize*4,
        height: gridSize,
        width: gridSize*2,
        colour: 'red',
    },
}
let shapes = allShapes
// setup
    
for (const rect in allShapes){
    movingShape = rect;
    snap();
    document.getElementById('shapeSelect').innerHTML+="<input type='checkbox' id='"+rect+"' name='"+rect+"' checked><label for='"+rect+"'>"+rect+"</label><br>"
}
draw()

// functions
function updateShapes(){
    shapes = {};
    for (const rect in allShapes){
        if(document.getElementById(rect).checked){
            shapes[rect] = Object.assign({}, allShapes[rect]);
        }
    }
    draw();
}

function copyMap(){
    let copiedText = ""
    for (const rect in shapes){
        copiedText+="\t\t\t\t"+rect+": {\n\t\t\t\t\tx: gridSize*"+shapes[rect].x / gridSize+",\n\t\t\t\t\ty: gridSize*"+shapes[rect].y / gridSize+",\n\t\t\t\t\theight: gridSize*"+shapes[rect].height / gridSize+",\n\t\t\t\t\twidth: gridSize*"+shapes[rect].width / gridSize+",\n\t\t\t\t\tcolour: '"+shapes[rect].colour+"',\n\t\t\t\t},\n"
    }
    navigator.clipboard.writeText(copiedText.slice(0, -1));
}

function deselectAll(){
    for (const rect in allShapes){
        document.getElementById(rect).checked = 0;
    }
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
        for (const rect in shapes){
            ctx.fillStyle = shapes[rect].colour;
            ctx.fillRect(shapes[rect].x+2, shapes[rect].y+2, shapes[rect].width-4, shapes[rect].height-4);
        }
    }
}

function snap(){
    if(shapes[movingShape].x<0){
        shapes[movingShape].x = 0;
    }else if(shapes[movingShape].x>(6-shapes[movingShape].width/gridSize)*gridSize){
        shapes[movingShape].x = (6-shapes[movingShape].width/gridSize)*gridSize;
    }
    if(shapes[movingShape].y<0){
        shapes[movingShape].y = 0;
    }else if(shapes[movingShape].y>(6-shapes[movingShape].height/gridSize)*gridSize){
        shapes[movingShape].y = (6-shapes[movingShape].height/gridSize)*gridSize;
    }

    if(shapes[movingShape].x%gridSize<gridSize/2){
        shapes[movingShape].x = Math.floor(shapes[movingShape].x/gridSize)*gridSize
    }
    else{
        shapes[movingShape].x = (Math.floor(shapes[movingShape].x/gridSize)+1)*gridSize
    }
    if(shapes[movingShape].y%gridSize<gridSize/2){
        shapes[movingShape].y = Math.floor(shapes[movingShape].y/gridSize)*gridSize
    }
    else{
        shapes[movingShape].y = (Math.floor(shapes[movingShape].y/gridSize)+1)*gridSize
    }
}

function updateDragOffset(){
    dragOffset = {
        x: event.pageX - canvas.offsetLeft - shapes[movingShape].x,
        y: event.pageY - canvas.offsetTop - shapes[movingShape].y
    }
}

canvas.addEventListener('mousedown', function(event) {
    //console.log('mousedown');
    for (const rect in shapes){
        if(event.pageX - canvas.offsetLeft > shapes[rect].x && event.pageX - canvas.offsetLeft < shapes[rect].x+shapes[rect].width && event.pageY - canvas.offsetTop > shapes[rect].y && event.pageY - canvas.offsetTop < shapes[rect].y+shapes[rect].height){
            //console.log('hovering')
            drag = true;
            movingShape = rect;
            updateDragOffset()
        }
    }
})

addEventListener('mousemove', function(event) {
    if (drag) {
        shapes[movingShape].y = event.pageY - canvas.offsetTop - dragOffset.y
        shapes[movingShape].x = event.pageX - canvas.offsetLeft - dragOffset.x
        draw();
    }
})

addEventListener('mouseup', function(event) {
    drag = false;
    snap();
    draw();
})

canvas.addEventListener("dblclick", function(event){
    for (const rect in shapes){
        if(event.pageX - canvas.offsetLeft > shapes[rect].x && event.pageX - canvas.offsetLeft < shapes[rect].x+shapes[rect].width && event.pageY - canvas.offsetTop > shapes[rect].y && event.pageY - canvas.offsetTop < shapes[rect].y+shapes[rect].height){
            let temp = shapes[rect].height;
            shapes[rect].height = shapes[rect].width
            shapes[rect].width = temp
        }
    }
    draw()
})
