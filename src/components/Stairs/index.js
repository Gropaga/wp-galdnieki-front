const SECTION = 'stairs';

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from "../../actions/common"
import { _, getLocale } from "../../lib/i18n";
import { UncontrolledCarousel } from "reactstrap";
import BreadcrumbNav from "../BreadcrumbNav"
import DocumentTitle from "../DocumentTitle";

class Stairs extends React.Component {
    render() {
        return <DocumentTitle title={_(SECTION)}>
            {
                this.props.isFetching || !this.props.updated ?
                <h1>Loading...</h1> :
                <div className="row">
                    <BreadcrumbNav breadcrumbs={
                        [
                            {
                                node: _(SECTION),
                                key: SECTION,
                            }
                        ]
                    }/>
                    <div className="col-lg-6 col-md-6">
                        {
                            this.props[SECTION] &&
                            this.props[SECTION].description &&
                            this.props[SECTION].description[getLocale()] &&
                            <div dangerouslySetInnerHTML={{__html: this.props[SECTION].description[getLocale()]}}/>
                        }
                    </div>
                    <div className="col-lg-6 col-md-6">
                        {
                            this.props[SECTION] && this.props[SECTION].gallery &&
                            <UncontrolledCarousel
                                interval={0}
                                autoPlay={false}
                                items={getImages(this.props[SECTION].gallery)}
                            />
                        }
                    </div>
                </div>
            }
        </DocumentTitle>;
    }

    async componentWillMount() {
        this.props.requestPage();
    }
}

const getImages = (gallery) => gallery.map((img) => {
    return {
        src: img.medium_large[0],
        caption: '',
        altText: '',
    }
});

Stairs.propTypes = {
    isFetching: PropTypes.bool,
    requestPage: PropTypes.func.isRequired,
    receiveError: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isFetching: state.isFetching,
    [SECTION]: state[SECTION],
    updated: state.allLoaded[SECTION]
});

const mapDispatchToProps = dispatch => ({
    requestPage: () => dispatch(actions.requestAllData(SECTION)),
    receiveError: (json) => dispatch(receiveError(json)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stairs)