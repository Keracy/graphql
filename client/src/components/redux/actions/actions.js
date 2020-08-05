import { CHOOSE_TICKET } from "../action-types";

export const chooseTicket = (ticket) => {
  return { type: CHOOSE_TICKET, payload: ticket };
};
