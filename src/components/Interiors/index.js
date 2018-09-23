const SECTION = 'interiors';

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ItemCards from '../ItemCards'
import { _, getLocale } from "../../lib/i18n";

import * as actions from "../../actions/common"

class Interiors extends React.Component {
    render() {
        return this.props.isFetching || !this.props.updated ?
            <h1>Loading...</h1> :
            <div>
                <h4>
                    { _('Interiors') }
                </h4>
                <ItemCards
                    locale={ getLocale() }
                    items={ this.filterItems(this.props[SECTION]) }
                    itemSection={ SECTION }
                    selectDimensions={ this.props.selectDimensions }
                    selectColor={ this.props.selectColor }
                />
            </div>
    }

    filterItems(items) {
        return Object.keys(items)
            .filter(itemId => items[itemId].locale === getLocale())
            .reduce((filteredItems, filteredItemId) => {
                return {
                    ...filteredItems,
                    [filteredItemId]: items[filteredItemId]
                }
            }, {})
    }

    componentWillMount() {
        this.props.requestItems();
    }
}

const mapStateToProps = state => ({
    isFetching: state.isFetching,
    [SECTION]: state[SECTION],
    updated: state.allLoaded[SECTION]
});

Interiors.propTypes = {
    isFetching: PropTypes.bool,
    requestItems: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    requestItems: () => dispatch(actions.requestAllData(SECTION)),

    selectDimensions: (itemId, dimensions) =>
        dispatch(actions.selectDimensions(SECTION, itemId, dimensions)),

    selectColor: (itemId, colorIndex) =>
        dispatch(actions.selectColor(SECTION, itemId, colorIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(Interiors)