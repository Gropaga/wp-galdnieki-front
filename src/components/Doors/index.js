import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestDoors, receiveDoors, receiveError,
    selectDimensions, selectColor } from '../../actions/doors'
import ItemCards from '../ItemCards'
import { _, getLocale } from "../../lib/i18n";

class Doors extends React.Component {
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
        if (typeof this.props.updated  === 'undefined') {
            const rawResponse = await fetch('http://localhost:8080/' +
                'wp-json/shop/v1/doors/');
            const json = await rawResponse.json();
            this.props.receiveDoors(json);
        }
    }
}

Doors.propTypes = {
    isFetching: PropTypes.bool,
    requestDoors: PropTypes.func.isRequired,
    receiveDoors: PropTypes.func.isRequired,
    receiveError: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isFetching: state.doors.isFetching,
    landingImage: state.doors.landingImage,
    doors: state.doors.doors,
    jumbo: state.doors.jumbo,
    updated: state.doors.updated
});

const mapDispatchToProps = dispatch => ({
    requestDoors: (language) => dispatch(requestDoors(language)),
    receiveDoors: (json) => dispatch(receiveDoors(json)),
    receiveError: (json) => dispatch(receiveError(json)),

    selectDimensions: (doorId, dimensions) =>
        dispatch(selectDimensions(doorId, dimensions)),

    selectColor: (doorId, colorIndex) =>
        dispatch(selectColor(doorId, colorIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(Doors)