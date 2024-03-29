// Create a new instance of node-core-audio
var coreAudio = require("node-core-audio");

// Create a new audio engine
var engine = coreAudio.createNewAudioEngine();

// Add an audio processing callback
// This function accepts an input buffer coming from the sound card,
// and returns an ourput buffer to be sent to your speakers.
//
// Note: This function must return an output buffer
function processAudio( inputBuffer ) {
    console.log(inputBuffer[0][0]);

    return inputBuffer;
}

engine.addAudioCallback( processAudio );