// Create a Stripe client.
var stripe = Stripe('pk_test_..');

// Create an instance of Elements.
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
var style = {
  base: {
    color: '#32325d',
    lineHeight: '18px',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

// Create an instance of the card Element.
var card = elements.create('card', {style: style});


// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');

// Handle real-time validation errors from the card Element.
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});


// Handle form submission.
var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Creates a name property based on user input and tokenizes it
    var card_name = document.getElementById('name').value;
    
    stripe.createToken(card, { name: card_name}).then(function(result) {
        if (result.error) {
        // Inform the user if there was an error.
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
        } else {
      
        // Send the token to your server.

            var data = JSON.stringify({
                "token": result.token.id,
                "email": document.getElementById('email').value
            });

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                // Clears the form and renders a server response
                    document.getElementById('payment-form').reset();
                    card.clear();
                    document.getElementById('server-response').innerHTML = this.responseText;
            
            
                // Styles the response, success=blue, error=red
                if (this.responseText.indexOf('Success') === 0) {
                    document.getElementById('server-response').style.color = '#238bb9';
                } else {
                    document.getElementById('server-response').style.color = '#fa755a';
                }
                }
                });

            xhr.open("POST", "YOUR_GCF_URL");
            xhr.setRequestHeader("Content-Type", "application/json");


            xhr.send(data);
        }
    })

  })