import React from 'react'
import ItemCard from './ItemCard'

const ItemCards = ({ locale, doors, selectDimensions, selectColor, history }) => {
    return <div className="row">{
        Object.keys(doors).filter(doorId => doors[doorId].locale === locale)
            .filter((doorId => typeof doors[doorId].display === "undefined" ||
                (typeof doors[doorId].display === 'boolean' && doors[doorId].display)))
        .map((doorId) => {
            return <ItemCard
                doorId={ doorId }
                title={ doors[doorId].title }
                desc={ doors[doorId].content }
                color={ doors[doorId].color }
                price={ doors[doorId].price }
                sizeSelect={ doors[doorId].sizeSelect}
                colorSelect={ doors[doorId].colorSelect }
                key={ doorId }
                history={ history }
                selectDimensions={
                    (doorId) =>
                        (dimensions) =>
                            selectDimensions(doorId, dimensions)
                }
                selectColor={
                    (doorId) =>
                        (dimensions) =>
                            selectColor(doorId, dimensions)
                }
            />;
        })}</div>;
};

export default ItemCards