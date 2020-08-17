import React, {useEffect, useRef} from 'react';
import useDropDown from './useDropDown';
import {useMutation} from "@apollo/client";
import {EDIT_STATUS_MUTATION} from "../../../graphql/mutations/mutations";

function CustomSelect(props) {
    const [editStatus] = useMutation(EDIT_STATUS_MUTATION);
    const dropDownOptions = ['UNA','ASD', 'COM']
    const [dropDownValue, CustomDropDown] = useDropDown('', props.status, dropDownOptions, editStatus, props.id);
    console.log('Drop Down Value', dropDownValue);
    const ref = useRef();
    return (
        <div>
            <CustomDropDown ref={ref}/>
        </div>
    );
}

export default CustomSelect;