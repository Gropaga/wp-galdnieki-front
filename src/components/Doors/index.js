import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestHome, receiveHome, receiveError,
    selectDimensions, selectColor } from '../../actions/home'
import ItemCards from '../ItemCards'
import { _, getLocale } from "../../lib/i18n";

class Home extends React.Component {
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
            this.props.receiveHome(json);
        }
    }
}

Home.propTypes = {
    isFetching: PropTypes.bool,
    requestHome: PropTypes.func.isRequired,
    receiveHome: PropTypes.func.isRequired,
    receiveError: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isFetching: state.home.isFetching,
    landingImage: state.home.landingImage,
    doors: state.home.doors,
    jumbo: state.home.jumbo,
    updated: state.home.updated
});

const mapDispatchToProps = dispatch => ({
    requestHome: (language) => dispatch(requestHome(language)),
    receiveHome: (json) => dispatch(receiveHome(json)),
    receiveError: (json) => dispatch(receiveError(json)),

    selectDimensions: (doorId, dimensions) =>
        dispatch(selectDimensions(doorId, dimensions)),

    selectColor: (doorId, colorIndex) =>
        dispatch(selectColor(doorId, colorIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)