const crypto = require("crypto");
const axios = require("axios");
var sha256 = require("sha256");
const { salt_key, merchant_id, salt_index } = require("./secret");

const newPayment = async (req, res) => {
  try {
    let normalPayLoad = {
      merchantId: merchant_id,
      merchantTransactionId: req.body.transactionId,
      merchantUserId: req.body.MUID,
      amount: +req.body.amount * 100,
      redirectUrl: `http://localhost:5000/api/v1/phonepe/status/${req.body.transactionId}`,
      redirectMode: "POST",
      callbackUrl: `http://localhost:5000/api/v1/phonepe/status/${req.body.transactionId}`,
      mobileNumber: req.body.number,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    let saltKey = salt_key;
    let saltIndex = salt_index;
    let bufferObj = Buffer.from(JSON.stringify(normalPayLoad), "utf8");
    let base64String = bufferObj.toString("base64");
    let string = base64String + "/pg/v1/pay" + saltKey;
    let sha256_val = sha256(string);
    let checksum = sha256_val + "###" + saltIndex;

    axios
      .post(
        "https://api.phonepe.com/apis/hermes/pg/v1/pay",
        { request: base64String },
        {
          headers: {
            "Content-Type": "application/json",
            "X-VERIFY": checksum,
            accept: "application/json",
          },
        }
      )
      .then(function (response) {
        res.json(response.data.data.instrumentResponse.redirectInfo);
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

const checkStatus = async (req, res) => {
    
  const id = req.params.txnId;
  const keyIndex = salt_index;
  const string = `/pg/v1/status/${merchant_id}/${id}` + salt_key;
  const sha256 = crypto.createHash("sha256").update(string).digest("hex");
  const checksum = sha256 + "###" + keyIndex;

  axios
    .get(
      `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchant_id}/${id}`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
          "X-MERCHANT-ID": `${merchant_id}`,
        },
      }
    )
    .then(async (response) => {
      console.log(response.data);
      if (response.data.success === true) {
        const url = `http://localhost:5173/success`;
        return res.redirect(url);
      } else {
        const url = `http://localhost:5173/failure`;
        return res.redirect(url);
      }
    })
    .catch((error) => {
      console.error(error.message);
    });
};

module.exports = {
  newPayment,
  checkStatus,
};
