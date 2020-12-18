
//---------------------------------------------------------Game button variables

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//----------------------------------------------------------------Game Functions

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