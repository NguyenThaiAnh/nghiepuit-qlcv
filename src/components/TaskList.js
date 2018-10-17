import React, {Component} from 'react';
import TaskItem from './TaskItem'
import { connect } from 'react-redux'; // ket noi len store


class TaskList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filterName : '',
      filterStatus : -1 // all: -1, active: 1, deactive: 0
    }
  }


  onChange(event) {
    var target = event.target;
    var name = target.name;
    var value = target.value;

    this.props.onFilter( name === 'filterName' ? value : this.state.filterName, name === 'filterStatus' ? value: this.state.filterStatus);

    this.setState({
      [name]: value
    })
  }

  render() {

    var {Tasks} = this.props;

    var { filterName, filterStatus } = this.state;

    var elTask = Tasks.map((task, idx) => {
      return  <TaskItem 
                task={task} key={task.id} 
                index={idx} />;
    });

    return (
        <div className="row mt-15">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <table className="table table-bordered table-hover">
              <thead>
              <tr>
                <th className="text-center">STT</th>
                <th className="text-center">Tên</th>
                <th className="text-center">Trạng Thái</th>
                <th className="text-center">Hành Động</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td></td>
                <td>
                  <input type="text" 
                    className="form-control" 
                    name="filterName"
                    // value={filterName}
                    onChange={this.onChange.bind(this)}/>
                </td>
                <td>
                  <select className="form-control" name="filterStatus" onChange={this.onChange.bind(this)}>
                    <option value={-1}>Tất Cả</option>
                    <option value={0}>Ẩn</option>
                    <option value={1}>Kích Hoạt</option>
                  </select>
                </td>
                <td></td>
              </tr>
              
              {elTask}     

              </tbody>
            </table>
          </div>
        </div>
    );
  }
}

// Trong redux nó sẽ hỗ trợ chyeen các state của thằng store thành các props của component
const mapStateToProps = (state) => {
   return { 
    Tasks : state.tasks
   }
}
export default  connect(mapStateToProps, null)(TaskList);
   