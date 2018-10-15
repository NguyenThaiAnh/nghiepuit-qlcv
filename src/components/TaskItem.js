import React, {Component} from 'react';

class TaskItem extends Component {

  onUpdateStatus() {
    this.props.onUpdateStatus(this.props.task.id);
  }

  onRemove() {
    this.props.onRemoveTask(this.props.task.id);
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
          <button type="button" className="btn btn-warning"><span className="fa fa-pencil mr-5"/>Sửa
          </button>
          &nbsp;
          <button type="button" className="btn btn-danger"
          onClick={this.onRemove.bind(this)}><span className="fa fa-trash mr-5"/>Xóa
          </button>
        </td>
    </tr>
    );
  }
}

export default TaskItem;
