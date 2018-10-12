import React from 'react'
import ReactGA from 'react-ga';

export default function Analytics(props) {
    ReactGA.pageview(props.history.location.pathname);
    return props.children;
}