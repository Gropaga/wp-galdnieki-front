import { connect } from 'react-redux'

function localeConnect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options = {}
) {
    return connect(
        state => {
            return Object.assign(mapStateToProps(state), {
                locale: state.home.locale
            });
        },
        mapDispatchToProps,
        mergeProps,
        options
    )
}

export default localeConnect;