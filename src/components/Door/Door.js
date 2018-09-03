import React from 'react'
import {_} from "../../lib/i18n";
import ItemCarousel from "../ItemCards/ItemCarousel";

const Door = (door) => {
    if (door) {
        return <div className="col-lg-6 col-md-6">
            <ItemCarousel
                itemId={door.doorId}
                itemSection="doors"
                color={ door.color}
                colorSelect={ door.colorSelect }
            />
        </div>
    } else {
        return <div>{ _("Door not found") }</div>;
    }
};

export default Door;