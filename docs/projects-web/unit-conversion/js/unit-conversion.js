// Map your choices to your option value
var lookup = {
    'length': { //in metres
        'planck length':{ // https://en.wikipedia.org/wiki/Orders_of_magnitude_(length)
            name: 'planck length',
            value: (1.616255 * 10**(-35)),
            description: "<b>planck length (ℓP):</b><br>an extremely small unit of length. It is calculated from three physical constants: the speed of light, the Planck constant, and the gravitational constant."
        },
        'quectometre':{
            name: 'quectometre',
            value: 10**(-30),
            description: "<b>quectometre (qm):</b><br>a unit of length in the metric system equal to 10<sup>−30</sup> metres"
        },
        'rontometre':{
            name: 'rontometre',
            value: 10**(-27),
            description: "<b>rontometre (rm):</b><br>a unit of length in the metric system equal to 10<sup>−27</sup> metres"
        },
        'yoctometre':{
            name: 'yoctometre',
            value: 10**(-24),
            description: "<b>yoctometre (ym):</b><br>a unit of length in the metric system equal to 10<sup>−24</sup> metres"
        },
        'zeptometre':{
            name: 'zeptometre',
            value: 10**(-21),
            description: "<b>zeptometre (zm):</b><br>a unit of length in the metric system equal to 10<sup>−21</sup> metres"
        },
        'attometre':{
            name: 'attometre',
            value: 10**(-18),
            description: "<b>attometre (am):</b><br>a unit of length in the metric system equal to 10<sup>−18</sup> metres"
        },
        'femtometre':{
            name: 'femtometre',
            value: 10**(-15),
            description: "<b>femtometre (fm):</b><br>a unit of length in the metric system equal to 10<sup>−15</sup> metres"
        },
        'picometre':{
            name: 'picometre',
            value: 10**(-12),
            description: "<b>picometre (pm):</b><br>a unit of length in the metric system equal to 10<sup>−12</sup> metres"
        },
        'nanometre':{
            name: 'nanometre',
            value: 10**(-9),
            description: "<b>nanometre (nm):</b><br>a unit of length in the metric system equal to 10<sup>−9</sup> metres"
        },
        'micrometre':{
            name: 'micrometre',
            value: 0.000001,
            description: "<b>micrometre (μm):</b><br>is a unit of length in the metric system equal to 10<sup>−6</sup> metres"
        },
        'milimetre':{
            name: 'milimetre',
            value: 0.001,
            description: "<b>milimetre (mm):</b><br>a unit of length in the metric system equal to 10<sup>−3</sup> metres"
        },
        'centimetre':{
            name: 'centimetre',
            value: 0.01,
            description: "<b>centimetre (cm):</b><br>a unit of length in the metric system equal to 10<sup>−2</sup> metres"
        },
        'decimetre':{
            name: 'decimetre',
            value: 0.1,
            description: "<b>decimetre (dm):</b><br>a unit of length in the metric system equal to 10<sup>−1</sup> metres"
        },
        'metre':{
            name: 'metre',
            value: 1,
            description: "<b>metre (m):</b><br> the SI base unit of length"
        },
        'decametre':{
            name: 'decametre',
            value: 10,
            description: "<b>decametre (dam):</b><br>a unit of length in the metric system equal to 10 metres"
        },
        'hectometre':{
            name: 'hectometre',
            value: 100,
            description: "<b>hectometre (hm):</b><br>a unit of length in the metric system equal to 100 metres (10<sup>2</sup> m)"
        },
        'kilometre':{
            name: 'kilometre',
            value: 1000,                            
            description: "<b>kilometre (km):</b><br>a unit of length in the metric system equal to 1000 metres (10<sup>3</sup> m)"
        },
        'megametre':{
            name: 'megametre',
            value: 1000000,                        
            description: "<b>megametre (Mm):</b><br>a unit of length in the metric system equal to 1000000 metres (10<sup>6</sup> m)"
        },
        'gigametre':{
            name: 'gigametre',
            value: 10**9,                        
            description: "<b>gigametre (Gm):</b><br>a unit of length in the metric system equal to 1000000000 metres (10<sup>9</sup> m)"
        },
        'terametre':{
            name: 'terametre',
            value: 10**12,                    
            description: "<b>terametre (Tm):</b><br>a unit of length in the metric system equal to 1000000000000 metres (10<sup>12</sup> m)"
        },
        'petametre':{
            name: 'petametre',
            value: 10**15,                
            description: "<b>petametre (Pm):</b><br>is a unit of length in the metric system equal to 10<sup>15</sup> metres"
        },
        'exametre':{
            name: 'exametre',
            value: 10**18,            
            description: "<b>exametre (Em):</b><br>a unit of length in the metric system equal to 10<sup>18</sup> metres"
        },
        'zettametre':{
            name: 'zettametre',
            value: 10**21,            
            description: "<b>zettametre (Zm):</b><br>a unit of length in the metric system equal to 10<sup>21</sup> metres"
        },
        'yottametre':{
            name: 'yottametre',
            value: 10**24,        
            description: "<b>yottametre (Ym):</b><br>a unit of length in the metric system equal to 10<sup>24</sup> metres"
        },
        'ronnametre':{
            name: 'ronnametre',
            value: 10**27,    
            description: "<b>ronnametre (Rm):</b><br>a unit of length in the metric system equal to 10<sup>27</sup> metres"
        },
        'twip':{ // https://en.wikipedia.org/wiki/Imperial_units
            name: 'twip',
            value: 0.0000176389,
            description: '<b>twip:</b><br>a twip (abbreviating "twentieth of a point", "twentieth of an inch point", or "twentieth of an Imperial point") is a typographical measurement, defined as 1⁄20 of a typographical point. One twip is 1⁄1440 inch, or 17.64 μm.'
        },
        'thou':{
            name: 'thou',
            value: 0.0000254,
            description: '<b>thou (th):</b><br>abbreviation of "thousandth of an inch". Also known as mil.'
        },
        'barleycorn':{
            name: 'barleycorn',
            value: 0.0084667,
            description: "<b>barleycorn ():</b><br>an English unit of length equal to 1⁄3 of an inch"
        },
        'inch':{
            name: 'inch',
            value: 0.0254,
            description: "<b>inch (in, \"):</b><br>a unit of length in the British imperial and the United States customary systems of measurement. It is equal to 1/36 yard or 1/12 of a foot."
        },
        'hand':{
            name: 'hand',
            value: 0.1016,
            description: "<b>hand (hh):</b><br>a non-SI unit of length equal to exactly 4 inches"
        },
        'foot':{
            name: 'foot',
            value: 0.3048,
            description: "<b>foot (ft, ′):</b><br>a unit of length in the British imperial and United States customary systems of measurement. In both customary and imperial units, one foot comprises 12 inches."
        },
        'yard':{
            name: 'yard',
            value: 0.9144,
            description: "<b>yard (yd):</b><br>an English unit of length in both the British imperial and US customary systems of measurement equalling 3 feet or 36 inches."
        },
        'chain':{
            name: 'chain',
            value: 20.1168,
            description: "<b>chain (ch):</b><br>a unit of length equal to 66 feet."
        },
        'furlong':{
            name: 'furlong',
            value: 201.168,
            description: "<b>furlong (fur):</b><br>a measure of distance in imperial units and United States customary units equal to one eighth of a mile"
        },
        'mile':{
            name: 'mile',
            value: 1609.344,
            description: "<b>mile (mi):</b><br>a British imperial unit and United States customary unit of distance, defined with respect to SI units as exactly 1,609.344 metres."
        },
        'league':{
            name: 'league',
            value: 4828.032,
            description: "<b>league (lea):</b><br>a unit of length. It was common in Europe and Latin America, but is no longer an official unit in any nation."
        },
        'fathom':{
            name: 'fathom',
            value: 1.852,
            description: "<b>fathom (ftm):</b><br>a unit of length in the imperial and the U.S. customary systems equal to 6 feet (1.8288 m), used especially for measuring the depth of water."
        },
        'cable':{
            name: 'cable',
            value: 185.2,
            description: "<b>cable:</b><br>a nautical unit of measure equal to one tenth of a nautical mile or approximately 100 fathoms."
        },
        'nautical mile':{
            name: 'nautical mile',
            value: 1852,
            description: "<b>nautical mile (nmi):</b><br>a unit of length used in air, marine, and space navigation, and for the definition of territorial waters"
        },
        'link':{
            name: 'link',
            value: 0.201168,
            description: "<b>link:</b><br>a unit of length formerly used in many English-speaking countries. In US customary units modern definition, the link is exactly 66⁄100 of a US survey foot, or exactly 7.92 inches or approximately 20.12 cm."
        },
        'rod':{
            name: 'rod',
            value: 5.0292,
            description: "<b>rod:</b><br>a surveyor's tool and unit of length of various historical definitions. In British imperial and US customary units it is defined as 16+1⁄2 feet, equal to exactly 1⁄320 of a mile, or 5+1⁄2 yards (a quarter of a surveyor's chain), and is exactly 5.0292 meters."
        },
        'banana':{
            name: 'banana',
            value: 0.15,
            description: '<b>banana:</b><br> <img id="banana" src="../assets/images/bananas.png" width="50" height="40">'
        },
        'smoot':{
            name: 'smoot',
            value: 1.7018,
            description: "<b>smoot:</b><br>a unit of length, defined as the height in 1958 of Oliver R. Smoot"
        },
        'lightyear':{
            name: 'lightyear',
            value: 9460730472580800,
            description: "<b>lightyear:</b><br>a unit of length used to express astronomical distances and is equivalent to about 9.46 trillion kilometers (9.46×10<sup>12</sup> km). As defined by the International Astronomical Union (IAU), a light-year is the distance that light travels in a vacuum in one Julian year (365.25 days)."
        },
        'sheppey':{
            name: 'sheppey',
            value: 1408.18,
            description: "<b>sheppey:</b><br>a measure of distance that equals to about 7/8th of a mile (1.4 km), defined as the closest distance at which sheep remain picturesque."
        },
        'hammer unit':{
            name: 'hammer unit',
            value: 0.01905,
            description: "<b>hammer unit:</b><br>the base unit of length in Valve's Source game engine"
        },
        'earth radius':{
            name: 'earth radius',
            value: 6371000,
            description: "<b>earth radius (R🜨):</b><br>the distance from the center of Earth to a point on or near its surface"
        },
        'astronomical unit':{
            name: 'astronomical unit',
            value: 149597870700,
            description: "<b>astronomical unit (au):</b><br>a unit of length, roughly the distance from Earth to the Sun and approximately equal to 150 million kilometres (93 million miles) or 8.3 light-minutes"
        },
        'parsec':{
            name: 'parsec',
            value: (149597870700*648000)/Math.PI,
            description: "<b>parsec (pc):</b><br>a unit of length used to measure the large distances to astronomical objects outside the Solar System, approximately equal to 3.26 light-years or 206,265 astronomical units (AU), i.e. 30.9 trillion kilometres (19.2 trillion miles)"
        },
        'lunar distance':{
            name: 'lunar distance',
            value: 384399000,
            description: "<b>lunar distance (LD):</b><br>the average distance from the center of Earth to the center of the Moon"
        }
    },
    'time': { // https://en.wikipedia.org/wiki/Second#SI_multiples //https://en.wikipedia.org/wiki/Lunar_month#
        'picosecond':{
            name: 'picosecond',
            value: 1/60000000000000,
            description: "<b>picosecond (ps):</b><br>a unit of time in the International System of Units (SI) equal to one trillionth of a second or 10<sup>−12</sup> seconds"
        },
        'nanosecond':{
            name: 'nanosecond',
            value: 1/60000000000,
            description: "<b>nanosecond (ns):</b><br>a unit of time in the International System of Units (SI) equal to one billionth of a second or 10<sup>−9</sup> seconds"
        },
        'microsecond': {
            name: 'microsecond',
            value: 1/60000000,
            description: "<b>microsecond (μs):</b><br>a unit of time in the International System of Units (SI) equal to one millionth of a second or 10<sup>−6</sup> seconds"
        },
        'millisecond': {
            name: 'millisecond',
            value:  1/60000,
            description: "<b>millisecond (ms):</b><br>a unit of time in the International System of Units (SI) equal to one thousandth of a second or 10<sup>−3</sup> seconds"
        },
        'second': {
            name: 'second',
            value:  1/60,
            description: "<b>second (s):</b><br>the unit of time in the International System of Units (SI)"
        },
        'minute': {
            name: 'minute',
            value:  1,
            description: "<b>minute (m):</b><br>a unit of time usually equal to 1/60th of an hour, or 60 seconds"
        },
        'hour': {
            name: 'hour',
            value:  60,
            description: "<b>hour (h):</b><br>a unit of time historically reckoned as 1/24 of a day"
        },
        'day': {
            name: 'day',
            value:  1440,
            description: "<b>day:</b><br>the time period of a full rotation of the Earth with respect to the Sun"
        },
        'week': {
            name: 'week',
            value:  10080,
            description: "<b>week:</b><br> a unit of time equal to seven days"
        },
        'fortnight': {
            name: 'fortnight',
            value:  20160,
            description: "<b>fortnight:</b><br>a unit of time equal to 14 days"
        },
        'month': {
            name: 'month',
            value: 43800,
            description: "<b>month:</b><br>a unit of time, used with calendars, that is approximately as long as a natural orbital period of the Moon"
        },
        'calendar year': {
            name: 'calendar year',
            value: 525600,
            description: "<b>calendar year:</b><br>an approximation of the number of days of the Earth's orbital period, as counted in a given calendar. The Gregorian calendar, or modern calendar, presents its calendar year to be either a common year of 365 days or a leap year of 366 days, as do the Julian calendars. For the Gregorian calendar, the average length of the calendar year (the mean year) across the complete leap cycle of 400 years is 365.2425 days"
        },
        'decade': {
            name: 'decade',
            value: 5256000,
            description: "<b>decade:</b><br>a period of ten years"
        },
        'century': {
            name: 'century',
            value: 52560000,
            description: "<b>century:</b><br>a period of 100 years"
        },
        'shake': {
            name: 'shake',
            value: 1/6000000000,
            description: "<b>shake ():</b><br>an informal metric unit of time equal to 10 nanoseconds, or 10<sup>−8</sup> seconds. It was originally coined for use in nuclear physics, helping to conveniently express the timing of various events in a nuclear reaction, especially neutron reactions. The word "+'"shake"'+" was taken from the idiomatic expression "+'"in two shakes of a lamb'+"'"+'s tail"'+", which indicates a very short time interval."
        },
        'sol': {
            name: 'sol',
            value: 1479+(35/60),
            description: "<b>sol:</b><br>a solar day on Mars"
        },
    },
    'digital storage': { // https://en.wikipedia.org/wiki/Units_of_information
        'bit': {
            name: 'bit',
            value: 1,
            description: '<b>bit:</b><br>the most basic unit of information in computing and digital communications. The bit represents a logical state with one of two possible values. These values are most commonly represented as either "1" or "0"'
        },
        'crumb': {
            name: 'crumb',
            value: 2,
            description: "<b>crumb:</b><br>a group of two bits or a quarter byte"
        },
        'nibble': {
            name: 'nibble',
            value: 4,
            description: "<b>nibble:</b><br>a group of four bits, or half a byte"
        },
        'byte': {
            name: 'byte',
            value: 8,
            description: "<b>byte:</b><br>historically, a byte was the number of bits used to encode a character of text in the computer, which depended on computer hardware architecture; but today it almost always means eight bits"
        }
    },
    'mass': { // https://en.wikipedia.org/wiki/Units_of_information
        'Jupiter Mass': {
            name: 'Jupiter Mass',
            value: 0,
            description: "<b>Jupiter Mass ():</b><br>"
        },
        'Earth Mass': {
            name: 'Earth Mass',
            value: 0,
            description: "<b>Earth Mass:</b><br>"
        }
    },
    'speed': { // https://en.wikipedia.org/wiki/Units_of_information
        'knot': {
            name: 'knot',
            value: 1,
            description: "<b>knot ():</b><br>"
        }
    },
    'temperature': { // https://en.wikipedia.org/wiki/Conversion_of_scales_of_temperature#Comparison_of_temperature_scales
        'celsius': {
            name: 'celsius',
            toCelsius: 'x',
            fromCelsius: 'x',
            description: "<b>celsius (°C):</b><br>the degree Celsius is the unit of temperature on the Celsius scale, one of two temperature scales used in the International System of Units (SI)"
        },
        'fahrenheit': {
            name: 'fahrenheit',
            toCelsius: '(x-32)*5/9',
            fromCelsius: '(x*(9/5))+32',
            description: "<b>fahrenheit (°F):</b><br>a temperature scale based on one proposed in 1724 by the physicist Daniel Gabriel Fahrenheit"
        },
        'kelvin': {
            name: 'kelvin',
            toCelsius: 'x-273.15',
            fromCelsius: '+x+273.15',
            description: "<b>kelvin (K):</b><br>an absolute scale, which is defined such that 0 K is absolute zero and a change of thermodynamic temperature T by 1 kelvin corresponds to a change of thermal energy kT by 1.380649×10<sup>−23</sup> J"
        },
        'rankine': {
            name: 'rankine',
            toCelsius: '(x-491.67)*5/9',
            fromCelsius: 'x*(9/5)+491.67',
            description: "<b>rankine (°R):</b><br>an absolute scale of thermodynamic temperature named after the University of Glasgow engineer and physicist Macquorn Rankine, who proposed it in 1859"
        },
        'reaumur': {
            name: 'reaumur',
            toCelsius: 'x*(5/4)',
            fromCelsius: 'x*(4/5)',
            description: "<b>reaumur (°Re):</b><br>a temperature scale for which the melting and boiling points of water are defined as 0 and 80 degrees respectively"
        },
        'rømer': {
            name: 'rømer',
            toCelsius: '(x-7.5)*(40/21)',
            fromCelsius: '(x*(21/40)+7.5)',
            description: "<b>rømer (°Rø):</b><br>a temperature scale named after the Danish astronomer Ole Christensen Rømer"
        },
        'newton': {
            name: 'newton',
            toCelsius: 'x*100/33',
            fromCelsius: 'x*33/100',
            description: "<b>newton (°N):</b><br>a temperature scale devised by Isaac Newton in 1701"
        },
        'delisle': {
            name: 'delisle',
            toCelsius: '(100-x*2/3)',
            fromCelsius: '(100-x)*(3/2)',
            description: "<b>delisle (°D):</b><br>a temperature scale invented in 1732 by the French astronomer Joseph-Nicolas Delisle"
        },
        'wedgwood': { // https://en.wikipedia.org/wiki/Wedgwood_scale
            name: 'wedgwood',
            toCelsius: '(x-580.8)/72',
            fromCelsius: '580.8+x*72',
            description: "<b>wedgwood (°W):</b><br>an obsolete temperature scale, which was used to measure temperatures above the boiling point of mercury of 356 °C (673 °F)"
        }
    },
    'quantity': { // https://en.wikipedia.org/wiki/Non-numerical_words_for_quantities
        'brace': {
            name: 'brace',
            value: 2,
            description: "<b>brace:</b><br>"
        },
        'pair': {
            name: 'pair',
            value: 2,
            description: "<b>pair:</b><br>"
        },
        'dozen': {
            name: 'dozen',
            value: 12,
            description: "<b>dozen:</b><br>"
        },
        'bakers dozen': {
            name: "bakers dozen",
            value: 13,
            description: "<b>baker's dozen:</b><br>"
        },
        'gross': {
            name: 'gross',
            value: 144,
            description: "<b>gross:</b><br>"
        }
    },
};

let lastUpdated = 0;

// When an option is changed, search the above for matching choices
document.getElementById("variable").onchange = function() {updateInput()};
function updateInput() {
    // Set selected option as variable
    var selectValue = document.getElementById("variable").value;
    
    // Empty the target field
    document.getElementById("input1").innerHTML = "";
    document.getElementById("input1").innerHTML += ("<option value='' disabled selected>Select an option</option>");
    
    // For each choice in the selected option
    for (const key in lookup[selectValue]) {
        //console.log(lookup[selectValue][key].name);
        document.getElementById("input1").innerHTML += ("<option value='" + lookup[selectValue][key].name + "'>" + lookup[selectValue][key].name + "</option>");
    }

    document.getElementById("input0").innerHTML = document.getElementById("input1").innerHTML;
    document.getElementById("value0").value = 0;
    document.getElementById("value1").value = 0;
    document.getElementById("p0").innerHTML = ""
    document.getElementById("p1").innerHTML = ""
}

document.getElementById("input1").onchange = function() {
    updateValue();
    updateDescription();
};
document.getElementById("value1").onchange = function() {
    lastUpdated = 1;
    updateValue();
};
document.getElementById("input0").onchange = function() {
    updateValue();
    updateDescription();
};
document.getElementById("value0").onchange = function() {
    lastUpdated = 0;
    updateValue();
};

function updateValue() {
    if(document.getElementById("input1").value!=""&&document.getElementById("input0").value!=""){
        if(document.getElementById("variable").value == 'temperature'){
            if(lastUpdated){
                let x = document.getElementById("value1").value;
                x = eval(lookup[document.getElementById("variable").value][document.getElementById("input1").value].toCelsius);
                document.getElementById("value0").value = eval(lookup[document.getElementById("variable").value][document.getElementById("input0").value].fromCelsius);
            }else{
                let x = document.getElementById("value0").value;
                x = eval(lookup[document.getElementById("variable").value][document.getElementById("input0").value].toCelsius);
                document.getElementById("value1").value = eval(lookup[document.getElementById("variable").value][document.getElementById("input1").value].fromCelsius);
            }
            
        }
        else{
            if(lastUpdated){
                document.getElementById("value0").value = document.getElementById("value1").value * lookup[document.getElementById("variable").value][document.getElementById("input1").value].value / lookup[document.getElementById("variable").value][document.getElementById("input0").value].value;
            }else{
                document.getElementById("value1").value = document.getElementById("value0").value * lookup[document.getElementById("variable").value][document.getElementById("input0").value].value / lookup[document.getElementById("variable").value][document.getElementById("input1").value].value;
            }
        }
    }
}

function updateDescription(){
    if(document.getElementById("input0").value!=""){
        document.getElementById("p0").innerHTML = lookup[document.getElementById("variable").value][document.getElementById("input0").value].description
    }
    if(document.getElementById("input1").value!=""){
        document.getElementById("p1").innerHTML = lookup[document.getElementById("variable").value][document.getElementById("input1").value].description
    }
    if(document.getElementById("input1").value == document.getElementById("input0").value){
        document.getElementById("p1").innerHTML = ""
    }
}
