import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  authUser: false,
  userData: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATE:
      return updateObject(state, {
        authUser: action.data,
      });
    case actionTypes.STORE_USER_DATA:
      return updateObject(state, {
        userData: action.data,
      });
    default:
      return state;
  }
};

export default reducer;
