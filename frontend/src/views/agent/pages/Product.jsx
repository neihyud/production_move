import React from 'react';

// import './page.css';
import '../../../assets/css/common.css';
import SidebarAgent from '../SidebarAgent';
import Navbar from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';

import EditIcon from '@mui/icons-material/Edit';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AgentContext } from '../../../contexts/AgentContext';
import { AuthContext } from '../../../contexts/AuthContext';
import ModalExport from '../../../components/modal/ModalExport';

const Product = () => {
    const [showExport, setShowExport] = useState(false);
    const [selected, setSelected] = useState([]);

    const {
        authState: {
            user: { username: code },
        },
    } = useContext(AuthContext);

    const {
        showToast: { show, message, type },
        setShowToast,
        getProducts,
        setLoading,
        createOrder,
        agentState: { products, productLoading },
    } = useContext(AgentContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();

    useLayoutEffect(() => {
        setLoading();
        return () => {};
    }, []);

    useEffect(() => {
        getProducts(code);
        return () => {};
    }, []);

    const handleEditClick = (row) => async () => {
        console.log('agentId: ', row._id);
        // setShowExport(!showExport);

        setValue('id', row._id);
    };

    const toggleShowExport = () => {
        setShowExport(!showExport);
        reset();
    };

    const handleSelectClick = (selected) => {
        setSelected(selected);
    };

    const columns = [
        { headerName: 'Id', field: '_id', flex: 1 },
        {
            headerName: 'Name',
            field: 'productName',
            width: 350,
        },
        {
            headerName: 'Product Line',
            field: 'productLine',
            width: 150,
        },
        {
            headerName: 'Price',
            field: 'price',
            flex: 1,
        },
        {
            headerName: 'Status',
            field: 'status',
            width: 150,
        },
        {
            headerName: 'Note',
            field: 'note',
            width: 150,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 150,
            cellClassName: 'actions',
            getActions: ({ row }) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(row)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const onSubmit = async (data) => {
        console.log('data: ', data);

        const { success, message, error } = await createOrder(code, selected, data);

        setShowExport(false);
        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'danger',
        });
        reset(data);
        setSelected([]);
    };

    let body = null;
    if (productLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        );
    } else {
        body = (
            <Table
                {...{
                    columns,
                    rows: products,
                    checkboxSelection: true,
                    handleSelectClick,
                }}
            />
        );
    }
    const argsModalExport = {
        toggleShowExport,
        handleSubmit,
        register,
        errors,
        onSubmit,
        title: 'Order',
    };
    return (
        <div className="wrapper-body">
            <SidebarAgent />
            <div className="wrapper-content">
                <Navbar title="Product" />
                <div className="group-btn">
                    <div className="center">
                        <input type="text" className="input" />
                        <button className="c-btn">Search</button>
                    </div>
                    <div>
                        <button
                            className="btn btn-success"
                            onClick={toggleShowExport}
                            disabled={selected.length ? false : true}
                        >
                            Order
                        </button>
                    </div>
                </div>

                {showExport && (
                    <ModalExport {...argsModalExport}>
                        <label className="row">
                            Name
                            <input
                                {...register('username', { required: true })}
                                placeholder="Honda"
                                className="input"
                            />
                        </label>
                        {errors.username && <span className="error">This field is required</span>}

                        <label className="row">
                            Phone
                            <input
                                {...register('phone', { required: true })}
                                placeholder="0123456798"
                                type="number"
                                className="input"
                            />
                        </label>
                        {errors.phone && <span className="error">This field is required</span>}
                        <label className="row">
                            Address
                            <input
                                {...register('address', { required: true })}
                                placeholder="Ha Noi"
                                className="input"
                            />
                        </label>
                        {errors.address && <span className="error">This field is required</span>}
                        <button className="btn btn-success">Order</button>
                    </ModalExport>
                )}

                {body}
            </div>
            <Toast
                show={show}
                style={{ position: 'fixed', top: '20%', right: '10px' }}
                className={`bg-${type} text-white`}
                onClose={() => setShowToast({ show: false, message: '', type: null })}
                delay={3000}
                autohide
            >
                <Toast.Body>
                    <strong>{message}</strong>
                </Toast.Body>
            </Toast>
        </div>
    );
};

export default Product;
