import React from 'react';
import AlertMessage from '../layout/AlertMessage';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ModalImport = ({
    toggleShowCreate,
    handleSubmit,
    register,
    errors,
    onSubmit,
    isEdit,
    alert,
    children,
    toggleShowImport,
}) => {
    return (
        <div className="modal-product-line">
            <div onClick={toggleShowImport} className="overlay"></div>
            {/* <form className="content" onSubmit={handleSubmit(onSubmit)} type="file">
                {children}
            </form> */}
            <Form className="content">
                <span className="center title-2">Import Product</span>
                <Form.Control
                    type="file"
                    placeholder="Disabled input"
                    aria-label="Disabled input example"
                />
                {/* <Form.Group className="content" action="/">
                    <Form.Control type="Submit" />
                </Form.Group> */}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default ModalImport;
