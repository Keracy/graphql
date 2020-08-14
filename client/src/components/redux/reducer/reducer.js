import {
  CHOOSE_TICKET,
  SET_USER_LOGGED,
  SET_USER_UNLOGGED,
  HIDE_TICKET,
} from "../action-types";

const initialState = {
  ticketChose: false,
  userLogged: false,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case HIDE_TICKET:{
      return {...state, ticketChose: false};
    }
    case CHOOSE_TICKET:
      return { ...state, currentTicket: action.payload, ticketChose: true };
    case SET_USER_LOGGED:
      return { ...state, userLogged: true };
    case SET_USER_UNLOGGED:
      return { ...state, userLogged: false };
    default:
      return state;
  }
};
