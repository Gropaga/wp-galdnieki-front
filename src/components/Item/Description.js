import React from 'react'
import Colors from "./Colors";
import Price from "./Price";

const Description = ({ item, selectColor, selectDimensions }) =>
    <div className="col-lg-6 col-md-6">
        <h1>{ item.title }</h1>
        <p>{ item.content }</p>
        <Colors window={item} onClick={(itemId) => (color) => selectColor(itemId, color)} />
        <Price window={item} selectDimensions={(itemId) => (dimension) => selectDimensions(itemId, dimension)} />
    </div>;

Description.propTypes = {
    // image: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
    // costs: PropTypes.object.isRequired
};

export default Description;