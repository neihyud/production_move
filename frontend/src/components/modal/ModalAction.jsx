import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalAction({ title, body, setShowModal, handleAction, showModal, isDone }) {
    const handleClose = () => setShowModal(false);
    const type = isDone ? 'success' : 'danger';

    return (
        <div className="modal show" style={{ display: 'block' }}>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{body}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant={type} onClick={handleAction}>
                        Done
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalAction;
