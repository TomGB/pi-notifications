# pi-notifications

Showing mobile notifications on blinkt on the pi using pushbullet

## Setup

SSH into your Pi

`git clone https://github.com/TomGB/pi-notifications`

`cd pi-notifications`

`npm i`

## Setup Pushbullet

Download Pushbullet on your phone

visit https://www.pushbullet.com/#settings/account

select `Create Access Token` and copy the access token (`*your token*`)

Then in the pi-notifications folder add the PUSHBULLET_ACCSES_TOKEN environment variable to the .env file

`echo "PUSHBULLET_ACCSES_TOKEN=*your token*" > .env`

## Run

`npm start dev`

## Automatically run when the PI boots

(there is probably a more sensible way of doing this)

`sudo nano /etc/rc.local`

append to the end of this file

`node [path to pi-notifications/index.js]`

e.g.

`/usr/local/bin/node /home/pi/pi-notifications/index.js >> /home/pi/pi-notifications/node.log`
