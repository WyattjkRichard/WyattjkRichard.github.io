let currentFrame = 21;
let dir = 0;
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
    if (event.keyCode === 37) {
        if(dir!==1){
            document.getElementById("cat").style.transform = "scaleX(1)";
            dir = 1;
            currentFrame = 0;
            myMove();
        }
    }
    else if (event.keyCode === 39) {
        if(dir!==2){
            document.getElementById("cat").style.transform = "scaleX(-1)";
            dir = 2;
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
        if ((pos >= window.innerWidth - elem.width && dir === 2) || (pos <= 0 && dir === 1)) {
            clearInterval(id);
            dir = 0;
            currentFrame = 1;
        } else if(dir === 1){
            pos--;
            elem.style.left = pos + "px";
        } else if (dir === 2) {
            pos++;
            elem.style.left = pos + "px";
        }
    }
}