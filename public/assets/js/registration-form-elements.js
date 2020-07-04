
var nextStep1 = document.getElementById("next-step1");


var terms = document.getElementById("terms");


terms.addEventListener("click", function() {
  if (this.checked) {
    nextStep1.value = "Continue";
    nextStep1.classList.remove("disabled");
    nextStep1.classList.add("next-button");
    this.disabled = true;
  } else {
    nextStep1.value = "Please accept our terms below before continuing";
    nextStep1.disabled = true;
  }
});
