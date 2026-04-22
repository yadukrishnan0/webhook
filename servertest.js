// const axios = require("axios");
// const crypto = require("crypto");

// const SECRET = "8710d23d311b9b0f718555c759aa310ca5d5cad20fab9760a8e9457cc0d160fa";

// const sendRequest = async () => {
//   const payload = { name: "test" };

//   const timestamp = Date.now().toString();

//   // ✅ MUST match server
//   const payloadString = JSON.stringify(payload);

//   const signature = crypto
//     .createHmac("sha256", SECRET)
//     .update(payloadString)
//     .update(timestamp)
//     .digest("hex");

//   console.log("Payload:", payloadString);
//   console.log("Timestamp:", timestamp);
//   console.log("Signature:", signature);

//   try {
//     const response = await axios.post(
//       "https://inbox.telinfy.com/api/user/webhook",
//       payload,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "x-signature": signature,
//           "x-timestamp": timestamp,
//         },
//       }
//     );

//     console.log("✅ Response:", response.data);
//   } catch (error) {
//     console.error("❌ Error:", error.response?.data || error.message);
//   }
// };

// sendRequest();


const crypto = require("crypto");

// If using Node < 18, install node-fetch:
// const fetch = require("node-fetch");

const SECRET = "8710d23d311b9b0f718555c759aa310ca5d5cad20fab9760a8e9457cc0d160fa";

const sendRequest = async () => {
  const payload = {
  agent: {
    name: 'proadsyadu',
    role: 'manager',
    agent_id: '13987809',
    parent_public_id: '1a012d1b-37fb-11f1-8a53-50ebf6511b22'
  },
  action: 'updated'
};

  const timestamp = Date.now().toString();

  // ✅ MUST match server
  const payloadString = JSON.stringify(payload);

  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(payloadString)
    .update(timestamp)
    .digest("hex");

  console.log("Payload:", payloadString);
  console.log("Timestamp:", timestamp);
  console.log("Signature:", signature);

  try {
    const response = await fetch("http://localhost:3000/api/user/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-signature": signature,
        "x-timestamp": timestamp,
      },
      body: payloadString, // ⚠️ send string, not object
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    console.log("✅ Response:", data);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
};

sendRequest();