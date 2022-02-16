import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    temp: ''
  };

  onSearch = (e) => {
    const temp = e.target.value;
    this.setState({temp});
    this.props.onSearch(temp);
  };

  render () {
    return (
      <input type="text"
                className="form-control search-input"
                placeholder="type to search" 
                value={this.state.temp}
                onChange={this.onSearch}/>
    );
  }
};