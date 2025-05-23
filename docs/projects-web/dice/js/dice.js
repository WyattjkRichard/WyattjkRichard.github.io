//d2, d3, d4, d6, d8, d10, d12, d20, d100
//number of said dice
//additional value
let currentDie = [0]

function updateRoll(rollNum){
    let qty = document.getElementById("qty"+rollNum).value
    let add = document.getElementById("add"+rollNum).value
    let die = document.getElementById("die"+rollNum).value
    if(qty<1) qty = 1
    if(add<0) add = 0
    let diceRoll = qty + "d" + die + " + " + add
    
    document.getElementById("qty"+rollNum).value = qty
    document.getElementById("add"+rollNum).value = add
    document.getElementById("diceRoll"+rollNum).innerHTML = diceRoll
}

function roll(rollNum, mode){
    let qty = document.getElementById("qty" + rollNum).value
    let add = document.getElementById("add" + rollNum).value
    let die = document.getElementById("die" + rollNum).value
    if(die == 0){
        alert("Please select valid dice options");
        return
    }
    
    let diceRoll = qty + "d" + die + " + " + add + "  &#8594;  "
    let rolls = " (";
    let currentRoll = 0
    let result = 0;
    for(let i = 0; i< qty;i++){
        currentRoll = Math.floor(Math.random() * die) + 1
        result += currentRoll
        rolls += currentRoll +", "
    }
    rolls = rolls.substring(0, rolls.length - 2) + ")";
    result+= + add;
    diceRoll += result
    if(qty > 1){
        diceRoll += rolls
    }
    
    if(mode){ // roll all
        return [diceRoll + "<br>", result]
    }
    else{ // role one
        document.getElementById("diceRollLog").innerHTML += diceRoll + "<br><br>"
    }
}

function addDie(){
    let nextDie = currentDie[currentDie.length-1]+1
    currentDie.push(nextDie)
    reprintDiceMenu(1);
    document.getElementById("roleAllButton").removeAttribute("hidden")
}

function removeDie(rollNum){
    currentDie.splice(currentDie.indexOf(rollNum), 1);
    reprintDiceMenu(0);
    if (currentDie.length == 1){
        document.getElementById("roleAllButton").setAttribute("hidden", "hidden")
    }
}

function reprintDiceMenu(value){
    let currentSettings = []
    for (let i = 0; i< currentDie.length - value; i++){
        currentSettings.push([
            document.getElementById("qty" + currentDie[i]).value,
            document.getElementById("add" + currentDie[i]).value,
            document.getElementById("die" + currentDie[i]).value
        ])
    }
    
    document.getElementById("diceOptions").innerHTML =""
    for (let i = 0; i< currentDie.length; i++){
        if(currentDie[i] == 0){
            document.getElementById("diceOptions").innerHTML += '<div id = "die_'+currentDie[i]+'"> <input type="number" id="qty'+currentDie[i]+'" value = "1" min = "1" class = "smalltextbox" onchange="updateRoll('+currentDie[i]+')"> <select id="die'+currentDie[i]+'" name="variable" onchange="updateRoll('+currentDie[i]+')"> <option value="0" disabled selected>Select a die</option> <option value="2">d2</option> <option value="3">d3</option> <option value="4">d4</option> <option value="6">d6</option> <option value="8">d8</option> <option value="10">d10</option> <option value="12">d12</option> <option value="20">d20</option> <option value="100">d100</option> </select> + <input type="number" id="add'+currentDie[i]+'" value = "0" min = "0" class = "smalltextbox" onchange="updateRoll('+currentDie[i]+')"> <button onclick="roll('+currentDie[i]+', 0)">Roll</button> <div id = "diceRoll'+currentDie[i]+'">0d0 + 0</div></div>'
        }
        else{
            document.getElementById("diceOptions").innerHTML += '<div id = "die_'+currentDie[i]+'"> <input type="number" id="qty'+currentDie[i]+'" value = "1" min = "1" class = "smalltextbox" onchange="updateRoll('+currentDie[i]+')"> <select id="die'+currentDie[i]+'" name="variable" onchange="updateRoll('+currentDie[i]+')"> <option value="0" disabled selected>Select a die</option> <option value="2">d2</option> <option value="3">d3</option> <option value="4">d4</option> <option value="6">d6</option> <option value="8">d8</option> <option value="10">d10</option> <option value="12">d12</option> <option value="20">d20</option> <option value="100">d100</option> </select> + <input type="number" id="add'+currentDie[i]+'" value = "0" min = "0" class = "smalltextbox" onchange="updateRoll('+currentDie[i]+')"> <button onclick="roll('+currentDie[i]+', 0)">Roll</button> <button onclick="removeDie('+currentDie[i]+')">-</button> <div id = "diceRoll'+currentDie[i]+'">0d0 + 0</div></div>'
        }
    }
    
    for(let i = 0; i< currentSettings.length; i++){
        //console.log(currentSettings[i])
        document.getElementById("qty" + currentDie[i]).value = currentSettings[i][0]
        document.getElementById("add" + currentDie[i]).value = currentSettings[i][1]
        document.getElementById("die" + currentDie[i]).value = currentSettings[i][2]
        document.getElementById("diceRoll"+currentDie[i]).innerHTML = currentSettings[i][0] + "d" + currentSettings[i][2] + " + " + currentSettings[i][1]
    }
}

function rollAll(){
    let combinedResults = ""
    let totalRoll = 0
    let results = ""
    let value = 0
    for(let i = 0; i< currentDie.length; i++){
        [results, value] = roll(currentDie[i], 1)
        combinedResults += results
        totalRoll += value
    }
    document.getElementById("diceRollLog").innerHTML += combinedResults + "Total: " + totalRoll +"<br><br>"
}

function clearLog(){
    document.getElementById("diceRollLog").innerHTML = ""
}