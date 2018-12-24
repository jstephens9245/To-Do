import axios from 'axios';
import {browserHistory} from 'react-router';

import { CREATE_TODO, DELETE_TODO, DELETE_ALL_TODO, GET_ALL_TODO } from '../constants' ;

export const addToDo = (item) => ({
  type: CREATE_TODO,
  to_do: item
});

export const removeToDo = (toDoItem) => ({
  type: DELETE_TODO,
  payload: toDoItem
});

export const removeAllToDo = () => ({
  type: DELETE_ALL_TODO,
});

export const receiveAllToDos = (toDo) => ({
  type: GET_ALL_TODO,
  to_do: toDo
});

export const getAllToDos = () => {
  return dispatch => {
    return axios.get('/api/todo/')
      .then((res) => res.data)
      .then((toDo) => {
        dispatch(receiveAllToDos(toDo));
      });
  };
};

export const createToDo = (to_do) => {
return dispatch => {
    return axios.post('/api/todo/', {to_do})
      .then(res => {
        dispatch(addToDo(res.data));
      }).catch(err => { console.error(err); return err; });
  };
}

export const deleteToDo = (toDoItem) => dispatch => {
  return axios.delete(`/api/todo/${toDoItem}`)
    .then(res => {
      dispatch(getAllToDos());
    }).catch(err => err);
};

export const deleteAllToDo = (idArray) => dispatch => {
  return axios.delete('/api/todo/', {idArray})
    .then(res => dispatch(removeAllToDo()))
    .catch(err => console.error(err));
};
