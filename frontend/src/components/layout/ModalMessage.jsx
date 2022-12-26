import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalMessage({ title, body, setShowModal, handleDelete, showModal }) {
    const handleClose = () => setShowModal(false);

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
                    <Button variant="danger" onClick={handleDelete}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalMessage;
