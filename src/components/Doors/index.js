import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestDoors, receiveDoors,
    selectDimensions, selectColor } from '../../actions/doors'
import ItemCards from '../ItemCards'
import { _, getLocale } from "../../lib/i18n";

class Doors extends React.Component {
    render() {
        console.log('this.props.isFetching', this.props.isFetching);

        return this.props.isFetching ?
            <h1>Loading...</h1> :
            <div>
                <h4>
                    { _('Doors') }
                </h4>
                <ItemCards
                    locale={ getLocale() }
                    doors={ filterDoors(this.props.doors) }
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
    receiveDoors: PropTypes.func.isRequired,
    receiveError: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isFetching: state.isFetching,
    doors: state.doors,
    doorsUpdated: state.doorsUpdated
});

const mapDispatchToProps = dispatch => ({
    requestDoors: () => dispatch(requestDoors()),
    receiveDoors: (json) => dispatch(receiveDoors(json)),
    receiveError: (json) => dispatch(receiveError(json)),

    selectDimensions: (doorId, dimensions) =>
        dispatch(selectDimensions(doorId, dimensions)),

    selectColor: (doorId, colorIndex) =>
        dispatch(selectColor(doorId, colorIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(Doors)