import React from 'react'
import ItemCard from './ItemCard'

const ItemCards = (props) => {
    return <div className="row">{ Object.keys(props.doors[props.locale])
        .map((key, index, doors) => {
            return <ItemCard
                title={ props.doors[props.locale][key].post.post_title }
                desc={ props.doors[props.locale][key].post.post_excerpt }
                color={ props.doors[props.locale][key].color }
                price={ props.doors[props.locale][key].price }
                key={ `door_${props.doors[props.locale][key].post.post_title}` }
            />;
        })}</div>;
};

export default ItemCards