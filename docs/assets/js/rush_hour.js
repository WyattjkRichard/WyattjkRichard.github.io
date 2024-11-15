// variables
var levelStatus = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
var drag = false;
var dragOffset;
var gridSize = 50;
var movingShape;
var movementRange = {
    xMin: 0,
    xMax: canvas.width,
    yMin: 0,
    yMax: canvas.height
}


let shapes = {
    "A": {
        x: gridSize*0,
        y: gridSize*0,
        height: gridSize*1,
        width: gridSize*2,
        colour: 'LightGreen',
    },
    "B": {
        x: gridSize*2,
        y: gridSize*0,
        height: gridSize*1,
        width: gridSize*2,
        colour: 'DarkOrange',
    },
    "C": {
        x: gridSize*4,
        y: gridSize*0,
        height: gridSize*1,
        width: gridSize*2,
        colour: 'Aqua',
    },
    "D": {
        x: gridSize*0,
        y: gridSize*1,
        height: gridSize*1,
        width: gridSize*2,
        colour: 'Pink',
    },
    "E": {
        x: gridSize*2,
        y: gridSize*1,
        height: gridSize*1,
        width: gridSize*2,
        colour: 'BlueViolet',
    },
    "F": {
        x: gridSize*4,
        y: gridSize*1,
        height: gridSize,
        width: gridSize*2,
        colour: 'ForestGreen',
    },
    "G": {
        x: gridSize*0,
        y: gridSize*2,
        height: gridSize,
        width: gridSize*2,
        colour: 'Black',
    },
    "H": {
        x: gridSize*2,
        y: gridSize*2,
        height: gridSize,
        width: gridSize*2,
        colour: 'grey',
    },
    "I": {
        x: gridSize*4,
        y: gridSize*2,
        height: gridSize,
        width: gridSize*2,
        colour: 'yellow',
    },
    "J": {
        x: gridSize*4,
        y: gridSize*5,
        height: gridSize*1,
        width: gridSize*2,
        colour: 'DarkMagenta',
    },
    "K": {
        x: gridSize*4,
        y: gridSize*3,
        height: gridSize*1,
        width: gridSize*2,
        colour: 'DimGrey',
    },
    "O": {
        x: gridSize*0,
        y: gridSize*3,
        height: gridSize*3,
        width: gridSize,
        colour: 'Gold',
    },
    "P": {
        x: gridSize*1,
        y: gridSize*3,
        height: gridSize*3,
        width: gridSize,
        colour: 'MediumPurple',
    },
    "Q": {
        x: gridSize*2,
        y: gridSize*3,
        height: gridSize*3,
        width: gridSize,
        colour: 'RoyalBlue',
    },
    "R": {
        x: gridSize*3,
        y: gridSize*3,
        height: gridSize*3,
        width: gridSize,
        colour: 'MediumSeaGreen',
    },
    "X": {
        x: gridSize*4,
        y: gridSize*4,
        height: gridSize,
        width: gridSize*2,
        colour: 'red',
    }
}

let levelLayouts = {
    "level 1":{
        "A": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*0,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*4,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Aqua',
        },
    "O": {
            x: gridSize*5,
            y: gridSize*0,
            height: gridSize*3,
            width: gridSize,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*0,
            y: gridSize*1,
            height: gridSize*3,
            width: gridSize,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*3,
            y: gridSize*1,
            height: gridSize*3,
            width: gridSize,
            colour: 'RoyalBlue',
        },
    "R": {
            x: gridSize*2,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'MediumSeaGreen',
        },
    "X": {
            x: gridSize*1,
            y: gridSize*2,
            height: gridSize,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 2":{
        "A": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'LightGreen',
        },
        "B": {
                x: gridSize*3,
                y: gridSize*1,
                height: gridSize*2,
                width: gridSize*1,
                colour: 'DarkOrange',
            },
        "C": {
                x: gridSize*4,
                y: gridSize*2,
                height: gridSize*2,
                width: gridSize*1,
                colour: 'Aqua',
            },
        "D": {
                x: gridSize*2,
                y: gridSize*4,
                height: gridSize*2,
                width: gridSize*1,
                colour: 'Pink',
            },
        "E": {
                x: gridSize*4,
                y: gridSize*4,
                height: gridSize*1,
                width: gridSize*2,
                colour: 'BlueViolet',
            },
        "F": {
                x: gridSize*0,
                y: gridSize*5,
                height: gridSize,
                width: gridSize*2,
                colour: 'ForestGreen',
            },
        "G": {
                x: gridSize*3,
                y: gridSize*5,
                height: gridSize,
                width: gridSize*2,
                colour: 'Black',
            },
        "O": {
                x: gridSize*3,
                y: gridSize*0,
                height: gridSize*1,
                width: gridSize*3,
                colour: 'Gold',
            },
        "P": {
                x: gridSize*5,
                y: gridSize*1,
                height: gridSize*3,
                width: gridSize,
                colour: 'MediumPurple',
            },
        "Q": {
                x: gridSize*0,
                y: gridSize*3,
                height: gridSize*1,
                width: gridSize*3,
                colour: 'RoyalBlue',
            },
        "X": {
                x: gridSize*0,
                y: gridSize*2,
                height: gridSize,
                width: gridSize*2,
                colour: 'red',
        },
    },
    "level 3":{
        "A": {
            x: gridSize*1,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*1,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*2,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Aqua',
        },
    "O": {
            x: gridSize*3,
            y: gridSize*2,
            height: gridSize*3,
            width: gridSize,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*5,
            y: gridSize*3,
            height: gridSize*3,
            width: gridSize,
            colour: 'MediumPurple',
        },
    "X": {
            x: gridSize*1,
            y: gridSize*2,
            height: gridSize,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 4":{
        "A": {
            x: gridSize*2,
            y: gridSize*3,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*5,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "O": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*3,
            y: gridSize*0,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*3,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'RoyalBlue',
        },
    "R": {
            x: gridSize*2,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'MediumSeaGreen',
        },
    "X": {
            x: gridSize*1,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 5":{
       "A": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*5,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "D": {
            x: gridSize*0,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*4,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*4,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'ForestGreen',
        },
    "G": {
            x: gridSize*5,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Black',
        },
    "O": {
            x: gridSize*3,
            y: gridSize*0,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*0,
            y: gridSize*1,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*4,
            y: gridSize*1,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'RoyalBlue',
        },
    "R": {
            x: gridSize*1,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'MediumSeaGreen',
        },
    "X": {
            x: gridSize*1,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 6":{
       "A": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*3,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*0,
            y: gridSize*1,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*0,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*2,
            y: gridSize*3,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*0,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'ForestGreen',
        },
    "O": {
            x: gridSize*4,
            y: gridSize*1,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*5,
            y: gridSize*1,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*3,
            y: gridSize*2,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'RoyalBlue',
        },
    "R": {
            x: gridSize*3,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'MediumSeaGreen',
        },
    "X": {
            x: gridSize*1,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 7":{
       "A": {
            x: gridSize*1,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*2,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*4,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*5,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*3,
            y: gridSize*1,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*5,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'ForestGreen',
        },
    "H": {
            x: gridSize*3,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Gray',
        },
    "I": {
            x: gridSize*2,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'yellow',
        },
    "X": {
            x: gridSize*1,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 8":{
       "A": {
            x: gridSize*3,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*2,
            y: gridSize*1,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*4,
            y: gridSize*1,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*2,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*3,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*0,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'ForestGreen',
        },
    "G": {
            x: gridSize*4,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Black',
        },
    "H": {
            x: gridSize*0,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'grey',
        },
    "I": {
            x: gridSize*2,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'yellow',
        },
    "K": {
            x: gridSize*0,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'DimGrey',
        },
    "O": {
            x: gridSize*5,
            y: gridSize*0,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*3,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*3,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'RoyalBlue',
        },
    "X": {
            x: gridSize*0,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 9":{
       "A": {
            x: gridSize*1,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*2,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*4,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*3,
            y: gridSize*1,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*4,
            y: gridSize*1,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*5,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'ForestGreen',
        },
    "G": {
            x: gridSize*2,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Black',
        },
    "H": {
            x: gridSize*5,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'grey',
        },
    "O": {
            x: gridSize*4,
            y: gridSize*2,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*0,
            y: gridSize*3,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*1,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'RoyalBlue',
        },
    "X": {
            x: gridSize*0,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 10":{
       "A": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*2,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*4,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*0,
            y: gridSize*1,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*3,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*4,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'ForestGreen',
        },
    "G": {
            x: gridSize*0,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Black',
        },
    "H": {
            x: gridSize*4,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'grey',
        },
    "O": {
            x: gridSize*5,
            y: gridSize*1,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*0,
            y: gridSize*2,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*1,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'RoyalBlue',
        },
    "X": {
            x: gridSize*1,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 11":{
       "A": {
            x: gridSize*1,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*2,
            y: gridSize*3,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "E": {
            x: gridSize*5,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'BlueViolet',
        },
    "O": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*3,
            y: gridSize*0,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*3,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'RoyalBlue',
        },
    "R": {
            x: gridSize*2,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'MediumSeaGreen',
        },
    "X": {
            x: gridSize*1,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 12":{
       "A": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*1,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*4,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Aqua',
        },
    "O": {
            x: gridSize*5,
            y: gridSize*0,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*2,
            y: gridSize*1,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*3,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'RoyalBlue',
        },
    "R": {
            x: gridSize*0,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'MediumSeaGreen',
        },
    "X": {
            x: gridSize*0,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 13":{
       "A": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*2,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*4,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*2,
            y: gridSize*1,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*1,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*3,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'ForestGreen',
        },
    "G": {
            x: gridSize*3,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Black',
        },
    "H": {
            x: gridSize*4,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'grey',
        },
    "I": {
            x: gridSize*1,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'yellow',
        },
    "K": {
            x: gridSize*4,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'DimGrey',
        },
    "O": {
            x: gridSize*5,
            y: gridSize*1,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*0,
            y: gridSize*3,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "X": {
            x: gridSize*3,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 14":{
       "A": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*2,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*4,
            y: gridSize*1,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*0,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*1,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*4,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'ForestGreen',
        },
    "G": {
            x: gridSize*5,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Black',
        },
    "H": {
            x: gridSize*2,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'grey',
        },
    "I": {
            x: gridSize*2,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'yellow',
        },
    "J": {
            x: gridSize*4,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'DarkMagenta',
        },
    "K": {
            x: gridSize*0,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'DimGrey',
        },
    "X": {
            x: gridSize*2,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 15":{
       "A": {
            x: gridSize*1,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*3,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*0,
            y: gridSize*1,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*2,
            y: gridSize*1,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*2,
            y: gridSize*3,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*3,
            y: gridSize*3,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'ForestGreen',
        },
    "G": {
            x: gridSize*4,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Black',
        },
    "H": {
            x: gridSize*1,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'grey',
        },
    "I": {
            x: gridSize*3,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'yellow',
        },
    "O": {
            x: gridSize*4,
            y: gridSize*1,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*5,
            y: gridSize*1,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*0,
            y: gridSize*2,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'RoyalBlue',
        },
    "R": {
            x: gridSize*1,
            y: gridSize*2,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumSeaGreen',
        },
    "X": {
            x: gridSize*2,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 16":{
       "A": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*2,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*4,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*0,
            y: gridSize*1,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*2,
            y: gridSize*1,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*1,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'ForestGreen',
        },
    "G": {
            x: gridSize*0,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Black',
        },
    "O": {
            x: gridSize*5,
            y: gridSize*0,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*2,
            y: gridSize*2,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*3,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'RoyalBlue',
        },
    "X": {
            x: gridSize*3,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 17":{
       "A": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*2,
            y: gridSize*1,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*4,
            y: gridSize*1,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*2,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*0,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*4,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'ForestGreen',
        },
    "G": {
            x: gridSize*5,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Black',
        },
    "O": {
            x: gridSize*1,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*3,
            y: gridSize*3,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*0,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'RoyalBlue',
        },
    "R": {
            x: gridSize*0,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'MediumSeaGreen',
        },
    "X": {
            x: gridSize*0,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 18":{
       "A": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*2,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*0,
            y: gridSize*1,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*1,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Pink',
        },
    "O": {
            x: gridSize*3,
            y: gridSize*0,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*0,
            y: gridSize*2,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*1,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'RoyalBlue',
        },
    "R": {
            x: gridSize*0,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'MediumSeaGreen',
        },
    "X": {
            x: gridSize*1,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 19":{
       "A": {
            x: gridSize*2,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*3,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'DarkOrange',
        },
    "D": {
            x: gridSize*1,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*2,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*4,
            y: gridSize*3,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'ForestGreen',
        },
    "J": {
            x: gridSize*4,
            y: gridSize*1,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkMagenta',
        },
    "O": {
            x: gridSize*1,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'Gold',
        },
    "X": {
            x: gridSize*2,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 20":{
       "A": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*1,
            y: gridSize*1,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*3,
            y: gridSize*1,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*2,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*2,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*3,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'ForestGreen',
        },
    "O": {
            x: gridSize*3,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*5,
            y: gridSize*2,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*3,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'RoyalBlue',
        },
    "X": {
            x: gridSize*0,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 21":{
       "A": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*2,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "O": {
            x: gridSize*3,
            y: gridSize*0,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*0,
            y: gridSize*1,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*1,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'RoyalBlue',
        },
    "R": {
            x: gridSize*3,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'MediumSeaGreen',
        },
    "X": {
            x: gridSize*1,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 22":{
       "A": {
            x: gridSize*2,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*0,
            y: gridSize*1,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*4,
            y: gridSize*1,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*1,
            y: gridSize*3,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*4,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*0,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'ForestGreen',
        },
    "G": {
            x: gridSize*2,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Black',
        },
    "H": {
            x: gridSize*5,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'grey',
        },
    "O": {
            x: gridSize*3,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*3,
            y: gridSize*1,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*1,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'RoyalBlue',
        },
    "X": {
            x: gridSize*1,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 23":{
       "A": {
            x: gridSize*2,
            y: gridSize*1,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*3,
            y: gridSize*1,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*2,
            y: gridSize*3,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*3,
            y: gridSize*3,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*4,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*4,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'ForestGreen',
        },
    "O": {
            x: gridSize*2,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*5,
            y: gridSize*0,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*2,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'RoyalBlue',
        },
    "X": {
            x: gridSize*3,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 24":{
       "A": {
            x: gridSize*2,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*3,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*1,
            y: gridSize*1,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*0,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*4,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*1,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'ForestGreen',
        },
    "G": {
            x: gridSize*4,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Black',
        },
    "H": {
            x: gridSize*0,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'grey',
        },
    "O": {
            x: gridSize*0,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'Gold',
        },
    "X": {
            x: gridSize*2,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 25":{
       "A": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*2,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*4,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*0,
            y: gridSize*1,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*4,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*1,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'ForestGreen',
        },
    "G": {
            x: gridSize*3,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Black',
        },
    "H": {
            x: gridSize*4,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'grey',
        },
    "I": {
            x: gridSize*4,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'yellow',
        },
    "O": {
            x: gridSize*5,
            y: gridSize*1,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*0,
            y: gridSize*2,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*1,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'RoyalBlue',
        },
    "X": {
            x: gridSize*1,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 26":{
       "A": {
            x: gridSize*1,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*0,
            y: gridSize*1,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*3,
            y: gridSize*1,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*5,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*0,
            y: gridSize*3,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*2,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'ForestGreen',
        },
    "G": {
            x: gridSize*5,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Black',
        },
    "H": {
            x: gridSize*3,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'grey',
        },
    "O": {
            x: gridSize*3,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*4,
            y: gridSize*1,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "R": {
            x: gridSize*1,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'MediumSeaGreen',
        },
    "X": {
            x: gridSize*1,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 27":{
       "A": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*1,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*1,
            y: gridSize*1,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*2,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*3,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*2,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'ForestGreen',
        },
    "O": {
            x: gridSize*3,
            y: gridSize*0,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*5,
            y: gridSize*2,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "R": {
            x: gridSize*3,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'MediumSeaGreen',
        },
    "X": {
            x: gridSize*0,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 28":{
       "A": {
            x: gridSize*3,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*4,
            y: gridSize*1,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*0,
            y: gridSize*3,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*1,
            y: gridSize*3,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*3,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*0,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'ForestGreen',
        },
    "G": {
            x: gridSize*2,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Black',
        },
    "O": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*2,
            y: gridSize*1,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*5,
            y: gridSize*3,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'RoyalBlue',
        },
    "R": {
            x: gridSize*2,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'MediumSeaGreen',
        },
    "X": {
            x: gridSize*0,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 29":{
       "A": {
            x: gridSize*2,
            y: gridSize*1,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*5,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*0,
            y: gridSize*3,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*1,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*3,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*1,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'ForestGreen',
        },
    "G": {
            x: gridSize*3,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Black',
        },
    "H": {
            x: gridSize*5,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'grey',
        },
    "O": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*4,
            y: gridSize*0,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "R": {
            x: gridSize*0,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'MediumSeaGreen',
        },
    "X": {
            x: gridSize*0,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 30":{
       "A": {
            x: gridSize*2,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*3,
            y: gridSize*1,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*0,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*2,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*0,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*2,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'ForestGreen',
        },
    "O": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*3,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*5,
            y: gridSize*3,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'RoyalBlue',
        },
    "X": {
            x: gridSize*1,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 31":{
       "A": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*3,
            y: gridSize*1,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*4,
            y: gridSize*1,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*0,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*3,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*0,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'ForestGreen',
        },
    "O": {
            x: gridSize*3,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*5,
            y: gridSize*2,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*2,
            y: gridSize*3,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'RoyalBlue',
        },
    "R": {
            x: gridSize*3,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'MediumSeaGreen',
        },
    "X": {
            x: gridSize*1,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 32":{
       "A": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*3,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*4,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*0,
            y: gridSize*3,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*1,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*3,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'ForestGreen',
        },
    "H": {
            x: gridSize*0,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'grey',
        },
    "K": {
            x: gridSize*3,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DimGrey',
        },
    "O": {
            x: gridSize*2,
            y: gridSize*0,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*5,
            y: gridSize*3,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "X": {
            x: gridSize*0,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 33":{
       "A": {
            x: gridSize*1,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*4,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'DarkOrange',
        },
    "D": {
            x: gridSize*1,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*3,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*1,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'ForestGreen',
        },
    "G": {
            x: gridSize*3,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Black',
        },
    "H": {
            x: gridSize*4,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'grey',
        },
    "I": {
            x: gridSize*0,
            y: gridSize*3,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'yellow',
        },
    "P": {
            x: gridSize*5,
            y: gridSize*3,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*0,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'RoyalBlue',
        },
    "R": {
            x: gridSize*2,
            y: gridSize*0,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumSeaGreen',
        },
    "X": {
            x: gridSize*0,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 34":{
       "A": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*3,
            y: gridSize*1,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*4,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*3,
            y: gridSize*3,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*2,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*4,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'ForestGreen',
        },
    "H": {
            x: gridSize*3,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'grey',
        },
    "I": {
            x: gridSize*0,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'yellow',
        },
    "P": {
            x: gridSize*5,
            y: gridSize*1,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*0,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'RoyalBlue',
        },
    "R": {
            x: gridSize*3,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'MediumSeaGreen',
        },
    "X": {
            x: gridSize*0,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 35":{
       "A": {
            x: gridSize*3,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*3,
            y: gridSize*1,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "D": {
            x: gridSize*1,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*3,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*4,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'ForestGreen',
        },
    "G": {
            x: gridSize*0,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Black',
        },
    "K": {
            x: gridSize*0,
            y: gridSize*3,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DimGrey',
        },
    "O": {
            x: gridSize*2,
            y: gridSize*0,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*5,
            y: gridSize*0,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*1,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'RoyalBlue',
        },
    "X": {
            x: gridSize*0,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 36":{
       "A": {
            x: gridSize*4,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*1,
            y: gridSize*1,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*2,
            y: gridSize*1,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*3,
            y: gridSize*3,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*2,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*4,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'ForestGreen',
        },
    "G": {
            x: gridSize*0,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Black',
        },
    "O": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*1,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*5,
            y: gridSize*1,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'RoyalBlue',
        },
    "R": {
            x: gridSize*0,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'MediumSeaGreen',
        },
    "X": {
            x: gridSize*2,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 37":{
       "A": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*2,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*4,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*0,
            y: gridSize*1,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*3,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*4,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'ForestGreen',
        },
    "G": {
            x: gridSize*0,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Black',
        },
    "H": {
            x: gridSize*4,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'grey',
        },
    "O": {
            x: gridSize*4,
            y: gridSize*1,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*5,
            y: gridSize*1,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*0,
            y: gridSize*2,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'RoyalBlue',
        },
    "R": {
            x: gridSize*1,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'MediumSeaGreen',
        },
    "X": {
            x: gridSize*1,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 38":{
       "A": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*1,
            y: gridSize*1,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*3,
            y: gridSize*1,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*2,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*3,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*2,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'ForestGreen',
        },
    "G": {
            x: gridSize*3,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Black',
        },
    "O": {
            x: gridSize*3,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'Gold',
        },
    "Q": {
            x: gridSize*3,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'RoyalBlue',
        },
    "R": {
            x: gridSize*5,
            y: gridSize*2,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumSeaGreen',
        },
    "X": {
            x: gridSize*0,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 39":{
       "A": {
            x: gridSize*2,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*3,
            y: gridSize*1,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*2,
            y: gridSize*2,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*0,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*3,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*0,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'ForestGreen',
        },
    "G": {
            x: gridSize*1,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Black',
        },
    "H": {
            x: gridSize*2,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'grey',
        },
    "I": {
            x: gridSize*2,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'yellow',
        },
    "O": {
            x: gridSize*3,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'Gold',
        },
    "R": {
            x: gridSize*5,
            y: gridSize*2,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumSeaGreen',
        },
    "X": {
            x: gridSize*0,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
    "level 40":{
       "A": {
            x: gridSize*1,
            y: gridSize*0,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'LightGreen',
        },
    "B": {
            x: gridSize*4,
            y: gridSize*0,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'DarkOrange',
        },
    "C": {
            x: gridSize*1,
            y: gridSize*1,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Aqua',
        },
    "D": {
            x: gridSize*2,
            y: gridSize*1,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'Pink',
        },
    "E": {
            x: gridSize*3,
            y: gridSize*3,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'BlueViolet',
        },
    "F": {
            x: gridSize*2,
            y: gridSize*4,
            height: gridSize*2,
            width: gridSize*1,
            colour: 'ForestGreen',
        },
    "G": {
            x: gridSize*4,
            y: gridSize*4,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'Black',
        },
    "H": {
            x: gridSize*0,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'grey',
        },
    "I": {
            x: gridSize*3,
            y: gridSize*5,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'yellow',
        },
    "O": {
            x: gridSize*0,
            y: gridSize*0,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'Gold',
        },
    "P": {
            x: gridSize*5,
            y: gridSize*1,
            height: gridSize*3,
            width: gridSize*1,
            colour: 'MediumPurple',
        },
    "Q": {
            x: gridSize*0,
            y: gridSize*3,
            height: gridSize*1,
            width: gridSize*3,
            colour: 'RoyalBlue',
        },
    "X": {
            x: gridSize*3,
            y: gridSize*2,
            height: gridSize*1,
            width: gridSize*2,
            colour: 'red',
        },
    },
}

// setup

for (const rect in shapes){
    movingShape = rect;
    snap();
}
draw()
updateDropDown()

// functions
function resetCookies(){
    document.cookie = "levelStatus=0000000000; path=/";
    updateDropDown()
}

function updateDropDown(){
    document.getElementById('levelSelect').innerHTML= "<option value='' disabled selected>Select a Level</option>"
    splitCookie = document.cookie.split('; ')
    //splitCookie = "cookie1=something; cookie2=somethingelse; levelStatus=8000000000; cookie4=anotherthing".split('; ')

    for(let i = 0; i<splitCookie.length;i++){
        if (splitCookie[i].split('=')[0] == "levelStatus"){
            splitCookie = splitCookie[i].split('=');
            break;
        }
    }
    if(splitCookie[0] == "levelStatus"){
        for (let i = 0; i < splitCookie[1].length; i++){ // 0-9
            var currentWord = parseInt(splitCookie[1][i], 16).toString(2).padStart(4, '0')
            for (let j = 0; j < 4; j++){ // 0-9
                if (currentWord[j] == '1'){
                    levelStatus[i*4+j] = true
                }
                else{
                    levelStatus[i*4+j] = false
                }
            }
        }
    }
    
    
    for (const level in levelLayouts){
        if(levelStatus[Object.keys(levelLayouts).indexOf(level)]){
            document.getElementById('levelSelect').innerHTML+="<option value='"+level+"'>"+level+" &#x2714;</option>"
        }
        else{
            document.getElementById('levelSelect').innerHTML+="<option value='"+level+"'>"+level+"</option>"
        }
    }
}

function draw() {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(1, 1, canvas.width-2, canvas.height-2);
        ctx.clearRect(6*gridSize-2, 2*gridSize, 2, gridSize);
        
        for (let i = 0;i<6;i++){
            for (let j = 0;j<6;j++){
                ctx.strokeRect((gridSize*.1)+i*gridSize, (gridSize*.1)+j*gridSize, (gridSize*.8), (gridSize*.8));
            }
        }
        for (const rect in shapes){
            ctx.fillStyle = shapes[rect].colour;
            ctx.fillRect(shapes[rect].x+2, shapes[rect].y+2, shapes[rect].width-4, shapes[rect].height-4);
        }
    }
}

function snap(){
    if(shapes[movingShape].x % gridSize<gridSize/2){
        shapes[movingShape].x = Math.floor(shapes[movingShape].x/gridSize)*gridSize
    }
    else{
        shapes[movingShape].x = (Math.floor(shapes[movingShape].x/gridSize)+1)*gridSize
    }
    if(shapes[movingShape].y%gridSize<gridSize/2){
        shapes[movingShape].y = Math.floor(shapes[movingShape].y/gridSize)*gridSize
    }
    else{
        shapes[movingShape].y = (Math.floor(shapes[movingShape].y/gridSize)+1)*gridSize
    }
}

function updateDragOffset(){
    dragOffset = {
        x: event.pageX - canvas.offsetLeft - shapes[movingShape].x,
        y: event.pageY - canvas.offsetTop - shapes[movingShape].y
    }
}

function updateMovementRange(){
    movementRange = {
        xMin: 0,
        xMax: canvas.width,
        yMin: 0,
        yMax: canvas.height
    }
    for (const rect in shapes){
        if(rect!=movingShape){
            if (shapes[movingShape].height>shapes[movingShape].width){ // vertical
                if(shapes[rect].x==shapes[movingShape].x || shapes[rect].x<shapes[movingShape].x && shapes[rect].x+shapes[rect].width>shapes[movingShape].x){
                    if(shapes[rect].y<shapes[movingShape].y){
                        if(shapes[rect].y+shapes[rect].height>movementRange.yMin){
                            movementRange.yMin = shapes[rect].y+shapes[rect].height;
                        }
                    }
                    else if(shapes[rect].y>shapes[movingShape].y){ // below
                        if(shapes[rect].y<movementRange.yMax){
                            movementRange.yMax = shapes[rect].y;
                        }
                    }
                }
            }
            else{ // horizontal
                //check for any rectangle that is in the same row, set max and min range of movement
                if(shapes[rect].y==shapes[movingShape].y || shapes[rect].y<shapes[movingShape].y && shapes[rect].y+shapes[rect].height>shapes[movingShape].y){
                    if(shapes[rect].x<shapes[movingShape].x){
                        if(shapes[rect].x+shapes[rect].width>movementRange.xMin){
                            movementRange.xMin = shapes[rect].x+shapes[rect].width;
                        }
                    }
                    else{
                        if(shapes[rect].x<movementRange.xMax){
                            movementRange.xMax = shapes[rect].x;
                        }
                    }
                }
            }
        }
    }
}

canvas.addEventListener('mousedown', function(event) {
    //console.log('mousedown');
    for (const rect in shapes){
        if(event.pageX - canvas.offsetLeft > shapes[rect].x && event.pageX - canvas.offsetLeft < shapes[rect].x+shapes[rect].width && event.pageY - canvas.offsetTop > shapes[rect].y && event.pageY - canvas.offsetTop < shapes[rect].y+shapes[rect].height){
            //console.log('hovering')
            drag = true;
            movingShape = rect;
            updateDragOffset()
            updateMovementRange()
        }
    }
})

addEventListener('mousemove', function(event) {
    if (drag) {
        if(shapes[movingShape].height>shapes[movingShape].width){ // vertical
            shapes[movingShape].y = event.pageY - canvas.offsetTop - dragOffset.y
            if(shapes[movingShape].y<movementRange.yMin){
                shapes[movingShape].y = movementRange.yMin
            }
            else if(shapes[movingShape].y>movementRange.yMax-shapes[movingShape].height){
                shapes[movingShape].y = movementRange.yMax-shapes[movingShape].height
            }
        }
        else if(shapes[movingShape].height<shapes[movingShape].width){ // horizontal
            shapes[movingShape].x = event.pageX - canvas.offsetLeft - dragOffset.x
            if(shapes[movingShape].x<movementRange.xMin){
                shapes[movingShape].x = movementRange.xMin
            }
            else if(shapes[movingShape].x>movementRange.xMax-shapes[movingShape].width){
                if(movingShape=="X"&&movementRange.xMax == canvas.width && shapes["X"].y == gridSize*2){
                    
                }
                else{
                    shapes[movingShape].x = movementRange.xMax-shapes[movingShape].width
                }
            }
        }
        draw();
    }
})

addEventListener('mouseup', function(event) {
    if (drag){
        drag = false;
        snap();
        draw();
    }
    if(shapes["X"].x >= canvas.width-gridSize){
        var keys = Object.keys(levelLayouts)
        var loc = keys.indexOf(document.getElementById('levelSelect').value);
        levelStatus[loc] = true;
        let levelStatusString = '';
        for(let i = 0;i<levelStatus.length;i++){
            if (levelStatus[i])levelStatusString+='1'
            else levelStatusString+='0'
        }
        levelStatusString = parseInt(levelStatusString , 2).toString(16).toUpperCase();
        document.cookie = "levelStatus="+levelStatusString+"; path=/";
        updateDropDown()
        
        if (keys[loc+1]!=null){
            document.getElementById('levelSelect').value = keys[loc+1];
            shapes = levelLayouts[document.getElementById('levelSelect').value];
        }
        draw();
        
    }
})

document.getElementById("levelSelect").onchange = function() {
    shapes = JSON.parse(JSON.stringify(levelLayouts[document.getElementById('levelSelect').value]));
    draw();
};
