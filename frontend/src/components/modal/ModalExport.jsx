import React from 'react';

const ModalExport = ({ handleSubmit, onSubmit, toggleShowExport, children, title }) => {
    return (
        <div className="modal-product-line">
            <div onClick={toggleShowExport} className="overlay"></div>
            <form className="content" onSubmit={handleSubmit(onSubmit)}>
                <span className="center title-2">{title}</span>

                {children}
            </form>
        </div>
    );
};

export default ModalExport;
