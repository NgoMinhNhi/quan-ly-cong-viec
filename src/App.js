import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/taskForm';
import Control from './components/control'
import TaskList from './components/taskList'
import {findIndex, filter} from 'lodash'
import demo from './trainning/demo'
 // http://bit.ly/2AkVAgu 
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks : [], // id name status
      isDisplayForm : false,
      taskEditing : null,
      filter :{
        name :'',
        status: -1
      },
      keyword : '',
      sort : {
        by : 'name',
        value : 1
      }
    }
  } 
  componentWillMount(){
   if(localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks : tasks
      })
    }
  }

  onDisplayForm =()=>{
    if(this.state.isDisplayForm&&this.state.taskEditing!== null){
        this.setState({
          isDisplayForm: true,
           taskEditing : null
        })
    }else{
      this.setState({
      isDisplayForm: !this.state.isDisplayForm,
      taskEditing : null
    })
    }
    
  }
  s4(){
    return Math.floor((1 + Math.random())* 0x10000).toString(16).substring(1);
  }
  generrateID(){
    return this.s4()+ this.s4() + '-' + this.s4()+'-'+ this.s4()+'-'+ this.s4()+'-'+ this.s4()+'-'+ this.s4();
  }
  onCloseForm=()=>{
    this.setState({
      isDisplayForm: false
    })
  }
  onShowForm=()=>{
    this.setState({
      isDisplayForm: true
    })
  }
  onSubmit=(data)=>{
    var {tasks} = this.state;
    if(data.id===''){
      data.id = this.generrateID();
    tasks.push(data);
    }else{
      var index = this.findIndex(data.id);
      tasks[index]= data;
    }
    this.setState({
      tasks : tasks,
      taskEditing : null
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  onUpdateStatus=(id)=>{
    var {tasks}= this.state;
    var index = findIndex(tasks, (task)=>{
      return task.id === id;
    })
    if(index !== -1){
      tasks[index].status = !tasks[index].status;
    }
    this.setState({
      tasks : tasks
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))

  }
  onDelete=(id)=>{
    var {tasks}= this.state;
    var index= this.findIndex(id);
    if(index!== -1){
      tasks.splice(index,1);
    }
    this.setState({
      tasks :tasks
    })
    localStorage.setItem('tasks',JSON.stringify(tasks));
    this.onCloseForm();
  }
  findIndex(id){
    var {tasks}= this.state;
    var result = -1;
    tasks.forEach((task,index)=>{
        if(task.id === id){
          result = index;
        }
    });
    return result;
  }
  onUpdate=(id)=>{
    this.onShowForm();
    var {tasks, taskEditing } =this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing : taskEditing
    })
  }
  onFilter=(filterName, filterStatus)=>{
    filterStatus = parseInt(filterStatus);

      this.setState({
        filter : {
          name : filterName.toLowerCase(),
          status : filterStatus
        }
      });
  }
  onSearch=(keyword)=>{
    console.log(keyword);
    this.setState({
      keyword : keyword
    })
  }
  onSort= (sortBy,sortValue)=>{
    this.setState({
      sort : {
        by : sortBy,
        value: sortValue
      }
    })
  }
  render() {
    var { tasks, 
          isDisplayForm,
          taskEditing,
          filter,
          keyword,
          sort }= this.state // var tasks = this.state.tasks
    if(filter){
      if(filter.name){



        /*tasks = tasks.filter((task)=>{
          return task.name.toLowerCase().indexOf(filter.name)!==-1;
        })*/
        tasks = filter(tasks, (task)=>{
          return task.name.toLowerCase().indexOf(filter.name)!==-1;
        })


      };
      tasks = tasks.filter((task)=>{
          if(filter.status===-1){
          return task;
        }else {
          return task.status === (filter.status === 1 ? true : false);
        }
        });
    }
    if(keyword){
      tasks = tasks.filter((task)=>{
          return task.name.toLowerCase().indexOf(keyword)!==-1;
        })
    }
    var displayForm = isDisplayForm?<TaskForm 
                    onCloseForm={ this.onCloseForm }
                    onSubmit={this.onSubmit}
                    task={taskEditing}
                    />:''
    if(sort.by==='name'){
      tasks.sort((a,b)=>{
        if(a.name>b.name) return sort.value;
        else if(a.name<b.name){
          return -sort.value;
        }else return 0;
      })
    }else{
      tasks.sort((a,b)=>{
        if(a.status>b.status) return -sort.value;
        else if(a.status<b.status){
          return sort.value;
        }else return 0;
      })
    }
    return (
      
      <div className="container">
        <header>Quản Lý Công Việc</header>
        <hr />
        <div className="row">
          {displayForm}
          <div className={isDisplayForm?"col-sm-8 col-md-8 mt":"col-sm-12 col-md-12 mt"}>
            <div>
              <button type="button" className="btn btn-primary" onClick={this.onDisplayForm}><span className="glyphicon glyphicon-plus"></span>Thêm công việc</button>
            </div>
              <Control onSearch={this.onSearch}
                        onSort={this.onSort}
              />
              <TaskList tasks={ tasks } 
                        onUpdateStatus={this.onUpdateStatus} 
                        onDelete={this.onDelete} 
                        onUpdate={this.onUpdate} 
                        onFilter={this.onFilter}
                        />
              </div>
          </div>
        </div>
    );
  }
}

export default App;
