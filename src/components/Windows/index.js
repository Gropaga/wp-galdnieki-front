import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestWindows, receiveWindows,
    selectDimensions, selectColor } from '../../actions/windows'
import ItemCards from '../ItemCards'
import { _, getLocale } from "../../lib/i18n";

class Windows extends React.Component {
    render() {
        return this.props.isFetching  || !this.props.windowsUpdated ?
            <h1>Loading...</h1> :
            <div>
                <h4>
                    { _('Windows') }
                </h4>
                <ItemCards
                    locale={ getLocale() }
                    itemSection={ 'windows' }
                    items={ filterWindows(this.props.windows) }
                    selectDimensions={ this.props.selectDimensions }
                    selectColor={ this.props.selectColor }
                />
            </div>
    }

    async componentWillMount() {
        this.props.requestWindows();
    }
}

const filterWindows = windows =>
   Object.keys(windows)
       .filter(windowId => windows[windowId].locale === getLocale())
       .reduce((filteredWindows, filteredWindowId) => {
           return {
               ...filteredWindows,
               [filteredWindowId]: windows[filteredWindowId]
           }
       }, {});

Windows.propTypes = {
    isFetching: PropTypes.bool,
    requestWindows: PropTypes.func.isRequired,
    receiveWindows: PropTypes.func.isRequired,
    receiveError: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isFetching: state.isFetching,
    windows: state.windows,
    windowsUpdated: state.windowsUpdated
});

const mapDispatchToProps = dispatch => ({
    requestWindows: () => dispatch(requestWindows()),
    receiveWindows: (json) => dispatch(receiveWindows(json)),
    receiveError: (json) => dispatch(receiveError(json)),

    selectDimensions: (windowId, dimensions) =>
        dispatch(selectDimensions(windowId, dimensions)),

    selectColor: (windowId, colorIndex) =>
        dispatch(selectColor(windowId, colorIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(Windows)