import React from 'react';
import { _p, _lRev } from '../../lib/i18n';
import { Link } from "react-router-dom";


const LinkI18n = (props) => {
    return <Link
        to={`${_lRev()}${_p(props.section)}${getId(props.id)}`}
        tag={props.tag}
        children={props.children}
    />
};

let getId = id => id ? `/${id}` : '';

export default LinkI18n;