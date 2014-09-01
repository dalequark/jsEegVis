
PORT = 3333;
var connect = require('connect');
var serveStatic = require('serve-static');
// create a static server to serve files in this directory
var conn = connect().use(serveStatic(__dirname)).listen(PORT);
var io = require('socket.io')(conn);
var browserConnected = false;
var btConnected = false;
/*
io.on('connection', function(socket){
	setInterval(function(){
		io.emit('data', Math.random()*3000);
	}, 100);
});
*/

io.on('connection', function(){ browserConnected = true});

var BluetoothSerialPort = require('bluetooth-serial-port').BluetoothSerialPort;
var btSerial = new BluetoothSerialPort();

btSerial.inquire(); 

	try{
	btSerial.listPairedDevices(function(pairedDevices) {
		pairedDevices.forEach(function(device) {
			if(device["name"] == "HC-06")
			{
				console.log("Conneting to " + device["name"] + "...");
				var name = device["name"];
				var channel = device["services"][0]["channel"];
				var address = device["address"];
				
					btSerial.connect(address, channel, function() {
						console.log('connected to ' + name);
						btConnected = true;

						btSerial.on('data', function(buffer) {
							if(browserConnected)	io.emit('data', buffer.toString('utf-8'));
						});
					}
					, function () {
						console.log('cannot connect');
					}
					); 
				

			}
		});
	});
	}
	catch(e)
	{
		console.log("Could not connect: " + e + ". Trying again");
	}



