import React from 'react';
import PropTypes from 'prop-types'
import { FormGroup, Label, Input } from 'reactstrap';

const ItemPriceSelect = ({ price, sizeSelect, onChange }) => {

    console.log('itempriceselect', JSON.stringify({
        height: sizeSelect.height,
        width: sizeSelect.width
    }));

    return (
        <FormGroup>
            <Input
                bsSize="sm"
                value={ JSON.stringify({
                    height: sizeSelect.height,
                    width: sizeSelect.width
                })}
                onChange={ (event) => onChange(event.target.value) }
                type="select"
                name="selectMulti"
                id="exampleSelectMulti"
            >
                {
                    Object.values(price.reduce((acc, p) => (
                        Object.assign(acc, {
                            // making unique
                            [JSON.stringify({height: p.height,width: p.width})]:
                                <option
                                    value={ JSON.stringify({
                                        height: p.height,
                                        width: p.width
                                    })}
                                    key={ JSON.stringify({
                                        height: p.height,
                                        width: p.width
                                    })}
                                >
                                    {`${p.height} x ${p.width} mm`}
                                </option>
                        })
                    ), {}))
                }
            </Input>
        </FormGroup>
    );
};

ItemPriceSelect.propTypes = {
    // image: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
    // costs: PropTypes.object.isRequired
};

export default ItemPriceSelect;