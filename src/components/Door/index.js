const SECTION = 'doors';

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestDoor, receiveDoor,
    selectDimensions, selectColor } from '../../actions/door'
import { _, getLocale } from "../../lib/i18n";
import Carousel from "./Carousel";
import Description from "./Description";

import * as actions from "../../actions/common"


class Door extends React.Component {
    render() {
        return this.props.isFetching ?
            <h1>Loading...</h1> :
            filterDoors(this.props.doors).reduce((acc, door) =>
                <div className="row">
                    <Carousel door={ door } />
                    <Description
                        door={ door }
                        selectColor={ this.props.selectColor }
                        selectDimensions={ this.props.selectDimensions }
                    />
                </div>
            , <div>{' '}</div>);
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
            return [doors[filteredDoorId]] // get only single door
        }, []);

Door.propTypes = {
    isFetching: PropTypes.bool,
    requestDoor: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isFetching: state.isFetching,
    landingImage: state.landingImage,
    doors: state.doors,
});

const mapDispatchToProps = dispatch => ({
    requestDoor: (doorId) => dispatch(actions.requestData(SECTION, doorId)),

    selectDimensions: (doorId, dimensions) =>
        dispatch(actions.selectDimensions(doorId, dimensions)),

    selectColor: (doorId, colorIndex) =>
        dispatch(actions.selectColor(doorId, colorIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(Door)