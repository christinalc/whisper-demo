import { useWhisper } from '@chengsokdara/use-whisper'

// notes:
// think about cost: streaming could get expensive; explore options... like proximity based turn on/off?
// how to integrate variable font? maybe once you get the transcription back, set a delay of 0.1-0.5s...
// use css animations to animate the fonts?

// npx create-react-app (should still be able to host on vercel)
// in your .env, have a key titled "REACT_APP_OPENAI_API_TOKEN" so that it can access it here

// max 140 characters displayed at once...
// font axes changes (volume changes)

function App() {
  const {
    recording,
    speaking,
    transcribing,
    transcript,
    pauseRecording,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: process.env.REACT_APP_OPENAI_API_TOKEN,
    timeSlice: 1_000, // 1 second
    //removeSilence: true,
    whisperConfig: {
      language: 'en',
    },
  })

  navigator.mediaDevices.getUserMedia({
    audio: true,
  })
    .then(function(stream) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
  
      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024; //see what this means . gpt said to put 32 
  
      microphone.connect(analyser);
      //analyser.connect(scriptProcessor);
      //scriptProcessor.connect(audioContext.destination);
      scriptProcessor.onaudioprocess = function() {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        const arraySum = array.reduce((a, value) => a + value, 0);
        const volume = arraySum / array.length;

        // if (volume > 20) {
        //   startRecording for 5 seconds
        //   if volume > 20
        //   continue recording
        // } else {
        //   stopRecording();
        // }

        // console.log("Volume " + Math.round(volume));
      };
    })
    .catch(function(err) {
      // console.error(err);
    });

    //if using streaming
    //<p>Transcribed Text: {transcript.text}</p>

//     <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
//   <p style={{ textAlign: "center" }}>{transcribing || speaking ? "Loading" : transcript.text}</p>
// </div>


  return (
    <div>

      <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", 
      fontSize: "10vw", marginTop: "-0.08em" }}>
      <p>{recording ? "Recording..." : (transcribing ? "Loading..." : transcript.text)}</p>
      </div>

      <p>Recording: {recording ? "True " : "False "} 
      Speaking: {speaking ? "True " : "False "}
      Transcribing: {transcribing ? "True " : "False "}
      </p>
      
      <button onClick={() => startRecording()}>Start</button>
      <button onClick={() => pauseRecording()}>Pause</button>
      <button onClick={() => stopRecording()}>Stop</button>
    </div>
  )
}

export default App;
