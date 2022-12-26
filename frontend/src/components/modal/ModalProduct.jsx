import React from 'react';

const ModalProduct = ({ toggleShowCreate, handleSubmit, register, errors, onSubmit, isEdit }) => {
    return (
        <div className="modal-product-line">
            <div onClick={toggleShowCreate} className="overlay"></div>
            <form className="content" onSubmit={handleSubmit(onSubmit)}>
                {isEdit ? (
                    <span className="center title-2">Edit Product</span>
                ) : (
                    <span className="center title-2">Create Product</span>
                )}

                {errors.code && <span className="error">This field is required</span>}
                <label className="row">
                    Name
                    <input
                        {...register('productName', { required: true })}
                        placeholder="Honda"
                        className="input"
                    />
                </label>
                {errors.name && <span className="error">This field is required</span>}

                <label className="row">
                    Price
                    <input
                        {...register('price', { required: true })}
                        placeholder="Honda"
                        className="input"
                        type="number"
                    />
                </label>
                {errors.price && <span className="error">This field is required</span>}

                <label className="row">
                    ProductLine
                    <select {...register('productLine')} className="">
                        <option value="XM_Honda">Honda</option>
                        <option value="XM_Yamaha">Yamaha</option>
                        <option value="XM_Suzuki">Suzuki</option>
                        <option value="XM_Sym">Sym</option>
                    </select>
                </label>

                <label className="row">
                    Image Uri
                    <input
                        {...register('imageUri', { required: true })}
                        placeholder="Honda"
                        className="input"
                        type="String"
                    />
                </label>
                {errors.imageUri && <span className="error">This field is required</span>}

                <label className="row">
                    Quantity Product
                    <input
                        {...register('quantity', { required: true })}
                        placeholder="Honda"
                        className="input"
                        type="number"
                    />
                </label>
                {errors.price && <span className="error">This field is required</span>}

                <label className="row">
                    Description
                    <textarea
                        {...register('description', { required: true })}
                        placeholder="..."
                        className="textarea"
                        style={{ minHeight: '80px' }}
                    />
                </label>
                {errors.description && <span className="error">This field is required</span>}

                <label className="row">
                    Engine
                    <input
                        {...register('engineType', { required: true })}
                        placeholder="Honda"
                        className="input"
                    />
                </label>
                {errors.engineType && <span className="error">This field is required</span>}

                <label className="row">
                    Maximum Capacity
                    <input
                        {...register('maximumCapacity', { required: true })}
                        placeholder="Honda"
                        className="input"
                    />
                </label>
                {errors.maximumCapacity && <span className="error">This field is required</span>}

                <label className="row">
                    Engine Oil Capacity
                    <input
                        {...register('engineOilCapacity', { required: true })}
                        placeholder="Honda"
                        className="input"
                    />
                </label>
                {errors.engineOilCapacity && <span className="error">This field is required</span>}

                <label className="row">
                    Petrol Tank Capacity
                    <input
                        {...register('petrolTankCapacity', { required: true })}
                        placeholder="Honda"
                        className="input"
                    />
                </label>
                {errors.petrolTankCapacity && <span className="error">This field is required</span>}

                <label className="row">
                    Raw Material Consumption
                    <input
                        {...register('rawMaterialConsumption', { required: true })}
                        placeholder="Honda"
                        className="input"
                    />
                </label>
                {errors.rawMaterialConsumption && (
                    <span className="error">This field is required</span>
                )}

                <label className="row">
                    Size Long x Large x Height
                    <input
                        {...register('sizeLongLargeHeigh', { required: true })}
                        placeholder="Honda"
                        className="input"
                    />
                </label>
                {errors.sizeLongLargeHeigh && <span className="error">This field is required</span>}

                <label className="row">
                    Saddle Height
                    <input
                        {...register('saddleHeight', { required: true })}
                        placeholder="Honda"
                        className="input"
                    />
                </label>
                {errors.saddleHeight && <span className="error">This field is required</span>}

                <label className="row">
                    Chassis Height
                    <input
                        {...register('chassisHeight', { required: true })}
                        placeholder="Honda"
                        className="input"
                    />
                </label>
                {errors.saddleHeight && <span className="error">This field is required</span>}

                <label className="row">
                    Cylinder Capacity
                    <input
                        {...register('cylinderCapacity', { required: true })}
                        placeholder="Honda"
                        className="input"
                    />
                </label>
                {errors.saddleHeight && <span className="error">This field is required</span>}

                <label className="row">
                    Boot System
                    <input
                        {...register('bootSystem', { required: true })}
                        placeholder="Honda"
                        className="input"
                    />
                </label>
                {errors.bootSystem && <span className="error">This field is required</span>}

                {isEdit ? (
                    <button className="btn btn-success">Edit</button>
                ) : (
                    <button className="btn btn-success">Create</button>
                )}
            </form>
        </div>
    );
};

export default ModalProduct;
