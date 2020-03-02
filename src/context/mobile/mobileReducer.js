import { SEARCH_MOBILES, SET_LOADING, CLEAR_MOBILES } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SEARCH_MOBILES:
      return {
        ...state,
        mobiles: action.payload,
        loading: false
      };
    case CLEAR_MOBILES:
      return {
        ...state,
        mobiles: [],
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
