const express = require('express');
//const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//For external API calls
const request = require('request');
var requestPromise = require('request-promise');

const app = express();

//mongoose.Promise = global.Promise;
//mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/node-react-starter`);

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mohsen:0546730875@cluster0-dnruc.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


const youtubeSearchAPI = "https://www.googleapis.com/youtube/v3/search";
const apiKey = "AIzaSyCdNOKY0SvCQqd0if9EXFtHU5Lz_TOc_9s";
const youtubeStaticParameter = "part=snippet&maxResults=2";


app.use(bodyParser.json());


//IMPORT ROUTES
//require('routes/LoginRouts.js')(app);



app.post(`/api/login`, async (req, res) => {
  // let products = await Product.find();
  console.log("login start"+ req.body);
   return res.status(200).send("OK");
 });

app.get('/api/search', (req, res) => {
  console.log("searching for : " + req.query.name);

  requestURL = youtubeSearchAPI + '?' + youtubeStaticParameter + '&key=' + apiKey + 
  '&q=' +  req.query.name;

  getData(requestURL).then(function (response) {
    console.log('Got the following videos: ', response.items);
    res.send(response.items);
  })
});


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});





function getData(searchURL) {
  return requestPromise(searchURL)
    .then(function(response) {
      return JSON.parse(response);
    });
}