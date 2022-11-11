var h = 0;
var m = 0;
var s = 0;
console.log();
if ($("#workingP").attr("name") != "") {
    
    init($("#workingP").attr("name"));
    console.log($("#workingP").attr("name"));
    cronometrar();
}
$("#btnTaskStart").on('click',function(){
    const form = $("#formP").serialize();
    $.post("/utiles/start/task",form, function( data ) {

        $("#workingP").empty();
        $("#workingP").append(`                <div style="width:600px;height:200px;border:2px solid #000;">
           <label for="camH" class="form-label text-center"><h2>Util: </h2> <h2 id="utilName">${data[0].Nombre}</h2></label> 
            <div class="cronometro">
                <div><h2>Tiempo transcurrido:</h2><h1 id="hms"> </h1></div>
            </div>
    </div>`);
        init();
        cronometrar();

     
    })
});
$("#btnTaskStop").on('click',function(){
    const form = $("#formP").serialize();
    $.post("/utiles/stop/task",form, function( data ) {

        $("#workingP").empty();
        h=0;m=0;s=0;
        $("#btnTaskStart").prop("disabled",false);
        $("#btnTaskStop").prop("disabled",true);
        clearInterval(id);
    })
});

function init(horas){
    $("#btnTaskStart").prop("disabled",true);
    $("#btnTaskStop").prop("disabled",false);
    if (horas != undefined) {
        const horasCronometro = horas.split("-");
        h=horasCronometro[0];
        m=horasCronometro[1];
        s=horasCronometro[2];
        document.getElementById("hms").innerHTML=`${h}:${m}:${s}`;
    }else{
         h = 0;
         m = 0;
         s = 0;
        document.getElementById("hms").innerHTML="00:00:00";
    }
}         
function cronometrar(){
    escribir();
    id = setInterval(escribir,1000);
  
    // document.querySelector(".start").removeEventListener("click",cronometrar);
}
function escribir(){
    var hAux, mAux, sAux;
    s++;
    if (s>59){m++;s=0;}
    if (m>59){h++;m=0;}
    // if (h>24){h=0;}

    if (s<10){sAux="0"+s;}else{sAux=s;}
    if (m<10){mAux="0"+m;}else{mAux=m;}
    if (h<10){hAux="0"+h;}else{hAux=h;}

    document.getElementById("hms").innerHTML = hAux + ":" + mAux + ":" + sAux; 
}