const express = require("express");

const app = express();
const PORT = 3000;

// Parse JSON request body
app.use(express.json());

// POST API
app.post("/api/test", (req, res) => {
  console.log("Request Body:", req.body);

  res.json({
    success: true,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
