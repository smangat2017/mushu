var accountSid = 'ACe6c305938a6748af7cb63601bcdd7ae0';
var authToken = '03151a9c2af51068dcb55f8ec7b3a275';

var client = require('twilio')(accountSid, authToken);
var express = require('express');
var app = express();
var schedule = require('node-schedule');

//Send a good morning text!
var status = 'MORNINGSENT'
beginDay();

//Listen on Appropriate port
app.listen(8080, function () {
  console.log('Listening on port 8080');
});

app.get('/', function(req,res){
  res.send("Hello World");

});

//Get messages from Twilio Webhook
app.post('/mushu', function(req,res){
  var message = req.body.message;
  var response = processInput(text);
  sendText(response);
  res.send(200);
});

//Return an appropriate response
function processInput(text){
  return "What is something you're grateful for?";
}

//Start the day off with a good morning!
function beginDay(){
  var rule = new schedule.RecurrenceRule();
  rule.hour = 17;
  rule.minute = 4;
  var j = schedule.scheduleJob(rule, function(){
    sendText("Good Morning Simar! :)");
  });
}

//Send me a text!
function sendText(message){
  client.messages.create({
    to: "5106763950",
    from: "+16502851553",
    body: message,
  }, function(err, message) {
    console.log(message.sid);
  });
}
