import React from 'react';
import AlertMessage from '../layout/AlertMessage';

const ModalExport = ({
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

export default ModalExport;
