import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const ItemCarousel = ({ items }) => <UncontrolledCarousel interval={ 0 } autoPlay={ false } items={items} />;

export default ItemCarousel;