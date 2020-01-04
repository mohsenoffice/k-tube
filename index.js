const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//For external API calls
const request = require('request');
var requestPromise = require('request-promise');

const app = express();


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ktube', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// IMPORT MODELS
  require('./modules/searches');
  require('./modules/users');





const youtubeSearchAPI = "https://www.googleapis.com/youtube/v3/search";
const apiKey = "TPD";
const youtubeStaticParameter = "part=snippet&maxResults=25";


app.use(bodyParser.json());


//IMPORT ROUTES
//require('routes/LoginRouts.js')(app);


const search = mongoose.model('searches');
const users = mongoose.model('users');


app.post(`/api/register`, async (req, res) => {
  console.log("Register start "+ req.body.mail);
  users.create(req.body).then(response => {
    console.log("Register sucess", response);
    return res.status(200).send("OK");
  })
  .catch(error => {
    console.log("Failed to register user %s \n",req.body.mail , error);
    return res.status(409).send(error);
  });

   
 });

 app.post(`/api/login`, async (req, res) => {
  console.log("Login start "+ req.body.mail);
  users.findOne({mail: req.body.mail, password: req.body.password}).then(response => {
    if(response != null){
      console.log("Login sucess", response);
      
      return res.status(200).send("OK");
    }else{
      console.log("Login failed", req.body.mail);
      return res.status(401).send("Not existing");
    }
    
  })
  .catch(error => {
    console.log("Failed to login user %s \n",req.body.mail , error);
    return res.status(500).send(error);
  });

   
 });

app.get('/api/search', (req, res) => {
  console.log("searching for : " + req.query.name);

  search.create({term: req.query.name, user:"mohsen"});

  requestURL = youtubeSearchAPI + '?' + youtubeStaticParameter + '&key=' + apiKey + 
  '&q=' +  req.query.name;

 
  getData(requestURL).then(function (response) {
    formatSearchResponse(response.items);
  
    console.log('Got the following videos: ', response.items);
    //res.send(response.items);
    res.send(formatSearchResponse(response.items));
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

function formatSearchResponse(response){
  var searchResults = [];
  response.forEach(obj => {
    searchResults.push({videoId: obj.id.videoId,
              title: obj.snippet.title,
              description: obj.snippet.description,
              thumbnail: obj.snippet.thumbnails.default.url});
  });
  return searchResults;
}