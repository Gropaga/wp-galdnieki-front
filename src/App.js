import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import routes from './routes'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome } from '@fortawesome/free-solid-svg-icons'

library.add(faHome);

const App = ({ history }) => {
    return (
        <ConnectedRouter history={history}>
            { routes(history) }
        </ConnectedRouter>
    )
};

App.propTypes = {
    history: PropTypes.object,
};

export default App