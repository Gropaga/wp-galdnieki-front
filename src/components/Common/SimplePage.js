import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from "../../actions/common"
import {_, getLocale} from "../../lib/i18n";
import UncontrolledCarousel from "reactstrap/lib/UncontrolledCarousel";
import BreadcrumbNav from "../BreadcrumbNav"
import DocumentTitle from "../DocumentTitle";
import Loading from "../Loading";

class SimplePage extends React.Component {
    render() {
        return <DocumentTitle title={_(this.props.section)}>
            {
                this.props.isFetching || !this.props.updated ?
                    <Loading/> :
                    <div className="row">
                        <BreadcrumbNav breadcrumbs={
                            [
                                {
                                    node: _(this.props.section),
                                    key: this.props.section,
                                }
                            ]
                        }/>
                        <div className="col-lg-6 col-md-6">
                            {
                                this.props[this.props.section] &&
                                this.props[this.props.section].description &&
                                this.props[this.props.section].description[getLocale()] &&
                                <div dangerouslySetInnerHTML={{__html: this.props[this.props.section].description[getLocale()]}}/>
                            }
                        </div>
                        <div className="col-lg-6 col-md-6">
                            {
                                this.props[this.props.section] && this.props[this.props.section].gallery &&
                                <UncontrolledCarousel
                                    interval={0}
                                    autoPlay={false}
                                    items={getImages(this.props[this.props.section].gallery)}
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
        src: IMAGE_URL + img.medium_large[0],
        caption: '',
        altText: '',
    }
});

SimplePage.propTypes = {
    isFetching: PropTypes.bool,
    updated: PropTypes.number,
    section: PropTypes.string,

    requestPage: PropTypes.func.isRequired,
};

const mapStateToProps = section => state => ({
    isFetching: state.isFetching,
    [section]: state[section],
    updated: state.allLoaded[section],
    section: section
});

const mapDispatchToProps = section => dispatch => ({
    requestPage: () => dispatch(actions.requestAllData(section)),
});

export default (section) => {
    return connect(
        mapStateToProps(section),
        mapDispatchToProps(section)
    )(SimplePage);
}