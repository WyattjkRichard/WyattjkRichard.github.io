var codes = {};

fetch('data/codes.json')
    .then(response => response.json())
    .then(data => {
        codes = data;
    })
    .catch(err => console.error('Error loading JSON:', err));


var input = document.getElementById("codeInput");
var output = document.getElementById("result");
var cmfImage = document.getElementById("cmfImage");

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        var result = validate(e);
        if (result) {
            output.textContent = result.name + " (" + result.series + ")";
            cmfImage.src = result.img_src;
            cmfImage.style.display = "block";
        }
        else {
            output.textContent = "Invalid code";
            cmfImage.style.display = "none";
        }
        // clear input
        e.target.value = "";
    }
});

function validate(e) {
    var code = e.target.value;
    code = code.split(' ')[0];

    // Loop through each series
    for (const [seriesName, figures] of Object.entries(codes)) {
        for (const figure of figures) {
            if (figure.codes.includes(code)) {
                return {name: figure.name, series: seriesName, img_src: figure.img_src};
            }
        }
    }
    return null;
}