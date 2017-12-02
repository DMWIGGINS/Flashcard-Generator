 var inquirer = require('inquirer');

 var BasicCard = require('./BasicCard.js');
 var ClozeCard = require('./ClozeCard.js');

 var firstpresident = new BasicCard("Who was the first US President?", "George Washington");

 console.log(firstpresident.front);
 console.log(firstpresident.back);

 var blackcat = new ClozeCard("Dahlia is a wonderful black kitty!", "Dahlia");

     
         
     

 console.log(blackcat.fulltext);
 console.log(blackcat.cloze);
 console.log(blackcat.partial);


 var tigercat = new ClozeCard("Iris is a rumbly girl!", "Iris");

 console.log(tigercat.fulltext);
 console.log(tigercat.cloze);
 console.log(tigercat.partial);