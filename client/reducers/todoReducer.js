import { CREATE_TODO, DELETE_TODO, DELETE_ALL_TODO , GET_ALL_TODO, CHANGE_STATUS } from '../constants' ;


const initialState = {
  allToDoIDs: [],
  activeToDo: [],
  completedToDo: []
};

export default function(state = initialState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
  case CREATE_TODO:
    newState.allToDoIDs = [ ...newState.allToDoIDs, action.to_do.id ];
    newState.activeToDo = [ ...newState.activeToDo, action.to_do ];
    break;

  case GET_ALL_TODO:
    if(Array.isArray(action.to_do)) {
      console.log(action.to_do, "completed array", action.to_do.status, action.to_do.status === "completed");
      for (var i = 0; i < action.to_do.length; i++) {
        if(action.to_do[i].status === "completed") {
          newState.completedToDo = [ ...newState.completedToDo, action.to_do[i] ]
        } else {
          newState.activeToDo = [ ...newState.activeToDo, action.to_do[i] ]
        }
      }
      newState.allToDoIDs = [ ...newState.allToDoIDs, ...action.to_do.map((todo) => { return todo.id })]
    } else if(typeof action.to_do === 'object') {
      if(action.to_do.status === "completed") {
        console.log(action.to_do, "completed object");
        newState.completedToDo = [ ...newState.completedToDo, ...action.to_do ]
      } else {
        newState.activeToDo = [ ...newState.activeToDo, ...action.to_do ]
      }
    }
    break;
  case CHANGE_STATUS:
  var tempArray = [];

    if(action.to_do.status === "completed") {

      newState.completedToDo = [ ...newState.completedToDo, action.to_do ]
      for (var i = 0; i < newState.activeToDo.length; i++) {
        if(newState.activeToDo[i].id !== action.to_do.id) {
            tempArray.push(newState.activeToDo[i])
        }
      }
      newState.activeToDo = [ ...tempArray ]

    } else {
      newState.activeToDo = [ ...newState.activeToDo, action.to_do ]
      for (var i = 0; i < newState.completedToDo.length; i++) {
        if(newState.completedToDo[i].id !== action.to_do.id) {
            tempArray.push(newState.completedToDo[i])
        }
      }
      newState.completedToDo = [ ...tempArray ]
    }
    break;

  case DELETE_TODO:
    break;

  case DELETE_ALL_TODO:
    newState.allToDoIDs = [];
    newState.activeToDo = [];
    newState.completedToDo = [];
    break;

  default:
    return state;
  }
  return newState;
}
