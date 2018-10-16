import React, {Component} from 'react';

class TaskSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    }
  }

  onChange(event) {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    
    this.setState({
      [name]: value
    });
  }

  onSearch() {
    this.props.onSearch(this.state.keyword);
  }

  render() {

    var { keyword } = this.state;

    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="input-group">
          <input type="text" name="keyword" className="form-control" value={keyword} onChange={this.onChange.bind(this)} placeholder="Nhập từ khóa..."/>
          <span className="input-group-btn">
            <button className="btn btn-primary" type="button"
                    onClick={this.onSearch.bind(this)}><span className="fa fa-search mr-5"></span>Tìm</button>
          </span>
        </div>
    </div>
    );
  }
}

export default TaskSearch;
