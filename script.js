function gotStream(stream) {
    
    var video = document.querySelector('video');
    var videoTracks = stream.getVideoTracks();
    window.stream = stream; // make variable available to browser console
    video.srcObject = stream;
} //video 반환 함수 

function onfail(error) {
    console.log("permission not granted or system don't have media devices."+error.name);
} //error 출력 함수 

navigator.getUserMedia({video:true}, gotStream,onfail);