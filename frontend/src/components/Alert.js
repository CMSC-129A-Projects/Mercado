import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
    // <div key={alert.id} className={`container-fluid alert alert-${alert.alertType} alert-sm fade show text-center`} role="alert">
    <div key={alert.id} className="container-fluid alert alert-light alert-sm fade show text-center" role="alert">
        {alert.msg}
    </div>
))

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert)