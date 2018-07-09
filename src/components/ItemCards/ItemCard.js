import React from 'react';
import PropTypes from 'prop-types'
import { Card, CardBody,
    CardTitle } from 'reactstrap';
import ItemCarousel from './ItemCarousel';
import ItemPriceSelect from './ItemPriceSelect';
import ItemPrice from "./ItemPrice";
import ItemColor from "./ItemColor";

const ItemCard = (props) => {

    // console.log('props.color', props.color);
    // debugger;

    return (
        <div className="col-sm-3">
            <ItemCarousel
                color={ props.color}
                colorSelect={ props.colorSelect }
            />
            <h6 className="mt-3">{ props.title }</h6>
            {/*<CardText>{ props.desc }</CardText>*/}
            <ItemColor
                color={ props.color }
                colorSelect={ props.colorSelect}
                onClick={ props.selectColor(props.doorId) }
            />
            <ItemPriceSelect
                price={ props.price }
                sizeSelect={ props.sizeSelect }
                onChange={ props.selectDimensions(props.doorId) }
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