import { CREATE_TODO, DELETE_TODO, DELETE_ALL_TODO , GET_ALL_TODO } from '../constants' ;


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
    // console.log(action.to_do, Array.isArray(action.to_do), "array check");
    if(Array.isArray(action.to_do)) {
      newState.activeToDo = [ ...newState.activeToDo, ...action.to_do ]
      newState.allToDoIDs = [ ...newState.allToDoIDs, ...action.to_do.map((todo) => { return todo.id })]
      // console.log(action.to_do, "action object");
    } else if(typeof action.to_do === 'object') {
      newState.activeToDo = [ ...newState.activeToDo, action.to_do ]
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
