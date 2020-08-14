import React, { useState, forwardRef } from 'react';
import {GET_TICKET_QUERY, GET_TICKETS_QUERY} from "../../../graphql/queries/queries";

const useDropDown = (label, defaultState, options,onChange, _id ) => {
    const [state, setState] = useState(defaultState);

    const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;

    const Dropdown = forwardRef((props, ref) => (
        <label htmlFor={id}>
            {label}
            <select
                ref={ref}
                id={id}
                value={state}
                onChange={(e) => {
                    onChange({variables: {id: _id,status:  e.target.value}, refetchQueries: [{query: GET_TICKETS_QUERY}]})
                }}
                onBlur={(e) => setState(e.target.value)}
                disabled={options.length === 0}
            >
                <option>
                    {defaultState}
                </option>

                {options.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}

            </select>
        </label>
    ));

    return [state, Dropdown, setState];
}

export default useDropDown;