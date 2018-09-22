import React from 'react'
import ItemCarousel from "../ItemCards/ItemCarousel";

const Carousel = ({ item }) =>
    <div className="col-lg-6 col-md-6">
        <ItemCarousel
            itemId={item.windowId}
            itemSection="windows"
            color={ item.color}
            colorSelect={ item.colorSelect }
        />
    </div>;

Carousel.propTypes = {
    // image: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
    // costs: PropTypes.object.isRequired
};

export default Carousel;