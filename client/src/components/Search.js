import React, { useState, useEffect } from "react";

import searchService from '../services/SearchService';
import watchedVideosService from '../services/WatchedVideosService';

import VideosList from './VideosList';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user:'me@me.me', value: '', videos: [], selectedVideo:'raY1UEm_-3I', selectedVideoTitle:'Kimaia מעיין ברוך'};


    //this.apiResults = {any: "Hello asd!"};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});

  }

  
 

  handleSubmit(event) {
    event.preventDefault();
    const getSearch = async () => {
      let res = await searchService.search(this.state.user, encodeURIComponent(this.state.value)).then(res => {
        this.setState({videos: res});
        console.log(res);
      });
    }
    
    getSearch();
    //fetch(`/api/search?name=${encodeURIComponent(this.state.value)}`)
    //  .then(response => response.json())
    //  .then(state => this.setState(state));
   
  }

  sendSelectedVideo(user, videoId, videoTitle){
    console.log(videoId +"-----"+ videoTitle);
    let res =  watchedVideosService.watched(user, videoId, videoTitle);
  }

  render() {
    const searchResults = this.state.videos;


    let videoSrc = "https://www.youtube.com/embed/" + this.state.selectedVideo + "?autoplay=1";
      
         

    return (
      <div>
        <div className="search-box">
          <form onSubmit={this.handleSubmit}>
            <label>
              <input className="search-bar" type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input className="submit-button" type="submit" value="Search" />
          </form>
        </div>

        <div className="video-list">
            <VideosList
                    onVideoSelect={selectedVideo => this.setState({ 
                      selectedVideo: selectedVideo.videoId, selectedVideoTitle: selectedVideo.title })}
                    videos={searchResults} 
                    sendSelectedVideo={this.sendSelectedVideo}
                    
                    />
        </div>

        <div className="video-player">
          <iframe width="560" height="315" title="video" autoPlay="1"
            src={videoSrc}
            frameBorder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            autoPlay
            allowFullScreen>
          </iframe>
          <div>
            Currently playing: {this.state.selectedVideoTitle}
          </div>
        </div>

      </div>

      


     
    );
  }
}


export default Search;
