$(document).ready(function() {
	const Nombre = $(".username").html()

	$.post(`/almacen/calendar/simple`, function( data ) {
		let eventos = [];
		index = 0;
		for (const key in data) {
			const split = data[key].date.split("T")
			const fecha2 = acomodarFecha(split[0]);
			const fecha = dateFormat(fecha2);
			const event = {
				id: index, //Event's ID (required)
				 name: `${data[key].name}`, //Event name (required)
				date: fecha, //Event date (required)
				 description: data[key].description, //Event description (optional)
				type: "event",
				color: "#63d867"// Event custom color (optional)
	
			}
			index++;
			eventos.push(event)
		}
		$('#calendar').evoCalendar({
			theme: "Royal Navy",
			language: "es",
			sidebarDisplayDefault: false,
			eventDisplayDefault: false,
			sidebarToggler: true,
			eventListToggler: false,
			calendarEvents: eventos
		 })
	});



			})	

			function dateFormat(fecha) {
				const separar = fecha.split("-")
				let fechaformat = ""
				switch (separar[1]) {
					case "01":
						
					fechaformat = `January/${separar[0]}/${separar[2]}`	
					break;
						case "02":
						
						fechaformat = `February/${separar[0]}/${separar[2]}`	
						break;
							case "03":
						
							fechaformat = `March/${separar[0]}/${separar[2]}`	
							break;
								case "04":
						
								fechaformat = `April/${separar[0]}/${separar[2]}`	
								break;
									case "05":
						
									fechaformat = `May/${separar[0]}/${separar[2]}`	
									break;
										case "06":
						
										fechaformat = `June/${separar[0]}/${separar[2]}`	
										break;
											case "07":
						
											fechaformat = `July/${separar[0]}/${separar[2]}`	
											break;
												case "08":
						
												fechaformat = `August/${separar[0]}/${separar[2]}`	
												break;
													case "09":
						
													fechaformat = `September/${separar[0]}/${separar[2]}`	
													break;
														case "10":
						
														fechaformat = `October/${separar[0]}/${separar[2]}`	
														break;
															case "11":
						
															fechaformat = `November/${separar[0]}/${separar[2]}`	
															break;
				
					default:
						fechaformat = `November/${separar[0]}/${separar[2]}`	
						break;
				}
				return fechaformat
			}
			function acomodarFecha(date) {
				const split = date.split("-");
				const fecha = `${split[2]}-${split[1]}-${split[0]}`;
				return fecha;
			  }
