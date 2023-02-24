function fill_template () {
    var data = {
    

        html:`   <script id="entry-template" type="text/x-handlebars-template">
        <div class="entry">
          <h1>{{prueba}}</h1>
          <div class="body">
            {{body}}
          </div>
        </div>
      </script>

<div class="continer">
<table class="table table-bordered table-sm align-middle" style="text-align:center;">
    <thead>
    </thead>
    <tbody>
        <tr>
        <td rowspan="5" class="col-2"><img src="Togoimg.jpg" class="img-fluid"></td>
            <td rowspan="3"><h1>FLETES TOGO S.A. DE C.V.</h1></td>
            <td style="background-color: lightgray;">
                <label for="permiso">PERMISO:</label>
            </td>
            <td style="background-color: lightgray;">
                <input type="text" class="form-control input-lg" name="permiso" placeholder="G/XXXX/EXP/ES/FE/XXXX">
            </td>						
        </tr>
        <tr>
        <td style="background-color: lightgray;">
            <label for="permiso">CLAVE:</label>
        </td>
        <td style="background-color:lightgray;"><input type="text" class="form-control" id="CLAVE"></td>
    </tr>
        <tr>
            <td>FECHA DE EMISIÓN:</td>
            <td><input type="date" name="fEmision" class="form-control-plaintext"></td>
        </tr>
        <tr>
            <td rowspan="2"><h3><input type="text" class="form-control-plaintext" name="NombreEstacion" placeholder="Nombre de la Estación"></h3>
            </td>						
            <td>REVISIÓN: 0</td>
            <td><input type="date" name="fRevision" class="form-control-plaintext"></td>
        </tr>
        <td>PRÓXIMA REVISIÓN:</td>
        <td><input type="date" name="fProxRevision" class="form-control-plaintext"></td>
        <tr style="text-align: center;">
            <td colspan="4"><b>Sistema de Gestión de Medición</b></td>
        </tr>
        <tr style="font-weight:bold; text-align: center; background-color: lightgray;">
        <b> <td colspan="4"><input type="text" id="TITULO" class="form-control-plaintext" placeholder="Titulo" style="text-align:center";"></td> </b>
        </tr>
    </tbody>
</table>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>
    <table class="table table-bordered">`
    };

var template = Handlebars.compile(document.querySelector("#template").innerHTML);

var filled = template(data);
document.querySelector("#output").innerHTML = filled
}