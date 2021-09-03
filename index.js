const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sound = require('sound-play');
const app = express();
app.use(bodyParser.json());

let tocar = false;

function playIf() {
  if (tocar) {
    sound.play(path.join(__dirname, './Alarm.wav'))
      .then(() => playIf());
  } else {
    setTimeout(playIf, 100);
  }
}

playIf();

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/chamar', (req, res) => {
  tocar = true;
  res.status(200).send('Chamou');
});

app.get('/naochamar', (req, res) => {
  tocar = false;
  res.status(200).send('Não chamou');
})

app.get('/chamando', (req, res) => {
  res.status(200).json({ tocando: tocar });
});

app.listen(80, () => console.log('Olá, senhoras e senhores'));
