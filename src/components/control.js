import React, { Component } from 'react';
import Search from './search'
import Sort from './sort'
class Control extends Component {
	onSearch=(keyword)=>{
		this.props.onSearch(keyword);
	}
  render() {
    return (
      <div className="row">
        <Search onSearch={this.onSearch} />
        <Sort onSort={ this.props.onSort}/>
      </div>
    );
  }
}

export default Control;