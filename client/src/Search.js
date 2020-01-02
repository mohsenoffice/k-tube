import React, { useState, useEffect } from "react";

import searchService from './services/SearchService';


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
      let res = await searchService.search(encodeURIComponent(this.state.value));
      console.log(res);
     
    }
    
    getSearch();
    //fetch(`/api/search?name=${encodeURIComponent(this.state.value)}`)
    //  .then(response => response.json())
    //  .then(state => this.setState(state));
   
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.videos}
      </div>
     
    );
  }
}


export default Search;
