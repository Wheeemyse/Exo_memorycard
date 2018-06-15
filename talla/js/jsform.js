function validationForm() {
    var x = document.forms["formcard"]["nom"].value;
    var y = document.forms["formcard"]["prenom"].value;
    if (x == "" && y =="") {
        alert("Veuillez indiquer votre et votre prénom");
        return false;
      }
    else if (x == "") {
      alert("Veuillez indiquer votre nom")
      return false;
      }
    else if (y =="") {
      alert("Veuillez indiquer votre prénom")
      return false;
    }
    else {
      console.log("autres");
    }
}
