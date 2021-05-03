var GameRound = require('./gameround.js');
var Board = require('./board.js');
var Dice = require('./dice.js');
const readline = require('readline');
const numSides = 6;
const numDice = 2;

module.exports = class Game {

  constructor(players,boardSize,numRounds) {

    this.currentRound = -1;
    this.isGameActive=false;
    this.gameDice= new Dice(numSides,numDice);
    this.players = players;
    this.board = this.createBoard(boardSize);
    this.rounds = this.createRounds(numRounds);
    this.roundSummary=null;
    this.gameInfo = null;

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  createRounds(numRounds) {
   var rounds = new Array();
   for(var i=0;i<numRounds;i++) {
       rounds[i] = new GameRound("Details "+i,i, this.board , this.players);
       rounds[i].display();
   }
   return rounds;
 }

 startRounds() {
   var length=this.rounds.length;
   var round;
   var roundInfo = new Object();

   for(var i=0;i<length;i++) {
     let tmp = "Round "+i;
     round = this.rounds[i];
     roundInfo[tmp] = this.startMoves(round);
     this.currentRound++;
   }
   roundInfo["Game Summary"] = this.getWinner();
   return roundInfo;
 }

  startGame() {
  	if(this.isGameActive!=true) {
  		this.isGameActive=true;
  		this.currentRound = 1;
  		this.gameInfo = this.startRounds();
  	}
  	else {
  	 console.log("Warning: Game is already Active!!");
  	}
  }


  stopGame() {
    if(this.isGameActive==true) {
      this.isGameActive=false;
      return this.gameInfo;
    }
    else {
     console.log("Warning: Game is already Stopped!!");
    }
  }


  printGameSummary() {
    var ts = this.getWinner();
    let tmp = "Winner is: "+ts.player.name+" With a score of:"+ts.topScore;
    return tmp;
  }

  getWinner() {
    var topScore = {player:null,topScore:-1};
    for(var i=0;i<this.players.length;i++) {
      var p = this.players[i];
       var ts = topScore.topScore;
       var score =  p.playerLocation + (this.board.boardSize * p.playerCompletedLap);
       if(score>ts) {
         var lus = this.getLosers(p);
         topScore =
           {'Game Winner':p,'Winning Score':score,'Game Losers':lus}
       }
    }
    return topScore;
  }

  getLosers(winner) {
    var loser = new Array();
    for(var i=0;i<this.players.length;i++) {
      if(this.players[i].name != winner.name) {

        loser.push(this.players[i]);
      }
    }
    return loser;
  }




 startMoves(round) {
      var roundMoves = new Array();
      for(var i=0;i<this.players.length;i++) {
          var p = this.players[i];
          var diceVal= this.gameDice.rollDice();
          var sum=p.playerLocation;
          for(var j=0;j<diceVal.length;j++) {
            sum = sum + diceVal[j];
          }
          roundMoves.push(p.name+" is moving from "+ p.playerLocation+" to "+sum);
          round.movePlayer(p,sum);
      }
      return roundMoves;
  }



  createBoard(boardSize) {
    return new Board("BoardID 654465",boardSize);
  }




  display() {
         // console.log("Game Rounds: "+this.rounds);
         // console.log("Board Details: "+this.board);
  }
}
