import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestData, receiveData } from '../../actions/common'
import { _, getLocale } from "../../lib/i18n";
import { UncontrolledCarousel } from "reactstrap";

class Contacts extends React.Component {
    render() {
        return this.props.isFetching  || !this.props.updated ?
            <h1>Loading...</h1> :
            <div>
                <h4>
                    { _('Contacts') }
                </h4>
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        {
                            this.props.contacts &&
                            this.props.contacts.description &&
                            this.props.contacts.description[getLocale()] &&
                            <div dangerouslySetInnerHTML={{__html: this.props.contacts.description[getLocale()]}} />
                        }
                    </div>
                    <div className="col-lg-6 col-md-6">
                        {
                            this.props.contacts && this.props.contacts.gallery &&
                            <UncontrolledCarousel
                                interval={0}
                                autoPlay={false}
                                items={getImages(this.props.contacts.gallery)}
                            />
                        }
                    </div>
                </div>
            </div>
    }

    componentWillMount() {
        this.props.requestData();
    }
}

const getImages = (gallery) => gallery.map((img) => {
    return {
        src: img.medium_large[0],
        caption: '',
        altText: '',
    }
});

Contacts.propTypes = {
    isFetching: PropTypes.bool,
    requestData: PropTypes.func.isRequired,
    receiveData: PropTypes.func.isRequired,
    receiveError: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isFetching: state.isFetching,
    contacts: state.contacts,
    updated: state.contacts ? state.contacts.updated : undefined
});

const mapDispatchToProps = dispatch => ({
    requestData: () => dispatch(requestData('contacts', ['contacts'])),
    receiveData: (json) => dispatch(receiveData('contacts', json)),
    receiveError: (json) => dispatch(receiveError(json)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)