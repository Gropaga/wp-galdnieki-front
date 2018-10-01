const SECTION = 'home';

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestHome, receiveHome, receiveError,
    selectDimensions, selectColor } from '../../actions/home'
import { Button } from 'reactstrap';
import JumbotronLanding from './JumbotronLanding'
import ItemCards from '../ItemCards'
import { _, getLocale } from "../../lib/i18n";
import LinkI18n from "../Helpers/LinkI18n";

import * as actions from "../../actions/common"

import DocumentTitle from "../DocumentTitle";

class Home extends React.Component {
    render() {
        return <DocumentTitle title={ _(SECTION) }>
            {
                this.props.isFetching || !this.props.updated ?
                    <h1>Loading...</h1> :
                    <div>
                        <JumbotronLanding
                            locale={ getLocale() }
                            image={ this.props.landingImage }
                            jumbo={ this.props.jumbo }
                        />
                        <div className="row">
                            <div className="col-md-12">
                                <h4>
                                    { _('doors') }
                                    {" "}
                                    <LinkI18n section="doors">
                                        <Button outline color="primary" size="sm">
                                            { _('door catalogue') }
                                        </Button>
                                    </LinkI18n>
                                </h4>
                            </div>
                            <ItemCards
                                locale={ getLocale() }
                                itemSection={'doors'}
                                items={ filterItems(this.props.doors) }
                                selectDimensions={ this.props.selectDimensions }
                                selectColor={ this.props.selectColor }
                                history={ this.props.history }
                            />
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <h4>
                                    { _('windows') }
                                    {" "}
                                    <LinkI18n section="windows">
                                        <Button outline color="primary" size="sm">
                                            { _('window catalogue') }
                                        </Button>
                                    </LinkI18n>
                                </h4>
                            </div>
                            <ItemCards
                                locale={ getLocale() }
                                itemSection={'windows'}
                                items={ filterItems(this.props.windows) }
                                selectDimensions={ this.props.selectDimensions }
                                selectColor={ this.props.selectColor }
                                history={ this.props.history }
                            />
                        </div>
                    </div>
            }
        </DocumentTitle>;
    }

    componentWillMount() {
        this.props.requestHome();
    }
}

const filterItems = items => {
    return Object.keys(items)
        .filter(itemId => items[itemId].locale === getLocale())
        .filter(itemId => !!items[itemId].showOnLandingPage)
        .reduce((filteredItems, filteredItemId) => {
            return {
                ...filteredItems,
                [filteredItemId]: items[filteredItemId]
            }
        }, {});
};

Home.propTypes = {
    isFetching: PropTypes.bool,
    requestHome: PropTypes.func.isRequired,
    receiveError: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        isFetching: state.isFetching,
        landingImage: state.home.landingImage,
        doors: state.doors,
        windows: state.windows,
        jumbo: state.home.jumbo,
        updated: state.allLoaded[SECTION]
    }
};

const mapDispatchToProps = dispatch => ({
    requestHome: () => dispatch(actions.requestAllData(SECTION)),
    receiveError: (json) => dispatch(receiveError(json)),

    selectDimensions: (doorId, dimensions) =>
        dispatch(selectDimensions(doorId, dimensions)),

    selectColor: (doorId, colorIndex) =>
        dispatch(selectColor(doorId, colorIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)