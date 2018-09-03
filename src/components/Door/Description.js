import React from 'react'
import Colors from "./Colors";
import {selectColor} from "../../actions/door";
import ItemPriceSelect from "../ItemCards/ItemPriceSelect";
import ItemPrice from "../ItemCards/ItemPrice";
import Price from "./Price";

const Description = ({ door, selectColor, selectDimensions }) =>
    <div className="col-lg-6 col-md-6">
        <h4>{ door.title }</h4>
        <p>{ door.content }</p>
        <Colors door={door} onClick={(doorId) => (color) => selectColor(doorId, color)} />
        <Price door={door} selectDimensions={(doorId) => (dimension) => selectDimensions(doorId, dimension)} />
    </div>;

Description.propTypes = {
    // image: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
    // costs: PropTypes.object.isRequired
};

export default Description;