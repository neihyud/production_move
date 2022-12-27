import React from 'react';
import {
    TYPE_ACTION_ADD,
    TYPE_ACTION_EDIT,
    TYPE_ACTION_EXPORT,
    TYPE_ACTION_IMPORT,
} from '../../contexts/constants';

const ModalProduct = ({
    toggleShowCreate,
    handleSubmit,
    register,
    errors,
    onSubmit,
    typeAction,
}) => {
    return (
        <div className="modal-product-line">
            <div onClick={toggleShowCreate} className="overlay"></div>
            <form className="content" onSubmit={handleSubmit(onSubmit)}>
                {typeAction === TYPE_ACTION_EDIT && (
                    <>
                        <span className="center title-2">Edit Product</span>
                        <input className="row" {...register('id')} type="hidden" />
                    </>
                )}

                {typeAction === TYPE_ACTION_ADD && (
                    <span className="center title-2">Create Product</span>
                )}

                {typeAction === TYPE_ACTION_EXPORT && (
                    <span className="center title-2">Export Product</span>
                )}

                {typeAction === TYPE_ACTION_IMPORT && (
                    <span className="center title-2">Import Product</span>
                )}

                {(typeAction === TYPE_ACTION_EDIT || typeAction === TYPE_ACTION_ADD) && (
                    <>
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
                                min="0"
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
                        {errors.description && (
                            <span className="error">This field is required</span>
                        )}
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
                        {errors.maximumCapacity && (
                            <span className="error">This field is required</span>
                        )}
                        <label className="row">
                            Engine Oil Capacity
                            <input
                                {...register('engineOilCapacity', { required: true })}
                                placeholder="Honda"
                                className="input"
                            />
                        </label>
                        {errors.engineOilCapacity && (
                            <span className="error">This field is required</span>
                        )}
                        <label className="row">
                            Petrol Tank Capacity
                            <input
                                {...register('petrolTankCapacity', { required: true })}
                                placeholder="Honda"
                                className="input"
                            />
                        </label>
                        {errors.petrolTankCapacity && (
                            <span className="error">This field is required</span>
                        )}
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
                        {errors.sizeLongLargeHeigh && (
                            <span className="error">This field is required</span>
                        )}
                        <label className="row">
                            Saddle Height
                            <input
                                {...register('saddleHeight', { required: true })}
                                placeholder="Honda"
                                className="input"
                            />
                        </label>
                        {errors.saddleHeight && (
                            <span className="error">This field is required</span>
                        )}
                        <label className="row">
                            Chassis Height
                            <input
                                {...register('chassisHeight', { required: true })}
                                placeholder="Honda"
                                className="input"
                            />
                        </label>
                        {errors.saddleHeight && (
                            <span className="error">This field is required</span>
                        )}
                        <label className="row">
                            Cylinder Capacity
                            <input
                                {...register('cylinderCapacity', { required: true })}
                                placeholder="Honda"
                                className="input"
                            />
                        </label>
                        {errors.saddleHeight && (
                            <span className="error">This field is required</span>
                        )}
                        <label className="row">
                            Boot System
                            <input
                                {...register('bootSystem', { required: true })}
                                placeholder="Honda"
                                className="input"
                            />
                        </label>
                        {errors.bootSystem && <span className="error">This field is required</span>}
                    </>
                )}

                {typeAction === TYPE_ACTION_EXPORT && (
                    <label className="row">
                        Agents
                        <select {...register('agent')} className="">
                            <option value="agent zero">agent zero</option>
                            <option value="agent second">agent second</option>
                            <option value="agent third">agent third</option>
                            <option value="agent fourth">agent fourth</option>
                        </select>
                    </label>
                )}

                {typeAction === TYPE_ACTION_EXPORT && (
                    <button className="btn btn-success">Export</button>
                )}

                {typeAction === TYPE_ACTION_IMPORT && (
                    <button className="btn btn-success">Import</button>
                )}

                {typeAction === TYPE_ACTION_EDIT && (
                    <button className="btn btn-success">Edit</button>
                )}

                {typeAction === TYPE_ACTION_ADD && (
                    <button className="btn btn-success">Create</button>
                )}
            </form>
        </div>
    );
};

export default ModalProduct;
