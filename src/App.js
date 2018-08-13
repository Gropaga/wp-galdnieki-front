import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import routes from './routes'

const App = ({ history, path }) => {
    return (
        <ConnectedRouter history={history}>
            { routes(history, path, path.params.language) }
        </ConnectedRouter>
    )
};

App.propTypes = {
    history: PropTypes.object,
};

export default App