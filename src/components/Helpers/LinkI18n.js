import React from 'react';
import { _p, _lRev } from '../../lib/i18n';
import { Link } from "react-router-dom";


const LinkI18n = (props) => {
    return <Link
        to={`${_lRev()}${_p(props.section)}/${props.id}`}
        tag={props.tag}
        children={props.children}
    />
};

export default LinkI18n;