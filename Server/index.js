import express from "express";

const app = express();
const port = 3000; //add your port here
const PUBLISHABLE_KEY = "pk_test_51NvNSuLUm24NAOka3aNwYBwxiJG0yZuLUAB1s3o55ghidGv63GvaiCfT7cOgBQLpccgH1VlA0haz8fJvAbwF5YiN00F1eAqUrl";
const SECRET_KEY = "sk_test_51NvNSuLUm24NAOkaokd8CQ8NiX1LnFTufptUYilg64YEMR7HAbP2o8r903sMsawDUtEKwNddOiesoqdlP3Jw4Ak100Z0F4QPyy";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2023-08-16" });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});