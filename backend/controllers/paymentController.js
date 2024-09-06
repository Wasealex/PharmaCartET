import expressAsyncHandler from "express-async-handler";
import axios from "axios";

const addPaymentMethod = expressAsyncHandler(async (req, res) => {
  if (req.method === "POST") {
    const { amount, currency, email, firstName, lastName, txRef } = req.body;
    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        amount,
        currency,
        email,
        first_name: firstName,
        last_name: lastName,
        tx_ref: txRef,
        redirect_url: "http://localhost:5000/success",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json(response.data);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
export { addPaymentMethod };
