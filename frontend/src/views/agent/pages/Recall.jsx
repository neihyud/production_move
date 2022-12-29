import React from 'react';

import './page.css';
import '../../../assets/css/common.css';
import SidebarAgent from '../SidebarAgent';
import Navbar from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';

import EditIcon from '@mui/icons-material/Edit';
import { GridActionsCellItem } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AgentContext } from '../../../contexts/AgentContext';
import { AuthContext } from '../../../contexts/AuthContext';
import ModalMessage from '../../../components/layout/ModalMessage';
import ModalExport from '../../../components/modal/ModalExport';

const Recall = () => {
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
        getProductWarrantyDone,
        setLoading,
        productRecall,
        recallToWarranty,
        agentState: { products, productLoading, productLines },
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
        getProductWarrantyDone(code);
        return () => {};
    }, []);

    const handleEditClick = (row) => async () => {
        console.log('agentId: ', row._id);
        setShowExport(!showExport);

        setValue('id', row._id);
    };

    const toggleShowExport = () => {
        console.log('productline: ', productLines);
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
            width: 150,
            headerAlign: 'center',
            align: 'center',
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
            width: 150,
            cellClassName: 'actions',
            renderCell: (params) => {
                return (
                    <Button
                        size="small"
                        variant="outlined"
                        color="success"
                        onClick={handleWarranty(params.row)}
                    >
                        Warranty
                    </Button>
                );
            },
        },
    ];

    const handleWarranty = (row) => () => {
        // toggleShowExport();
        recallToWarranty(code, row)
        console.log('paramtHandnle Warranty: ', row);
    };

    const onSubmit = async (data) => {
        console.log('data: ', data);

        const { success, message, error } = await productRecall(code, data);

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
                    handleSelectClick,
                    checkboxSelection: true,
                }}
            />
        );
    }
    const argsModalProduct = {
        toggleShowExport,
        handleSubmit,
        register,
        errors,
        onSubmit,
    };
    return (
        <div className="wrapper-body">
            <SidebarAgent />
            <div className="wrapper-content">
                <Navbar title="Warranty" />
                <div className="group-btn">
                    <div className="center">
                        <input type="text" className="input" />
                        <button className="c-btn">Search</button>
                    </div>
                    <div>
                        <button className="btn btn-success" onClick={toggleShowExport}>
                            Recall
                        </button>
                    </div>
                </div>

                {body}

                {showExport && (
                    <ModalExport {...argsModalProduct}>
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
                        <button className="btn btn-success">Export</button>
                    </ModalExport>
                )}
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

export default Recall;
