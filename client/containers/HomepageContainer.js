import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {createToDo, deleteToDo, deleteAllToDo, getAllToDos} from '../actions/todo';


const mapStateToProps = (state) => {
  return {
    allToDoIDs: state.todo.allToDoIDs,
    activeToDo: state.todo.activeToDo,
    completedToDo: state.todo.completedToDo
  }
};

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
    },
    getAllToDos: function() {
      dispatch(getAllToDos());
    }
  };
};

class HomePageContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterStatus: "all",
      todo_item: "",
    };

    this.submitForm = this.submitForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.filterChange = this.filterChange.bind(this);
  }
  componentDidMount() {
    this.props.getAllToDos();
  }
  submitForm(e) {
    e.preventDefault();
    this.props.create(this.state.todo_item);
    this.setState({todo_item: ""});
  }

  filterChange(filterValue) {
    this.setState({filterStatus: filterValue});
  }

  handleInput(e) {
    this.setState({[e.target.name]: e.target.value});
  }


  render() {
    // console.log("function test array value?", Array.isArray(this.props.allToDo))
    return (
      <div className="homepage-container">
        <form className="form" onSubmit={(e) => { this.submitForm(e); }}>
          <div>
            <input type="text" name="todo_item" placeholder="your To Do's!"
              className="to-do-input-field"
              onChange={(e) => { this.handleInput(e); }}
              required />
          </div>
          <button className={'toDo-submit-button'} type="submit">
          Submit
          </button>
          <a>there are currently {this.props.activeToDo.length} active tasks remaining</a>
        </form>
        <button onClick={() => { this.props.removeAll(this.props.allToDoIDs); }}>
          Delete All
        </button>
        <div className="To-Do-list">

        </div>

        <div className="border-line"/>

        <div className="desc-container">
            <div className="left-desc">
              <div className="left-desc-title">
                  Active To-Do's.
              </div>
              <div className="left-desc-content">
                {
                  this.props.activeToDo.length ?
                  (this.props.activeToDo.map((todo) => {
                      return (
                        <div key={todo.id}>
                        {todo.to_do}
                        <button onClick={() => { this.props.removeOne(todo.id); }}>
                          X
                        </button>
                        </div>
                      )
                  })) : null
                }
              </div>

            </div>

            <div className="left-desc">
              <div className="left-desc-title">
                  Completed To-Do's.
              </div>
              <div className="left-desc-content">
                 Unite with your team and brainstorm ideas in your own dynamic
                 board. Create context around your projects with Boards—flexible
                 spaces to store, share, and talk about your own ideas.
              </div>
            </div>
        </div>

        <div className="team-desc">
          Made by Joe Stephens
        </div>

      </div>
    );
  }
}
const ToDoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageContainer);

export default ToDoContainer
