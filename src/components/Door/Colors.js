import React from 'react'
import {_} from "../../lib/i18n";
import ColorDot from "../ItemCards/ColorDot";

const Colors = ({ door, onClick }) =>
    <div>
        <h6>{ _('Colour')}</h6>
        <p>
        {
            door.color.map((color, index) => {
                return <ColorDot
                    colorSelect={door.colorSelect}
                    key={index}
                    index={index}
                    hex={color.hex}
                    onClick={ onClick(door.id) }
                />
            })
        }
        </p>
    </div>;

Colors.propTypes = {
    // image: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
    // costs: PropTypes.object.isRequired
};

export default Colors;