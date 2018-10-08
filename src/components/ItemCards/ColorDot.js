import React from 'react';
import PropTypes from 'prop-types'
import Table from 'reactstrap/lib/Table';

const ColorDot = ({ hex, colorSelect, onClick, index }) => <span
    style={{ backgroundColor: hex }}
    className="ColorDots__item"
    onClick={ () => onClick(index) }
/>;

ColorDot.propTypes = {
    hex: PropTypes.string.isRequired,
};

export default ColorDot;