import {
  CHOOSE_TICKET,
  SET_USER_LOGGED,
  SET_USER_UNLOGGED,
} from "../action-types";

const initialState = {
  tickets: [],
  ticketChose: true,
  userLogged: false,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
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
