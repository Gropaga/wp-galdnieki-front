const SECTION = 'doors';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemCards from '../ItemCards';
import { _, getLocale } from "../../lib/i18n";

import * as actions from "../../actions/common"
import BreadcrumbNav from "../BreadcrumbNav"
import DocumentTitle from "../DocumentTitle";

class Doors extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._numberOfBalls = 3;
    }

    get numberOfBalls() {
        return this._numberOfBalls;
    }

    render() {
        return <DocumentTitle title={_(SECTION)}>
            {
                this.props.isFetching || !this.props.updated ?
                <div className="row">
                    <div className="col-md-12">
                        <div className="la-container">
                            <div className="la-ball-fall la-3x">
                                {
                                    [...Array(this.numberOfBalls).keys()].map(index => <div key={index} />)
                                }
                            </div>
                        </div>
                    </div>
                </div> :
                <div className="row">
                    <BreadcrumbNav breadcrumbs={
                        [
                            {
                                node: _(SECTION),
                                key: SECTION,
                            },
                        ]
                    } />
                    <div className="col-md-12">
                        <h4>
                            { _(SECTION) }
                        </h4>
                    </div>
                    <ItemCards
                        locale={ getLocale() }
                        items={ this.filterItems(this.props[SECTION]) }
                        itemSection={ SECTION }
                        selectDimensions={ this.props.selectDimensions }
                        selectColor={ this.props.selectColor }
                    />
                </div>
            }
        </DocumentTitle>;
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

Doors.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Doors)