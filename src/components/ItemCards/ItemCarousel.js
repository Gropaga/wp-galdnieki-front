import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const ItemCarousel = ({ color }) => {
    if (typeof color[0] !== 'undefined' && typeof color[0].gallery[0] !== 'undefined') {
        return <UncontrolledCarousel interval={ 0 } autoPlay={ false } items={ getImages(color[0]) } />;
    } else {
        return <div/>;
    }

};

const getImages = (color) => color.gallery.map((currentImage) => {
    return {
        src: currentImage.medium_large[0],
        caption: '',
        altText: '',
    }
});

export default ItemCarousel;