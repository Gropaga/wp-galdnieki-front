import React from 'react'
import ItemCard from './ItemCard'

const ItemCards = ({ doors, selectDimensions, selectColor, history }) => {
    return <div className="row">{
        Object.keys(doors).map((doorId) => {
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
                        (colorIndex) =>
                            selectColor(doorId, colorIndex)
                }
            />;
        })}</div>;
};

export default ItemCards