import React from 'react'
import Colors from "./Colors";
import {selectColor} from "../../actions/window";
import ItemPriceSelect from "../ItemCards/ItemPriceSelect";
import ItemPrice from "../ItemCards/ItemPrice";
import Price from "./Price";

const Description = ({ item, selectColor, selectDimensions }) =>
    <div className="col-lg-6 col-md-6">
        <h4>{ item.title }</h4>
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