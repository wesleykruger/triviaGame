'use strict';

$(document).ready(function () {
    class Question {
        constructor(ask, answer, imgSrc, prevRun) {
            this.ask = ask;
            this.answer = answer;
            this.imgSrc = imgSrc;
            this.prevRun = prevRun;
        }
    }

    $(".game-start").click(function () {
        $(".lead").empty();
        playGame();
    });

    function playGame() {
        let quest1 = new Question("The Last Supper", "Leonardo da Vinci", "assets/images/last-supper.jpg", false);
        let quest2 = new Question("The Starry Night", "Vincent van Gogh", "assets/images/Starry_Night.jpg", false);
        let quest3 = new Question("The Scream", "Edvard Munch", "assets/images/the_scream.jpg", false);
        let quest4 = new Question("The Night Watch", "Rembrandt", "assets/images/night_watch.jpg", false);
        let quest5 = new Question("The Kiss", "Gustav Klimt", "assets/images/The-Kiss.jpg", false);
        let quest6 = new Question("Arnolfini Portrait", "Jan van Eyck", "assets/images/Arnolfini_Portrait.jpg", false);
        let quest7 = new Question("Girl with a Pearl Earring", "Johannes Vermeer", "assets/images/pearl_earring.jpg", false);
        let quest8 = new Question("Impression, Sunrise", "Claude Monet", "assets/images/Impression,_Sunrise.jpg", false);
        let quest9 = new Question("Las Meninas", "Diego Velázquez", "assets/images/las-meninas.jpg", false);
        let quest10 = new Question("The Creation of Adam", "Michelangelo", "assets/images/adam.jpg", false);
        let possibleQuestionsArr = [quest1, quest2, quest3, quest4, quest5, quest6, quest7, quest8, quest9, quest10];
        let answersArr = ["Pablo Picasso", "Salvator Dali", "Raphael", "Frida Kahlo", "Sandro Botticelli", "El Greco", "Titian"];
        let correctAnswers = 0;
        let questionsAsked = 0;
        let timeOut = false;
        let clickDisabled = false;

        possibleQuestionsArr.forEach(element => {
            answersArr.push(element.answer);
        });

        let totalSeconds;
        let timer;

        let currentQuestion = askQuestion();

        function askQuestion() {
            $(".questionBox, .answer1, .answer2, .answer3, .answer4, .answer5, .time-left").hide(1000);
            $(".banner-area").empty();
            let thisQuestion = possibleQuestionsArr[Math.floor(Math.random() * possibleQuestionsArr.length)];
            totalSeconds = 10;
            timer = setInterval(countdown, 1000);
            timeOut = false;
            document.querySelector(".paintingImage").setAttribute("src", thisQuestion.imgSrc);
            document.querySelector(".questionBox").innerHTML = thisQuestion.ask;
            let randomArr = getRandomSubarray(answersArr, thisQuestion.answer, 5);

            //reset class names if changed for correct/incorrect answer
            document.querySelector(".answer1").className = "col-12 btn-light mb-1 text-center answer1";
            document.querySelector(".answer2").className = "col-12 btn-light mb-1 text-center answer2";
            document.querySelector(".answer3").className = "col-12 btn-light mb-1 text-center answer3";
            document.querySelector(".answer4").className = "col-12 btn-light mb-1 text-center answer4";
            document.querySelector(".answer5").className = "col-12 btn-light mb-1 text-center answer5";

            document.querySelector(".answer1").innerHTML = randomArr[0];
            document.querySelector(".answer2").innerHTML = randomArr[1];
            document.querySelector(".answer3").innerHTML = randomArr[2];
            document.querySelector(".answer4").innerHTML = randomArr[3];
            document.querySelector(".answer5").innerHTML = randomArr[4];
            $(".questionBox, .answer1, .answer2, .answer3, .answer4, .answer5, .time-left").show(1000);

            return thisQuestion;
        }

        let allChoices = document.querySelector(".answers");
        allChoices.addEventListener("click", getAnswerChoice, false);
        function getAnswerChoice(e) {
            if (clickDisabled) {
                return;
            }
            let clickedItem;
            if (e.target !== e.currentTarget) {
                clickedItem = e.target.innerHTML;
            }
            e.stopPropagation();

            if (clickedItem === currentQuestion.answer) {
                let alertDiv = document.createElement("p");
                alertDiv.className = (".alert alert-success");
                alertDiv.innerText = "Correct!";
                document.querySelector(".banner-area").appendChild(alertDiv);
                e.target.className += " correct-answer";
                correctAnswers++;
            } else {
                let alertDiv = document.createElement("p");
                alertDiv.className = (".alert alert-danger");
                alertDiv.innerText = "Incorrect!";
                document.querySelector(".banner-area").appendChild(alertDiv);
                e.target.className += " incorrect-answer";
                if (document.querySelector(".answer1").innerHTML.indexOf(currentQuestion.answer) > -1) {document.querySelector(".answer1").className += " correct-answer"}
                else if (document.querySelector(".answer2").innerHTML.indexOf(currentQuestion.answer) > -1) {document.querySelector(".answer2").className += " correct-answer"}
                else if (document.querySelector(".answer3").innerHTML.indexOf(currentQuestion.answer) > -1) {document.querySelector(".answer3").className += " correct-answer"}
                else if (document.querySelector(".answer4").innerHTML.indexOf(currentQuestion.answer) > -1) {document.querySelector(".answer4").className += " correct-answer"}
                else if (document.querySelector(".answer5").innerHTML.indexOf(currentQuestion.answer) > -1) {document.querySelector(".answer5").className += " correct-answer"}
                console.log("correct answer: " + currentQuestion.answer);
                console.log(document.querySelector(".answer1"))
            }
            if (possibleQuestionsArr.includes(currentQuestion)) {
                let index = possibleQuestionsArr.findIndex(p => p.ask == currentQuestion.ask);
                possibleQuestionsArr.splice(index, 1);
            }
            clearInterval(timer);
            questionsAsked++;


            if (totalSeconds < 0) {
                timeOut = true;
                let alertDiv = document.createElement("p");
                alertDiv.className = (".alert alert-danger");
                alertDiv.innerText = "Time's Up!!";
                document.querySelector(".banner-area").appendChild(alertDiv);
            }
            currentQuestion.prevRun = true;
            $(".score").innerHTML = correctAnswers + "/" + questionsAsked;

            if (questionsAsked < 2) {
                setTimeout(function () { currentQuestion = askQuestion(); }, 2000);
            } else {
                let finalScore = correctAnswers * 10;
                document.querySelector(".questionBox").innerHTML = "Congratulations! Your score: " + finalScore + "%";
                /*let replayDiv = document.createElement("a");
                replayDiv.className = "btn btn-primary btn-lg game-start";
                replayDiv.innerHTML = "Play Again?";
                document.querySelector(".lead").appendChild(replayDiv);
                $(".game-start").click(function () {
                    $(".lead").empty();
                    playGame();
                });*/
            }

            clickDisabled = true;
            setTimeout(function () { clickDisabled = false; }, 2000);
        }

        function countdown() {
            let timeExpired = false;
            document.querySelector(".time-left").innerHTML = totalSeconds;
            totalSeconds--;
            if (totalSeconds < 0) {
                clearInterval(timer);
                timeExpired = true;
                questionsAsked++;
                setTimeout(function () { currentQuestion = askQuestion(); }, 3000);
            }
        }
        function getRandomSubarray(arr, correctAns, size) {
            var shuffled = arr.slice(0), i = arr.length, temp, index;
            shuffled.push(correctAns);
            while (i--) {
                index = Math.floor((i + 1) * Math.random());
                temp = shuffled[index];
                shuffled[index] = shuffled[i];
                shuffled[i] = temp;
            }
            let ansCheck = shuffled.slice(0, size);
            if (!ansCheck.includes(correctAns)) {
                //pick random index and plug in the correct answer
                let randIndex = Math.floor(Math.random() * 5) + 1;
                shuffled[randIndex] = correctAns;
            }
            return shuffled;
        }
    }

});