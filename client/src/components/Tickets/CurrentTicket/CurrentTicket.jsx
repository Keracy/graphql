import React from "react";
import s from "./CurrentTicket.module.css";
import Owner from "./Owner/Owner";
import Details from "./Details/Details";
import Asset from "./Asset/Asset";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const CurrentTicket = (props) => {
  const currentTicket = props.data.ticket;
  return currentTicket ? (
    <div className={s.ticketBlock}>
      <div className={s.ticketDetails}>
        <p className={s.ticketDetailsItem}>Ticket No. {currentTicket.number}</p>
        <p className={s.ticketDetailsItem}>
          Last Updated{" "}
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
    </div>
  ) : (
    <div className={s.ticketBlock}></div>
  );
};

const getTicketQuery = gql`
  query($id: Int) {
    ticket(id: $id) {
      ticketId
      number
      lastUpdatedTime
      owner {
        userId
        firstName
        lastName
        avatar
        specialities
      }
      reportedTime
      status
      description
      asset {
        assetId
        name
        geoCode
        kmFrom
        kmTo
      }
    }
  }
`;

export default graphql(getTicketQuery, {
  options: (props) => {
    return {
      variables: {
        id: +props.match.params.ticketId,
      },
    };
  },
})(CurrentTicket);
