const blinkt = require('blinkt')

let currentPos = 0;
let currentDir = false;

let lightStates = [0,0,0,0,0,0,0,0];

const draw = () => {

    if (!currentDir) {
        currentPos += 1;
    } else {
        currentPos -= 1;
    }

    blinkt.clear();

    lightStates = lightStates.map(b => {
        const temp = b - b * 0.8
	if (temp < 0) {
            return 0;
        }
	return temp;
    })

    lightStates[currentPos] = 255;

    lightStates.forEach((b, i) => {
        blinkt.setPixel(i, b, 0, 0);
    })

    blinkt.show();

    if (currentPos === 7) {
        currentDir = true;
    } else if (currentPos === 0) {
        currentDir = false;
    }
}

setInterval(draw, 80);
