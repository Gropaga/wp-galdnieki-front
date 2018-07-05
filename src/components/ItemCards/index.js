import React from 'react'
import ItemCard from './ItemCard'

const ItemCards = ({ locale, doors, selectDimensions }) => {
    return <div className="row">{
        Object.keys(doors).filter((doorId) => (doors[doorId].locale === locale))
        .map((doorId) => {
            return <ItemCard
                doorId={ doorId }
                title={ doors[doorId].title }
                desc={ doors[doorId].content }
                color={ doors[doorId].color }
                price={ doors[doorId].price }
                selected={ doors[doorId].selected }
                key={ doorId }
                selectDimensions={
                    (doorId) =>
                        (dimensions) =>
                            selectDimensions(doorId, dimensions)
                }
            />;
        })}</div>;
};

export default ItemCards