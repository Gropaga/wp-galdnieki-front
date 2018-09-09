import React from 'react'
import ItemCarousel from "../ItemCards/ItemCarousel";

const Carousel = ({ window }) =>
    <div className="col-lg-6 col-md-6">
        <ItemCarousel
            itemId={window.windowId}
            itemSection="windows"
            color={ window.color}
            colorSelect={ window.colorSelect }
        />
    </div>;

Carousel.propTypes = {
    // image: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
    // costs: PropTypes.object.isRequired
};

export default Carousel;