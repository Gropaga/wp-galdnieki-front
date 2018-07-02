import React from 'react';
import PropTypes from 'prop-types'
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';
import ItemDropdown from './ItemDropdown'
import ItemCarousel from './ItemCarousel';

const ItemCard = (props) => {
    return (
        <div className="col-sm-3">
            <Card>
                {/*<CardImage color={ props.color } />*/}
                <ItemCarousel color={ props.color }/>
                <CardBody>
                    <CardTitle>{ props.title }</CardTitle>
                    <CardText>{ props.desc }</CardText>
                    {/*<ItemDropdown costs={ props.costs } />*/}
                </CardBody>
            </Card>
        </div>
    );
};

const CardImage = ({ color }) => {
    if (typeof color[0] !== 'undefined' && typeof color[0].gallery[0] !== 'undefined') {
        return <CardImg
            top width="100%"
            src={ color[0].gallery[0].medium[0] } alt="No alt" />;
    } else {
        return <div/>;
    }
};

ItemCard.propTypes = {
    // image: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
    // costs: PropTypes.object.isRequired
};

export default ItemCard;