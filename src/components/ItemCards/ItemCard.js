import React from 'react';
import PropTypes from 'prop-types'
import ItemCarousel from './ItemCarousel';
import ItemPriceSelect from './ItemPriceSelect';
import ItemPrice from "./ItemPrice";
import ItemColor from "./ItemColor";
import LinkI18n from "../Helpers/LinkI18n"

const ItemCard = (props) => {
    return (
        <div className="col-lg-3 col-md-6 item-card">
            <h5 className="item-card-heading"><LinkI18n section={props.itemSection} id={props.itemId}>{ props.title }</LinkI18n></h5>
            <ItemCarousel
                itemId={props.itemId}
                itemSection={ props.itemSection }
                color={ props.color}
                colorSelect={ props.colorSelect }
            />
            <ItemColor
                color={ props.color }
                colorSelect={ props.colorSelect}
                onClick={ props.selectColor(props.itemId) }
            />
            <ItemPriceSelect
                price={ props.price }
                sizeSelect={ props.sizeSelect }
                onChange={ props.selectDimensions(props.itemId) }
            />
            <ItemPrice
                price={ props.price }
                sizeSelect={ props.sizeSelect }
            />
        </div>
    );
};

ItemCard.propTypes = {
    // image: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
    // costs: PropTypes.object.isRequired
};

export default ItemCard;