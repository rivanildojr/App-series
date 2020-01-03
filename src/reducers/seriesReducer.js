import seriesMock from "../../series.json";

const INITIAL_STATE = seriesMock;

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
