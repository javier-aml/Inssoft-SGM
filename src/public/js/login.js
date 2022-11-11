$(document).ready(function () {
  // ---- Singin ----

  const signIn = document.querySelector('#login-form');
  var form = $('#login-form');


    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

  // signIn.addEventListener('submit', (e) => {
  //   e.preventDefault();


  //   var userData;
  //   // auth
  //   //   .signInWithEmailAndPassword(email, password)
  //   //   .then(userCredential => {
  //   //     const uid = userCredential.user.uid;
  //   //     $("#modalLoginForm").hide();
  //   //     $('body').removeClass('modal-open');
  //   //     $('.modal-backdrop').remove();
  //   //    var link = form.attr('action');
  //       // $.post(link, {uid:uid}, function (result) {
          
  //       //   switch (result.Rol) {
  //       //     case "Admin":
  //       //       window.location.replace("/Admin");
  //       //       break;
  //       //     case "Ekide":
  //       //       window.location.replace(`/Ekide/${result.Uid}`);

  //       //       break;
  //       //     case "Cliente":
  //       //       window.location.replace("/cliente");

  //       //       break;
  //       //       case "almacen":
  //       //         window.location.replace(`/almacen/${result.Uid}`);
  
  //       //         break;
  //       //         case "produccion":
  //       //           window.location.replace(`/produccion/${result.Uid}`);
    
  //       //           break;
  //       //           case "utiles":
  //       //             window.location.replace(`/utiles/${result.Uid}`);
      
  //       //             break;

  //       //     default:
  //       //       window.location.replace(`/proveedor/${result.Uid}`);
  //       //       break;
  //       //   }
  //       // });

  //       // fs.collection("Users").where("Uid", "==", uid)
  //       //   .get()
  //       //   .then(function (querySnapshot) {
  //       //     var userData;

  //       //     querySnapshot.forEach(function (doc) {
  //       //       // // doc.data() is never undefined for query doc snapshots

  //       //       userData = doc.data();

  //       //     });

  //       //     var data = form.serializeArray();

  //       //     data.push({
  //       //       name: 'Nombre',
  //       //       value: userData.Nombre
  //       //     });
  //       //     data.push({
  //       //       name: 'Rol',
  //       //       value: userData.Rol
  //       //     });
  //       //     data.push({
  //       //       name: 'Uid',
  //       //       value: uid
  //       //     });
  //       //     data.push({
  //       //       name: 'TC',
  //       //       value: userData.TC
  //       //     });

           
  //           //close modal

  //           //clear form
  //           // signIn.reset();


  //         // })
  //         // .catch(function (error) {

  //         //   alert("Error getting documents: ", error);
  //         // });

  //     })
  //     .catch((error) => {
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       alert("error code: " + errorCode + ", Error mensaje: " + errorMessage);
  //       // ...
  //     });

  // });
});