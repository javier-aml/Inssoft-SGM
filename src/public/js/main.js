const signOut = document.querySelector('#sign-out');
signOut.addEventListener("click", (e) => {
  firebase.auth().signOut().then(() => {
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
})


function onChangeStatus() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
       uid = user.uid;
      fs.collection("Users").where("Uid", "==", uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          userData = doc.data();
          // console.log(user.Rol);

        });
      })
      .catch(function (error) {
        if(querySnapshot){
        }
        console.log("Error getting documents: ", error);
      });
      // ...
    } else {
    }
  });

}
// function getUser(uid) {
//   console.log("UID: ",uid);
//   fs.collection("Users").where("Uid", "==", uid)
//   .get()
//   .then(function (querySnapshot) {
//     querySnapshot.forEach(function (doc) {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, " => ", doc.data());
//       userData = doc.data();
//       console.log("aqui toy");
//       return userData.Rol;
//       // console.log(user.Rol);

//     });
//   })
//   .catch(function (error) {
//     if(querySnapshot){
//       console.log("a");
//     }
//     console.log("Error getting documents: ", error);
//   });
// }