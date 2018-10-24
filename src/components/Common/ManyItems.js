import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemCards from '../ItemCards';
import { _, getLocale } from "../../lib/i18n";

import * as actions from "../../actions/common"
import BreadcrumbNav from "../BreadcrumbNav"
import DocumentTitle from "../DocumentTitle";
import Loading from "../Loading";

class MultipleItems extends React.Component {
    render() {
        return <DocumentTitle title={_(this.props.section)}>
            {
                this.props.isFetching || !this.props.updated ?
                    <DocumentTitle title={_(this.props.section)}>
                        <Loading />
                    </DocumentTitle> :
                    <div className="row">
                        <BreadcrumbNav breadcrumbs={
                            [
                                {
                                    node: _(this.props.section),
                                    key: this.props.section,
                                },
                            ]
                        } />
                        <div className="col-md-12">
                            <h2 className="home-heading">
                                { _(this.props.section) }
                                <hr />
                            </h2>
                        </div>
                        <ItemCards
                            locale={ getLocale() }
                            items={ this.filterItems(this.props[this.props.section]) }
                            itemSection={ this.props.section }
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

MultipleItems.propTypes = {
    isFetching: PropTypes.bool,
    requestItems: PropTypes.func.isRequired,
};

const mapStateToProps = section => state => {
    return {
        isFetching: state.isFetching,
        [section]: state[section],
        updated: state.allLoaded[section],
        section: section
    }
};

MultipleItems.propTypes = {
    isFetching: PropTypes.bool,
    updated: PropTypes.number,
    section: PropTypes.string,

    requestItems: PropTypes.func.isRequired,
    selectDimensions: PropTypes.func.isRequired,
    selectColor: PropTypes.func.isRequired,
};

const mapDispatchToProps = section => dispatch => ({
    requestItems: () => dispatch(actions.requestAllData(section)),

    selectDimensions: (itemId, dimensions) =>
        dispatch(actions.selectDimensions(section, itemId, dimensions)),

    selectColor: (itemId, colorIndex) =>
        dispatch(actions.selectColor(section, itemId, colorIndex))
});

export default (section) => {
    return connect(
        mapStateToProps(section),
        mapDispatchToProps(section)
    )(MultipleItems);
}