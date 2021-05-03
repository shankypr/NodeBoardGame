
var Person = require('./person.js');
var Game = require('./game.js');
var GameRunner = require('./gamerunner.js');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');



var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var router = express.Router();

var fileData="Initial Value";
setRoutes('/','/startGame','/saveData');




  const writeFileData = async (fileData) => {
    try {
      fs.writeFile("./sample.json", JSON.stringify(fileData,null,2), function (err,data) {
        if (err) {
          return console.log(err);
        }
        console.log(data);
      });
    }
    catch(err) {
      console.log("Some error: "+err);
    }

 };


  const readFileData = async () => {
      try {
        const data = await fs.promises.readFile("./sample.json",'utf-8');
        return JSON.parse(data);
      }catch(err) {
        console.log("Some error: "+err);
      }

   };

function setRoutes(routes) {
  for(var i=0;i<routes.length;i++) {
    app.use(routes[i],router);
  }
}

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})


router.get('/', async function(req, res) {
    //res.json({ message: 'hooray! welcome to our api!' });
    readFileData().then(data => {
     console.log("file data : ", data);
     res.json(data);
     })
});


router.post('/saveData',  async function (req, res) {

  writeFileData(req.body).then(data => {
     console.log("file data : ", req.body);
     res.json(req.body);
   })
})



router.post('/startGame',  function (req, res) {
  var gameRunner = new GameRunner();
  var game = gameRunner.startGame(req.body.players,req.body.boardSize,req.body.numberOfRounds);
  var details = game.stopGame();
  return res.json(details);
})
