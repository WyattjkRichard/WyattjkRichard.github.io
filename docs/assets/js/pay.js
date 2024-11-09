// calculates current pay for the coop term
var month = new Date().getMonth() + 1;
var currentDate;

if (month == 5) { currentDate = 120; }
else if (month == 6) { currentDate = 151; }
else if (month == 7) { currentDate = 181; }
else if (month == 8) { currentDate = 212; }

currentDate += new Date().getDate();
var daysWorked = currentDate - 121 - (Math.floor((currentDate - 121) / 7)) * 2; // 121 - startDate: may 1st
if (currentDate > 158) { daysWorked--; } // june 9th
if (currentDate > 160) { daysWorked--; } // june 9th
if (currentDate > 177) { daysWorked--; } // june 26th
if (currentDate > 185) { daysWorked--; } // july 4th
if (currentDate > 186) { daysWorked--; } // july 5th
if (currentDate > 187) { daysWorked--; } // july 6th
if (currentDate > 192) { daysWorked--; } // july 11th


function refresh() {
    /*
    const timeDisplay = document.getElementById("time");
    const dateString = new Date().toLocaleString('en-GB');
    const formattedString = dateString.replace(", ", " - ");
    timeDisplay.textContent = formattedString;
    */
    var daysPay = daysWorked * 8 * 18; // 8hrs/day * $18/hr
    const allDate = new Date().toLocaleString('en-GB');
    const payDisplay = document.getElementById("pay");
    const year = new Date().getFullYear();
    var day = new Date().getDay(); // 0-6, sun-sat
    var hour = allDate.substr(12, 2);
    var minute = allDate.substr(15, 2);
    const second = allDate.substr(18, 2);
    var dailySec = 0;
    if (hour >= 8 && (hour < 16 || (hour == 16 && minute < 30)) && !(hour == 12 && min >= 30) && (day != 0 && day != 6) && year <= 2023 && (month < 8 || (month == 8 && date <= 18)) && (currentDate != 158 && currentDate != 160 && currentDate != 185 && currentDate != 186 && currentDate != 187)) {
        hour -= 8;
        dailySec = (second * 1) + (minute * 60) + (hour * 60 * 60);
        if (hour > 13) { //after lunch
            dailySec -= 1800;
        }
    } else if (hour > 16 || (hour == 16 && minute > 30) && (day != 0 && day != 6) && year <= 2023 && (month < 8 || (month == 8 && date <= 18)) && (currentDate != 158 && currentDate != 160 && currentDate != 185 && currentDate != 186 && currentDate != 187)) {
        daysPay += 144;
    }

    const currentPay = ("$"+((dailySec * (1 / 200)) + daysPay)); // $18/hr = $1/200/sec
    payDisplay.textContent = currentPay;
}
setInterval(refresh, 1000);