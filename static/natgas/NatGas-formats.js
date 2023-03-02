/* eslint-disable */
var opciones = {
  //solución, Repetibilidad, EMP ,etc.
  "0": ["","","","",""],
  "1": ["1mm", "*", "*","± 0.5%","0.2%"],
  "2": ["1 mm","*","*","± 4mm","1.5 mm"],
  "3": ["0.1 °C","0.05°C","*","± 0.5°C","0.2%"],
  "4": ["0.5 kg/m3","*","*","± 3kg/m3","1 kg/m3"],
  "5": ["*","*","*","*","0.5%"],
  "6": ["10 mL","*","*","*","0.025%"],
  "7": ["1°C","*","*","*","*"],
  "8": ["0.01 s","*","*","*","*"],
  "9": ["1 mm","*","*","±1.5mm(Nueva)±2mm(enUso)","*"],
  "10": ["0.1 L","0.05%","±0.25%","± 0.3%","0.1%"],
  "11": ["0.05°C","*","*","± 0.18°C","0.05°C"],
  "12": ["5kPa","*","*","± 30kPa","± 10 kPa"],
  "13": ["*","*","*","*","0.25%"],
  "14": ["*","*","*","*","± 0,2 % Calibración ±0,5 % En servicio"],
  "15": ["*","*","*","2 mm para 1/1 000 del volumen contenido.","*"],
}
//Scrip para linkear las id de las opciones con un dato en el array
function cambioOpciones(select){
  var combo = select;
  var opcion = combo.value;
  const tr = select.parentElement.parentElement.parentElement
  tr.querySelector('#Resolución').value = opciones[opcion][0];
  tr.querySelector('#Repetibilidad').value = opciones[opcion][1];
  tr.querySelector('#Linealidad').value = opciones[opcion][2];
  tr.querySelector('#EMP').value = opciones[opcion][3];
  tr.querySelector('#Intervalo_de_Media').value = opciones[opcion][4];
}

let agregarFila = null
if(!agregarFila)
    agregarFila = () => {
        document.getElementById('TablaEquipo').insertRow(-1).innerHTML = `<tr>
                        <td><form>
    
                            <select class="form-control-plaintext" id='opciones' onchange='cambioOpciones(this);'>
                            
                                    <option value='0'>Seleccione una Opcion</option>
                                    <option value='1'>Tabla de Calibración de Tanques</option>
                                    <option value='2'>Sensor de Nivel Automático</option>
                                    <option value='3'>Sensores de Temperatura</option>
                                    <option value='4'>Medidor de Densidad Para Cálculo CTL o CPL</option>
                                    <option value='5'>Volumen a Condiciones Base (Tanques verticales)</option>
                                    <option value='6'>Medida Voluméntica</option>
                                    <option value='7'>Termómetro</option>
                                    <option value='8'>Cronómetro</option>
                                    <option value='9'>Cinta Petrolera</option>
                                    <option value='10'>Medidor de Caudal</option>
                                    <option value='11'>Medidor de Temperatura</option>
                                    <option value='12'>Medidor de Presión p/MPa&gt;0.25MPa</option>
                                    <option value='13'>Volumen a Condiciones Base (Caudal)</option>
                                    <option value='14'>Tanque</option>
                                    <option value='15'>Nice</option>
                            
                                </select></td>
                                <!-- input donde se mostrara el id de la opción -->
                        <td><input type='text' class="form-control-plaintext" placeholder="Resolución" id='Resolución' readonly="true" /></td>
                        <td><input type='text' class="form-control-plaintext" placeholder="Repetibilidad" id='Repetibilidad'readonly="true"  /></td>
                        <td><input type='text' class="form-control-plaintext" placeholder="Linealidad" id='Linealidad'readonly="true"  /></td>
                        <td><input type='text' class="form-control-plaintext" placeholder="EMP" id='EMP'readonly="true"  /></td>
                        <td><input type='text' class="form-control-plaintext" placeholder="Intervalo_de_Media" id='Intervalo_de_Media'readonly="true"  /></td>
                    
                    </form> </tr>`
    }
  let eliminarFila = null
  if(!eliminarFila)
    eliminarFila = () => {
        const table = document.getElementById('TablaEquipo')
        const rowCount = table.rows.length
        
        if (rowCount <= 2)
        alert('No se pueden eliminar todas las filas')
        else
        table.deleteRow(rowCount -1)
    }

  //document.querySelector('#CLAVE').value=document.querySelector('title').innerHTML
  let renderInlineEditor = null
  if(!renderInlineEditor)
    renderInlineEditor = () => {
        const EDITOR_CONFIG = {
            toolbar: {
                items: [ 'Undo', 'Redo', 'Bold', 'Italic', 'NumberedList', 'BulletedList', 'InsertTable']
            }
        }
        if(document.querySelector( '#textObjetivo' ))
        InlineEditor
        .create( document.querySelector( '#textObjetivo' ), EDITOR_CONFIG)
        .catch( error => {
            console.error( error );
        });
        if(document.querySelector( '#textAlcance' ))    
        InlineEditor
        .create( document.querySelector( '#textAlcance' ), EDITOR_CONFIG)
        .catch( error => {
            console.error( error );
        });

        if(document.querySelector( '#textAplicacion' ))    
        InlineEditor
        .create( document.querySelector( '#textAplicacion' ), EDITOR_CONFIG)
        .catch( error => {
            console.error( error );
        });

        if(document.querySelector( '#textDefiniciones' ))    
        InlineEditor
        .create( document.querySelector( '#textDefiniciones' ), EDITOR_CONFIG)
        .catch( error => {
            console.error( error );
        });

        if(document.querySelector( '#textDesarrollo' ))
        InlineEditor
        .create( document.querySelector( '#textDesarrollo' ), EDITOR_CONFIG)
        .catch( error => {
            console.error( error );
        });

        if(document.querySelector( '#textAnexos' ))
        InlineEditor
        .create( document.querySelector( '#textAnexos' ), EDITOR_CONFIG)
        .catch( error => {
            console.error( error );
        });

        if(document.querySelector( '#textCambios' ))
        InlineEditor
        .create( document.querySelector( '#textCambios' ), EDITOR_CONFIG)
        .catch( error => {
            console.log( error );
        }); 
    }

  let data1 = []
  let data2 = []
  let data3 = []
  let ctx = null;
  let DATA_COUNT = 7;
  let NUMBER_CFG = {
      count: DATA_COUNT,
      min: -100,
      max: 100
  };
  // console.log(Utils);
  // const labels = Utils.months({count: 7});
  
  let data = {
      labels: [
          '',
          '',
          '',
          '',
          ''
      ],
      datasets: [{
              label: 'Error de medida (%)',
              data: data1,
              fill: false,
              borderColor: 'rgb(51, 153, 102)',
              tension: 0.1
          },
          {
              label: 'LSC (%)',
              data: data2,
              fill: false,
              borderColor: 'rgb(0, 0, 128)',
              tension: 0.1
          },
          {
              label: 'LIC (%)',
              data: data3,
              fill: false,
              borderColor: 'rgb(128, 0, 0)',
              tension: 0.1
          }
      ]
  };

  let config = {
      type: 'line',
      data: data,
      options: {
          responsive: true,
          plugins: {
              legend: {
                  position: 'top',
              },
              title: {
                  display: true,
                  text: 'Periodo 2023'
              }
          }
      },
  };

  let myChart

  let renderChart = () => {
    ctx = document.getElementById('myChart');
    if(ctx) myChart = new Chart(ctx, config);
  }

  function firstData() {
      const dataForm = document.querySelectorAll('.data1')
      data1 = []
      dataForm.forEach(element => {
          data1.push(element.value)
      });
      data = {
          labels: [
              '',
              '',
              '',
              '',
              ''
          ],
          datasets: [{
                  label: 'Error de medida (%)',
                  data: data1,
                  fill: false,
                  borderColor: 'rgb(51, 153, 102)',
                  tension: 0.1
              },
              {
                  label: 'LSC (%)',
                  data: data2,
                  fill: false,
                  borderColor: 'rgb(0, 0, 128)',
                  tension: 0.1
              },
              {
                  label: 'LIC (%)',
                  data: data3,
                  fill: false,
                  borderColor: 'rgb(128, 0, 0)',
                  tension: 0.1
              }
          ]
      };
      config = {
      type: 'line',
      data: data,
      options: {
          responsive: true,
          plugins: {
              legend: {
                  position: 'top',
              },
              title: {
                  display: true,
                  text: 'Periodo 2023'
              }
          }
      },
  };
      myChart.destroy()
      myChart = new Chart(ctx, config);
  }

  function secondData() {
      const dataForm = document.querySelectorAll('.data2')
      data2 = []
      dataForm.forEach(element => {
          data2.push(element.value)
      });
              data = {
          labels: [
              '',
              '',
              '',
              '',
              ''
          ],
          datasets: [{
                  label: 'Error de medida (%)',
                  data: data1,
                  fill: false,
                  borderColor: 'rgb(51, 153, 102)',
                  tension: 0.1
              },
              {
                  label: 'LSC (%)',
                  data: data2,
                  fill: false,
                  borderColor: 'rgb(0, 0, 128)',
                  tension: 0.1
              },
              {
                  label: 'LIC (%)',
                  data: data3,
                  fill: false,
                  borderColor: 'rgb(128, 0, 0)',
                  tension: 0.1
              }
          ]
      };
      config = {
      type: 'line',
      data: data,
      options: {
          responsive: true,
          plugins: {
              legend: {
                  position: 'top',
              },
              title: {
                  display: true,
                  text: 'Periodo 2023'
              }
          }
      },
  };
      myChart.destroy()
      myChart = new Chart(ctx, config);
  }

  function thirdData() {
      const dataForm = document.querySelectorAll('.data3')
      data3 = []
      dataForm.forEach(element => {
          data3.push(element.value)
      });
              data = {
          labels: [
              '',
              '',
              '',
              '',
              ''
          ],
          datasets: [{
                  label: 'Error de medida (%)',
                  data: data1,
                  fill: false,
                  borderColor: 'rgb(51, 153, 102)',
                  tension: 0.1
              },
              {
                  label: 'LSC (%)',
                  data: data2,
                  fill: false,
                  borderColor: 'rgb(0, 0, 128)',
                  tension: 0.1
              },
              {
                  label: 'LIC (%)',
                  data: data3,
                  fill: false,
                  borderColor: 'rgb(128, 0, 0)',
                  tension: 0.1
              }
          ]
      };
      config = {
      type: 'line',
      data: data,
      options: {
          responsive: true,
          plugins: {
              legend: {
                  position: 'top',
              },
              title: {
                  display: true,
                  text: 'Periodo 2023'
              }
          }
      },
  };
      myChart.destroy()
      myChart = new Chart(ctx, config);
  }
  // new Chart(ctx, {
  //   type: 'bar',
  //   data: {
  //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //     datasets: [{
  //       label: '# of Votes',
  //       data: [12, 19, 3, 5, 2, 3],
  //       borderWidth: 1
  //     }]
  //   },
  //   options: {
  //     scales: {
  //       y: {
  //         beginAtZero: true
  //       }
  //     }
  //   }
  // });