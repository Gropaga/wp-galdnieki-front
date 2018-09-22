import React from 'react'
import Carousel from "./Carousel";
import Description from "./Description";

const Item = ({ item, selectColor, selectDimensions }) => <div className="row">
    <Carousel item={ item } />
    <Description
        item={ item }
        selectColor={ selectColor }
        selectDimensions={ selectDimensions }
    />
</div>;

export default Item