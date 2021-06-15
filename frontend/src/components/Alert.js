import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <div key={alert.id} className={`container alert alert-${alert.alertType} fade show mt-3`} role="alert">
        {alert.msg}
    </div>
));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);