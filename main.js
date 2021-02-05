var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start(){
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}
recognition.onresult = function(event){
    console.log(event);
    var content = event.results[0][0].transcript;
    console.log(content);
    document.getElementById("textbox").innerHTML = content;
    if (content == "take my selfie"){
        console.log("Taking Selfie...");
        speak();
    }
}
function speak() {
    var synth = window.speechSynthesis;
    speak_data = "Taking Selfie In 5 Seconds";
    var utter = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter);
    Webcam.attach(camera);
    setTimeout(function(){
        take_snap();
        save();
    },5000);
}
Webcam.set({
    width:360,
    height:250,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

function take_snap() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='selfie' src='" + data_uri + "' >";
    });
}

function save(){
    link = document.getElementById("link");
    image = document.getElementById("selfie").src;
    link.href = image;
    link.click();
}