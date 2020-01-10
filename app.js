const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const token = '953388296:AAEV4PUN-xy5hQgTmQfgXpQd2t_LEtJveyc';
const bot = new TelegramBot(token, {polling: true});

onduty = [278311577, 358092524];
var app = express();

app.use('/:num', express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/public'));

app.get('/:num', (req, res) => {
  res.sendFile('index.html');
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
  console.log('Example app listening on port 3000!');
});

bot.on('message', (msg) => {
  console.log(msg.from.id);
});
