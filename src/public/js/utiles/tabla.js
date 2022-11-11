$("#selectUtil").on("change",function () {
    console.log();
    $.post("/utiles/change/table",{id:$(this).val()}, function( data ) {
        if (data.length !=0) {
            //Horas
            $("#horaED").html(data[0].disenoH)
            $("#horaEC").html(data[0].cncH)
            $("#horaEM").html(data[0].camH)
            $("#horaEME").html(data[0].cmmH)
            $("#horaEA").html(data[0].maH)
            //
            $("#costoED").html(data[0].disenoUSD)
            $("#costoEC").html(data[0].cncUSD)
            $("#costoEM").html(data[0].camUSD)
            $("#costoEME").html(data[0].cmmUSD)
            $("#costoEA").html(data[0].maUSD)
            for (const key in data) {
                switch (data[key].task) {
                    case "diseno":
                        const horaD = data[key].hora;
                        const costoD = horaD*parseInt($("#diseno").html())
                        console.log(costoD);
                        $("#horaRD").html(horaD)
                        $("#costoRD").html(costoD)
                        break;
                    case "cnc":
                        const horaC = data[key].hora;
                        const costoC = horaC*parseInt($("#mecaSimple").html())
                        $("#horaRC").html(horaC)
                        $("#costoRC").html(costoC)

                        break;
                    case "montaje":
                        const horaM = data[key].hora;
                        const costoM = horaM*parseInt($("#ajuste").html())
                        $("#horaRM").html(horaM)
                        $("#costoRM").html(costoM)

                        break;
                    case "medicion":
                        const horaME= data[key].hora;
                        const costoME = horaME*parseInt($("#PaP").html())
                        $("#horaRME").html(horaME)
                        $("#costoRME").html(costoME)

                        break;
                    case "ajuste":
                        const horaA = data[key].hora;
                        const costoA = horaA*parseInt($("#ajuste").html())
                        $("#horaRA").html(horaA)
                        $("#costoRA").html(costoA)
                        break;

                
                    default:
                        break;
                }
            }
        }else{
            $("#horaED").html(0)
            $("#horaEC").html(0)
            $("#horaEM").html(0)
            $("#horaEME").html(0)
            $("#horaEA").html(0)
            //
            $("#costoED").html(0)
            $("#costoEC").html(0)
            $("#costoEM").html(0)
            $("#costoEME").html(0)
            $("#costoEA").html(0)

            $("#horaRD").html(0)
            $("#costoRD").html(0)

            $("#horaRC").html(0)
            $("#costoRC").html(0)

            $("#horaRM").html(0)
            $("#costoRM").html(0)

            $("#horaRME").html(0)
            $("#costoRME").html(0)

            $("#horaRA").html(0)
            $("#costoRA").html(0)
        }

        console.log(data);
    })
})