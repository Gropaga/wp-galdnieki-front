import React from 'react';
import PropTypes from 'prop-types'
import { Table } from 'reactstrap';

const ItemPrice = ({ price, sizeSelect }) => {
    return (
        <Table size="sm">
            <tbody>
            {
                price.filter(p =>
                    p.height === sizeSelect.height && p.width === sizeSelect.width
                ).map(p =>
                    <tr key={ JSON.stringify({
                        price: p.price,
                        material: p.material
                    }) }>
                        <td scope="row">{ p.material }</td>
                        <td className="text-right">{ p.price } EUR</td>
                    </tr>
                )
            }
            </tbody>
        </Table>
    );
};

ItemPrice.propTypes = {
    // image: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
    // costs: PropTypes.object.isRequired
};

export default ItemPrice;