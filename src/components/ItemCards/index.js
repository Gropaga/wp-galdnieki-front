import React from 'react'
import ItemCard from './ItemCard'

const ItemCards = (props) => {
    console.log('blyadskie dveri', props.doors);
    return Object.keys(props.doors[props.locale])
        .map((key, index, doors) => {
            return <ItemCard
                title={ props.doors[props.locale][key].post.post_title }
                key={ `door_${props.doors[props.locale][key].post.post_title}` }
            />;
        });
};

export default ItemCards