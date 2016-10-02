import React, { Component } from 'react';
import { Notification } from 'react-notification';

class NotificationWrapper extends Component {
    onDismiss(){
        const { notification, setNotification } = this.props;
        notification.isActive = 'false';
        setNotification(notification);
    }
    render() {
        const {notification} = this.props;
        const success = notification.isSuccess === 'true' ? 'success-notification notification' : 'failure-notification notification';
        const isActive = (notification.isActive === 'true');
        const style = (notification.style === 'true');
        return(
            <Notification
                className={success}
                isActive={isActive}
                message={notification.message}
                dismissAfter={notification.dismissAfter}
                onDismiss={this.onDismiss.bind(this)}
                style={style}
            />
        )
    }
}

NotificationWrapper.propTypes = {
    notification: React.PropTypes.object.isRequired,
    setNotification: React.PropTypes.func.isRequired
};

export default NotificationWrapper
