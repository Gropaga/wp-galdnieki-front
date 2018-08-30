import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestDoor, receiveDoor, receiveError,
    selectDimensions, selectColor, fetchingToggle } from '../../actions/door'
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
                    doors={ this.props.doors }
                    selectDimensions={ this.props.selectDimensions }
                    selectColor={ this.props.selectColor }
                />
            </div>
    }

    async componentWillMount() {
        if (typeof this.props.doors === 'undefined' ||
            typeof this.props.doors[this.props.match.params.id] === 'undefined' ||
            typeof this.props.doors[this.props.match.params.id].updated === 'undefined'
        ) {
            this.props.requestDoor(this.props.match.params.id.toString().replace('/',''));
        }
    }
}

Door.propTypes = {
    isFetching: PropTypes.bool,
    requestDoor: PropTypes.func.isRequired,
    receiveDoor: PropTypes.func.isRequired,
    receiveError: PropTypes.func.isRequired,
    fetchingToggle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isFetching: state.door.isFetching,
    landingImage: state.door.landingImage,
    doors: state.door.doors,
});

const mapDispatchToProps = dispatch => ({
    requestDoor: (language) => dispatch(requestDoor(language)),
    receiveDoor: (json, doorId) => dispatch(receiveDoor(json, doorId)),
    receiveError: (json) => dispatch(receiveError(json)),
    fetchingToggle: (json) => dispatch(fetchingToggle()),

    selectDimensions: (doorId, dimensions) =>
        dispatch(selectDimensions(doorId, dimensions)),

    selectColor: (doorId, colorIndex) =>
        dispatch(selectColor(doorId, colorIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(Door)