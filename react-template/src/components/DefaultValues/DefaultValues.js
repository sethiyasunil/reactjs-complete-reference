import React from 'react'
import PropTypes from 'prop-types'

class DefaultValues extends React.Component {
render() {
        return (
            <span>The user's ID is {this.props.userID}</span>
        )
    }
}

DefaultValues.propTypes = {
    someObject: PropTypes.object,
    userID: PropTypes.number.isRequired,
    title: PropTypes.string
};
DefaultValues.defaultProps = {
    someObject: {},
    title: 'My Default Title'
}

export default DefaultValues