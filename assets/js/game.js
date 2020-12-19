
//---------------------------------------------------------Game button variables

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//----------------------------------------------------------------Game Functions

//Function to start the game
$("#btnStart").click(function () {
    //    console.log('test -  ', level, started);
    if (!started) {
        $("#level-title").text("Level " + level);
        $(this).addClass("started");
        $("#btnTextPlay").text("TRY AGAIN");
        nextSequence();
        started = true;
    } else {
        level = 0;
        gamePattern = [];
        started = false;
        $(this).removeClass("started");
        $("#level-title").text("Press start to play game");
        $("#btnTextPlay").text("START");
    }
});

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("try-again");
        $("body").addClass("game-over");
        $("#level-title").text("Try again! Press Start to replay...");
        $("#btnTextPlay").text("START");
        $("#btnStart").removeClass("started");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

//Function for game sequence

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    // Play if sound is not mute
    if (!$('.btn-sound').hasClass('sound-mute')) {
        var audio = new Audio("assets/sounds/" + name + ".mp3");
        audio.play();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

//----------------------------------------------------------------Toggle menu

$(".btn-theme-mode").click(function () {
    $('body').toggleClass('dark-mode');
    var element = document.getElementById('modeImage');
    if (element.src.match("assets/images/dark-mode.png")) {
        element.src = "assets/images/light-mode.png";
    } else {
        element.src = "assets/images/dark-mode.png";
    }
});

$(".btn-sound").click(function () {
    $(".btn-sound").toggleClass('sound-mute');
    var element = document.getElementById('soundType');
    if (element.src.match("assets/images/sound-on.png")) {
        element.src = "assets/images/sound-off.png";
    } else {
        element.src = "assets/images/sound-on.png";
    }
});