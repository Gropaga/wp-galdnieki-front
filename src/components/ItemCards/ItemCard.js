import React from 'react';
import PropTypes from 'prop-types'
import { Card, CardBody,
    CardTitle } from 'reactstrap';
import ItemCarousel from './ItemCarousel';
import ItemPriceSelect from './ItemPriceSelect';
import ItemPrice from "./ItemPrice";
import ItemColor from "./ItemColor";
import LinkI18n from "../Helpers/LinkI18n"

const ItemCard = (props) => {

    // console.log('props.color', props.color);
    // debugger;

    return (
        <div className="col-lg-3 col-md-6">

            <ItemCarousel
                itemId={props.doorId}
                itemSection="doors"
                color={ props.color}
                colorSelect={ props.colorSelect }
            />
            <h5 className="mt-3"><LinkI18n section="doors" id={props.doorId}>{ props.title }</LinkI18n></h5>
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