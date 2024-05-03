let speech = new SpeechSynthesisUtterance();
let voices = [];

let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];

  voices.forEach((voice, i) => {
    voiceSelect.options[i] = new Option(voice.name, i);
  });
};

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

let isPlaying = false;
let audio;

document.getElementById("listenButton").addEventListener("click", () => {
  const text = document.querySelector("textarea").value;
  if (!isPlaying) {
    speech.text = text;
    speech.pitch = parseFloat(document.getElementById("pitch").value);
    speech.rate = parseFloat(document.getElementById("speed").value);
    speech.volume = parseFloat(document.getElementById("volume").value);
    speech.timbre = parseFloat(document.getElementById("timbre").value);
    speech.articulation = parseFloat(document.getElementById("articulation").value);

    // Speak the text
    window.speechSynthesis.speak(speech);

    // Update button text and state
    document.getElementById("listenButton").textContent = "Stop";
    isPlaying = true;
  } else {
    // Stop the speech
    window.speechSynthesis.cancel();

    // Update button text and state
    document.getElementById("listenButton").textContent = "Listen";
    isPlaying = false;
  }
});

document.getElementById("downloadButton").addEventListener("click", () => {
  const text = document.querySelector("textarea").value;
  const blob = new Blob([text], { type: "audio/mp3" });
  const url = URL.createObjectURL(blob);

  // Create a <a> element for downloading the audio
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "audio.mp3";
  downloadLink.click();

  // Revoke the URL to release the object URL resources
  URL.revokeObjectURL(url);
});
