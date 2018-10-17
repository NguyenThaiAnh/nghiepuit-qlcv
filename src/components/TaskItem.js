import React, {Component} from 'react';
import { connect } from 'react-redux';
import  * as actions from '../actions/index';

class TaskItem extends Component {

  onUpdateStatus() {
    this.props.onUpdateStatus(this.props.task.id);
  }

  onUpdate() {
    this.props.onOpenForm();
    console.log(this.props.task)
    this.props.onEditTask(this.props.task);
  }

  onRemove() {
    this.props.onDeleteTask(this.props.task.id);
    this.props.onCloseForm()
  }

  render() {

    var { task, index } = this.props

    return (
      <tr>
        <td>{ index + 1 }</td>
        <td>{ task.name}</td>
        <td className="text-center">
          <span 
            className={task.status ? 'label label-info': 'label label-warning'}
            onClick={this.onUpdateStatus.bind(this)}>{task.status ? 'kích hoạt' : 'Ẩn'}</span></td>
        <td className="text-center">
          <button type="button" 
            className="btn btn-warning"
            onClick={this.onUpdate.bind(this)}><span className="fa fa-pencil mr-5"/>Sửa</button>
          &nbsp;
          <button type="button" className="btn btn-danger"
          onClick={this.onRemove.bind(this)}><span className="fa fa-trash mr-5"/>Xóa
          </button>
        </td>
    </tr>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispathToProps = (dispath, props) => {
  return {
    onUpdateStatus: (id) => {
      dispath(actions.updateStatus(id));
    },
    onDeleteTask: (id) => {
      dispath(actions.deleteTask(id));
    },
    onCloseForm: () => {
      dispath(actions.closeForm());
    },
    onOpenForm: () => {
      dispath(actions.openForm());
    },
    onEditTask: (task) => {
      dispath(actions.editTask(task));
    }
  }
}

export default connect(mapStateToProps, mapDispathToProps)(TaskItem);
