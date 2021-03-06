const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//For external API calls
const moment = require('moment');
const request = require('request');
var requestPromise = require('request-promise');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://mohsen123:Mohsen123@cluster0-dnruc.mongodb.net/kimaia?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// IMPORT MODELS
  require('./modules/searches');
  require('./modules/users');
  require('./modules/activities')

const youtubeSearchAPI = "https://www.googleapis.com/youtube/v3/search";
const apiKey = "xxxxxxxxxx";
const youtubeStaticParameter = "part=snippet&type=video&maxResults=25";


const youtubeVideoDetailsAPI = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&key="+apiKey;

app.use(bodyParser.json());

const search = mongoose.model('searches');
const users = mongoose.model('users');
const activities = mongoose.model('activities')


app.post(`/api/register`, async (req, res) => {
  users.create(req.body).then(response => {
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
      var responseMessage = response.isAdmin == true ? "OK-Admin" : "OK"
      return res.status(200).send(responseMessage);
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
    //Keep this in case we cant to save searches as a raw data for stats!
    //search.create({term: req.query.name, user:req.query.user});
    activities.findOneAndUpdate({user: req.query.user}, 
          {$addToSet:{searches: req.query.name}}, 
          {upsert: true}, function (err, result) {
              if(err){
                console.log(err);
              }
            });

    requestURL = youtubeSearchAPI + '?' + youtubeStaticParameter + '&key=' + apiKey + 
    '&q=' +  req.query.name;

    getData(requestURL).then(function (response) {
      formatSearchResponse(response.items);
      //console.log(response);
      res.send(formatSearchResponse(response.items));
    })
  });

  app.get('/api/watched', (req, res) => {
    apiUrl = youtubeVideoDetailsAPI +"&id=" + req.query.videoId;
    getData(apiUrl).then(function (response) {
      var durationInSeconds = moment.duration(response.items[0].contentDetails.duration, moment.ISO_8601).asSeconds();

      activities.findOneAndUpdate({user: req.query.user}, 
        {$addToSet:{watched: {videoId: req.query.videoId, title: req.query.videoTitle}}, $inc:{duration: durationInSeconds}},

        {upsert: true}, function (err, result) {
            if(err){
              console.log(err);
            }
          });
    });
    return res.status(200).send("OK");
  });


  app.get('/api/activities', (req, res) => {
    console.log("Getting all avtivities by admin");
    
    activities.find({},(err,data)=>{
      if(err){
        console.log("error: "+ err);
      }else{
        res.send(data);
      }
    });
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
      //Return only videos (not platylists, channels, etc...)
      if(obj.id.kind === "youtube#video"){
        searchResults.push({videoId: obj.id.videoId,
                  title: obj.snippet.title,
                  description: obj.snippet.description,
                  thumbnail: obj.snippet.thumbnails.default.url});
        }
    });
  return searchResults;
  }
