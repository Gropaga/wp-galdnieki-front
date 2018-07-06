import React from 'react';
import PropTypes from 'prop-types'
import { Table } from 'reactstrap';

const ItemPrice = ({ price, selected }) => {
    return (
        <Table size="sm">
            <tbody>
            {
                price.filter(p =>
                    p.height === selected.height && p.width === selected.width
                ).map(p =>
                    <tr key={ JSON.stringify({
                        price: p.price,
                        material: p.material
                    }) }>
                        <th scope="row">{ p.material }</th>
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