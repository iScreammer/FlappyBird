var cvs = document.getElementById ("canvas");
var ctx = cvs.getContext ("2d");


var bird = new Image ();
var bg = new Image ();
var fg = new Image ();
var pipeUp = new Image ();
var pipeBottom = new Image ();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// Звук для Игры
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 100;

// Кнопки для прыжка Bird
document.addEventListener("keydown", moveUp);
document.addEventListener("click", moveUp);

function moveUp() {
    yPos -= 30;
}

// Создание блоков для pipe
var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}

// Переменная счета
var score = 0;

// Позиция bird
var xPos = 10;
var yPos = 150;
var gravity = 5;

function draw() {
    ctx.drawImage(bg, 0, 0);

    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if(pipe[i].x == 90 ) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        // Bird врезалась в pipe
        if(xPos +bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
                location.reload(); // RESTART Game
                }

        if(pipe[i].x == 5) {
            score++;
            score_audio.play();
        }  
    }
    
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "25px Verdana";
    ctx.fillText("Счет:" +score, 10, cvs.height -20);

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;

