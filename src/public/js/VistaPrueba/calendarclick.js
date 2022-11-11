$('#fullCalendar').on('click','.showView',function(){
    console.log($(this).find('.event-title').html())
    window.location.replace('http://localhost:3000/VistaPrueba/tabla' + `/${$(this).find('.event-title').html()}`);
})
