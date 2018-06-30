import React from 'react'
import ItemCard from './ItemCard'

const ItemCards = (props) => (
    props.map(item => <ItemCard { ...props } />)
);

export default ItemCards