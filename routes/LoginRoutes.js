const mongoose = require('mongoose');


module.exports = (app) => {

  app.get(`/api/logins`, async (req, res) => {
   // let products = await Product.find();
   console.log("login start");
    return res.status(200).send("OK");
  });

  

}