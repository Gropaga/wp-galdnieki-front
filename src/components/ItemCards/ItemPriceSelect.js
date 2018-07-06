import React from 'react';
import PropTypes from 'prop-types'
import { FormGroup, Label, Input } from 'reactstrap';

const ItemPriceSelect = ({ price, selected, onChange }) => {

    console.log('itempriceselect', JSON.stringify({
        height: selected.height,
        width: selected.width
    }));

    return (
        <FormGroup>
            <Input
                value={ JSON.stringify({
                    height: selected.height,
                    width: selected.width
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