import React from 'react'
import ItemCard from './ItemCard'

const ItemCards = ({ items, selectDimensions, selectColor, history, itemSection }) => {
    return Object.keys(items).map((itemId) => {
        return <ItemCard
            itemId={ itemId }
            itemSection={ itemSection }
            title={ items[itemId].title }
            desc={ items[itemId].content }
            color={ items[itemId].color }
            price={ items[itemId].price }
            sizeSelect={ items[itemId].sizeSelect}
            colorSelect={ items[itemId].colorSelect }
            key={ itemId }
            history={ history }
            selectDimensions={
                (itemId) =>
                    (dimensions) =>
                        selectDimensions(itemId, dimensions)
            }
            selectColor={
                (itemId) =>
                    (colorIndex) =>
                        selectColor(itemId, colorIndex)
            }
        />;
    });
};

export default ItemCards