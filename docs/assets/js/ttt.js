/*
    1 | 2 | 4
-----------
    8 |16 |32
-----------
64 |128|256
*/
    // variables
    let placed = [0,0] // player, com
    let comMoves = [];
    let playerMoves = [];
    let isPlayerTurn = true;
    let playerChar = "X"; //Starting Player is X's
    let comChar = "O";
    let winner = -1;
    let edge = false;
    
    // setup
    draw();
    // functions
    function draw() {
        const canvas = document.getElementById("canvas");
        currentChar = "";
        if (canvas.getContext) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ctx.beginPath();
            ctx.moveTo(canvas.width/3, 0);
            ctx.lineTo(canvas.width/3, canvas.height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(2*canvas.width/3, 0);
            ctx.lineTo(2*canvas.width/3, canvas.height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, canvas.height/3);
            ctx.lineTo(canvas.width, canvas.height/3);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, 2*canvas.height/3);
            ctx.lineTo(canvas.width, 2*canvas.height/3);
            ctx.stroke();
            
            for(let i = 0; i < 3; i++){
                for(let j = 0; j<3; j++){
                    if((placed[0] & 1 << i+j*3) != 0){
                        currentChar = playerChar
                    }

                    else if((placed[1] & 1 << i+j*3) != 0){
                        currentChar = comChar
                    }
                    else{
                        currentChar = ""
                    }
                
                
                    if (currentChar == "X"){
                        ctx.beginPath();
                        ctx.moveTo(i*canvas.width/3, j*canvas.height/3);
                        ctx.lineTo((i+1)*canvas.width/3, (j+1)*canvas.height/3);
                        ctx.stroke();
                        
                        ctx.beginPath();
                        ctx.moveTo(i*canvas.width/3, (j+1)*canvas.height/3);
                        ctx.lineTo((i+1)*canvas.width/3, j*canvas.height/3);
                        ctx.stroke();
                    }
                    else if (currentChar == "O"){
                        ctx.beginPath();
                        ctx.arc(i*canvas.width/3 + canvas.width/6, j*canvas.height/3 + canvas.height/6, canvas.width/6, 0, 2 * Math.PI);
                        ctx.stroke();
                    }
                }
            }
        }
    }
    
    function comsTurn(buttonPress){
        if(buttonPress){
            reset();
            isPlayerTurn = false;
        }
        
        let x = 0;
        let y = 0;
        let possibleWins = 0;
        
        //check if com can win
        possibleWins = checkPossibleWins(1);
        if(possibleWins != 0){
            [x, y] = possibleWins
            comMoves.push([x, y]);
            placeShape(x,y,1)
            return;
        }
        
        //check if player can win
        possibleWins = checkPossibleWins(0);
        if(possibleWins != 0){
            [x, y] = possibleWins
            comMoves.push([x, y]);
            placeShape(x,y,1)
            return;
        }
        
        if (numPlaced(0) == 0 && numPlaced(1) == 0){ // first turn, com leads
            playerChar = "O";
            comChar = "X";
            x = Math.floor(Math.random() * 2)*2
            y = Math.floor(Math.random() * 2)*2
            comMoves.push([x, y]); //play in a random corner
            placeShape(x,y,1)
            return;
        }
        
        if(numPlaced(0) == 1 && numPlaced(1) == 0){ // first turn, player leads
            //if player placed in a corner, take the center
            if((placed[0]&325) != 0){
                x = 1
                y = 1
                comMoves.push([x, y]);
                placeShape(x,y,1)
                return;
            }
            
            //if player placed in an edge, take the center
            if((placed[0]&170) != 0){
                edge = true;
                x = 1
                y = 1
                comMoves.push([x, y]);
                placeShape(x,y,1)
                return;
            }
            
            //if player placed in center, take a corner
            if((placed[0]&16)!=0){
                x = Math.floor(Math.random() * 2)*2
                y = Math.floor(Math.random() * 2)*2
                comMoves.push([x, y]); //play in a random corner
                placeShape(x,y,1)
                return;
            }
        }
        
        else if(numPlaced(0) == 1 && numPlaced(1) == 1){ // second turn, com leads
            // if player placed in opposite corner, place in one of the other two corners
            [x, y] = getCoordinates(placed[1]);
            if (checkPlace(x^0b10,y^0b10)){
                if(Math.floor(Math.random() * 2)){
                    x = x
                    y = y^0b10
                    comMoves.push([x, y]);
                    placeShape(x,y,1)
                }
                else{
                    x = x^0b10
                    y = y
                    comMoves.push([x, y]);
                    placeShape(x,y,1)
                }
            }
            else{ // place in opposite corner from first move
                x = x^0b10
                y = y^0b10
                comMoves.push([x, y]);
                placeShape(x,y,1)
            }
        }
        
        else if(numPlaced(0) == 2 && numPlaced(1) == 1){ // second turn, player leads
            // if player placed in the center
            if((placed[0]&16) != 0){
                if(((placed[0]|placed[1])&1) == 0){
                    x = 0;
                    y = 0;
                }
                else if(((placed[0]|placed[1])&4) == 0){
                    x = 2;
                    y = 0;

                }else if(((placed[0]|placed[1])&64) == 0){
                    x = 0;
                    y = 2;

                }else if(((placed[0]|placed[1])&256) == 0){
                    x = 2;
                    y = 2;
                }
                comMoves.push([x, y]);
                placeShape(x,y,1)
                return;
            }
            // if com placed in the center (player starts in corner) take an edge
            if((placed[1]&16) != 0 && !edge){
                if(((placed[0]|placed[1])&2) == 0){
                    x = 1;
                    y = 0;
                }
                else if(((placed[0]|placed[1])&8) == 0){
                    x = 0;
                    y = 1;

                }else if(((placed[0]|placed[1])&32) == 0){
                    x = 2;
                    y = 1;

                }else if(((placed[0]|placed[1])&128) == 0){
                    x = 1;
                    y = 2;

                }
                comMoves.push([x, y]);
                placeShape(x,y,1)
                return;
            }
            // else com placed in the center (player starts in edge)
            else{
                if(((placed[0]&8) != 0 && (placed[0]&32) != 0) || ((placed[0]&2) != 0 && (placed[0]&128) != 0)){ // player placed in opposite edge
                    // play in corner
                    x = Math.floor(Math.random() * 2)*2
                    y = Math.floor(Math.random() * 2)*2
                    comMoves.push([x, y]); //play in a random corner
                    placeShape(x,y,1)
                    return;
                }
                if((placed[0]&10) == 10 || (placed[0]&34) == 34 || (placed[0]&160) == 160 || (placed[0]&136) == 136){ // player placed in adjacent edge
                    // play in corner between two edges player placed in
                    if((placed[0]&2)!=0){
                        y = 0;
                    }
                    else{
                        y = 2
                    }
                    
                    if((placed[0]&8)!=0){
                        x = 0;
                    }
                    else{
                        x = 2
                    }
                    comMoves.push([x, y]);
                    placeShape(x,y,1)
                    return;
                }
                else{ // player place in either corner on opposite edge
                    // take an edge?
                    if(((placed[0]|placed[1])&2) == 0){
                        x = 1;
                        y = 0;
                    }
                    else if(((placed[0]|placed[1])&8) == 0){
                        x = 0;
                        y = 1;

                    }else if(((placed[0]|placed[1])&32) == 0){
                        x = 2;
                        y = 1;

                    }else if(((placed[0]|placed[1])&128) == 0){
                        x = 1;
                        y = 2;

                    }
                    comMoves.push([x, y]);
                    placeShape(x,y,1)
                    return
                }
            }
        }
        
        else if(numPlaced(0) == 2 && numPlaced(1) == 2){ // third turn, com leads
            // place in remaining corner
            if(((placed[0]|placed[1])&0b1) == 0){
                comMoves.push([0,0]);
                placeShape(0,0,1)
            }else if(((placed[0]|placed[1])&4) == 0){
                comMoves.push([2,0]);
                placeShape(2,0,1)
            }else if(((placed[0]|placed[1])&64) == 0){
                comMoves.push([0,2]);
                placeShape(0,2,1)
            }else if(((placed[0]|placed[1])&256) == 0){
                comMoves.push([2,2]);
                placeShape(2,2,1)
            }
        }
        
        else if(numPlaced(0) == 3 && numPlaced(1) == 2){ // third turn, player leads
            // if com placed in the center (player starts in corner) or edge
            if((placed[1]&16) != 0){
                if(((placed[0]|placed[1])&257)==0){
                    if(Math.floor(Math.random() * 2)){
                        x = 0;
                        y = 0;
                    }
                    else{
                        x = 2;
                        y = 2;
                    }
                }
                else if(((placed[0]|placed[1])&68)==0){
                    if(Math.floor(Math.random() * 2)){
                        x = 2;
                        y = 0;
                    }
                    else{
                        x = 0;
                        y = 2;
                    }
                }
                else if(((placed[0]|placed[1])&130)==0){
                    if(Math.floor(Math.random() * 2)){
                        x = 1;
                        y = 0;
                    }
                    else{
                        x = 1;
                        y = 2;
                    }
                }
                else if(((placed[0]|placed[1])&40)==0){
                    if(Math.floor(Math.random() * 2)){
                        x = 0;
                        y = 1;
                    }
                    else{
                        x = 2;
                        y = 1;
                    }
                }
                comMoves.push([x, y]);
                placeShape(x,y,1)
                return;
            }
        }
        
        else if(numPlaced(0) == 3 && numPlaced(1) == 3){ // fourth turn, com leads
            console.log("this should never run")
        }
        
        else if(numPlaced(0) == 4 && numPlaced(1) == 3){ // fourth turn, player leads
            // place in first remaining spot
            (placed[0]|placed[1])^511
            for(let i = 0;i<9;i++){
                if(((placed[0]|placed[1])^511)& 1 << i){
                    x = i%3
                    y = Math.floor(i/3)
                    comMoves.push([x, y]);
                    placeShape(x,y,1)
                    return;
                }
            }
        }
        
        else if(numPlaced(0) == 4 && numPlaced(1) == 4){ // fifth turn, com leads
            console.log("this should never run")
        }
        
        else if(numPlaced(0) == 5 && numPlaced(1) == 4){ // fifth turn, player leads
        
        }
    }
    
    function numPlaced(value){
        let numPlacedValue = 0;
        for(let i = 0; i < 9; i++){
            if((placed[value] & 1 << i) != 0){
                numPlacedValue++;
            }
        }
        return numPlacedValue;
    }
    
    function checkPossibleWins(value){
        let placedInRow = 0;
        let placedInCol = 0;
        let placedInD1 = 0;
        let placedInD2 = 0;
        let emptyRowSpace = 0;
        let emptyColSpace = 0;
        let emptyD1Space = 0;
        let emptyD2Space = 0;

        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if((placed[value] & (1<<j+i*3)) != 0){ // rows
                    placedInRow++;
                }else if ((placed[value^1] & (1<<j+i*3)) == 0){
                    emptyRowSpace = j;
                }else{
                    placedInRow = -1;
                }
                if((placed[value] & (1<<i+j*3)) != 0){ // columns
                    placedInCol++;
                }else if ((placed[value^1] & (1<<i+j*3)) == 0){
                    emptyColSpace = j;
                }
                else{
                    placedInCol = -1;
                }
            }
            if((placed[value] & (1<<(2-i)+i*3)) != 0){ // diagonal: top right to bottom left
                placedInD1++;
            }else if ((placed[value^1] & (1<<(2-i)+i*3)) == 0){
                emptyD1Space = i;
            }
            else{
                placedInD1 = -1;
            }
            if((placed[value] & (1<<i+i*3)) != 0){ // diagonal: top left to bottom right
                placedInD2++;
            }else if ((placed[value^1] & (1<<i+i*3)) == 0){
                emptyD2Space = i;
            }
            else{
                placedInD2 = -1;
            }
            
            if(placedInRow == 2){
                return [emptyRowSpace, i]
            }
            if(placedInCol == 2){
                return [i, emptyColSpace]
            }
            
            placedInRow = 0;
            placedInCol = 0;
        }
        if(placedInD1 == 2){
            return [2-emptyD1Space, emptyD1Space]
        }
        if(placedInD2 == 2){
            return [emptyD2Space, emptyD2Space]
        }
        return 0;
    }
    
    function placeShape(x, y, user){
        if((placed[0]& 1 << x+y*3) == 0 && (placed[1]& 1 << x+y*3) == 0){
            placed[user]|= 1 << x+y*3
            draw();
            // check for wins
            if (!checkWins(user) && user){
                isPlayerTurn = true;
            }
            return true;
        }
        else{
            return false;
        }
    }
    
    function getCoordinates(value){
        value = Math.log2(value)
        let x = value%3
        let y = Math.floor(value/3)
        return [x, y]
    }
    
    function checkPlace(x, y, user){
        if((placed[0]& 1 << x+y*3) != 0 || (placed[1]& 1 << x+y*3) != 0){
            return true;
        }
        else{
            return false;
        }
    }
    
    function checkWins(user){
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
    
        for(let i = 0; i<3;i++){
            if((placed[user]& 0b111<<i*3) == 0b111<<i*3){
                ctx.beginPath();
                ctx.moveTo(0, canvas.height/6 + i*canvas.height/3);
                ctx.lineTo(canvas.width, canvas.height/6 + i*canvas.height/3);
                ctx.stroke();
                return true;
            }
            if((placed[user]& 0b001001001<<i) == 0b001001001<<i){
                ctx.beginPath();
                ctx.moveTo(canvas.width/6 + i*canvas.width/3, 0);
                ctx.lineTo(canvas.width/6 + i*canvas.width/3, canvas.height);
                ctx.stroke();
                return true;
            }
        }
        if((placed[user]& 0b100010001) == 0b100010001){
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(canvas.width, canvas.height);
            ctx.stroke();
            return true;
        }
        if((placed[user]& 0b001010100) == 0b001010100){
            ctx.beginPath();
            ctx.moveTo(canvas.width, 0);
            ctx.lineTo(0, canvas.height);
            ctx.stroke();
            return true;
        }
        return false;
    }
    
    function reset(){
        placed = [0,0]
        comMoves = [];
        playerMoves = [];
        isPlayerTurn = true;
        playerChar = "X"; //Starting Player is X's
        comChar = "O";
        winner = -1;
        edge = false;
        document.getElementById("inPageLog").innerHTML = ""
        draw();
    }
    
    function printLog(){
        document.getElementById("inPageLog").innerHTML = "comMoves ("+comChar+"): "+ comMoves + "<br>playerMoves ("+playerChar+"): " + playerMoves
    }
    
    canvas.addEventListener('mousedown', function(event) {
        let userInputX = Math.floor((event.pageX - canvas.offsetLeft)/(canvas.width/3));
        let userInputY = Math.floor((event.pageY - canvas.offsetTop)/(canvas.height/3));
        if(isPlayerTurn && placeShape(userInputX, userInputY, 0)){
            playerMoves.push([userInputX, userInputY]);
            isPlayerTurn = false;
            comsTurn();
        }
        //console.log(userInputX+", "+userInputY);
    })
	