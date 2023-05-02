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
    //removeSilence: true,
    whisperConfig: {
      language: 'en',
    },
  });

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function startAndStopRecording() {
  while (true) {
    console.log("Starting with loop");
    startRecording();
    await sleep(5000);
    stopRecording();
    await sleep(5000);
    console.log("Done with loop");
  }
}

  // // idk about this
  // const startAndStopRecording = () => {
  //   // start recording
  //   startRecording();

  //   // stop recording after 5 seconds
  //   setTimeout(() => {
  //     stopRecording();
  //   }, 5000);
  // };

  // // call startAndStopRecording every 5 seconds
  // setInterval(() => {
  //   startAndStopRecording();
  // }, 5000);

  return (
    <div>

      <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", 
      fontSize: "14vw", marginTop: "-0.08em", fontFamily: "CrystalTracedVF", lineHeight: "88%" }}>
      <p>{recording ? "Listening..." : (transcribing ? "Loading..." : transcript.text)}</p>
      </div>

      {/*<p>Recording: {recording ? "True " : "False "} 
      Speaking: {speaking ? "True " : "False "}
      Transcribing: {transcribing ? "True " : "False "}
      </p> */}
      
      {/* <button onClick={() => startRecording()}>Start</button>
      <button onClick={() => pauseRecording()}>Pause</button>
      <button onClick={() => stopRecording()}>Stop</button> */}
      <button className="btn" onClick={() => startAndStopRecording()}>2023</button>
    </div>
  )
}

export default App;
