import React from 'react';
import Toast from 'react-bootstrap/Toast';

const Toast = ({show, type}) => {
    return (
        <Toast
        show={show}
        style={{ position: 'fixed', top: '20%', right: '10px' }}
        className={`bg-${type} text-white`}
        onClose={() => setShowToast({ show: false, message: '', type: null })}
        delay={3000}
        autohide
    >
        <Toast.Body>
            <strong>{message}</strong>
        </Toast.Body>
    </Toast>
    );
};

export default Toast;
