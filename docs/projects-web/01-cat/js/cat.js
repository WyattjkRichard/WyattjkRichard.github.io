// Cat Animation JavaScript

const direction = {
  idle: 'idle',
  left: 'left',
  right: 'right',
};


let currentFrame = 21;
let dir = direction.idle;
let pos = 0;
let id = null;
function animation() {
    let img = document.getElementById("cat");
    if (currentFrame < 10) {
        img.src = "./images/tile00" + currentFrame + ".png";
    } else {
        img.src = "./images/tile0" + currentFrame + ".png";
    }
    if (currentFrame !== 21) { currentFrame += 4; }
    if (currentFrame === 48) { currentFrame = 0; }
}
    
setInterval(animation, 100);
document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowLeft") {
        if(dir!==direction.left){
            document.getElementById("cat").style.transform = "scaleX(1)";
            dir = direction.left;
            currentFrame = 0;
            myMove();
        }
    }
    else if (event.key === "ArrowRight") {
        if(dir!==direction.right){
            document.getElementById("cat").style.transform = "scaleX(-1)";
            dir = direction.right;
            currentFrame = 0;
            myMove();
        }
    }
}, true);

function myMove() {
        
    const elem = document.getElementById("cat");
    clearInterval(id);
    id = setInterval(frame, 3);
    function frame() {
        if ((pos >= window.innerWidth - elem.width && dir === direction.right) || (pos <= 0 && dir === direction.left)) {
            clearInterval(id);
            dir = direction.idle;
            currentFrame = 1;
        } else if(dir === direction.left) {
            pos--;
            elem.style.left = pos + "px";
        } else if (dir === direction.right) {
            pos++;
            elem.style.left = pos + "px";
        }
    }
}