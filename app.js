var fs = require("fs");
var path = require('path');

const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const token = '953388296:AAEV4PUN-xy5hQgTmQfgXpQd2t_LEtJveyc';
const bot = new TelegramBot(token, {polling: true});

// var onduty = []; /*278311577, 358092524*/
if (!path.exists){
  fs.writeFileSync('./onduty.json', '[]')
}


var onduty = JSON.parse(fs.readFileSync("./onduty.json"));

var app = express();

app.use('/:num', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  let err = new Error(`Error! Table number isn't declared! Go to http://xxx.xxx.xxx.xxx/[table_number]`);
  res.send(err.message);
  throw err
})

app.get('/:num', (req, res) => {
    res.sendFile('./public/index.html');
})

app.post('/:num/waiter', (req, res) => {
  onduty.forEach((elem) => {
      bot.sendMessage(elem, `Официанта за ${req.params.num} столик` );
  });

  console.log('waiter');
})

app.post('/:num/hookah', (req, res) => {
  onduty.forEach((elem) => {
    bot.sendMessage(elem, `Кальянщика за ${req.params.num} столик` );
  });
  console.log('hookah');
})

app.post('/:num/check', (req, res) => {
  onduty.forEach((elem) => {
    bot.sendMessage(elem, `Счет за ${req.params.num} столик` );
  });
  console.log('hookah');
})

app.listen(3000, function () {
  console.log('Mr-call-app listening on port 3000!');
});

bot.on('message', (msg) => {
  // console.log(msg.from.id);
});

bot.on('message', (msg) => {
  if (msg.text == 'on') {
    if (onduty.indexOf(msg.from.id) == -1){
      onduty.push(msg.from.id);
      jsonText = JSON.stringify(onduty);
      console.log(jsonText);
      fs.writeFileSync('./onduty.json', jsonText);
    }
    console.log(onduty);
  }

  if (msg.text == 'off') {
    while (onduty.indexOf(msg.from.id) != -1) {
      onduty.splice(onduty.indexOf(msg.from.id), 1);
    }
    jsonText = JSON.stringify(onduty);
    console.log(jsonText);
    fs.writeFileSync('./onduty.json', jsonText);
    console.log(onduty);
  }
})
