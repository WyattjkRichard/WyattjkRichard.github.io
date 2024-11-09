function encrypt() {
    let inputText = document.getElementById("text").value;
    let outputText = "";
    let charsOnly = inputText.replaceAll(/[^a-zA-Z]/g, '').toUpperCase();
    let charHz = [];
    for (let i = 0; i < 26; i++){
        charHz.push([String.fromCharCode(i+65), charsOnly.split(String.fromCharCode(i+65)).length-1])
    }
    charHz.sort(sortFunction);
}

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}