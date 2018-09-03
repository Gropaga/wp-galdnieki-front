import React from 'react'
import ItemCarousel from "../ItemCards/ItemCarousel";
import ItemPriceSelect from "../ItemCards/ItemPriceSelect";
import ItemPrice from "../ItemCards/ItemPrice";
import {_} from "../../lib/i18n";

const Price = ({ door, selectDimensions }) =>
    <div>
        <h6>{ _('Price') }</h6>
        <ItemPriceSelect
            price={ door.price }
            sizeSelect={ door.sizeSelect }
            onChange={ selectDimensions(door.id) }
        />
        <ItemPrice
            price={ door.price }
            sizeSelect={ door.sizeSelect }
        />
    </div>;

Price.propTypes = {
    // image: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
    // costs: PropTypes.object.isRequired
};

export default Price;