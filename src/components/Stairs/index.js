import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestStairs, receiveStairs } from '../../actions/stairs'
import { _, getLocale } from "../../lib/i18n";
import { UncontrolledCarousel } from "reactstrap";

class Stairs extends React.Component {
    render() {
        return this.props.isFetching  || !this.props.stairsUpdated ?
            <h1>Loading...</h1> :
            <div>
                <h4>
                    { _('Stairs') }
                </h4>
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        {
                            this.props.stairs &&
                            this.props.stairs.description &&
                            this.props.stairs.description[getLocale()] &&
                            <div dangerouslySetInnerHTML={{__html: this.props.stairs.description[getLocale()]}} />
                        }
                    </div>
                    <div className="col-lg-6 col-md-6">
                        {
                            this.props.stairs && this.props.stairs.gallery &&
                            <UncontrolledCarousel
                                interval={0}
                                autoPlay={false}
                                items={getImages(this.props.stairs.gallery)}
                            />
                        }
                    </div>
                </div>
            </div>
    }

    async componentWillMount() {
        this.props.requestStairs();
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
    requestStairs: PropTypes.func.isRequired,
    receiveStairs: PropTypes.func.isRequired,
    receiveError: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isFetching: state.isFetching,
    stairs: state.stairs,
    stairsUpdated: state.stairsUpdated
});

const mapDispatchToProps = dispatch => ({
    requestStairs: () => dispatch(requestStairs()),
    receiveStairs: (json) => dispatch(receiveStairs(json)),
    receiveError: (json) => dispatch(receiveError(json)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stairs)