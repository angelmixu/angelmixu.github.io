
var imgLogo = new Image(); 
imgLogo.src = 'logo.png';
var gTextScrollIncrement = 1;

var textGoingForward = true;
var textXincrement = 1;

var textArrayVariations = new Array();

function redraw() {
    var canvasI = document.getElementById('canvas');
    var ctx = canvasI.getContext("2d");
    canvasI.width = canvasI.clientWidth;
    canvasI.height = canvasI.clientHeight;

    var logoText = "Mixu's Play Box - "
    ctx.font = "16px Arial"
    var textWidth = ctx.measureText(logoText).width
    var textHeight = 16*2.5
    var posY = 0;

    var linePosition = 0;

    while (posY < canvasI.height+textHeight*3) {
        if (linePosition >= textArrayVariations.length) {
            textArrayVariations.push(Math.random()*textWidth);
        }
        ctx.save();
        ctx.translate(-textWidth*2, posY);
        ctx.rotate(-Math.PI/6);
        ctx.textAlign = "left";
        var posX = textXincrement;
        while (posX < canvasI.width + textWidth*4) {
            ctx.fillText(logoText, posX + textArrayVariations[linePosition], 0);
            posX += textWidth;
        }
        ctx.restore();
        posY += textHeight;
        linePosition++;
    }


    posX = 0
    while (posX - textWidth*2 < canvasI.width + textWidth*4) {
        if (linePosition >= textArrayVariations.length) {
            textArrayVariations.push(Math.random()*textWidth);
        }
        ctx.save();
        ctx.translate(posX - textWidth*2, posY);
        ctx.rotate(-Math.PI/6);
        ctx.textAlign = "left";
        var posX2 = textXincrement;
        while (posX2 < canvasI.width + textWidth*4) {
            ctx.fillText(logoText, posX2 + textArrayVariations[linePosition], 0);
            posX2 += textWidth;
        }
        ctx.restore();
        posX += textHeight*1.7;
        linePosition++;
    }

    var minLength = canvasI.width < canvasI.height ? canvasI.width : canvasI.height;
    var newLength = minLength*0.8;
    ctx.drawImage( imgLogo, canvasI.width/2  - newLength/2,
                            canvasI.height/2 - newLength/2,
                            newLength, newLength);

    if (textXincrement > textWidth) {
        textGoingForward = false;
    }
    if (textXincrement < 0) {
        textGoingForward = true
    }

    if (textGoingForward) {
        textXincrement+=gTextScrollIncrement;
    } else {
        textXincrement-=gTextScrollIncrement;
    }
}

// update on any window size change.
window.addEventListener("resize", redraw);

// first draw
redraw();

setInterval(function() {
  redraw()
}, 200);
