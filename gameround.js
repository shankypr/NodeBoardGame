var Person = require('./person.js');

module.exports = class GameRound {
  constructor(roundInfo,roundSeq, board, players) {
    this.roundInfo = roundInfo;
    this.roundSequence = roundSeq;
    this.gameBoard = board;
    this.playerMoves = new Map();
    this.players=players;
    this.initMoves();

  }

  initMoves() {
      var locList;
      var length = this.players.length;

			for(var i=0;i<length;i++) {
        locList =  new Array();
        var p = this.players[i];
				locList[0] = p.playerLocation;
				this.playerMoves[p] = locList;
			}
  }

  movePlayer(p,location) {
    //console.log("move player: "+p.name+" to location:"+p.playerLocation);
      var targetLoc = this.gameBoard.movePlayer(p, location);
      var moves = this.playerMoves[p];
      moves.push(targetLoc);
      this.playerMoves[p] = moves;
      p.playerLocation = targetLoc;
  }


  display() {
         // console.log("Round "+this.roundInfo);
  }

}
