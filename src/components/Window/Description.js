import React from 'react'
import Colors from "./Colors";
import {selectColor} from "../../actions/window";
import ItemPriceSelect from "../ItemCards/ItemPriceSelect";
import ItemPrice from "../ItemCards/ItemPrice";
import Price from "./Price";

const Description = ({ window, selectColor, selectDimensions }) =>
    <div className="col-lg-6 col-md-6">
        <h4>{ window.title }</h4>
        <p>{ window.content }</p>
        <Colors window={window} onClick={(windowId) => (color) => selectColor(windowId, color)} />
        <Price window={window} selectDimensions={(windowId) => (dimension) => selectDimensions(windowId, dimension)} />
    </div>;

Description.propTypes = {
    // image: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
    // costs: PropTypes.object.isRequired
};

export default Description;