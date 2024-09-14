import expressAsyncHandler from "express-async-handler";
import axios from "axios";

const addPaymentMethod = expressAsyncHandler(async (req, res) => {
  if (req.method === "POST") {
    const { amount, currency, email, firstName, lastName, phoneNumber, txRef } =
      req.body;

    const payload = {
      amount: amount, // Ensure amount is a string
      currency,
      email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      tx_ref: txRef,
    };

    console.log("Payload to Chapa:", JSON.stringify(payload, null, 2)); // Log formatted JSON

    try {
      const response = await axios.post(
        "https://api.chapa.co/v1/transaction/initialize",
        payload,
        {
          headers: {
            Authorization: `Bearer ${process.env.CHAPA_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        res.status(200).json(response.data);
      } else {
        res.status(400).json({ message: response.data.message });
      }
    } catch (error) {
      console.error(
        "Chapa API error:",
        error.response ? error.response.data : error.message
      );
      res.status(500).json({
        message: error.response ? error.response.data.message : error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});

export { addPaymentMethod };
