import React from 'react';

// import './page.css';
import '../../../assets/css/common.css';
import SidebarAgent from '../SidebarAgent';
import Navbar from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';
import { GridActionsCellItem } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AgentContext } from '../../../contexts/AgentContext';
import { AuthContext } from '../../../contexts/AuthContext';
import ModalExport from '../../../components/modal/ModalExport';

const Product = () => {
    const [showExport, setShowExport] = useState(false);

    const {
        authState: {
            user: { username: code },
        },
    } = useContext(AuthContext);

    const {
        showToast: { show, message, type },
        setShowToast,
        setLoading,
        getProductSold,
        productReport,
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
        getProductSold(code);
        return () => {};
    }, []);

    const toggleShowExport = () => {
        setShowExport(!showExport);
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
        },
        {
            headerName: 'Price',
            field: 'price',
            width: 150,
        },
        {
            headerName: 'Status',
            field: 'status',
            width: 150,
        },
        {
            headerName: 'Note',
            field: 'note',
            flex: 1,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 180,
            cellClassName: 'actions',
            getActions: ({ row }) => {
                const isSold = row.status === 'sold' ? false : true;
                return [
                    <GridActionsCellItem
                        icon={
                            <ReportGmailerrorredRoundedIcon
                                style={{ color: isSold ? '#ddd' : 'red', fontSize: '25px' }}
                            />
                        }
                        label="report"
                        className="textPrimary"
                        onClick={handleReportClick(row)}
                        color="inherit"
                        disabled={isSold}
                    />,
                ];
            },
        },
    ];

    const handleReportClick = (row) => () => {
        console.log('row: ', row);
        setShowExport(!showExport);
        setValue('_id', row._id);
    };

    const onSubmit = async (data) => {
        console.log('data: ', data);

        const productId = data._id;
        const { success, message } = await productReport(code, productId, data);

        setShowExport(false);
        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'danger',
        });
        reset(data);
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
                <Navbar title="Sold" />
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
