import {
  CHOOSE_TICKET,
  SET_USER_LOGGED,
  SET_USER_UNLOGGED,
} from "../action-types";

export const chooseTicket = (ticket) => {
  return { type: CHOOSE_TICKET, payload: ticket };
};

export const setUserLogged = () => {
  return { type: SET_USER_LOGGED };
};
export const setUserUnlogged = () => {
  return { type: SET_USER_UNLOGGED };
};
