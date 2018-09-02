import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestHome, receiveHome, receiveError,
    selectDimensions, selectColor } from '../../actions/home'
import { Button } from 'reactstrap';
import JumbotronLanding from './JumbotronLanding'
import ItemCards from '../ItemCards'
import { _, getLocale } from "../../lib/i18n";

class Home extends React.Component {
    render() {
        return this.props.isFetching ?
            <h1>Loading...</h1> :
            <div>
                <JumbotronLanding
                    locale={ getLocale() }
                    image={ this.props.landingImage }
                    jumbo={ this.props.jumbo }
                />
                <h4>
                    { _('Doors') }
                    {" "}
                    <Button outline color="primary" size="sm">
                        { _('door catalogue') }
                    </Button>
                </h4>
                <ItemCards
                    locale={ getLocale() }
                    doors={ filterDoors(this.props.doors) }
                    selectDimensions={ this.props.selectDimensions }
                    selectColor={ this.props.selectColor }
                    history={ this.props.history }
                />
            </div>
    }

    componentWillMount() {
        this.props.requestHome();
    }
}

const filterDoors = doors =>
    Object.keys(doors)
        .filter(doorId => doors[doorId].locale === getLocale())
        .filter(doorId => !!doors[doorId].showOnLandingPage)
        .reduce((filteredDoors, filteredDoorId) => {
            return {
                ...filteredDoors,
                [filteredDoorId]: doors[filteredDoorId]
            }
        }, {});

Home.propTypes = {
    isFetching: PropTypes.bool,
    requestHome: PropTypes.func.isRequired,
    receiveHome: PropTypes.func.isRequired,
    receiveError: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        isFetching: state.isFetching,
        landingImage: state.landingImage,
        doors: state.doors,
        jumbo: state.jumbo,
        homeUpdated: state.homeUpdated
    }
};

const mapDispatchToProps = dispatch => ({
    requestHome: () => dispatch(requestHome()),
    receiveHome: (json) => dispatch(receiveHome(json)),
    receiveError: (json) => dispatch(receiveError(json)),

    selectDimensions: (doorId, dimensions) =>
        dispatch(selectDimensions(doorId, dimensions)),

    selectColor: (doorId, colorIndex) =>
        dispatch(selectColor(doorId, colorIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)