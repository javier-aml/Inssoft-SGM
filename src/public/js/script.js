$(document).ready(function () {

  function toggleIcon (i_element) {
      if ( i_element.hasClass ("fa-plus") ) {
          i_element.removeClass ("fa-plus") ;
          i_element.addClass ("fa-minus") ;
      } else {
          i_element.removeClass ("fa-minus") ;
          i_element.addClass ("fa-plus") ;
      }/*** if ( i_element.hasClass ("fa-plus") ) { - Fin ***/
  }/*** function toggleIcon (i_element) { - Fin***/

  setAttributes = (element, attrs) => {
      for ( let [key, value] of Object.entries(attrs))
          element.setAttribute(key, value);
  }

  setIcon = function(){

      let icon = document.createElement('i');
      let btn = document.getElementById('mostrarDep');

      if (btn['classList'][2] == 'showList')
      {
          btn.innerText = ''
          setAttributes(icon, {'class': 'fa fa-minus', 'aria-hidden': 'true'});
          btn.append(icon);
          btn.insertAdjacentText('beforeend', ' Esconder planteles');
          setAttributes(btn, {'class': 'btn btn-primary hideList'})        
      }
      else
      {
          btn.innerText = ''
          setAttributes(icon, {'class': 'fa fa-plus', 'aria-hidden': 'true'});
          btn.append(icon);
          btn.insertAdjacentText('beforeend', ' Mostrar planteles');
          setAttributes(btn, {'class': 'btn btn-primary showList'})        
      }
  }

  $( ".showItem" ).on('click', function() {
      $(this).next().slideToggle('slow');
      });

  $(".mostrarDep").on('click', function() {
      $(this).next().slideToggle('slow');
      toggleIcon ($(this).find ('i'));
      // Creting the icon edit tag
  });
      
});/*** $(document).ready(function () { - Fin ***/