// JavaScript source code

var audio = new Audio('tetris.mp3');

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
    $("#tetrisTheme").show();
    $("#ckeckBoxTheme").show();
    $("#highVol").show();
    $("#volume").show();
    $("#lowVol").show();
    $("#returnOpt").show();
    $("#return").hide();
}

function lvlOpt() {
    $("#audioOption").hide();
    $("#lvl").hide();
    $("#tetrisTheme").hide();
    $("#ckeckBoxTheme").hide();
    $("#highVol").hide();
    $("#volume").hide();
    $("#lowVol").hide();
    $("#returnOpt").show();
    $("#return").hide();
}

function PlayMusic() {
    if (document.getElementById('tetrisTheme').checked) {
        audio.play();
    }
    else {
        audio.pause();
        audio.currentTime = 0;
    }
}

function AudioVolume() {
    //ex: audio.volume = 0.2; [ - 0 -> 1 + ]
}