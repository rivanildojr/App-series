import { SET_FIELD } from "../actions";

const INITIAL_STATE = {
  title: "",
  gender: "",
  rate: 0,
  img: "",
  description: ""
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_FIELD:
      const newState = { ...state };
      return (newState[action.field] = action.value);
    default:
      return state;
  }
}
