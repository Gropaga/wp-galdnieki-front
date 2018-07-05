import React from 'react';
import PropTypes from 'prop-types'
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';
import ItemCarousel from './ItemCarousel';
import ItemPriceSelect from './ItemPriceSelect';

const ItemCard = (props) => {
    return (
        <div className="col-sm-3">
            <Card>
                <ItemCarousel color={ props.color }/>
                <CardBody>
                    <CardTitle>{ props.title }</CardTitle>
                    {/*<CardText>{ props.desc }</CardText>*/}
                    <ItemPriceSelect
                        price={ props.price }
                        onChange={ props.selectDimensions(props.doorId) }
                    />
                </CardBody>
            </Card>
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