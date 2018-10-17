import React, {Component} from 'react';
import TaskForm from './components/TaskForm';
import TaskControl from "./components/TaskControl";
import TaskList from "./components/TaskList";
import { connect } from 'react-redux';
import  * as actions from './actions/index';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // tasks: [],
      // isDisplayForm: false,
      taskEditting: null,
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      // Default sort by name and increase
      sort: {
        by: 'name',
        value: 1
      }
    }
  }


  onToggleForm() {
    this.props.onToggleForm();
  }

  onCloseForm() {
    this.setState({
      isDisplayForm: false
    })
  }



  // onUpdateStatus(id){
  //   var { tasks } = this.state;

  //   // Find task have id 
  //   var idOfTasks = tasks.filter((task) => task.id === id)
    
  //   // Set new status
  //   idOfTasks[0].status = !idOfTasks[0].status;
  //   this.setState({
  //     tasks
  //   })

  //   // Save localStorage
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }

  // onRemoveTask(id) {
  //   var {tasks} = this.state;

  //   // find index of Item need removed
  //   var itemRemovedIndex = tasks.findIndex((task, index) => {
  //     return task.id === id; 
  //   })

  //   // Remove Item
  //   tasks.splice(itemRemovedIndex, 1);
  //   this.setState({
  //     tasks
  //   })

  //   // Save localStorage
  //   localStorage.setItem('tasks', JSON.stringify(tasks));

  //   this.onCloseForm();
  // }


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

  onSearch(keyword) {
    this.setState({
      keyword: keyword
    });
  }

  onSort(sortName, sortValue) {
    this.setState({
      sort: {
        by: sortName,
        value: sortValue
      }
    });
  }

  render() {

    let { taskEditting, filter } = this.state;
    var { isDisplayForm } = this.props;
    if(filter) {
      // if (filter.name) {
      //   tasks = tasks.filter((task) => {
      //     return task.name.indexOf(filter.name) !== -1
      //   })
      // }
      // tasks = tasks.filter((task) => {
      //   if(filter.status === -1) {
      //     return tasks;
      //   } else {
      //     return task.status === (filter.status === 1 ? true : false);
      //   }
      // })
    }

    // if(keyword) {
    //   tasks = tasks.filter((task) => {
    //     return task.name.indexOf(keyword) !== -1
    //   });
    // }

    

    // if(sort.by === 'name'){
    //   tasks.sort((a, b) => {
    //     if(a.name > b.name) return sort.value;
    //     else if (a.name < b.name) return -sort.value;
    //     else return 0;
    //   })
    // } else {
    //   tasks.sort((a, b) => {
    //     if(a.status > b.status) return -sort.value;
    //     else if (a.status < b.status) return sort.value;
    //     else return 0;
    //   })
    // }

    return (
        <div className="container">
          <div className="text-center"><h1>Quản Lý Công Việc</h1>
            <hr/>
          </div>
          <div className="row">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              {(isDisplayForm) ? <TaskForm /> : '' }
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

              <TaskControl 
                onSearch={this.onSearch.bind(this)}
                onSort={this.onSort.bind(this)}
                />

              {/* <TaskList 
                Tasks={ tasks } 
                onUpdateStatus={this.onUpdateStatus.bind(this)}
                onRemoveTask={this.onRemoveTask.bind(this)}
                onUpdate={this.onUpdate.bind(this)}
                onFilter={this.onFilter.bind(this)}
                /> */}

                <TaskList 
                  onFilter={this.onFilter.bind(this)}
                />
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isDisplayForm: state.isDisplayForm
  }
}

const mapDispathToProps = (dispath, props) => {
  return {
    onToggleForm: () => {
      dispath(actions.toggleForm())
    }
  }
}

export default connect(mapStateToProps, mapDispathToProps)(App);
