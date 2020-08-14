import React from "react";
import s from "./CurrentTicket.module.css";
import Owner from "./Owner/Owner";
import Details from "./Details/Details";
import Asset from "./Asset/Asset";
import { useQuery, useMutation } from "@apollo/client";
import {connect} from 'react-redux';
import {
  GET_TICKET_QUERY,
  GET_TICKETS_QUERY,
} from "../../graphql/queries/queries";
import {hideTicket} from '../../redux/actions/actions';
import { deleteTicketQuery } from "../../graphql/mutations/mutations";
const CurrentTicket = (props) => {
  const { data, loading } = useQuery(GET_TICKET_QUERY, {
    variables: {
      id: +props.id,
    },
  });
  const [deleteUser] = useMutation(deleteTicketQuery);
  const currentTicket = data?.ticket;




  return props.ticketChose ? (
      currentTicket ? (
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
        <Details id={currentTicket._id}
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
            onClick={async () => {
              await deleteUser({
                variables: { id: currentTicket._id },
                refetchQueries: [{ query: GET_TICKETS_QUERY }],
              });
              props.hideTicket();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ) : (
        <div className={s.ticketBlock}>
            <div className={s.unchosenTicket}><p style={{fontSize: "60px"}}>Loading</p></div>
        </div>
    )
  ) : (
    <div className={s.ticketBlock}>
      <div className={s.unchosenTicket}><p style={{fontSize: "60px"}}>Choose Ticket</p></div>
    </div>
  );
};

const mapStateToProps = (state) => ({
    ticketChose: state.ticketChose
})

const mapDispatchToProps = {
    hideTicket,
}

export default connect(mapStateToProps,mapDispatchToProps)(CurrentTicket);
