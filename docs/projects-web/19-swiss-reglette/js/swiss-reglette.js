const inner_rule = ["A", "B", "C", "CH", "D", "DE", "E", "EI", "EN", "ER", "ES", "F", "G", "H", "I", "IE", "J", "K", "L", "M", "N", "NE", "O", "P", "Q", "R", "RE", "S", "SE", "ST", "T", "TE", "U", "V", "W", "X", "Y", "Z", ".", "#", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const outer_rule = [["01", "00"], ["03", "98"], ["05", "96"], ["07", "94"], ["09", "92"], ["11", "90"], ["13", "88"], ["15", "86"], ["17", "84"], ["19", "82"], ["21", "80"], ["23", "78"], ["25", "76"], ["27", "74"], ["29", "72"], ["31", "70"], ["33", "68"], ["35", "66"], ["37", "64"], ["39", "62"], ["41", "60"], ["43", "58"], ["45", "56"], ["47", "54"], ["49", "52"], ["51", "50"], ["53", "48"], ["55", "46"], ["57", "44"], ["59", "42"], ["61", "40"], ["63", "38"], ["65", "36"], ["67", "34"], ["69", "32"], ["71", "30"], ["73", "28"], ["75", "26"], ["77", "24"], ["79", "22"], ["81", "20"], ["83", "18"], ["85", "16"], ["87", "14"], ["89", "12"], ["91", "10"], ["93", "08"], ["95", "06"], ["97", "04"], ["99", "02"]];

function decrypt(){
    let validation = validateInput();
    if (!validation.result){
        document.getElementById("output").innerText = "";
        return;
    }

    let {keyword, keynumber, message} = validation.data;
    let count = 0;
    let decrypted_message_string = ""
    let decrypted_message = []

    for(let i = 0; i < message.length; i+=2){
        offset = calculateOffset(keynumber, keyword, count);

        const symbol = message[i]+message[i+1];
        let index = outer_rule.findIndex(pair => pair.includes(symbol));

        index -= offset
        index %= inner_rule.length;

        if(index < 0){
            index += inner_rule.length;
        }

        if (inner_rule[index] == "#"){
            keynumber = message[i+2]+message[i+3];
            i+=2;
        }
        else{
            decrypted_message_string += inner_rule[index];
            decrypted_message.push(inner_rule[index]);
        }
        count++;
    }
    console.log(decrypted_message);
    document.getElementById("output").innerText = decrypted_message_string;
}

function encrypt(){
    let validation = validateInput();
    if (!validation.result){
        document.getElementById("output").innerText = "";
        return;
    } 

    let {keyword, keynumber, message} = validation.data;
    let count = 0;
    let encrypted_message = []
    
    for(let i of message){
        offset = calculateOffset(keynumber, keyword, count);

        // find the index of the letter
        let message_letter_index = inner_rule.indexOf(i);

        // apply the offset
        message_letter_index += offset

        message_letter_index %= inner_rule.length;

        // console.log(i + ": " + outer_rule[message_letter_index]);
        // randomly pick one of the two numbers at this index
        encrypted_message.push(outer_rule[message_letter_index][Math.round(Math.random())])

        count++;
    }
    const encrypted_message_string = encryptedMessageToString(encrypted_message)
    document.getElementById("output").innerText = encrypted_message_string;

    // console.log(encrypted_message)
}

function validateInput(){
    let validationStatus = true;
    let keyword = document.getElementById("keyword").value;
    if (/^[A-Za-z.]+$/.test(keyword)){
        keyword = keyword.toUpperCase();
        document.getElementById("keyword").value = keyword;
        document.getElementById("keyWordErrorMsg").innerText = "";
    }
    else{
        document.getElementById("keyWordErrorMsg").innerText = "Invalid Key Word";
        validationStatus = false;
    }

    let keynumber = document.getElementById("keynumber").value;
    if (/^([0-9]|[0-9][0-9])$/.test(keynumber)){
        keynumber = String(keynumber).padStart(2, '0');
        document.getElementById("keynumber").value = keynumber;
        document.getElementById("keyNumberErrorMsg").innerText = "";
    }
    else{
        document.getElementById("keyNumberErrorMsg").innerText = "Invalid Key Number";
        validationStatus = false;
    }

    let message = document.getElementById("message").value;
    if (/^[A-Za-z0-9. ]+$/.test(message)){ // swap character (#) not implemented rn
        message = message.toUpperCase();
        message = message.replaceAll(' ', '')

        document.getElementById("messageErrorMsg").innerText = "";
    }
    else{
        document.getElementById("messageErrorMsg").innerText = "Invalid Message";
        validationStatus = false;
    }

    return {result: validationStatus, data: {keyword: keyword, keynumber: keynumber, message: message}};
}

function calculateOffset(keynumber, keyword, count){
    // determine what letter of the key word is going to be used
    const key_letter = keyword[count % keyword.length];
    const key_letter_index = inner_rule.indexOf(key_letter);
    const key_number_index = outer_rule.findIndex(pair => pair.includes(keynumber));
    const offset = key_number_index - key_letter_index;

    // console.log("Key Letter: "+key_letter+" , at index: "+key_letter_index+", resulting in an offset of: "+ offset);
    return offset;
}

function encryptedMessageToString(encrypted_message){
    let encrypted_message_string = ""
    for (let i = 0; i < encrypted_message.length; i++){
        encrypted_message_string += encrypted_message[i];
        if (i % 5 == 4){
            encrypted_message_string+=" ";
        }
    }

    if (encrypted_message.length % 5 != 0){
        for (let i = 0; i < 5 - encrypted_message.length % 5 ; i++){
            encrypted_message_string+=Math.floor(Math.random() * 10);
            encrypted_message_string+=Math.floor(Math.random() * 10);
        }
    }

    

    return encrypted_message_string;
}