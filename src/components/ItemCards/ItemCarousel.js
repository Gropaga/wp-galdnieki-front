import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import LinkedCarousel from './LinkedCarousel';

const ItemCarousel = ({ color, colorSelect, itemSection, itemId }) => {
    return color.map((color, index) => {
        return (
            <div
                key={ index }
                className={ index === colorSelect ? '' : 'd-none' }
            >
                <LinkedCarousel
                    itemSection={itemSection}
                    itemId={itemId}
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