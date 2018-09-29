import React from 'react';
import PropTypes from 'prop-types';

const DocumentTitle = ({children, title}) => {
    document.title = title;
    return children;
};

DocumentTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

export default DocumentTitle;