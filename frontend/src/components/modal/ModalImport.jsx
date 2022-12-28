import React from 'react';
import AlertMessage from '../layout/AlertMessage';

const ModalImport = ({
    toggleShowCreate,
    handleSubmit,
    register,
    errors,
    onSubmit,
    isEdit,
    alert,
    children,
}) => {
    return (
        <div className="modal-product-line">
            <div onClick={toggleShowCreate} className="overlay"></div>
            <form className="content" onSubmit={handleSubmit(onSubmit)}>
                {children}
            </form>
        </div>
    );
};

export default ModalImport;
