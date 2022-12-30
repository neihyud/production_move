import React from 'react';
import { useContext } from 'react';
import { TYPE_ACTION_ADD, TYPE_ACTION_EDIT } from '../../contexts/constants';

const ModalProduct = ({
    toggleShowCreate,
    handleSubmit,
    register,
    errors,
    onSubmit,
    typeAction,
    productLines,
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
                                placeholder="25"
                                className="input"
                                type="number"
                                min="0"
                            />
                        </label>
                        {errors.price && <span className="error">This field is required</span>}
                        <label className="row">
                            ProductLine
                            <select {...register('productLine')} className="">
                                {productLines.map((productLine, index) => {
                                    return (
                                        <option value={productLine.code} key={index}>
                                            {productLine.productLine}
                                        </option>
                                    );
                                })}
                            </select>
                        </label>
                        <label className="row">
                            Image Uri
                            <input
                                {...register('imageUri', { required: true })}
                                placeholder="..."
                                className="input"
                            />
                        </label>
                        {errors.imageUri && <span className="error">This field is required</span>}
                        <label className="row">
                            Quantity Product
                            <input
                                {...register('quantity', { required: true })}
                                placeholder="25"
                                className="input"
                                type="number"
                                min="1"
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
                                placeholder="Xăng, 4 kỳ, 1 xilanh, làm mát bằng không khí"
                                className="input"
                            />
                        </label>
                        {errors.engineType && <span className="error">This field is required</span>}
                        <label className="row">
                            Maximum Capacity
                            <input
                                {...register('maximumCapacity', { required: true })}
                                placeholder="6,46 kW / 7.500 vòng/phút"
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
                                placeholder="0,8 lít khi thay nhớt 1,0 lít khi rã máy"
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
                                placeholder="4,0 L"
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
                                placeholder="1,7l/100 km"
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
                                placeholder="1.921 mm x 709 mm x 1.081 mm"
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
                                placeholder="760mm"
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
                                placeholder="135mm"
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
                                placeholder="109,2 cm3"
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
                                placeholder="Đạp chân/Điện"
                                className="input"
                            />
                        </label>
                        {errors.bootSystem && <span className="error">This field is required</span>}
                    </>
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
