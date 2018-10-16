import React, {Component} from 'react';
import TaskForm from './components/TaskForm';
import TaskControl from "./components/TaskControl";
import TaskList from "./components/TaskList";

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditting: null,
      filter: {
        name: '',
        status: -1
      }
    }
  }

  componentWillMount() {
    if(localStorage && localStorage.getItem('tasks')) {
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      })
    }
  }

  // onGenerateData() {
  //   var tasks = [
  //     { id: this.onGenerateID(), name: 'an', status: true },
  //     { id: this.onGenerateID(), name: 'ngu', status: false },
  //     { id: this.onGenerateID(), name: 'choi', status: false },
  //   ];

  //   this.setState({
  //     tasks: tasks
  //   })

  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // };

  s4(){
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  onGenerateID(){
    return  this.s4() + this.s4()+ this.s4()+ this.s4();
  };

  onToggleForm() {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm
    })
  }

  onCloseForm() {
    this.setState({
      isDisplayForm: false
    })
  }

  onSubmit(data){
    var { tasks } = this.state;

    // console.log(data)

    if(data.id === '') {
      data.id = this.onGenerateID();
    
      // push task into tasks
      tasks.push(data);
    } else {
      var indexItemUpdated = tasks.findIndex((task, index) => {
        return task.id === data.id;
      })

      tasks[indexItemUpdated] = data;
    }

    //setter state
    this.setState({
      tasks: tasks,
      taskEditting: null
    })


    // set list task into localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks))
    this.onCloseForm();
  }

  onUpdateStatus(id){
    var { tasks } = this.state;

    // Find task have id 
    var idOfTasks = tasks.filter((task) => task.id === id)
    
    // Set new status
    idOfTasks[0].status = !idOfTasks[0].status;
    this.setState({
      tasks
    })

    // Save localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onRemoveTask(id) {
    var {tasks} = this.state;

    // find index of Item need removed
    var itemRemovedIndex = tasks.findIndex((task, index) => {
      return task.id === id; 
    })

    // Remove Item
    tasks.splice(itemRemovedIndex, 1);
    this.setState({
      tasks
    })

    // Save localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    this.onCloseForm();
  }


  onShowForm() {
    this.setState({
      isDisplayForm: true,
    })
  }

  onUpdate(id) {
    var {tasks} = this.state;

    var ItemUpdated = tasks.find((task) => {
      return task.id === id
    })

    this.setState({
      taskEditting: ItemUpdated
    }) 

    this.onShowForm();
  }

  onFilter(filterName, filterStatus) {
    filterStatus = +filterStatus;

    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    })
  }

  render() {

    let { tasks, isDisplayForm, taskEditting, filter } = this.state;
    if(filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.indexOf(filter.name) !== -1
        })
      }
      tasks = tasks.filter((task) => {
        if(filter.status === -1) {
          return tasks;
        } else {
          return task.status === (filter.status === 1 ? true : false);
        }
      })
    }

    return (
        <div className="container">
          <div className="text-center"><h1>Quản Lý Công Việc</h1>
            <hr/>
          </div>
          <div className="row">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              {(isDisplayForm) ? <TaskForm 
                                    onSubmit={this.onSubmit.bind(this)} 
                                    onCloseForm={this.onCloseForm.bind(this)}
                                    task={taskEditting}/> : '' }
            </div>
            <div className={isDisplayForm? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
              
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={this.onToggleForm.bind(this)}><span className="fa fa-plus mr-5"/>Thêm Công Việc
              </button>

              {/* <button type="button"
                      className="btn btn-success"
                      onClick={ this.onGenerateData.bind(this) } >Generate data</button> */}

              <TaskControl/>

              <TaskList 
                Tasks={ tasks } 
                onUpdateStatus={this.onUpdateStatus.bind(this)}
                onRemoveTask={this.onRemoveTask.bind(this)}
                onUpdate={this.onUpdate.bind(this)}
                onFilter={this.onFilter.bind(this)}
                />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
