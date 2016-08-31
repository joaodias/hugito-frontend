import React, { Component } from 'react'
import { Notification } from 'react-notification'

class NotificationWrapper extends Component {
    onDismiss(){
        const { notification, setNotification } = this.props;
        notification.isActive = false;
        setNotification(notification);
    }
    render() {
        const {notification} = this.props;
        const success = notification.isSuccess === true ? 'success-notification notification' : 'failure-notification notification';
        return(
            <Notification
                className={success}
                isActive={this.props.notification.isActive}
                message={this.props.notification.message}
                dismissAfter={this.props.notification.dismissAfter}
                onDismiss={this.onDismiss.bind(this)}
                style={this.props.notification.style}
            />
        )
    }
}

NotificationWrapper.propTypes = {
    notification: React.PropTypes.object.isRequired,
    setNotification: React.PropTypes.func.isRequired
};

export default NotificationWrapper
