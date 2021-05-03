var Person = require('./person.js');
module.exports = class Board {
  constructor(boardInfo,size) {
    this.boardInfo = boardInfo;
    this.boardSize = size;
  }



   movePlayer(player, loc) {

		if( (loc / this.boardSize) > 1 ) {
      //console.log("Player: "+player.name+" loc: "+loc / this.boardSize );
			loc = loc % this.boardSize;
			player.playerCompletedLap += 1;

		}
		return loc;
	}


  display() {
         console.log("Board Info : "+this.boardInfo);
  }

}
