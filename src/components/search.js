import React, { Component } from 'react';


class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      keyword : ''
    }
  }
  onChange=(event)=>{
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    })
  }
  onSearch=()=>{
    this.props.onSearch(this.state.keyword);
  }
  render() {
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 ">
                <div className="input-group mt">
                  <input className="form-control" 
                          placeholder="Nhập vào ...."
                          name='keyword'
                          value={this.state.keyword}
                          onChange={this.onChange}
                           />
                  <span className="input-group-btn">
                    <button type="button" 
                            className="btn btn-primary"
                            onClick={this.onSearch}
                            ><span className="glyphicon glyphicon-search"></span>Tìm kiếm</button>
                  </span>
                </div>
              </div>
    );
  }
}

export default Search;