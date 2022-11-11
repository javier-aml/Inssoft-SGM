function openNav() {
  document.getElementById("openNavBtn").style.display = "None";   
  document.getElementById("closeNavBtn").style.display = "block";    

  document.getElementById("mySidenav").style.width = "400px";
  document.getElementById("closeNavBtn").style.marginLeft = "400px"; 
  document.getElementById("mainwin").style.paddingLeft = "265px"; 


}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0px";
  document.getElementById("openNavBtn").style.display = "block";
  document.getElementById("closeNavBtn").style.display = "None";    

  document.getElementById("closeNavBtn").style.marginLeft = "6px";
  document.getElementById("mainwin").style.paddingLeft = ".8%"; 
}