//Button 
const enableWebcamButton = document.getElementById('webcamButton');

// webcam을 지원하는지 확인하는 함수 
function getUserMediaSupported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}
  
//지원하면 
if (getUserMediaSupported()) {
    enableWebcamButton.addEventListener('click');   //click 시, enableCam 함수 실행
} else {    //지원 안 하는 경우, 에러메세지 출력 
    console.warn('getUserMedia() is not supported by your browser');
}
  
//function enableCam(event) {
    
//if (!model) {
//return;
// }
  
  // 클릭 시, 버튼 숨기기 
  event.target.classList.add('removed');  

//window.constraints : 변수를 브라우저 콘솔에서 사용할 수 있도록
const constraints = window.constraints = {
    audio: false,
    video: true
};  //constraints <- video 

//video 불러오는 함수 
 function handleSuccess(stream) {
   const video = document.querySelector('video'); 
   const videoTracks = stream.getVideoTracks();
   window.stream = stream; // make variable available to browser console
   video.srcObject = stream;
}

//error 출력 함수 
function handleError(error) {
  if (error.name === 'ConstraintNotSatisfiedError') {
    let v = constraints.video;
    errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
  } else if (error.name === 'PermissionDeniedError') {
    errorMsg('Permissions have not been granted to use your camera and ' +
      'microphone, you need to allow the page access to your devices in ' +
      'order for the demo to work.');
  }
  errorMsg('getUserMedia error: ${error.name}', error);
}

function errorMsg(msg, error) {
    const errorElement = document.querySelector('#errorMsg');
    errorElement.innerHTML += '<p>${msg}</p>';
    if (typeof error !== 'undefined') {
      console.error(error);
    }
}

navigator.mediaDevices
    .getUserMedia(constraints) //getusermedia 
    .then(handleSuccess)       //video가 있으면 
    .catch(handleError);       //video가 없으면 
