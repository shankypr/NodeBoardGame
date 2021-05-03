'use strict';
const readline = require('readline');
var Person = require('./person.js');
var Game = require('./game.js');
var express = require('express');
var bodyParser = require('body-parser');

module.exports = class GameRunner {

    constructor() {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      var game=null;
      let size = 40;
      let numPlayers=2;
      let numRounds=2;
      console.log('\n---------------------------------------------------------------');
      console.log("\n|			Welcome to Circle Game!!	      |");
      console.log("\n---------------------------------------------------------------");
    }

    startGame(names,size,rounds) {
      var players = this.createPlayers(names);
      this.game = new Game(players,size,rounds);
      this.game.startGame();
      return this.game;
    }

    stopGame(game) {
      game.stopGame();
    }

    createPlayers(names) {
      var players = new Array();
      for(var i=0;i<names.length;i++) {
          players[i] = new Person(names[i],0);
      }
      return players;
    }




    /*
    const question1 = () => {
      return new Promise((resolve, reject) => {
        rl.question('Enter Board Size ', (answer) => {
          size=answer;
          resolve()
        })
      })
    }

    const question2 = () => {
      return new Promise((resolve, reject) => {
        rl.question('Enter num players ', (answer) => {
          numPlayers=answer;
          resolve()
        })
      })
    }


    const question3 = () => {
      return new Promise((resolve, reject) => {
        rl.question('Number of Rounds ', (answer) => {
          numRounds=answer;
          startGame();
          stopGame();
          resolve()
        })
      })
    }
    */

    /*
    const main = async () => {
      await question1()
      await question2()
      await question3()
      rl.close()
    }
    main();
    */
}
