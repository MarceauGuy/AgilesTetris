$(document).ready(function(){
    $("#title").click(function(){
      $(this).hide();
    });
  });

  $(document).ready(function(){
    $("#btn1").click(function(){
      alert("Text: " + $("#test").text());
    });
    $("#btn2").click(function(){
      alert("HTML: " + $("#test").html());
    });
});

var forms = [];
var ctx;
$(document).ready(function () {
    ctx = document.getElementById("myCanvas").getContext("2d");
    $("#exitButton").click(function () {
        exitTetris();

    })
    $("#playButton").click(function () {
        runTetris();
    });
    $("#scoreButton1").click(function () {
        addScore(1);
    });
    $("#scoreButton2").click(function () {
        addScore(2);
    });
    $("#scoreButton3").click(function () {
        addScore(4);
    });
    $("#scoreButton4").click(function () {
        addScore(8);
    });
    $("#createForm").click(function () {
        forms.push(new Form());
    });
    $("#exporter").click(function () {
        exporter();
    });
});

function runTetris() {
    $("#playButton").hide();
    $("#title").hide();
    $("#scoreTitle").show();
    $("#myCanvas").show();
    $("#exitButton").show();
    $("#scoreDisplay").show();
    $("#scoreButton1").show();
    $("#scoreButton2").show();
    $("#scoreButton3").show();
    $("#scoreButton4").show();
    $("#createForm").show();
    $("#exportResultat").show();
    $("#exporter").show();
    $("#gotoOptions").hide();
    tetrisLoop();
}

function exitTetris() {
    $("#playButton").show();
    $("#gotoOptions").show();
    $("#scoreTitle").hide();
    $("#myCanvas").hide();
    $("#exitButton").hide();
    $("#scoreDisplay").hide();
    $("#scoreDisplay").hide();
    $("#scoreButton1").hide();
    $("#scoreButton2").hide();
    $("#scoreButton3").hide();
    $("#scoreButton4").hide();
    $("#createForm").hide();
    $("#exportResultat").hide();
    $("#exporter").hide();    
}

async function tetrisLoop() {
    var timerJeu = 1;
    while (timerJeu > 0) {
        await sleep(800);
        timerJeu += 1;
        console.log("Pièce n° : " + timerJeu);
        draw();
        update();
    }
}

function update() {
    forms.forEach(function (element) {
        element.y += 1;
    });
}

function draw() {
    ctx.clearRect(0, 0, 500, 800);
    forms.forEach(function (element) {
        element.draw();
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var score = 0;
function addScore(multiplier) {
    score += 100 * multiplier;
    $("#scoreDisplay").text(score.toString(10));
}

function Form() {
    this.x = 2;
    this.y = -3;
    this.size = 50;
    this.pattern = createPattern(Math.random() * 6);
}

Form.prototype.draw = function () {
    ctx.fillStyle = "#FF0000";
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (this.pattern[i][j] !== 0) {
                ctx.fillRect((this.x + i) * this.size, (this.y + j) * this.size, this.size, this.size);
            }
        }
    }
}

function exporter() {
    let name = $("#exportResultat").val();
    let score = $("#scoreDisplay").text();
    let contenu = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(
        {
            resultat:
                {
                    name: name,
                    score: score,
                }
        }));
    let telechargement = $("<a></a>").attr("href", contenu).attr("download", name + ".json");
    $("body").append(telechargement);
    telechargement[0].click();
    telechargement[0].remove();
}

function createPattern(i) {
    if (i < 1) {
        return [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0]
        ]
    } else if (i < 2) {
        return [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ]
    } else if (i < 3) {
        return [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0]
        ]
    } else if (i < 4) {
        return [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ]
    } else if (i < 5) {
        return [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0]
        ]
    } else if (i < 6) {
        return [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0]
        ]
    }
}