function encrypt(direction) {
    let inputText = document.getElementById("text").value;
    let outputText = "";
    let shift = document.getElementById("shift").value;
    let shiftedChar = "";
    for(let i = 0;i<inputText.length;i++){
        if(/[a-z]/.test(inputText[i])){
            shiftedChar = (inputText[i].charCodeAt(0)-97+(shift*direction))
            if(shiftedChar<0){
                outputText += String.fromCharCode(((shiftedChar+26)+97))
            }else{
                outputText += String.fromCharCode(((shiftedChar%26)+97))
            }
        }
        else if(/[A-Z]/.test(inputText[i])){
            shiftedChar = (inputText[i].charCodeAt(0)-65+(shift*direction))
            if(shiftedChar<0){
                outputText += String.fromCharCode(((shiftedChar+26)+65))
            }else{
                outputText += String.fromCharCode(((shiftedChar%26)+65))
            }
        }
        else{
            outputText += inputText[i];
        }
    }
    document.getElementById("text").value = outputText;
    
}

document.getElementById("shift").onchange = function() {updateShift()};
function updateShift() {
    let shift = document.getElementById("shift").value;
    if(shift<0)shift = 0;
    else if(shift>25)shift = 25;
    document.getElementById("shift").value = shift;
}