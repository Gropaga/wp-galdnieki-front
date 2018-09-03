import React from 'react'
import ItemCarousel from "../ItemCards/ItemCarousel";

const Carousel = ({ door }) =>
    <div className="col-lg-6 col-md-6">
        <ItemCarousel
            itemId={door.doorId}
            itemSection="doors"
            color={ door.color}
            colorSelect={ door.colorSelect }
        />
    </div>;

Carousel.propTypes = {
    // image: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
    // costs: PropTypes.object.isRequired
};

export default Carousel;