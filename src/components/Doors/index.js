const SECTION = 'doors';

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ItemCards from '../ItemCards'
import { _, getLocale } from "../../lib/i18n";

import * as actions from "../../actions/common"

class Doors extends React.Component {
    render() {
        return this.props.isFetching || !this.props.updated ?
            <h1>Loading...</h1> :
            <div>
                <h4>
                    { _('Doors') }
                </h4>
                <ItemCards
                    locale={ getLocale() }
                    items={ filterDoors(this.props.doors) }
                    itemSection={ 'doors' }
                    selectDimensions={ this.props.selectDimensions }
                    selectColor={ this.props.selectColor }
                />
            </div>
    }

    async componentWillMount() {
        this.props.requestDoors();
    }
}

const filterDoors = doors =>
   Object.keys(doors)
       .filter(doorId => doors[doorId].locale === getLocale())
       .reduce((filteredDoors, filteredDoorId) => {
           return {
               ...filteredDoors,
               [filteredDoorId]: doors[filteredDoorId]
           }
       }, {});

Doors.propTypes = {
    isFetching: PropTypes.bool,
    requestDoors: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isFetching: state.isFetching,
    doors: state.doors,
    updated: state.allLoaded[SECTION]
});

const mapDispatchToProps = dispatch => ({
    requestDoors: () => dispatch(actions.requestAllData(SECTION)),

    selectDimensions: (doorId, dimensions) =>
        dispatch(actions.selectDimensions(SECTION, doorId, dimensions)),

    selectColor: (doorId, colorIndex) =>
        dispatch(actions.selectColor(SECTION, doorId, colorIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(Doors)