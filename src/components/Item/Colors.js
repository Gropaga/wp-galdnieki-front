import React from 'react'
import {_} from "../../lib/i18n";
import ColorDot from "../ItemCards/ColorDot";

const Colors = ({ window, onClick }) =>
    <div>
        <h6>{ _('Colour')}</h6>
        <p>
        {
            window.color.map((color, index) => {
                return <ColorDot
                    colorSelect={window.colorSelect}
                    key={index}
                    index={index}
                    hex={color.hex}
                    onClick={ onClick(window.id) }
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