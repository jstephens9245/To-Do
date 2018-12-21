import {TOGGLE_CLICK} from '../constants';


const initialState = {sidebarToggle: false, boardTemplateToggle: false};

export default function(state = initialState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {

  case TOGGLE_CLICK:
    newState[action.field] = !newState[action.field];
    break;
  default:
    return state;

  }

  return newState;
}
