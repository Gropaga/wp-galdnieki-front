import React from 'react';
import { Carousel, CarouselItem, CarouselControl } from 'reactstrap';

const ItemCarousel = ({ color, colorSelect }) => {
    if (typeof color[colorSelect] !== 'undefined' && typeof color[colorSelect].gallery[0] !== 'undefined') {
        const slides = color[colorSelect].gallery.map((image) => {
            return (
                <CarouselItem
                    onExiting={() => alert("onExiting")}
                    onExited={() => alert("onExited")}
                    key={image.medium_large[0]}
                >
                    <img className="d-block w-100" src={image.medium_large[0]} />
                </CarouselItem>
            );
        });

        return (
            <Carousel
                activeIndex={0}
                next={ () => alert('next')}
                previous={() => alert('previous')}
                interval={ 0 }
                autoPlay={ false }
            >
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={ () => alert("previousHandler") } />
                <CarouselControl direction="next" directionText="Next" onClickHandler={ () => alert("nextHandler") } />
            </Carousel>
        );
    } else {
        return <div/>;
    }
};

export default ItemCarousel;