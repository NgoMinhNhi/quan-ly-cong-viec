import React, { Component } from 'react';

class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      id : '',
      name : '',
      status : false
    }
  }
  componentWillMount(){
    if(this.props.task){
      this.setState({
        id : this.props.task.id,
        name : this.props.task.name,
        status : this.props.task.status
      })
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.task){
      this.setState({
        id : nextProps.task.id,
        name : nextProps.task.name,
        status : nextProps.task.status
      })
    }else if(!nextProps.task){
      this.setState({
        id : '',
      name : '',
      status : false
      })
    }
  }
  onClose =()=>{
    this.props.onCloseForm();
  }
  onChange=(event)=>{
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if(name==='status'){
      value = target.value==='true'?true:false;
    }
    this.setState({
      [name] : value
    })
  }
  onSubmit=(event)=>{
    event.preventDefault();
    this.props.onSubmit(this.state);
    /*this.onClear();*/
    this.onClose();
  }
  onClear =()=>{
    this.setState({
      name : '',
      status : false
    })
   /* localStorage.clear();*/
  }
  render() {
    var {id}= this.state;
    return (
      
      <div className=" col-sm-4 col-md-4 ">
            <div className="panel panel-warning mt">
              <div className="panel-heading">
                <h3 className="panel-title">{id?'Cập nhật công việc':'Thêm công việc'} <span  className="glyphicon glyphicon-remove-circle text-right pointer" onClick={this.onClose}></span></h3>
              </div>
              <div className="panel-body">
                <label>Tên</label>
                <input 
                  type="text"
                  name='name'
                  onChange={this.onChange}
                  className="form-control"
                  value={this.state.name}
                />
                <label>Trạng thái</label>
                <select className="form-control" 
                        onChange={this.onChange} 
                        name="status" 
                        value={this.state.status}>
                  <option value={true}>Hoạt động</option>
                  <option value={false}>Ẩn</option>
                </select>
                <div className="text-center mt">
                  <button type="submit" className="btn btn-warning mr" onClick={this.onSubmit}><span className="glyphicon glyphicon-save mr"></span>Lưu lại</button>
                  <button type="button" className="btn btn-danger" onClick={this.onClear}><span className="glyphicon glyphicon-remove-circle mr"></span>Hủy bỏ</button>
                </div>
              </div>
            </div>
          </div>
    );
  }
}

export default TaskForm;
