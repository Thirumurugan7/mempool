const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  console.log("Received webhook:", req.body);
  console.log("event", req.body.event); // Log the webhook payload to the console
  res.status(200).send("OK");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
