// using inquirer npm and fs 
var inquirer = require('inquirer');
var fs = require('fs');

// importing our flashcard constructors from BasicCard and ClozeCard files
var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');

// declare an array for each flashcard type
var myBasicCards = [];
var myClozeCards = [];

// adding method to ClozeCard that will test for correct format entered
ClozeCard.prototype.correctFormat = function () {
    if (this.fulltext.search(this.cloze) != -1) {
        console.log("Entered correctly");
        return true;

    } else {
        console.log("The text you have entered does not include the cloze and is broken");
        return false;
    }
};
// adding method to BasicCard that will log front and back of card
BasicCard.prototype.printInfoBasic = function () {
    console.log("Front: " + this.front);
    console.log("Back: " + this.back);
};
// adding method to ClozeCard that will log fulltext, partial, and cloze parts
ClozeCard.prototype.printInfoCloze = function () {
    console.log("Fulltext: " + this.fulltext);
    console.log("Cloze: " + this.cloze);
    console.log("Partial: " + this.partial);
};
//  var firstPresident = new BasicCard("Who was the first US President?", "George Washington");

//  firstPresident.printInfoBasic();

//  var blackCatCloze = new ClozeCard("Dahlia is a wonderful black kitty!", "Dahlia");

//  blackCatCloze.printInfoCloze();


//  var tigerCatCloze = new ClozeCard("Iris is a rumbly girl!", "Iris");
//  tigerCatCloze.printInfoCloze();
//  tigerCatCloze.correctFormat();

// set count to 0 to prepare for recursive loop 
var count = 0;
// function that will prompt the uset to create a basic flashcard by inputting the text for the front and the back,
// create a new instance of BasicCard and add it to myBasicCards array,
// add the text to basiclog.txt 
function createBasicCard() {
    if (count < 2) {
        inquirer.prompt([{
                name: "front",
                message: "Please type the question you would like on the front of the basic flashcard."
            },
            {
                name: "back",
                message: "Please type the answer you would like on the back of the basic flashcard."
            }
        ]).then(function (answers) {
            var basicCard = new BasicCard(answers.front, answers.back);
            myBasicCards.push(basicCard);
            fs.appendFile("basiclog.txt", JSON.stringify(basicCard));
            //  fs.appendFile("basiclog.txt", JSON.stringify(myBasicCards)); 

            basicCard.printInfoBasic();
            //  console.log(myBasicCards);
            count++;
            createBasicCard();
        });

        // when loop is finished we will print the array and generate the finished basic flashcards in the browser
    } else {
        console.log("Your basic cards have been created!");
        for (var i = 0; i < myBasicCards.length; i++) {
            myBasicCards[i].printInfoBasic();
            //  console.log(myBasicCards[i].front);
            //  console.log(myBasicCards[i].back);
            $("#question").text(MyBasicCards[i].front);
            $("#answer").text(MyBasicCards[i].back);
            //  document.getElementById("question").innerHTML = MyBasicCards[1].front;
            //  document.getElementById("answer").innerHTML = MyBasicCards[1].back;

        }
    }

};

// function that will prompt the uset to create a cloze flashcard by inputting the text for the front and the back,
// create a new instance of ClozeCard and add it to myClozeCards array,
// add the text to clozelog.txt 
function createClozeCard() {
    if (count < 2) {
        inquirer.prompt([{
                name: "text",
                message: "Please type the full text you would like on the cloze card."
            },
            {
                name: "cloze",
                message: "Please type just the cloze part of the text."
            }
        ]).then(function (answers) {
            var clozeCard = new ClozeCard(answers.text, answers.cloze);
            if (clozeCard.correctFormat() !== true) {
                console.log("Please try again");
                createClozeCard();
            } else {

                myClozeCards.push(clozeCard);
                fs.appendFile("clozelog.txt", JSON.stringify(clozeCard));
                clozeCard.printInfoCloze();

                //  console.log(myClozeCards);
                count++;
                createClozeCard();
            }
        });

        // when loop is finished we will print the array and generate the finished cloze flashcards in the browser    
    } else {
        console.log("Your cloze cards have been created!");
        for (var i = 0; i < myClozeCards.length; i++) {
            myClozeCards[i].printInfoCloze();

        }
    };
};
// prompt user to choose to create basic flashcards, cloze flashcards, or to quit 
function inputFlashCard() {
    inquirer.prompt([{
        type: "list",
        name: "flashcard",
        message: "What type of flashcard would you like to create?",
        choices: ["Basic", "Cloze", "I'm all done for now"]

    }]).then(function (answers) {
        if (answers.flashcard === "Basic") {
            createBasicCard();


        } else if (answers.flashcard === "Cloze") {
            createClozeCard();


        } else if (answers.flashcard === "I'm all done for now") {
            console.log("See you next time!");


        }

    });
};

inputFlashCard();