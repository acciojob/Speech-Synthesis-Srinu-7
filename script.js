// Your script here.
const msg = new SpeechSynthesisUtterance(); // Initialize the speech synthesis utterance object
let voices = []; // Array to hold available voices
const voicesDropdown = document.querySelector('#voices'); // Voice selection dropdown
const options = document.querySelectorAll('[type="range"], [name="text"]'); // Rate, pitch, and text input elements
const speakButton = document.querySelector('#speak'); // Speak button
const stopButton = document.querySelector('#stop'); // Stop button

// Function to populate the voices dropdown
function populateVoices() {
  voices = this.getVoices(); // Get the available voices
  voicesDropdown.innerHTML = voices
    .filter(voice => voice.lang.includes('en')) // Filter to show only English voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Function to set the selected voice
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle(); // Restart the speech synthesis to apply the new voice
}

// Function to start the speech synthesis
function toggle(startOver = true) {
  speechSynthesis.cancel(); // Stop any ongoing speech
  if (startOver) {
    speechSynthesis.speak(msg); // Start speaking the message
  }
}

// Function to set the options (rate, pitch, and text)
function setOption() {
  msg[this.name] = this.value;
  toggle(); // Restart the speech synthesis to apply the changes
}

// Event listeners
speechSynthesis.addEventListener('voiceschanged', populateVoices); // Populate voices when they are loaded
voicesDropdown.addEventListener('change', setVoice); // Change the voice when a new voice is selected
options.forEach(option => option.addEventListener('change', setOption)); // Set the rate, pitch, or text when changed
speakButton.addEventListener('click', toggle); // Start speaking when the speak button is clicked
stopButton.addEventListener('click', () => toggle(false)); // Stop speaking when the stop button is clicked
