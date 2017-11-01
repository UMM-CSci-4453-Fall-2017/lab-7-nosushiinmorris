var myArgs = process.argv.slice(2);

var commandInput = myArgs[0];

GetButtons=require('./getButtons.js');
var express=require('express'),
app = express(),
port = process.env.PORT || 1337;

var buttons;

GetButtons.receivedRecords(commandInput)
.then(function(result){buttons = result})
.then(GetButtons.releaseButtons)
.then(function(){console.log("Starting server")});


app.use(express.static(__dirname + '/public')); //Serves the web pages
app.get("/buttons",function(req,res){ // handles the /buttons API
  res.send(buttons);
});

app.listen(port);
