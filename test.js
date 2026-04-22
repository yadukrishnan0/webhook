const express = require("express");

const app = express();
const PORT = 4000;

// Middleware to parse JSON
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Test GET route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// POST route (webhook)
app.use("/webhook", (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  res.status(200).json({
    success: true,
    message: "Webhook received",
    data: req.body,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});