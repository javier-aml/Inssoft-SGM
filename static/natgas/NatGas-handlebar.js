/* eslint-disable */
//esta funcion hace que se conecte con el HTML 
function fill_template () {
    var data = {
    
//aqui va lo que se ve en el handlebar, todo lo que se ponga aqui, es lo que aparecerá en el machote
        html:`
        <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Machote</title>

</head><table class="table  table-sm" style="background-color: rgb(32, 32, 91);">
        <thead>
             <tr>
            <td><img src="Natgaslogo.png" class="img-fluid"></td>
        </thead>
        <tbody class="table-group-divider" style="color: aliceblue;">
           <tr class="table-bordered">
            <td class="col-2" style="color: aliceblue;">TITULO:</td>
            <td><input type="text" name="Titulo" class="form-control-plaintext" placeholder="Titulo" style="color: aliceblue;"></td>
            <td>FECHA EFECTIVA:</td>
            <td><input type="date" name="fEfectiva" class="form-control-plaintext" style="color: aliceblue;"></td>
            </tr>
           <tr class="table-bordered">
            <td style="color: aliceblue;">CODIGO:</td>
            <td><input type="text" Id="CLAVE" class="form-control-plaintext" placeholder="Codigo" style="color: aliceblue;" readonly="True"></td>
            <td class="col-2" >SUBSTITUYE A VERSION:</td>
            <td><input type="text" name="SUBSTITUYE" class="form-control-plaintext" placeholder="Version anterior" style="color: aliceblue;"></td>
           </tr>
           <tr>
            <td style="color: aliceblue;">VERSION:</td>
            <td><input type="text" name="Version" class="form-control-plaintext" placeholder="Version" style="color: aliceblue;"></td>

           </tr>
    </table>

        </div>
<!--<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>-->
<!--<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>-->
<!--<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>-->`
    };
//aqui termina todo lo que se coloca en el handlebar

    // esto hace que funcione la parte en donde dice la clave del formato/procedimiento, también aqui se coloca el nombre del documento, pero hasta cuando funcione o sepa como se hace
var template = Handlebars.compile(document.querySelector("#template").innerHTML);

    // aqui se termina

    //aqui es como funciona el handlebar, hace que en donde está el tag "#output" se llene del contenido del javascipt
 var filled = template(data);
document.querySelector("#output").innerHTML = filled
}

//aqui termina el como funciona el handlebar

//Scrip para linkear las id de las opciones con un dato en el array
function clavecambio(select)

{
    console.log(select);
  var combo = select;
  var opcion = combo.value;
  const tr = select.parentElement.parentElement.parentElement
 
  tr.querySelector('#CLAVE').value = opciones[opcion][0]

}
    //fin del handlebar