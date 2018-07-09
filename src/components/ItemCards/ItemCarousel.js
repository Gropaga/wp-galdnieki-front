import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const ItemCarousel = ({ color, colorSelect }) => {
    return color.map((color, index) => {
        return (
            <div
                key={ index }
                className={ index === colorSelect ? '' : 'd-none' }
            >
                <UncontrolledCarousel
                    interval={ 0 }
                    autoPlay={ false }
                    items={ getImages(color) }
                />
            </div>
        );
    });
};

const getImages = (color) => color.gallery.map((currentImage) => {
    return {
        src: currentImage.medium_large[0],
        caption: '',
        altText: '',
    }
});

export default ItemCarousel;