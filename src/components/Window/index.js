const SECTION = 'windows';

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { _, getLocale } from "../../lib/i18n";
import Carousel from "../Item/Carousel";
import Description from "../Item/Description";

import * as actions from "../../actions/common"

class Door extends React.Component {
    render() {
        return this.props.isFetching ?
            <h1>Loading...</h1> :
            filterItems(this.props[SECTION]).reduce((acc, item) =>
                    <div className="row">
                        <Carousel item={ item } />
                        <Description
                            item={ item }
                            selectColor={ this.props.selectColor }
                            selectDimensions={ this.props.selectDimensions }
                        />
                    </div>
                , <div>{' '}</div>);
    }

    componentWillMount() {
        this.props.requestItem(this.props.match.params.id.toString().replace('/',''));
    }
}

const filterItems = items =>
    Object.keys(items)
        .filter(itemId => items[itemId].locale === getLocale())
        .filter(itemId => !!items[itemId].display)
        .reduce((filteredItems, filteredItemId) => {
            return [items[filteredItemId]] // get only single item
        }, []);

Door.propTypes = {
    isFetching: PropTypes.bool,
    requestItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isFetching: state.isFetching,
    [SECTION]: state[SECTION],
});

const mapDispatchToProps = dispatch => ({
    requestItem: (itemId) => dispatch(actions.requestData(SECTION, itemId)),

    selectDimensions: (itemId, dimensions) =>
        dispatch(actions.selectDimensions(SECTION, itemId, dimensions)),

    selectColor: (itemId, colorIndex) =>
        dispatch(actions.selectColor(SECTION, itemId, colorIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(Door)