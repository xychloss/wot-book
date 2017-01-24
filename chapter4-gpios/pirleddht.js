var sensorLib = require('node-dht-sensor');
sensorLib.initialize(22, 12); //#A

var onoff = require('onoff');

var Gpio = onoff.Gpio,
  led = new Gpio(4, 'out'),
  interval;

var Gpio = require('onoff').Gpio,
  sensor = new Gpio(17, 'in', 'both');    //#A

sensor.watch(function (err, value) { //#B
  if (err) exit(err);
 
  var readout = sensorLib.read(); //#C
  led.write(value, function() { //#E
    console.log(value ? 'there is someone! Temperature: ' + readout.temperature.toFixed(2) + 'C, ' + 
                'humidity: ' + readout.humidity.toFixed(2) + '%': 'not anymore!');
    
  });
});

function exit(err) {
  if (err) console.log('An error occurred: ' + err);
  sensor.unexport();
  console.log(' Bye, bye!')
  process.exit();
}

process.on('SIGINT', function () {
  clearInterval(interval);
  console.log(' Tschuss!');
  process.exit();
});
// #A Initialize pin 17 in input mode, 'both' means we want to handle both rising and falling interrupt edges
// #B Listen for state changes on pin 17, if a change is detected the anonymous callback function will be called with the new value
