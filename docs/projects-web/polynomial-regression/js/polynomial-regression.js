function getData() {
    var degree = document.getElementById("degree").value;
    var Xs = document.getElementById("xvalues").value;
    var Ys = document.getElementById("yvalues").value;
    var resultValues = [];
    
    Xs = Xs.replaceAll(/[^0-9,.\n]/g, '');
    Xs = Xs.replaceAll(/\n+/g, ',');
    Xs = Xs.replaceAll(/,+/g, ',');
    Xs = Xs.replaceAll(/^[,]|[,]$/g, ''); //remove if there is no number before or after
    Ys = Ys.replaceAll(/[^0-9,.\n]/g, '');
    Ys = Ys.replaceAll(/\n+/g, ',');
    Ys = Ys.replaceAll(/,+/g, ',');
    Ys = Ys.replaceAll(/^[,]|[,]$/g, ''); //remove if there is no number before or after
    Xs = Xs.split(/[,\n]/g);
    Ys = Ys.split(/[,\n]/g);
    
    if(Xs.length != Ys.length){
        window.alert("Please enter the same amount of X and Y values")
    }
    else if(degree>=Xs.length||degree<=0){
        window.alert("Please enter a valid degree")
    }
    else{
        let max = Number(Xs[0]);
        let min = Number(Xs[0]);
        for(i=0; i<Xs.length;i++){
            Xs[i] = Number(Xs[i]);
            Ys[i] = Number(Ys[i]);
            if(Xs[i]<min)min = Xs[i];
            if(Xs[i]>max)max = Xs[i];
        }
        degree = Number(degree);
        
        document.getElementById("xvalues").value = Xs;
        document.getElementById("yvalues").value = Ys;
        resultValues = regression(Xs, Ys, degree);
        plotData(Xs, Ys, resultValues, max, min);
    }
}

// [ n  x    x2    ] [ y    ]
// [ x    x2    x3    ] [ yx    ]
// [ x2    x3    x4    ] [ yx2    ]
function regression(x, y, degree){
    //degree = 2;
    numOfPoints = x.length; //numOfPoints must be greater then degree by at least 1
    numOfRows = degree*2; // the number of diagonal rows in the matrix
    //x = [10, 15, 20, 25];
    //y = [766.8675709, 1207.104397, 1712.243097, 2375.200536];

    var Xs = [];
    Xs[0] = numOfPoints;
    var m = [];
    
    for(i = 0; i<numOfPoints; i++){ //Calculates Xs and Ys
        for(j = 0; j < numOfRows;j++){
            if (i == 0){
                Xs[j+1] = x[i]**(j+1);
            }
            else{
                Xs[j+1] += x[i]**(j+1);
            }
        }
        for(j = 0; j <= degree;j++){
            if (i == 0){
                Xs[2*degree+1+j] = y[i]*(x[i]**j);
            }
            else{
                Xs[2*degree+1+j] += y[i]*(x[i]**j);
            }
        }
    }

    for(i = 0; i<= degree;i++){ //creates initial matrix
        m[i] = [];
        for(j = 0; j<= degree;j++){
            m[i][j] = Xs[i+j];
        }
        m[i][degree+1] = Xs[2*degree+1+i];
    }
    
    var temp = [];
    for(i = 0;i<=degree;i++){
        for(j=0;j<=degree;j++){
            temp[j] = m[j][i];
        }
        for(j=0;j<(degree+2);j++){
            m[i][j] /= temp[i];
        }
        for(j=0;j<=degree;j++){
            for(k=0;k<(degree+2);k++){
                if(j!=i){
                    m[j][k] -= m[i][k]*temp[j];
                }
                
            }
        }
    }
    var result = "";
    var resultEquation = "";
    for(i = 0; i<=degree;i++){

        if(m[i][degree+1]!=0){
            result+=(Math.round(m[i][degree+1] * 10000) / 10000);
            resultEquation+=m[i][degree+1];
            if(i>0){
                result+="x";
                resultEquation+="*x";
            }
            if(i>1){
                result+=(i+"").sup();
                resultEquation+="**"+i;
            }
            if(i<degree && m[i+1][degree+1]>0){
                result+="+";
                resultEquation+="+";
            }
        }
    }
    document.getElementById("results").innerHTML  = result;
    return resultEquation;
}

function plotData(Xs, Ys, resultEquation, max, min){
    if(window.myChart != null){
        window.myChart.destroy();
    }

    
    var yValues = [];
    var xValues = [];
    let step = 1;

    for (let x = min; x <= max; x += step) {
        yValues.push(eval(resultEquation));
        xValues.push(x);
    }
    var storage = [];
    for (let i = 0;i<Xs.length;i++){
        var json = {x: Xs[i], y: Ys[i]};
        storage.push(json);
    }
    const data1 = {
        labels: xValues, // place labels array in correct spot
        datasets: [{
                type: 'line',
                pointRadius: 0,
                data: yValues,
                backgroundColor: 'rgb(0, 0, 255)',
                borderColor: 'rgb(0, 0, 255)',
                xAxisID: 'x2' // Specify to which axes to link
            },
            {
                type: 'scatter',
                pointRadius: 4,
                pointBackgroundColor: "rgba(255,0,0,1)",
                data: storage
            }
        ],
    }

    window.myChart = new Chart('chartJSContainer', {
        type: 'scatter',
        data: data1,
        options: {
            plugins: {
                legend: {display: false}
            },
            scales: {
                x: {},
                x2: { // add extra axes
                    display: false
                },
                y: {
                    grid: {
                        display: false
                    }
                },
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}