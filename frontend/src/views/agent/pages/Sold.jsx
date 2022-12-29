import React from 'react';

import './page.css';
import '../../../assets/css/common.css';
import SidebarAgent from '../SidebarAgent';
import Navbar from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AgentContext } from '../../../contexts/AgentContext';
import { AuthContext } from '../../../contexts/AuthContext';
import ModalMessage from '../../../components/layout/ModalMessage';
import ModalProduct from '../../../components/modal/ModalProduct';
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
        setLoading,
        createOrder,
        getProductSold,
        productReport,
        agentState: { products, productLoading, warranties },
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
        getProductSold(code);
        return () => {};
    }, []);

    const handleEditClick = (row) => async () => {
        console.log('agentId: ', row);
        setShowExport(!showExport);

        // goi query den database => lay gia tri r dien vao
        setValue('_id', row.id);
    };

    const toggleShowExport = () => {
        setShowExport(!showExport);
        reset({
            name: '',
            password: '',
            role: 'agent',
        });
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
            headerAlign: 'left',
            align: 'left',
        },
        {
            headerName: 'Product Line',
            field: 'productLine',
            width: 150,
            headerAlign: 'center',
            align: 'center',
        },
        {
            headerName: 'Price',
            field: 'price',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            headerName: 'Status',
            field: 'status',
            width: 150,
            headerAlign: 'center',
            align: 'center',
        },
        {
            headerName: 'Note',
            field: 'note',
            width: 150,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 180,
            cellClassName: 'actions',
            renderCell: (params) => {
                return [
                    <Button
                        size="small"
                        variant="outlined"
                        color="success"
                        onClick={handleEditClick(params)}
                        style={{ marginRight: '5px' }}
                    >
                        Info
                    </Button>,
                    <Button
                        size="small"
                        variant="outlined"
                        color="success"
                        onClick={handleEditClick(params)}
                    >
                        Report
                    </Button>,
                ];
            },
        },
    ];

    const onSubmit = async (data) => {
        console.log('data: ', data);

        const productId = data._id;
        const { success, message, error } = await productReport(code, productId, data);

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
                    checkboxSelection: false,
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
        title: 'Report',
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
                    {/* <div>
                        <button
                            className="btn btn-success"
                            onClick={toggleShowExport}
                            disabled={selected.length ? false : true}
                        >
                            Report
                        </button>
                    </div> */}
                </div>

                {showExport && (
                    <ModalExport {...argsModalExport}>
                        <input className="row" {...register('_id')} type="hidden" />
                        <label className="row">
                            Description
                            <textarea
                                {...register('error', { required: true })}
                                placeholder="..."
                                className="input"
                            />
                        </label>
                        {errors.error && <span className="error">This field is required</span>}

                        <button className="btn btn-success">Report</button>
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
