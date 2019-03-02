const blinkt = require('blinkt')
const { exec } = require('child_process')
const dotenv = require('dotenv').config()
const pushbulletAccessToken = process.env.PUSHBULLET_ACCSES_TOKEN

const shutdown = require('./shutdown')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/off', (request, response) => {
  console.log('recieved message to shutdown')
  response.send('"Attempting to shutdown"')
  shutdown()
});

const updateLights = notifications => {
  blinkt.clear()
  notifications.forEach(({ app }, index) => {
    if (index < 8) {
      blinkt.setPixel(parseInt(index), 0, 60, 0)
    }
  })
  blinkt.show()
}

const notifications = []

const PushBullet = require('pushbullet');
const pusher = new PushBullet(pushbulletAccessToken);
const stream = pusher.stream();
stream.connect();

stream.on('connect', () => {
  console.log('connected')
});

stream.on('push', (message) => {
  console.log(message)
  if (message.type === 'dismissal') {
    const index = notifications.findIndex(({id}) => id === message.notification_id)
    notifications.splice(index, 1)
    console.log('dismissing notification', message.notification_id)
    updateLights(notifications)
    return
  }

  if (!message.notification_id) return

  notifications.push({ app: message.application_name, id: message.notification_id })
  console.log('new notification', message.application_name)
  updateLights(notifications)
});

app.post('/', (request, response) => {
  const { light, red, green, blue, app } = request.body;

  if (app) {
    const blinkInterval = setInterval(() => {
        blinkt.setPixel(7, 0, 60, 0)
        blinkt.show()
        setTimeout(() => {
            blinkt.setPixel(7, 0, 0, 0)
            blinkt.show()
        }, 300)
    }, 1000)

    setTimeout(() => {
        clearInterval(blinkInterval);
    }, 10000)
  } else {
    console.log('body:', request.body);

    blinkt.setPixel(light, red, green, blue)
    blinkt.show()
  
    response.send('Hello from Express!')
  }
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
