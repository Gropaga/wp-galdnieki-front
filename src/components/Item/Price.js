import React from 'react'
import ItemCarousel from "../ItemCards/ItemCarousel";
import ItemPriceSelect from "../ItemCards/ItemPriceSelect";
import ItemPrice from "../ItemCards/ItemPrice";
import {_} from "../../lib/i18n";

const Price = ({ window, selectDimensions }) =>
    <div>
        <h6>{ _('Price') }</h6>
        <ItemPriceSelect
            price={ window.price }
            sizeSelect={ window.sizeSelect }
            onChange={ selectDimensions(window.id) }
        />
        <ItemPrice
            price={ window.price }
            sizeSelect={ window.sizeSelect }
        />
    </div>;

Price.propTypes = {
    // image: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
    // costs: PropTypes.object.isRequired
};

export default Price;