const SECTION = 'doors';

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { _, _p, _lRev, getLocale } from "../../lib/i18n";
import Carousel from "../Item/Carousel";
import Description from "../Item/Description";

import * as actions from "../../actions/common"
import BreadcrumbNav from "../BreadcrumbNav"
import DocumentTitle from "../DocumentTitle";

class Door extends React.Component {
    render() {
        return this.props.isFetching ?
            <DocumentTitle title={_(SECTION)}><h1>Loading...</h1></DocumentTitle> :
            filterItems(this.props[SECTION]).reduce((acc, item) =>
                <DocumentTitle title={ `${item.title} - ${_(SECTION)}` }>
                    <div className="row">
                    <BreadcrumbNav breadcrumbs={
                        [
                            {
                                node: _(SECTION),
                                key: SECTION,
                                url: `${_lRev()}${_p(SECTION)}`,
                            },
                            {
                                node: item.title,
                                key: item.title
                            }
                        ]
                    } />
                    <Carousel item={ item } />
                    <Description
                        item={ item }
                        selectColor={ this.props.selectColor }
                        selectDimensions={ this.props.selectDimensions }
                    />
                </div>
                </DocumentTitle>
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