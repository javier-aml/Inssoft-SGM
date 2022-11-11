// ---Signup----
const signup = document.querySelector('#registro-form');
// var userData;
const formSignup = $('#registro-form');
signup.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.querySelector("#registro-email").value;
  const password = document.querySelector("#registro-pass").value;
  const name = document.querySelector("#registro-pass").value;

  var Rol;
  if ($('#Cliente').is(':checked')) {
    Rol = "Cliente";
  } else {
    Rol = "Proveedor";
  }
  const link = formSignup.attr('action');
  var data = formSignup.serializeArray();


  //  //contraseña prueba (B0astful1232)
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {

      const uid = userCredential.user.uid;
      data.push({
        name: 'Uid',
        value: uid
      });
      $.post(link, data);
      signup.reset();
      switch (Rol) {
        case "Cliente":
          window.location.replace("./cliente");

          break;

        default:
          window.location.replace("./proveedor");
          break;
      }


    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("error code: " + errorCode + ", Error mensaje: " + errorMessage);

    });
})