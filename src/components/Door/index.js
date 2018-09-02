import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestDoor, receiveDoor,
    selectDimensions, selectColor } from '../../actions/door'
import ItemCards from '../ItemCards'
import { _, getLocale } from "../../lib/i18n";

class Door extends React.Component {
    render() {
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

    componentWillMount() {
        this.props.requestDoor(this.props.match.params.id.toString().replace('/',''));
    }
}

const filterDoors = doors =>
    Object.keys(doors)
        .filter(doorId => doors[doorId].locale === getLocale())
        .filter(doorId => !!doors[doorId].display)
        .reduce((filteredDoors, filteredDoorId) => {
            return {
                ...filteredDoors,
                [filteredDoorId]: doors[filteredDoorId]
            }
        }, {});

Door.propTypes = {
    isFetching: PropTypes.bool,
    requestDoor: PropTypes.func.isRequired,
    receiveDoor: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isFetching: state.isFetching,
    landingImage: state.landingImage,
    doors: state.doors,
});

const mapDispatchToProps = dispatch => ({
    requestDoor: (doorId) => dispatch(requestDoor(doorId)),
    receiveDoor: (json, doorId) => dispatch(receiveDoor(json, doorId)),

    selectDimensions: (doorId, dimensions) =>
        dispatch(selectDimensions(doorId, dimensions)),

    selectColor: (doorId, colorIndex) =>
        dispatch(selectColor(doorId, colorIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(Door)