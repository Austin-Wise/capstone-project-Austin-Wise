import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import container from './container';
import styles from './styles.module.css';

class AlertItem extends Component {
  constructor(props) {
    super(props);
    this.timeout = setTimeout(this.clear, 3000);
  }

  clear = () => {
    if (this.timeout) clearTimeout(this.timeout);
    const { clearAlert, alert } = this.props;
    clearAlert(alert.id);
  };

  render() {
    const { alert } = this.props;
    return (
      <Alert
        color={alert.type}
        toggle={this.clear}
        className={StyleSheet.alert}
      >
        {alert.text}
      </Alert>
    );
  }
}

AlertItem.propTypes = {
  alert: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.number,
    text: PropTypes.string,
  }),
  clearAlert: PropTypes.func.isRequired,
};

AlertItem.defaultProps = {
  alert: {},
};

const Alerts = ({ alerts, clearAlert }) => {
  return (
    <div className={styles.alerts}>
      {alerts.map(alert => (
        <AlertItem alert={alert} key={alert.id} clearAlert={clearAlert} />
      ))}
    </div>
  );
};

Alerts.propTypes = {
  alerts: PropTypes.arrayOf(PropTypes.object),
  clearAlert: PropTypes.func.isRequired,
};

Alerts.defaultProps = {
  alerts: [],
};

export default container(Alerts);
