import React from 'react';
import PropTypes from 'prop-types'
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';
import ItemDropdown from './ItemDropdown'

const ItemCard = (props) => {
    return (
        <div>
            <Card>
                {/*<CardImg top width="100%" src={ props.image } alt={ props.title } />*/}
                <CardBody>
                    <CardTitle>{ props.title }</CardTitle>
                    <CardText>{ props.description }</CardText>
                    {/*<ItemDropdown costs={ props.costs } />*/}
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