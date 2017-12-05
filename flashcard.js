 var inquirer = require('inquirer');
 var fs = require('fs');

 var BasicCard = require('./BasicCard.js');
 var ClozeCard = require('./ClozeCard.js');

 var myBasicCards = [];
 var myClozeCards = [];

 //  ClozeCard.prototype.partial = function () {

 //      this.partial = this.fulltext.replace(this.cloze, "...");
 //  };

 ClozeCard.prototype.correctFormat = function () {
     if (this.fulltext.search(this.cloze) != -1) {
         console.log("Entered correctly")

     } else {
         console.log("The text you have entered does not include the cloze and is broken")
     }
 };

 BasicCard.prototype.printInfoBasic = function () {
     console.log("Front: " + this.front);
     console.log("Back: " + this.back);
 };

 ClozeCard.prototype.printInfoCloze = function () {
     console.log("Fulltext: " + this.fulltext);
     console.log("Cloze: " + this.cloze);
     console.log("Partial: " + this.partial);
 };
 var firstPresident = new BasicCard("Who was the first US President?", "George Washington");

 firstPresident.printInfoBasic();

 var blackCatCloze = new ClozeCard("Dahlia is a wonderful black kitty!", "Dahlia");

 blackCatCloze.printInfoCloze();


 var tigerCatCloze = new ClozeCard("Iris is a rumbly girl!", "Iris");
 myClozeCards.push(tigerCatCloze);
 tigerCatCloze.printInfoCloze();
 tigerCatCloze.correctFormat();
 console.log(myClozeCards);

 function createBasicCard() {
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

     });

 };

 function createClozeCard() {
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
         myClozeCards.push(clozeCard);
         fs.appendFile("clozelog.txt", JSON.stringify(clozeCard));
         clozeCard.printInfoCloze();
         clozeCard.correctFormat();
         //  console.log(myClozeCards);

     });
 };


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

 function showBasicCard() {
     fs.readFile("basiclog.txt", "utf8", function (error, data) {
         if (error) {
             console.log(error);
         } else {
             console.log(JSON.parse(data));
         }




     });

 };

//  showBasicCard();