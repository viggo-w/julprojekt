var c, ctx;
var x, y;
var vY = 0;

var g = 0.7; // detta är tyngaccelerationen räknat i hasitghetsskillnad per frame alltså hur mycket hastigheten kommer att ändra sig varje frame
var jumpStrength = -15; // detta är den initiala hastigheten på hoppen (kommer att minsta till 0 när bollen har nått toppen)

var groundY = 500; // marknivå
var isJumping = false; // är true om man är i ett hopp

var hinder_x = [];
var hinder_y = [];

function start() {
    c = document.getElementById("canvas1");
    ctx = c.getContext("2d");

    x = 50;
    y = groundY;

    


    window.addEventListener("keydown", keyPress);
    setInterval(update, 15);




    for (var i = 0; i < 3; i++) {

    hinder_x.push(barrier_coordinates_x());
    hinder_y.push(barrier_coordinates_y());
}



    //console.log(hinder);
}

function keyPress(e) {
    // om man trycker mellanslag och man inte redan hoppar (är i luften)
    if (e.keyCode == 32 && !isJumping) {
        isJumping = true;
        vY = jumpStrength;    // hoppa uppåt
    }
}


// Slumpar fram en x-koordinat och mått till ett hinder
function barrier_coordinates_x() {
    var x = 0;

    while (x < 200) {
        x = Math.floor(Math.random() * c.width);
    }
    
    return x;

}

function barrier_coordinates_y() {
    var y = 0;

    y= Math.floor(Math.random() * 100) + 20;
    
    
    return y;

}




function update() {

    x += 5;

    ctx.clearRect(0, 0, c.width, c.height);

    // lägger till ett litet tal hela tiden tills att hastigheten närmar sig 0 (hastigheten är ju 0 precis innan den vänder)
    // därefter kommer hastigheten bli positiv, alltså kommer den att gå neråt och då kommer det vara endast gravitationen som drar den neråt
    vY += g;

    // ändrar y med hastigheten
    y += vY;

    // landa på marken
    if (y >= groundY) {
        y = groundY;
        vY = 0;
        isJumping = false;
    }

    // rita kuben

    ctx.fillStyle = "red";
    ctx.fillRect(x, y-30, 30, 30);
    ctx.fillStyle = "black";

/*
    if (x >= 400-25 && x <= 470 && y >= 430) {
        x = 50;
        alert(y);
    }
*/



    for (var i = 0; i < hinder_x.length; i++) {
        ctx.fillRect(hinder_x[i], 500-hinder_y[i] , 50, hinder_y[i]);
        
        
        if (x >= hinder_x[i]-25 && x <= hinder_x[i]+50 && y >= 500-hinder_y[i]) {
            x = 50;
            alert(y);
        }



    }


    //ctx.fillRect(400 ,430, 50, 70);

    //ctx.fillRect(700,430, 50, 70);

    //ctx.fillRect(900,430, 50, 70);
}
