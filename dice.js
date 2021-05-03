module.exports = class Dice {

  constructor(numSides,numDice) {
      this.numSides = numSides;
      this.numDice = numDice;
  }

  rollDice() {
   var diceValues = new Array();

   var randomNum;
   for(var i=0;i<this.numDice;i++) {
      randomNum = this.getRandomInt(1,this.numSides);
      diceValues[i] = randomNum;
   }
   return diceValues;
 }



  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  display() {
      console.log("Game Rounds: "+this.rounds);
      console.log("Board Details: "+this.board);
  }
}
