const express = require("express");
const app = express();
const client = require("twilio")(
  YOUR_ACCOUNT_SID,
  YOUR_AUTH_TOKEN
);

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Server is running :D",
  });
});

app.get("/sendcode", (req, res) => {
    client.verify
    .services(YOUR_SERVICE_ID) // Change service ID
      .verifications.create({
        to: `+${req.query.phonenumber}`,
        channel: req.query.channel === "call" ? "call" : "sms",
      })
      .then((data) => {
        res.status(200).send({
          message: "Verification is sent!!",
          phonenumber: req.query.phonenumber,
          data,
        });
      });
 
});
app.get("/verify", (req, res) => {
  client.verify
    .services(YOUR_SERVICE_ID) // Change service ID
    .verificationChecks.create({
      to: `+${req.query.phonenumber}`,
      code: req.query.code,
    })
    .then((data) => {
      if (data.status === "approved") {
        res.status(200).send({
          message: "User is Verified!!",
          data,
        });
      } else {
        res.status(400).send({
          message: "User is not Verified!!",
          data,
        });
      }
    });
});

app.listen(5000, () => {
  console.log(`Server is running at port 5000`);
});
