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
app.post("/webhook", (req, res) => {
  console.log("\n========== WEBHOOK RECEIVED ==========");

  console.log("\nHeaders:");
  console.log(JSON.stringify(req.headers, null, 2));

  console.log("\nComplete Body:");
  console.log(JSON.stringify(req.body, null, 2));

  console.log("\n======================================\n");

  res.status(200).json({
    success: true,
    message: "Webhook received",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
