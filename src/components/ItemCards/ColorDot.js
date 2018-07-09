import React from 'react';
import PropTypes from 'prop-types'
import { Table } from 'reactstrap';

const ColorDot = ({ hex, colorSelect, onClick, index }) => <span
    style={{ backgroundColor: hex }}
    className="ColorDots__item"
    onClick={ () => onClick(index) }
/>;

ColorDot.propTypes = {
    hex: PropTypes.string.isRequired,
};

export default ColorDot;