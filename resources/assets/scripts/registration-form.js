

// Create a Stripe client.
var key = document.getElementById("stripe_pk")

var stripe = Stripe(key.value);

// Create an instance of Elements.
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
var style = {
  base: {
    color: "#32325d",
    lineHeight: "18px",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4"
    }
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a"
  }
};

// Create an instance of the card Element.
var card = elements.create("card", { style: style });

// Add an instance of the card Element into the `card-element` <div>.
card.mount("#card-element");

// Handle real-time validation errors from the card Element.
card.addEventListener("change", function(event) {
  var displayError = document.getElementById("card-errors");
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = "";
  }
});




var yearlyButton = document.getElementById("payment-method-paypal");
var form = document.getElementById("payment-form")
yearlyButton.addEventListener("click", function() {
  form.action = "/subscribe/yearly"
  form.method = "post"
});

var monthlyButton = document.getElementById("payment-method-card");

monthlyButton.addEventListener("click", function() {
  form.action = "/subscribe/monthly"
});

// Create a token or display an error when the form is submitted.
var form = document.getElementById('payment-form');
var button1 = document.getElementById('createToken')


button1.onclick = function() {
  var promo = document.getElementById('promoCode')
  console.log(promo.value)
  if(promo.value === 'renew2018') {
    document.getElementById('submit').click()
  } else {
    stripe.createToken(card).then(function(result) {
      $('input[name=stripeToken]').val(result.token.id)
      document.getElementById('submit').click()
    })    
  }


}
