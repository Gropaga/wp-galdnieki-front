const SECTION = 'interiors';

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { _, _p, _lRev, getLocale } from "../../lib/i18n";
import Carousel from "../Item/Carousel";
import Description from "../Item/Description";
import BreadcrumbNav from "../BreadcrumbNav";
import DocumentTitle from "../DocumentTitle";

import * as actions from "../../actions/common"

class Interior extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._numberOfBalls = 3;
    }

    get numberOfBalls() {
        return this._numberOfBalls;
    }

    render() {
        return this.props.isFetching ?
            <DocumentTitle title={_(SECTION)}>
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
                </div>
            </DocumentTitle> :
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

Interior.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Interior)