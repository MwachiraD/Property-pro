const express = require('express');
const stripe = require('stripe')('sk_test_51PQ9KtRvMqDOnCzL26Cg1e3MXLDGJvKKITa00QGXmDdBR4dTMvQPCI2UBJYNKtXWcoaOhmhjcjEX6H3VizwIk5gY001vRSlMO3'); // Replace with your secret key
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the "public" directory

//show home page
app.get('/', async (req, res) => {
    res.render('index');
})

app.post('/create-payment-intent', async (req, res) => {
    const { paymentMethodId, amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true
        });

        res.send({ success: true });
    } catch (e) {
        res.send({ error: e.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
