import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  items: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CHECKOUT:
      //const newData = updateObject(action.data, {id: action.id});
      return updateObject(state, {
        items: state.items.concat(action.data),
      });
    case actionTypes.CLEAR_CHECKOUT:
      return {
        items: [],
      };
    case actionTypes.DELETE_ITEM:
      const items = state.items.filter((item) => item.id !== action.id);
      return updateObject(state, {
        items: items,
      });
    default:
      return state;
  }
};

export default reducer;
