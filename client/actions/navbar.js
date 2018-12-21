import {TOGGLE_CLICK} from '../constants';


export function toggleClick(field) {
  return {
    type: TOGGLE_CLICK,
    field
  };
}
