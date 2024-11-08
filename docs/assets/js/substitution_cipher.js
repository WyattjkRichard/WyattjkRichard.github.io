let cipher_select = document.getElementById("ciphers");



cipher_select.onchange = function() {
    selected_font = cipher_select.value;
    const elements = document.querySelectorAll(".cipher_text");
    // Iterate over the NodeList and update the font family
    elements.forEach(element => {
        element.style.fontFamily = selected_font;
    });
};