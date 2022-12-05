var index = 0;
console.log($("#progressBar"));
$("#progressBar").hide()
var myTimeout;

$("#ControlMensual").on('click',function(){
    const myTimeout = setTimeout(start, 1000);
})
function start() {
    console.log($("#progressBar"));
    $("#progressBar").show()
    progress()
}
function progress() {
    
    if(index * 11.25 < 91){
        ChangeProgress(index)
        console.log(index * 11.25 < 91);
            setTimeout(arguments.callee, 60000);
    
        }else{
            // $("#progressBar").hide()
            clearTimeout(myTimeout);
        }
        index++
}
function ChangeProgress(indexProgres) {
    $("#Barra").attr('style',`width: ${indexProgres * 11.25}%;`)
    $("#Barra").attr('aria-valuenow',`${indexProgres * 11.25}`)
    $("#Barra").html(`${indexProgres * 11.25}%`)
}