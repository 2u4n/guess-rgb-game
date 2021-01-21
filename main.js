//Implementing switching modes:
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");

//Default value for mode is hard
var mode = "hard";

hardButton.classList.add("clickedOn");

easyButton.addEventListener("click", ()=>{
    mode = "easy";
    easyButton.classList.toggle("clickedOn");
    hardButton.classList.toggle("clickedOn");
    restart();
})

hardButton.addEventListener("click", ()=>{
    mode = "hard";
    easyButton.classList.toggle("clickedOn");
    hardButton.classList.toggle("clickedOn");
    restart();
})

var messageToPlayers = document.querySelector("#message");

//An array to store the wrong RGB values
var wrongColorsArray = [];

//Function to generate RGB values and the 5 faulty ones
function generateRGBValues(){
    redValue = Math.ceil(Math.random()*255);
    greenValue = Math.ceil(Math.random()*255);
    blueValue = Math.ceil(Math.random()*255);

    document.querySelector("#red").innerHTML = redValue;
    document.querySelector("#blue").innerHTML = blueValue;
    document.querySelector("#green").innerHTML = greenValue;

    correctColorString = "rgb(" + redValue + "," + greenValue + "," + blueValue + ")";
    wrongColorsArray[0] = ("rgb(" + redValue + "," + (255 - greenValue) + "," + blueValue + ")");
    wrongColorsArray[1] = ("rgb(" + (255 - redValue) + "," + greenValue + "," + blueValue + ")");
    wrongColorsArray[2] = ("rgb(" + redValue + "," + greenValue + "," + (255 - blueValue) + ")");
    wrongColorsArray[3] = ("rgb(" + (255 - redValue) + "," + (255 - greenValue) + "," + blueValue + ")");
    wrongColorsArray[4] = ("rgb(" + redValue + "," + (255 - greenValue) + "," + (255 - blueValue) + ")");

    if(mode === "hard"){
        correctButtonIDString = "color" + Math.floor(Math.random()*6 + 1);
    }
    else if(mode === "easy"){
        correctButtonIDString = "color" + Math.floor(Math.random()*3 + 1);
    }
    
    correctButton = document.getElementById(correctButtonIDString);
    correctButton.style.backgroundColor = correctColorString;
}

generateRGBValues();

//Randomize the button which will be correct, from 1 - 6
var correctButtonIDString;
if(mode === "hard"){
    correctButtonIDString = "color" + Math.floor(Math.random()*6 + 1);
}
else if(mode === "easy"){
    correctButtonIDString = "color" + Math.floor(Math.random()*3 + 1);
}


//Select that button and assign its the background of the rgb value
var correctButton = document.getElementById(correctButtonIDString);
correctButton.style.backgroundColor = correctColorString;
correctButton.classList.remove("whiteBackground");

var finishedGeneratingColors = false;

//Function to generate the color for the rest of the buttons
var generateColor = function(){
    if(mode === "hard"){
        var counter = 0;
        while(counter < 5){
            var button = document.getElementById("color" + Math.floor(Math.random()*6+1));
            if(button.classList.contains("whiteBackground")){
                button.style.backgroundColor = wrongColorsArray[counter];
                counter++;
                button.classList.remove("whiteBackground");
            }
        }
        finishedGeneratingColors = true;
    }
    else if(mode === "easy"){
        var counter = 0;
        while(counter < 2){
            var button = document.getElementById("color" + Math.floor(Math.random()*3+1));
            if(button.classList.contains("whiteBackground")){
                button.style.backgroundColor = wrongColorsArray[counter];
                counter++;
                button.classList.remove("whiteBackground");
            }
        }
        document.getElementById("color4").style.backgroundColor = "black";
        document.getElementById("color5").style.backgroundColor = "black";
        document.getElementById("color6").style.backgroundColor = "black";
        finishedGeneratingColors = true;
    }
}

var allButtonsList = document.querySelectorAll(".colorButton");

//Function to check if the color button is correct
function checkColor(){
    if(this === correctButton){
        document.querySelector("#header").style.backgroundColor = correctButton.style.backgroundColor;
        messageToPlayers.innerHTML = "Correct!";
        if(mode === "hard"){
            for(eachButton of allButtonsList){
                eachButton.style.backgroundColor = correctButton.style.backgroundColor;
                eachButton.removeEventListener("click", checkColor);
            }
        }
        else if(mode === "easy"){
            for(var i = 0; i < 3; i++){
                allButtonsList[i].style.backgroundColor = correctButton.style.backgroundColor;
                allButtonsList[i].removeEventListener("click", checkColor);
            }
        }
    }
    else{
        messageToPlayers.innerHTML = "Try Again";
        this.style.backgroundColor = "black";
    }
}

function addListenerToButtons(){
    if(mode === "hard"){
        for(eachButton of allButtonsList){
            eachButton.addEventListener("click", checkColor);     
        }
    }
    else if(mode === "easy"){
        for(var i = 0; i < 3; i++){
            allButtonsList[i].addEventListener("click", checkColor);      
        }
    }
}

addListenerToButtons();


while(!finishedGeneratingColors){
    generateColor();
}

var restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", restart);

//Function to restart the game
function restart(){
    messageToPlayers.innerHTML = "";

    for(eachButton of allButtonsList){
        eachButton.classList.add("whiteBackground");
        eachButton.removeEventListener("click", checkColor);
    }

    generateRGBValues();
    
    correctButton.classList.remove("whiteBackground");

    finishedGeneratingColors = false;

    //Reset the color of the header
    document.querySelector("#header").style.backgroundColor = "#4778c6";

    generateColor();

    addListenerToButtons();
}






