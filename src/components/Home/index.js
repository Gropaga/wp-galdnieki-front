import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestHome, receiveHome, receiveError } from '../../actions/home'

import JumbotronLanding from './JumbotronLanding'
import ItemCards from '../ItemCards'

class Home extends React.Component {
    render() {
        return this.props.isFetching ?
            <h1>Loading...</h1> :
            <div>
                <JumbotronLanding { ...this.props } />
                {/*<ItemCards { ...this.props.doors } />*/}
            </div>
    }

    async componentWillMount() {
        if (typeof this.props.updated  === 'undefined') {
            const rawResponse = await fetch('http://gald.lv:8080/wp-json/shop/v1/landing-page/');
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
});

const mapDispatchToProps = dispatch => ({
    requestHome: (language) => dispatch(requestHome(language)),
    receiveHome: (json) => dispatch(receiveHome(json)),
    receiveError: (json) => dispatch(receiveError(json)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)