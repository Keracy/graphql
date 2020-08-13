import React from "react";
import s from "./CurrentTicket.module.css";
import Owner from "./Owner/Owner";
import Details from "./Details/Details";
import Asset from "./Asset/Asset";
import { useQuery, useMutation } from "@apollo/client";
import { getTicketQuery } from "../../graphql/queries/queries";
import { deleteTicketQuery } from "../../graphql/mutations/mutations";

const CurrentTicket = (props) => {
  const { data, loading } = useQuery(getTicketQuery, {
    variables: {
      id: +props.id,
    },
  });
  const [deleteUser] = useMutation(deleteTicketQuery);
  const currentTicket = data?.ticket;
  return currentTicket ? (
    !loading ? (
      <div className={s.ticketBlock}>
        <div className={s.ticketDetails}>
          <p className={s.ticketDetailsItem}>
            Ticket No. {currentTicket.number}
          </p>
          <p className={s.ticketDetailsItem}>
            {"Last Updated "}
            {`${currentTicket.lastUpdatedTime.slice(
              8,
              10
            )}/${currentTicket.lastUpdatedTime.slice(
              5,
              7
            )}/${currentTicket.lastUpdatedTime.slice(
              2,
              4
            )} ${currentTicket.lastUpdatedTime.slice(11, 16)}`}
          </p>
        </div>
        <Owner
          source={currentTicket.owner.avatar}
          firstName={currentTicket.owner.firstName}
          lastName={currentTicket.owner.lastName}
          specialities={currentTicket.owner.specialities}
        />
        <Details
          report={`${currentTicket.reportedTime.slice(
            8,
            10
          )}/${currentTicket.reportedTime.slice(
            5,
            7
          )}/${currentTicket.reportedTime.slice(
            2,
            4
          )} ${currentTicket.reportedTime.slice(11, 16)}`}
          status={currentTicket.status}
          description={currentTicket.description}
        />
        <Asset
          name={currentTicket.asset.name}
          geocode={currentTicket.asset.geoCode}
          location={currentTicket.location}
        />
        <div className={s.buttonWrapper}>
          <button
            className={s.deleteButton}
            onClick={() => {
              deleteUser({ variables: { id: currentTicket._id } });
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ) : (
      <div className={s.ticketBlock}></div>
    )
  ) : (
    <div className={s.ticketBlock}></div>
  );
};

export default CurrentTicket;
