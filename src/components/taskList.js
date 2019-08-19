import React, { Component } from 'react';
import ListItem from './listItem'

class TaskList extends Component {
  constructor(props){
    super(props);
    this.state = {
      filterName : '',
      filterStatus : -1
    }
  }
  onUpdateStatus=(id)=>{
    this.props.onUpdateStatus(id);
  }
  onDelete=(id)=>{
    this.props.onDelete(id);
  }
  onUpdate=(id)=>{
    this.props.onUpdate(id);
  }
  onChange=(event)=>{
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.props.onFilter(name==='filterName'?value:this.state.filterName,name==='filterStatus'?value:this.state.filterStatus);
    this.setState({
      [name]: value
    })
  }
  render() {
        var { tasks } = this.props;
        var {filterName, filterStatus} = this.state;
        var elemTasks = tasks.map((task, index)=>{
          return <ListItem key={task.id} 
                          index={index} 
                          task={task} 
                          onUpdateStatus={this.props.onUpdateStatus}
                          onDelete={this.props.onDelete}
                          onUpdate={this.onUpdate}
                           />
        });
    return (
      <table className="table table-bordered table-hover mt">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Trạng thái</th>
                    <th>Hoạt động</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td><input type="text" 
                                name="filterName" 
                                className="form-control"
                                value={filterName}
                                onChange={this.onChange} /></td>
                    <td>
                      <select className="form-control"
                              name="filterStatus"
                              value={filterStatus}
                              onChange={this.onChange}
                              >
                        <option value={-1}>Tất cả</option>
                        <option value={1}>Kích hoạt</option>
                        <option value={0}>Ẩn</option>
                      </select>
                    </td>
                    <td></td>
                  </tr>
                  {elemTasks}
                </tbody>
              </table>
    );
  }
}

export default TaskList;