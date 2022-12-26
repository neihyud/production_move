import React from 'react';

const ModalProductLine = ({
    toggleShowCreate,
    handleSubmit,
    register,
    errors,
    onSubmit,
    isEdit,
}) => {
    return (
        <div className="modal-product-line">
            <div onClick={toggleShowCreate} className="overlay"></div>
            <form className="content" onSubmit={handleSubmit(onSubmit)}>
                {isEdit ? (
                    <span className="center title-2">Edit Product Line</span>
                ) : (
                    <span className="center title-2">Create Product Line</span>
                )}
                <label className="row">
                    Code
                    <input
                        {...register('code', { required: true })}
                        placeholder="XM_2512"
                        className="input"
                        disabled={isEdit}
                    />
                </label>
                {errors.code && <span className="error">This field is required</span>}
                <label className="row">
                    Name
                    <input
                        {...register('productLine', { required: true })}
                        placeholder="Honda"
                        className="input"
                    />
                </label>
                {errors.name && <span className="error">This field is required</span>}
                <label className="row">
                    Description
                    <textarea
                        {...register('description', { required: true })}
                        placeholder="..."
                        className="textarea"
                    />
                </label>
                {errors.description && <span className="error">This field is required</span>}

                {isEdit ? (
                    <button className="btn btn-success">Edit</button>
                ) : (
                    <button className="btn btn-success">Create</button>
                )}
            </form>
        </div>
    );
};

export default ModalProductLine;
