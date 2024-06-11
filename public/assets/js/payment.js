document.addEventListener("DOMContentLoaded", function() {
    var stripe = Stripe('pk_test_51PQ9KtRvMqDOnCzLrsb5IoasWC5tEFpiktGBPu9bi1PFcLRLnKIqSyVaXoOW8Y651QuTgopF5CzEo0uTlYknpX8500hCIZY99y'); // Replace with your public key
    var elements = stripe.elements();
    var cardElement = elements.create('card');
    cardElement.mount('#card-element');

    var paymentForm = document.getElementById('payment-form');
    var paymentFormContainer = document.getElementById('payment-form-container');
    var planNameElement = document.getElementById('plan-name');
    var paymentMessage = document.getElementById('payment-message');
    var planPrice = 0;

    window.openPaymentForm = function(planName, price) {
        planNameElement.textContent = planName + " - $" + (price / 100);
        planPrice = price;
        paymentFormContainer.style.display = 'block';
    }

    paymentForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const { paymentMethod, error } = await stripe.createPaymentMethod('card', cardElement);

        if (error) {
            paymentMessage.textContent = error.message;
        } else {
            // Send paymentMethod.id to your server
            fetch('/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount: planPrice })
            }).then(response => response.json()).then(data => {
                if (data.error) {
                    paymentMessage.textContent = data.error;
                } else {
                    paymentMessage.textContent = 'Payment successful!';
                }
            });
        }
    });
});
paymentForm.addEventListener('submit', async function(event) {
    // Your code here
});
paymentForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission
    console.log('Submit button clicked'); // Debugging message
    // Your code here
});
document.addEventListener("DOMContentLoaded", function() {
    // Credit Card Payment Form
    var stripe = Stripe('your-public-key');
    var elements = stripe.elements();
    var cardElement = elements.create('card');
    cardElement.mount('#card-element');

    // M-PESA Payment Form
    var mpesaForm = document.getElementById('mpesa-form');
    var mpesaPlanNameElement = document.getElementById('mpesa-plan-name');
    var mpesaPaymentMessage = document.getElementById('mpesa-payment-message');

    window.openMpesaPaymentForm = function(planName) {
        mpesaPlanNameElement.textContent = planName;
        document.getElementById('mpesa-form-container').style.display = 'block';
    }

    mpesaForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var phoneNumber = document.getElementById('phone-number').value;

        // Handle M-PESA payment submission
        // Example: You would make an AJAX request to your server to process the M-PESA payment
        // Here, you can use fetch API or XMLHttpRequest to send the payment details to your server
        // and handle the payment processing there.
        // Example:
        fetch('/process-mpesa-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber: phoneNumber })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                mpesaPaymentMessage.textContent = 'Payment successful!';
            } else {
                mpesaPaymentMessage.textContent = 'Payment failed. Please try again later.';
            }
        })
        .catch(error => {
            console.error('Error processing M-PESA payment:', error);
            mpesaPaymentMessage.textContent = 'An error occurred. Please try again later.';
        });
    });
});
