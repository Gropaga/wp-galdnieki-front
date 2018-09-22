import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestWindow, receiveWindow,
    selectDimensions, selectColor } from '../../actions/window'
import { _, getLocale } from "../../lib/i18n";
import Item from "../Item";

class Window extends React.Component {
    render() {
        return this.props.isFetching ?
            <h1>Loading...</h1> :
            filterWindows(this.props.windows).reduce((acc, window) =>
                Item({
                    item: window,
                    selectColor: this.props.selectColor,
                    selectDimensions: this.props.selectDimensions
                }), <div>{' '}</div>);
    }

    componentWillMount() {
        this.props.requestWindow(this.props.match.params.id.toString().replace('/',''));
    }
}

const filterWindows = windows => {
    return Object.keys(windows)
        .filter(windowId => windows[windowId].locale === getLocale())
        .filter(windowId => !!windows[windowId].display)
        .reduce((filteredWindows, filteredWindowId) => {
            return [windows[filteredWindowId]] // get only single window
        }, []);
};

Window.propTypes = {
    isFetching: PropTypes.bool,
    requestWindow: PropTypes.func.isRequired,
    receiveWindow: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isFetching: state.isFetching,
    landingImage: state.landingImage,
    windows: state.windows,
});

const mapDispatchToProps = dispatch => ({
    requestWindow: (windowId) => dispatch(requestWindow(windowId)),
    receiveWindow: (json, windowId) => dispatch(receiveWindow(json, windowId)),

    selectDimensions: (windowId, dimensions) =>
        dispatch(selectDimensions(windowId, dimensions)),

    selectColor: (windowId, colorIndex) =>
        dispatch(selectColor(windowId, colorIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(Window)