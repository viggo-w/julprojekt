var c, ctx;
var x, y;
var vY = 0; // hastighet i y-led

var g = 0.7; // detta är tyngaccelerationen räknat i hasitghetsskillnad per frame alltså hur mycket hastigheten kommer att ändra sig varje frame
var jumpStrength = -20; // detta är den initiala hastigheten på hoppen (kommer att minsta till 0 när bollen har nått toppen)

var groundY = 500; // marknivå
var isJumping = false; // är true om man är i ett hopp

// koordinaterna för hindrerna
var hinder_x = [];
var hinder_y = [];

var start_speed = 5; // starthasighet för x-led
var dx = start_speed;

var tid;
var start_tid; // t

// körs när man öppnar sidan
function start() {
    c = document.getElementById("canvas1");
    ctx = c.getContext("2d");

    x = 50; // sätter startpositionen i x-led för spelaren
    y = groundY; // sätter startpositionen i y-led för spelaren


    tid_text = document.getElementById("tid");

    window.addEventListener("keydown", keyPress); // lägger till en listner så att den kan känna av och köra keyPress() när man trycker på mellanslag
    
    start_tid = Date.now(); // start-tiden


    setInterval(update, 5); // Anger hur ofta update()-funktionen ska köras




    // loppar igenom tre gånger (för att få tre hinder)
    for (var i = 0; i < 3; i++) {
        hinder_x.push(barrier_coordinates_x()); // lägger till en slumpmässig x-koordinat till x-koordinat-listan
        hinder_y.push(barrier_coordinates_y()); // lägger till en slumpmässig höjd till y-koordiant-listan
    }
}

// funktionen körs när spelaren trycker på en tangent
function keyPress(e) {
    // om man trycker mellanslag och man inte redan hoppar (är i luften)
    // (talet 32 motsvarar mellanslag)
    if (e.keyCode == 32 && !isJumping) {
        isJumping = true; // ändrar isJumping till sant
        vY = jumpStrength; // hoppa uppåt genom att sätta en initial hastighet (jumpStrenght) på hasigheten i y-led. (denna hastighet kommer så småningom närma sig 0 och sedan byta riktning tills den träffar marken)
    }
}


// Slumpar fram en x-koordinat och mått till ett hinder
function barrier_coordinates_x() {
    var x = 0; // variabeln som ska returneras

    x = Math.floor(Math.random() * 800) + 200; // Tar fram ett random nummer mellan 200 och 800 (jag vill inte att några hinder ska spawna innan x=200)
    
    return x; // returnera x-koordinaten

}

// slumpar fram höjden på hindrerna
function barrier_coordinates_y() {
    var y = 0; // variabelns som ska returneras

    y= Math.floor(Math.random() * 100) + 20; // slumpar fram ett värde mellan 20 och 100 (det får inte vara för kort eller för högt)

    return y; // returnerar höjden

}




function update() {

    tid = ((Date.now() - start_tid) / 1000).toFixed(2); // tar nuvarande tiden - start-tiden för att få hur mycket tid som har gått sen start. delar också med 1000 för att omvandla från millisekunder till sekunder
    
    x += dx; // ändrar spelaren x-koordinat med dx för att få den att röra sig i x-led

    ctx.clearRect(0, 0, c.width, c.height); // tar bort allt ritat på skärmen

    // lägger till ett litet tal hela tiden tills att hastigheten närmar sig 0 (hastigheten är ju 0 precis innan den vänder i luften)
    // därefter kommer hastigheten bli positiv, alltså kommer den att gå neråt och då kommer det vara endast gravitationen (g) som drar den neråt
    vY += g;

    // ändrar y med hastigheten
    y += vY;

    // landa på marken
    if (y >= groundY) { // kollar om y är lika med eller större än marknivån (högre värden på y = lägre ner på spelplanen)
        y = groundY; // se till att bollens y-koordinat är lika med marknivån
        vY = 0; // se till att hastigheten i y-led är 0 (så att inte g fortsätter trycka ner spelaren under marknivån)
        isJumping = false; // ändrar isJumping till falskt för att signalera att man inte längre är i luften
    }


    // skriver tiden
    ctx.fillStyle = "white";
    ctx.font = "30px Monospace";
    ctx.fillText("Tid: " + tid + "s", 15, 40);


    // ritar kuben
    ctx.fillStyle = "red"; // ändrar så kubens färg blir röd
    ctx.fillRect(x, y-30, 30, 30); // ritar kuben
    ctx.fillStyle = "green"; // gör färgen grön igen så att hinderna blir gröna


    for (var i = 0; i < hinder_x.length; i++) { // loopar igenom alla hinder
        ctx.fillRect(hinder_x[i], 500-hinder_y[i] , 50, hinder_y[i]); // ritar hindrerna på koordinaterna som finns i listorna
        
        
        if (x >= hinder_x[i]-25 && x <= hinder_x[i]+50 && y >= 500-hinder_y[i]) { // hit detection, kollar om spelaren rör vid något hinder
            x = 50; // flyttar spelaren till startpositionen
            dx = start_speed; // så att riktningen alltid blir samma när man startar om

            alert("Du dog! Din sluttid blev: " + tid + " sekunder. Tryck på OK för att spela igen.");
            start_tid = Date.now();
        }
    }

    // gör så att spelaren studsar tilbaka om den träffar väggen
    if (x >= c.width-30 || x <= 0) {
        dx = -dx; // byter riktning på spelaren
    }
}
