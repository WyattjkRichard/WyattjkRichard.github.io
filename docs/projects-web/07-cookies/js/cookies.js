updateCookieMenu();
function AddCookie() {
    let cName = document.getElementById("cName").value;
    let cContents = document.getElementById("cContents").value;
    document.cookie = cName+"="+cContents+"; path=/";
    updateCookieMenu();
}

function RemoveCookie() {
    let cName = document.getElementById("cName").value;
    document.cookie = cName+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    updateCookieMenu();
}
function updateCookieMenu() {
    // Set selected option as variable
    console.log("Cookies Updated:")
    console.log(document.cookie)
    console.log(decodeURIComponent(document.cookie))
    splitCookie = document.cookie.split('; ');
    //splitCookie = 'cookie1=this is a test1; cookie2=this is a test2'.split('; ');
    document.getElementById("addedCookies").innerHTML = "";
    document.getElementById("addedCookies").innerHTML += ("<option value='' disabled selected>Select an option</option>");
    for(let i =0;i<splitCookie.length;i++){
        splitCookie[i] = splitCookie[i].split('=')
        document.getElementById("addedCookies").innerHTML += ("<option value='" + i + "'>" + splitCookie[i][0] + "</option>");
    }
}

document.getElementById("addedCookies").onchange = function() {
    splitCookie = document.cookie.split('; ');
    //splitCookie = 'cookie1=this is a test1; cookie2=this is a test2'.split('; ');
    for(let i =0;i<splitCookie.length;i++){
        splitCookie[i] = splitCookie[i].split('=')
    }
    let index = document.getElementById("addedCookies").value*1;
    document.getElementById("cName").value = splitCookie[index][0];
    document.getElementById("cContents").value = splitCookie[index][1];
};