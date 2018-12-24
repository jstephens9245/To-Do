import React, {Component} from 'react';
import {connect} from 'react-redux';
import HomePageContainer from './HomepageContainer';
import {createToDo, deleteToDo, deleteAllToDo} from '../actions/todo';


export class ToDoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterStatus: "all",
      todo_item: ""
    };

    this.submitForm = this.submitForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.filterChange = this.filterChange.bind(this);

  }

  submitForm(e) {
    e.preventDefault();
    this.props.create(this.state.todo_item, this);
  }

  filterChange(filterValue) {
    this.setState({filterStatus: filterValue});
  }

  handleInput(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
            <HomePageContainer
              submitForm={this.submitForm}
              allToDos={this.props.allToDos}
              activeToDos={this.props.activeToDos}
              completedToDos={this.props.completedToDos}
              create={this.props.create}
              removeOne={this.props.removeOne}
              removeAll={this.props.removeAll}
              filterStatus={this.state.filterStatus}
              filterChange={this.filterChange}
              filterChange={this.handleInput}
              delete={this.props.delete} />
    );
  }
}

const mapStateToProps = (state) => ({
  allToDos: state.allToDo,
  activeToDos: state.activeToDo,
  completedToDos: state.completedToDo,
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    create: (toDoItem) => {
      dispatch(createToDo(toDoItem));
    },
    removeOne: function(toDoId) {
      dispatch(deleteToDo(toDoId));
    },
    removeAll: function() {
      dispatch(deleteAllToDo({}));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ToDoContainer);
