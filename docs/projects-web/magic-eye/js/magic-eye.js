function Generate(){
    let message = document.getElementById("message").value;
    let filler = document.getElementById("filler").value;
    let output = [];

    message = message.replace(/[^a-zA-Z ]+/g, "").trim().split(/\s+/);
    filler = filler.replace(/[^a-zA-Z ]+/g, "").trim().split(/\s+/);


    if (message.length == 1 && message[0] == "") {
        alert("Please enter a message.");
        return;
    }
    else if (message.length > 23) {
        alert("Message is too long. Please limit to 23 words.");
        return;
    }

    // if the user does not enter a filler, use the default filler
    if (filler.length == 1 && filler[0] == "") {
        filler = ["a", "arrange", "be", "bean", "cheap", "clever", "deep", "dinner", "direct", "due", "either", "electric", "farther", "froze", "harness", "haste", "her", "hurried", "i", "in", "inn", "insect", "jig", "man", "marriage", "ninety", "no", "ore", "pan", "paper", "puppy", "rat", "ray", "sausage", "set", "silly", "sixteen", "so", "spit", "sum", "thursday", "to", "weave", "wild"]
    }

    // ensure the user enters enough filler words
    let repeatedLength = 14;
    if(filler.join(" ").length < repeatedLength){
        alert("Not enough filler words. Please enter more filler words.");
        return;
    }

    let tuning_offset = 1;

    for(let i = 0; i < 23; i++){
        // randomize the filler words order
        //var line_words = shuffle(filler);
        var line_words = shuffle(Array.from(filler));

    
        // find the index of the secret message line
        var message_index = Math.floor((23 - message.length) / 2);

        // if secret message line:
        if(i >= message_index && i < message_index + message.length){
            // replace the filler words with the secret message words
            line_words[1] = message[i - message_index]; // replace the second word with the secret message word
            line_words_string = line_words.join(" ");
            line_words_string = line_words_string.slice(0, repeatedLength);

            line_words[0] = line_words[0].slice(0, -1);  // cut off the last letter
            line_words[2] = "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)] + line_words[2];   // add a new letter to the beginning
            line_words_alt = line_words.join(" ");
            line_words_alt = line_words_alt.slice(0, repeatedLength);

            counter = 0;
            while (line_words_string.length < 80) {            // Loop until the string is 80 characters long
                if (counter < 1){
                    line_words_string+= " " + line_words_string;   
                }
                else{
                    line_words_string+= " " + line_words_alt;
                }
                counter++;
            }

        }
        else{
            line_words_string = line_words.join(" ");               // Combine the four words into a string
            line_words_string = line_words_string.slice(0, repeatedLength);

            while (line_words_string.length < 80) {                 // Loop until the string is 80 characters long
                line_words_string+= " " + line_words_string;
            }
        }
        
        line_words_string = line_words_string.substring(0, 80);     // Truncate to 80 characters

        const shiftAmount = Math.floor(Math.random() * -8);          // random number from 0 to 7
        line_words_string = line_words_string.slice(shiftAmount) + line_words_string.slice(0, shiftAmount);
        
        output.push(line_words_string);                             // Add the line to the output array
    }

    Display(output);
}

function Display(output){
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set font and style
    ctx.font = "15px 'Courier New'";
    ctx.fillStyle = "black";       // text color

    // Draw text
    for (let i = 0; i < output.length; i++) {
        ctx.fillText(output[i], 10, 30 + (i * 18)); // text, x, y
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//Example:

/*
output = [
    "so in insect i so in insect i so in insect i so in insect i so in insect i so i",      
    "ig haste mu a jig haste mu a jig haste mu a jig haste mu a jig haste mu a jig ha",     
    "ic froze electric froze electric froze electric froze electric froze electric fr",     
    "rat bean silly rat bean silly rat bean silly rat bean silly rat bean silly rat",       
    "ore sum ninety ore sum ninety ore sum ninety ore sum ninety ore sum ninety ore s",     
    "thursday a pan thursday a pan thursday a pan thursday a pan thursday a pan thurs",     
    "ormy Brand a stormy Brand a storm Brand ha storm Brand ha storm Brand ha storm B",     // Brand    
    "rican new a american new a america new ma america new ma america new ma america",      // new
    "dancer QI long dancer QI long dance QI along dance QI along dance QI along danc",      // QI
    "ap to i due cheap to i due cheap to i due cheap to i due cheap to i due cheap to",     
    "either sixteen either sixteen either sixteen either sixteen either sixteen eithe",     
    "ad Thursday a mad Thursday a ma Thursday la ma Thursday la ma Thursday la ma Thu",     // Thursday
    "le web 9pm rumble web 9pm rumble we 9pm crumble we 9pm crumble we 9pm crumble we",     // 9pm
    "o i bath BBC Two i bath BBC Two i bat BBC Two pi bat BBC Two pi bat BBC Two pi b",     // BBC Two
    "t arrange direct arrange direct arrange direct arrange direct arrange direct arr",     
    "man hurried no man hurried no man hurried no man hurried no man hurried no man h",     
    "ild sausage a wild sausage a wild sausage a wild sausage a wild sausage a wild s",     
    "ss be set harness be set harness be set harness be set harness be set harness be",     
    "ever farther clever farther clever farther clever farther clever farther clever",      
    "ave inn deep weave inn deep weave inn deep weave inn deep weave inn deep weave i",     
    "age paper marriage paper marriage paper marriage paper marriage paper marriage p",     
    "baa puppy spit baa puppy spit baa puppy spit baa puppy spit baa puppy spit baa p",     
    "ner ray her dinner ray her dinner ray her dinner ray her dinner ray her dinner r"
]

Generated output:
- 80 characters per line
- 23 lines

repeated section needs to be the exact same length for each line



for the lines with the secret message
- the word before and after the secret word need to be modified
- the word before the secret word needs to be modified by removing a letter from the end of it
    - line_words[0].slice(0, -1);
- the word after the secret word needs to be modified by adding a letter to the beginning of it
    - "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)] + line_words[2]



formula to figure out what lines the secret message will be on

23 - (number of words in the message)
divide by 2 and floor it
calculated number is starting index of the secret message line

eg:
message = "one"
23 - 1 = 22
22 / 2 = 11
floor(11) = 11

message = "hello world"
23 - 2 = 21
21 / 2 = 10.5
floor(10.5) = 10

message = "hello ... test"  // 23 words
23 - 23 = 0
0 / 2 = 0
floor(0) = 0

*/