

const characters = {
    "M": 1000,
    "D": 500,
    "C": 100,
    "L": 50,
    "X": 10,
    "V": 5,
    "I": 1
};

const validRomanPattern = /^(M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3}))$/;

document.getElementById("roman").onchange = function() {
    let roman_numerals = document.getElementById("roman").value;
    roman_numerals = roman_numerals.toUpperCase();
    roman_numerals = roman_numerals.replaceAll(/[^IVXLCDM]/g, "");
    document.getElementById("roman").value = roman_numerals;
    let result = 0;
    let previous_value = 0;

    if(validRomanPattern.test(roman_numerals)){
        for(let i = roman_numerals.length -1; i >=0; i--){
            const current_value = characters[roman_numerals[i]];
    
    
            if (current_value < previous_value){
                result -= current_value;
            }
            else{
                result += current_value;
            }
    
            previous_value = current_value;
        }
    }
    else{
        result = "Invalid Roman Numerals";
    }




    document.getElementById("decimal").value = result;
}

document.getElementById("decimal").onchange = function() {
    let dNum = document.getElementById("decimal").value;
    dNum = dNum.replaceAll(/[^0-9]/g, "");
    document.getElementById("decimal").value = dNum;
    let result = "";
    
    for(let i = 0;i<values.length;i++){
        
        numOfCurrentValue = Math.floor(dNum/values[i]);
        
        if((["I","X","C"].indexOf(characters[i]) != -1)&&(numOfCurrentValue == 4)){
            result+=characters[i]+characters[i-1]
            dNum -= numOfCurrentValue*values[i]
        }
        else if((["V","L","D"].indexOf(characters[i]) != -1)&&(Math.floor(dNum/values[i+1]) == 9)){
            result+=characters[i+1]+characters[i-1]
            dNum-=Math.floor(dNum/values[i+1])*values[i+1]
            i++;
        }
        else{
            for (let j = 0;j<numOfCurrentValue;j++){
                result+=characters[i];
            }
            dNum -= numOfCurrentValue*values[i]
        }
        
        
    }
    document.getElementById("roman").value = result;
}