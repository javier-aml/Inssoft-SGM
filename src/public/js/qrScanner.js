const qrcoder = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");
const btnScanQR2 = document.getElementById("btn-scan-qr-stop");

let scanning = false;

qrcode.callback = res => {
  if (res) {
    outputData.innerText = res;
    scanning = false;

    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });

    qrResult.hidden = true;
    canvasElement.hidden = true;
    btnScanQR.hidden = false;
    btnScanQR2.hidden = true;
    

    $('#myModal').modal('show');
    $('#modalBody').empty();
    if (res.indexOf("cPedido") != -1) {
      $.post("./proveedor/QR",{res}, function( data ) {
        if (data) {
          $('#modalBody').append(`se escaneo correctamente`);
        }else{
          if (data.cPedido) {
            $('#modalBody').append(`se escaneo correctamente`);
          }else{
            $('#modalBody').append(`Error al escanear o escane codigo valido`);
  
          }
  
        }
      });      
    } else {
      $('#modalBody').append(`Error al escanear o escane codigo valido`);
    }

 }
};

btnScanQR.onclick = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      scanning = true;
      qrResult.hidden = true;
      btnScanQR.hidden = true;
      btnScanQR2.hidden = false;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};
btnScanQR2.onclick = () => {
  video.srcObject.getTracks().forEach(track => {
    track.stop();
  });
  btnScanQR2.hidden = true;
  // qrResult.hidden = false;
  canvasElement.hidden = true;
  btnScanQR.hidden = false;
    
};
$("#QrButton").on("click",function(){

  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      scanning = true;
      qrResult.hidden = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      btnScanQR2.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
});

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}
