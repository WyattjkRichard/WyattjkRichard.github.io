function encrypt(direction) {
    let inputText = document.getElementById("text").value;
    let outputText = "";
    let key = document.getElementById("key").value;
    key = key.replaceAll(/[^a-zA-Z]/g, '');
    key = key.toUpperCase();
    document.getElementById("key").value = key;
    let shift = 0;
    for(i = 0;i<inputText.length;i++){
        shift = key[i%key.length].charCodeAt(0)-65
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