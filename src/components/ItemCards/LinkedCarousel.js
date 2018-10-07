import {
    UncontrolledCarousel,
    CarouselItem,
    CarouselCaption,
    Carousel,
    CarouselIndicators,
    CarouselControl
} from "reactstrap";

import React from "react";
import LinkI18n from '../Helpers/LinkI18n'

// extending to add LinkI18n
export default class LinkedCarousel extends UncontrolledCarousel {
    render() {
        const { autoPlay, indicators, controls, items, goToIndex, itemSection, itemId, ...props } = this.props;
        const { activeIndex } = this.state;

        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    {
                        itemSection ?
                        <LinkI18n section={itemSection} id={itemId}>
                            <img className="d-block w-100" src={item.src} alt={item.altText} />
                        </LinkI18n> :
                        <img className="d-block w-100" src={item.src} alt={item.altText} />
                    }
                    <CarouselCaption captionText={item.caption} captionHeader={item.header || item.caption} />
                </CarouselItem>
            );
        });

        return (
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
                ride={autoPlay ? 'carousel' : undefined}
                {...props}
            >
                {indicators && <CarouselIndicators
                    items={items}
                    activeIndex={props.activeIndex || activeIndex}
                    onClickHandler={goToIndex || this.goToIndex}
                />}
                {slides}
                {controls && <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={props.previous || this.previous}
                />}
                {controls && <CarouselControl
                    direction="next"
                    directionText="Next"
                    onClickHandler={props.next || this.next}
                />}
            </Carousel>
        );
    }
}