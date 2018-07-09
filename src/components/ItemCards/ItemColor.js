import React from 'react';
import PropTypes from 'prop-types'
import { Table } from 'reactstrap';
import ColorDot from "./ColorDot";

const ItemColor = ({ color, colorSelect, onClick }) => {
    return <div className="ColorDots" > {
        color.map((color, index) =>
            <ColorDot
                colorSelect={colorSelect}
                key={index}
                index={index}
                hex={color.hex}
                onClick={ onClick }
            />
        )
    } </div>
};


ItemColor.propTypes = {
    // image: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
    // costs: PropTypes.object.isRequired
};

export default ItemColor;