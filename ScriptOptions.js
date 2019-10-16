// JavaScript source code

var audio = new Audio('tetris.mp3');
var audVol;

$(document).ready(function () {
    $("#audioOption").click(function () {
        audioOpt();
    });

    $("#lvl").click(function () {
        lvlOpt();
    });

    $("#highVol").click(function () {
        AudioVolume();
    });

    $("#lowVol").click(function () {
        AudioVolume();
    });
});

function audioOpt() {
    $("#audioOption").hide();
    $("#lvl").hide();
    $("#return").hide();

    $("#tetrisTheme").show();
    $("#ckeckBoxTheme").show();
    $("#highVol").show();
    $("#volume").show();
    $("#lowVol").show();
    $("#returnOpt").show();

    if (audVol == null) {
        audVol = 0.5;
    }

    document.getElementById("highVol").disabled = true;
    document.getElementById("lowVol").disabled = true;

    document.getElementById('volume').value = audVol;
}

function lvlOpt() {
    $("#returnOpt").show();

    $("#audioOption").hide();
    $("#lvl").hide();
    $("#tetrisTheme").hide();
    $("#ckeckBoxTheme").hide();
    $("#highVol").hide();
    $("#volume").hide();
    $("#lowVol").hide();
    $("#return").hide();
}

function PlayMusic() {
    if (document.getElementById('tetrisTheme').checked) {
        document.getElementById("highVol").disabled = false;
        document.getElementById("lowVol").disabled = false;
        audio.play();
        document.getElementById('ckeckBoxTheme').innerText = "Disable sound";
    }
    else {
        document.getElementById("highVol").disabled = true;
        document.getElementById("lowVol").disabled = true;
        audio.pause();
        //audio.currentTime = 0;
        document.getElementById('ckeckBoxTheme').innerText = "Enable sound";
    }
}

function AudioVolume(vol) {
    if (vol == 1) {
        if (audVol < 1) {
            audVol = audVol + 0.1;
            audio.volume = audVol;
            document.getElementById('volume').value = audVol;
        }
    }
    else if (vol == 2) {
        if (audVol > 0) {
            audVol = audVol - 0.1;
            audio.volume = audVol;
            document.getElementById('volume').value = audVol;
        }
    }
}