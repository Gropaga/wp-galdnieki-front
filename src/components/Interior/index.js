import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestInteriors, receiveInteriors,
    selectDimensions, selectColor } from '../../actions/interiors'
import ItemCards from '../ItemCards'
import { _, getLocale } from "../../lib/i18n";

class Interiors extends React.Component {
    render() {
        return this.props.isFetching  || !this.props.interiorsUpdated ?
            <h1>Loading...</h1> :
            <div>
                <h4>
                    { _('Interiors') }
                </h4>
                <ItemCards
                    locale={ getLocale() }
                    itemSection={ 'interiors' }
                    items={ filterInteriors(this.props.interiors) }
                    selectDimensions={ this.props.selectDimensions }
                    selectColor={ this.props.selectColor }
                />
            </div>
    }

    async componentWillMount() {
        this.props.requestInteriors();
    }
}

const filterInteriors = interiors =>
   Object.keys(interiors)
       .filter(interiorId => interiors[interiorId].locale === getLocale())
       .reduce((filteredInteriors, filteredInteriorId) => {
           return {
               ...filteredInteriors,
               [filteredInteriorId]: interiors[filteredInteriorId]
           }
       }, {});

Interiors.propTypes = {
    isFetching: PropTypes.bool,
    requestInteriors: PropTypes.func.isRequired,
    receiveInteriors: PropTypes.func.isRequired,
    receiveError: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isFetching: state.isFetching,
    interiors: state.interiors,
    interiorsUpdated: state.interiorsUpdated
});

const mapDispatchToProps = dispatch => ({
    requestInteriors: () => dispatch(requestInteriors()),
    receiveInteriors: (json) => dispatch(receiveInteriors(json)),
    receiveError: (json) => dispatch(receiveError(json)),

    selectDimensions: (interiorId, dimensions) =>
        dispatch(selectDimensions(interiorId, dimensions)),

    selectColor: (interiorId, colorIndex) =>
        dispatch(selectColor(interiorId, colorIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(Interiors)