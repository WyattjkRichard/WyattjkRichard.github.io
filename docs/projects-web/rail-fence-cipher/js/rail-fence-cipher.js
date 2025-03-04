function encrypt() {
    let inputText = document.getElementById("text").value;
    inputText = inputText.replaceAll(/[^a-zA-Z]/g, '');
    inputText = inputText.toUpperCase();
    
    let outputArray = [];
    let outputText = "";
    let fenceIndex = 0;
    let rails = document.getElementById("rails").value;
    let period = 2*(rails-1)
    for(let i = 0;i<inputText.length;i++){
        if (i%period>=rails){
            fenceIndex = period - (i%period);
        }
        else{
            fenceIndex = i%period;
        }
        
        if(outputArray[fenceIndex]==null){
            outputArray[fenceIndex] = ""
        }
        outputArray[fenceIndex] += inputText[i]
    }
    for (let i = 0; i<outputArray.length;i++){
        outputText += outputArray[i] + " ";
    }
    document.getElementById("text").value = outputText;
}

function decrypt() {
    let inputText = document.getElementById("text").value;
    inputText = inputText.toUpperCase();
    let splitText = inputText.split(" ");
    inputText = inputText.replaceAll(/[^a-zA-Z]/g, '');
    
    let outputText = "";
    let fenceIndex = 0;
    let rails = document.getElementById("rails").value;
    let period = 2*(rails-1)
    
    for(let i = 0;i<inputText.length;i++){
        if (i%period>=rails){
            fenceIndex = period - (i%period);
        }
        else{
            fenceIndex = i%period;
        }
        outputText += splitText[fenceIndex].charAt(0)
        splitText[fenceIndex] = splitText[fenceIndex].slice(1)
        
    }
    document.getElementById("text").value = outputText;
}

document.getElementById("rails").onchange = function() {updateShift()};
function updateShift() {
    let rails = document.getElementById("rails").value;
    if(rails<1)rails = 1;
    document.getElementById("rails").value = shift;
}