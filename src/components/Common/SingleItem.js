import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { _, _p, _lRev, getLocale } from "../../lib/i18n";
import Carousel from "../Item/Carousel";
import Description from "../Item/Description";

import * as actions from "../../actions/common"
import BreadcrumbNav from "../BreadcrumbNav"
import DocumentTitle from "../DocumentTitle";
import Loading from "../Loading";

class SingleItem extends React.Component {
    render() {
        return this.props.isFetching ?
            <DocumentTitle title={_(this.props.section)}>
                <Loading />
            </DocumentTitle> :
            filterItems(this.props[this.props.section]).reduce((acc, item) =>
                    <DocumentTitle title={ `${item.title} - ${_(this.props.section)}` }>
                        <div className="row">
                            <BreadcrumbNav breadcrumbs={
                                [
                                    {
                                        node: _(this.props.section),
                                        key: this.props.section,
                                        url: `${_lRev()}${_p(this.props.section)}`,
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

SingleItem.propTypes = {
    isFetching: PropTypes.bool,
    updated: PropTypes.number,
    section: PropTypes.string,

    requestItems: PropTypes.func.isRequired,
    selectDimensions: PropTypes.func.isRequired,
    selectColor: PropTypes.func.isRequired,
};

const mapStateToProps = section => state => ({
    isFetching: state.isFetching,
    [section]: state[section],
    section: section
});

const mapDispatchToProps = section => dispatch => ({
    requestItem: (itemId) => dispatch(actions.requestData(section, itemId)),

    selectDimensions: (itemId, dimensions) =>
        dispatch(actions.selectDimensions(section, itemId, dimensions)),

    selectColor: (itemId, colorIndex) =>
        dispatch(actions.selectColor(section, itemId, colorIndex))
});

export default (section) => {
    return connect(
        mapStateToProps(section),
        mapDispatchToProps(section)
    )(SingleItem);
}