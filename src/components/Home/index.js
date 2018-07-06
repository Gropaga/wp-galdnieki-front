import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestHome, receiveHome, receiveError, selectDimensions } from '../../actions/home'
import { Button } from 'reactstrap';
import JumbotronLanding from './JumbotronLanding'
import ItemCards from '../ItemCards'

class Home extends React.Component {
    render() {
        return this.props.isFetching ?
            <h1>Loading...</h1> :
            <div>
                <JumbotronLanding
                    locale={ this.props.locale }
                    image={ this.props.landingImage }
                    jumbo={ this.props.jumbo }
                />
                <h4>
                    Двери
                    {" "}
                    <Button outline color="primary" size="sm">
                        посмотреть каталог дверей
                    </Button>
                </h4>
                <ItemCards
                    locale={ this.props.locale }
                    doors={ this.props.doors }
                    selectDimensions={ this.props.selectDimensions }
                />
            </div>
    }

    async componentWillMount() {
        if (typeof this.props.updated  === 'undefined') {
            const rawResponse = await fetch('http://gald.lv:8080/' +
                'wp-json/shop/v1/landing-page/');
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
        dispatch(selectDimensions(doorId, dimensions))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)