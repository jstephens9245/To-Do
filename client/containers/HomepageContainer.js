import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {createToDo, deleteToDo, changeStatus, deleteAllToDo, getAllToDos} from '../actions/todo';


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
    },
    editStatus: function(toDoId) {
      dispatch(changeStatus(toDoId));
    }
  };
};

class HomePageContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterStatus: "all",
      todo_item: "",
      displayAll: "",
      displayActive: "",
      displayCompleted: "",
      dirty: false
    };

    this.submitForm = this.submitForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.filterChange = this.filterChange.bind(this);

    this.clearContent = this.clearContent.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    this.props.create(this.state.todo_item);
  }

  filterChange(filterValue) {
    this.setState({filterStatus: filterValue});
  }

  handleInput(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  clearContent () {
    document.getElementById("toDoForm").reset();
  }

  render() {
    return (
      <div className="homepage-container">
        <form id="toDoForm" className="form" onSubmit={(e) => { this.submitForm(e); this.clearContent() } }>
          {/* <div className="input-container"> */}
            <input type="text" name="todo_item" placeholder="Enter your To Do's!"
              className="to-do-input-field"
              onChange={(e) => { this.handleInput(e); }}
              required />
          {/* </div> */}
          <div className="active-tasks">there are currently {this.props.activeToDo.length} active tasks remaining</div>
          <div className="main-button-container">
            <button className="main-button" type="submit" >
            Submit
            </button>
            <button className="main-button" onClick={() => { this.props.removeAll(this.props.allToDoIDs); }}>
              Delete All
            </button>
          </div>
        </form>
        <div className="render-buttons">
          <button className="show-button" onClick={() => {
            var activeElement = document.getElementById("active-items");
            activeElement.classList.remove("hidden");
            var activeElement = document.getElementById("completed-items");
            activeElement.classList.remove("hidden");
            }}>
            Show All To Do's
          </button>
          <button className="show-button" onClick={() => {
            var activeElement = document.getElementById("active-items");
            activeElement.classList.remove("hidden");
            var activeElement = document.getElementById("completed-items");
            activeElement.classList.add("hidden");
            }}>
            Show Only Active
          </button>
          <button className="show-button" onClick={() => {
            var activeElement = document.getElementById("active-items");
            activeElement.classList.add("hidden");
            var activeElement = document.getElementById("completed-items");
            activeElement.classList.remove("hidden");
            }}>
            Show Only Completed
          </button>
        </div>

        <div className="border-line"/>

        <div className="desc-container">
            <div className="left-desc">
              <div className="left-desc-title">
                  Active To-Do's.
              </div>
              <div id="active-items" className="left-desc-content">
                {
                  this.props.activeToDo.length ?
                  (this.props.activeToDo.map((todo) => {
                      return (
                        <div key={todo.id} className="to-do-items" >
                        {todo.to_do}
                        <button className="to-do-status-btn" onClick={() => { this.props.editStatus(todo.id); }}>
                          set to complete
                        </button>
                        <button className="to-do-delete-btn" onClick={() => { this.props.removeOne(todo.id); }}>
                          X
                        </button>
                        </div>
                      )
                  })) : null
                }
              </div>

            </div>

            <div className="right-desc">
              <div className="right-desc-title">
                  Completed To-Do's.
              </div>
              <div id="completed-items" className="right-desc-content">
                {
                  this.props.completedToDo.length ?
                  (this.props.completedToDo.map((todo) => {
                      return (
                        <div key={todo.id} className="to-do-items">
                        {todo.to_do}
                        <button className="to-do-status-btn" onClick={() => { this.props.editStatus(todo.id); }}>
                          set to active
                        </button>
                        <button className="to-do-delete-btn" onClick={() => { this.props.removeOne(todo.id); }}>
                          X
                        </button>
                        </div>
                      )
                  })) : null
                }
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
