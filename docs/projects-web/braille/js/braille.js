let is_debug = false;
/*
    +----+----+
    | 1  | 8  |
    +----+----+
    | 2  | 16 |
    +----+----+
    | 4  | 32 |
    +----+----+
*/

let user_input_field = document.getElementById("Braille_TB");

// Indicators
let numeric_indicator = 60;
let grade_1_indicator = 48;
let capital_indicator = 32;

const prefix_value_map = {
    8: {    // Four Prefix
        1: "@",
        9: "&#x00A2",   // Cent sign
        14: "$",
        20: "~",
        28: ">",
        35: "<",
        47: "&"
    },
    24: {   // Four Five Prefix

    },
    56: {   // Four Five Six Prefix
        12: "/",
        33: "\\"
    },
    16: {   // Five Prefix
        12: "&#x00f7",  // Division Sign
        22: "+",
        28: ")",
        35: "(",
        36: "-",
        38: "x",
        50: "&#x00b7",  // Multiplication dot
        54: "="
    },
    40: {    // Four Six Prefix

    },
    48: {    // Five Six Prefix

    },
    32: {    // Six Prefix

    }
}

const no_modifier_value_map = {
    0: " ",
    1: "a",
    2: ",",
    3: "b",
    5: "k",
    6: ";",
    7: "l",
    9: "c",
    10: "i",
    11: "f",
    13: "m",
    14: "s",
    15: "p",
    17: "e",
    18: ":",
    19: "h",
    21: "o",
    22: "!",
    23: "r",
    25: "d",
    26: "j",
    27: "g",
    29: "n",
    30: "t",
    31: "q",
    36: "-",
    37: "u",
    38: "?",
    39: "v",
    45: "x",
    50: ".",
    53: "z",
    58: "w",
    61: "y"
};

/*
Numeric mode contains:
 - The ten digits
 - the full stop (period)
 - comma
 - the ten numeric space-digit symbols   - need to add
 - simple numeric fraction line          - need to add
 - the two line continuation indicators  - need to add
*/
const number_modifier_value_map = {
    1: "1",
    3: "2",
    9: "3",
    25: "4",
    17: "5",
    11: "6",
    27: "7",
    19: "8",
    10: "9",
    26: "0",
    50: ".",
    2: ","
};

function AddCharacter(){
    let charVal = 0;
    for(let i = 0; i < 6; i++){
        charVal |= document.getElementById("checkbox_"+i).checked << i
        document.getElementById("checkbox_"+i).checked = false;
    }
    if(is_debug){
        console.log(charVal);
        //console.log(String.fromCodePoint('0x28'+charVal))
    }
    charVal = String.fromCharCode("0x28"+charVal.toString(16).padStart(2, "0"));

    // If user has curser in the field when adding a character, add at curser
    if (user_input_field.selectionStart || user_input_field.selectionStart == '0') {
        var startPos = user_input_field.selectionStart;
        var endPos = user_input_field.selectionEnd;
        user_input_field.value = user_input_field.value.substring(0, startPos)
            + charVal
            + user_input_field.value.substring(endPos, user_input_field.value.length);
    }
    else{
        user_input_field.value += charVal;
    }
}

function RemoveCharacter(){
    user_input_field.value = user_input_field.value.substring(0, user_input_field.value.length - 1)
}

function Convert(){
    let charArray = user_input_field.value.split('');

    let isNumber = false;
    let isCap = false;
    let isCap_word = false;

    
    document.getElementById("Converted_Text").innerHTML="";

    // Run same for loop twice to avoid issues of accessing unconverted values for prefix characters
    for(let i = 0; i<charArray.length; i++){
        charArray[i] = charArray[i].charCodeAt(0)-10240;
    }

    for(let i = 0; i<charArray.length; i++){
        // Check for indicator characters
        switch(charArray[i]) {
            case numeric_indicator:
                isNumber = true;
                continue;

            case capital_indicator:
                if(isCap_word){ // Capitalised word indicator is terminated upon a single capital letter
                    isCap_word = false;
                }
                else if(isCap){
                    isCap_word = true;
                }
                isCap = true;
                isNumber = false;
                continue;

            default:
                break;
        }

        if(prefix_value_map[charArray[i]] !== undefined){
            if(prefix_value_map[charArray[i]][charArray[i+1]] !== undefined){
                document.getElementById("Converted_Text").innerHTML+= prefix_value_map[charArray[i]][charArray[i+1]];
                    i++;
                    continue;
            }
        }

        if(isCap_word){
            isCap = true;
        }

        if(isNumber){
            if(number_modifier_value_map[charArray[i]] === undefined){
                if(charArray[i] === grade_1_indicator){
                    isNumber = false;
                    continue;
                }
                
                isNumber = false;
                i--;
                continue;
            }
            else{
                document.getElementById("Converted_Text").innerHTML+= number_modifier_value_map[charArray[i]];
            }
        }
        else if(no_modifier_value_map[charArray[i]] !== undefined){
            if(isCap){
                document.getElementById("Converted_Text").innerHTML+= no_modifier_value_map[charArray[i]].toUpperCase();
                isCap = false;
            }
            else{
                document.getElementById("Converted_Text").innerHTML+= no_modifier_value_map[charArray[i]];
            }
        }
        
    }
}

user_input_field.addEventListener("input", function (event) {
    this.value = this.value.replace(/[^\u2800-\u283F]/g, '');
}, false);

document.addEventListener("keypress", function (event) {
    if (event.code === "Numpad7") {			// 7
        document.getElementById("checkbox_0").checked = !document.getElementById("checkbox_0").checked;
    }
    else if (event.code === "Numpad8") {	// 8
        document.getElementById("checkbox_3").checked = !document.getElementById("checkbox_3").checked
    }
    else if (event.code === "Numpad4") {	// 4
        document.getElementById("checkbox_1").checked = !document.getElementById("checkbox_1").checked
    }
    else if (event.code === "Numpad5") {	// 5
        document.getElementById("checkbox_4").checked = !document.getElementById("checkbox_4").checked
    }
    else if (event.code === "Numpad1") {	// 1
        document.getElementById("checkbox_2").checked = !document.getElementById("checkbox_2").checked
    }
    else if (event.code === "Numpad2") {	// 2
        document.getElementById("checkbox_5").checked = !document.getElementById("checkbox_5").checked
    }
    else if (event.code === "NumpadSubtract") {
        RemoveCharacter();
    }
    else if (event.code === "NumpadAdd") {
        AddCharacter();
    }
    else if (event.code === "NumpadEnter") {
        Convert();
    }
}, false);

// http://www.brl.org/intro/index.html
// https://www.pharmabraille.com/pharmaceutical-braille/the-braille-alphabet/