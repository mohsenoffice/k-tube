import React, { useState, useEffect } from "react";

import searchService from '../services/SearchService';


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', videos: ''};


    //this.apiResults = {any: "Hello asd!"};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);

    
    event.preventDefault();
    
    

    const getSearch = async () => {
      let res = await searchService.search(encodeURIComponent(this.state.value)).then(res => {
        this.setState({videos: res});
        console.log(res);
      });
     
    }
    
    getSearch();
    //fetch(`/api/search?name=${encodeURIComponent(this.state.value)}`)
    //  .then(response => response.json())
    //  .then(state => this.setState(state));
   
  }

  render() {
    const searchResults = this.state.videos;


    
      
          const videoItems = searchResults.map((video) => {
              return (
                <div>{video.title}</div>
                  // <VideoListItem
                  //     onVideoSelect={props.onVideoSelect}
                  //     key={video.etag}
                  //     video={video}
                  // />
              
              );
          });

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {JSON.stringify(this.state.videos)}

        <ul>-------xxxxxxxxx-------------
          {
            {videoItems}
          }
        </ul>
        <p>
          <iframe width="560" height="315" title="video"
            src="https://www.youtube.com/embed/YdProncdPXc" 
            frameBorder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </p>

      </div>

      


     
    );
  }
}


export default Search;
