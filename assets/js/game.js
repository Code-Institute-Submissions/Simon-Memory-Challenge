
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
        $("#level-title").text("Try again!, Press Start to Restart");
        $("#btnTextPlay").text("START");
        $("#btnStart").removeClass("started");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}