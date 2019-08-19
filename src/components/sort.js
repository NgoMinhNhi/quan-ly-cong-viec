import React, { Component } from 'react';

class Sort extends Component {
  constructor(props){
    super(props);
    this.state ={
      sort : {
        by : 'name',
        value : 1
      }
    }
  }
  onClick =(sortBy,sortValue)=>{
    this.setState({
      sort : {
        by : sortBy,
        value : sortValue
      }
    })
    this.props.onSort(sortBy,sortValue);
  }
  render() {
    return (
      <div className=" col-sm-6 col-md-6 ">
                    <div className="dropdown mt">
                      <button 
                            className="btn btn-secondary dropdown-toggle" 
                            type="button" 
                            id="dropdownMenu1" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="true"
                            >
                        Sắp xếp <span className="glyphicon glyphicon-menu-down"></span>
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={()=> this.onClick('name',1)}>
                          <a role="button">
                            <span className="glyphicon glyphicon-sort-by-alphabet">Tên A-Z
                              <span className={(this.state.sort.by==='name'&& this.state.sort.value===1)?'glyphicon glyphicon-ok text-right ml-20':''}></span></span>
                          </a>
                        </li>
                        <li onClick={()=> this.onClick('name',-1)}>
                          <a role="button" >
                            <span className="glyphicon glyphicon-sort-by-alphabet-alt">Tên Z-A 
                              <span className={(this.state.sort.by==='name'&& this.state.sort.value===-1)?'glyphicon glyphicon-ok text-right ml-20':''}></span></span>
                          </a>
                        </li>
                        <hr />
                        <li onClick={()=> this.onClick('status',1)}>
                          <a role="button" >
                            <span>Trạng thái Kích hoạt
                              <span className={(this.state.sort.by==='status'&& this.state.sort.value===1)?'glyphicon glyphicon-ok text-right ml-20':''}></span></span>
                          </a>
                        </li>
                        <li onClick={()=> this.onClick('status',-1)}>
                          <a role="button" >
                            <span>Trạng thái Ẩn
                              <span className={(this.state.sort.by==='status'&& this.state.sort.value===-1)?'glyphicon glyphicon-ok text-right ml-20':''}></span></span>
                          </a>
                        </li>
                      </ul>
                      </div>
                    </div>
    );
  }
}

export default Sort;