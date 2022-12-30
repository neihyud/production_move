import React from 'react';

// import './page.css';
import '../../../assets/css/common.css';
import SidebarAgent from '../SidebarAgent';
import Navbar from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';

import CallMadeRoundedIcon from '@mui/icons-material/CallMadeRounded';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AgentContext } from '../../../contexts/AgentContext';
import { AuthContext } from '../../../contexts/AuthContext';
import ModalExport from '../../../components/modal/ModalExport';
import ModalAction from '../../../components/modal/ModalAction';

const Recall = () => {
    const [showExport, setShowExport] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const {
        authState: {
            user: { username: code },
        },
    } = useContext(AuthContext);
    let idRef = React.useRef(0);

    const {
        showToast: { show, message, type },
        setShowToast,
        setLoading,
        productRecall,
        recallToWarranty,
        getProductRecall,
        agentState: { products, productLoading, productLines },
    } = useContext(AgentContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useLayoutEffect(() => {
        setLoading();
        return () => {};
    }, []);

    useEffect(() => {
        getProductRecall(code);
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
            flex: 1,
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
                        icon={<CallMadeRoundedIcon style={{ color: 'red' }} />}
                        label="Call"
                        onClick={handleWarrantyClick(row)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const handleWarrantyClick = (row) => () => {
        idRef.current = row;
        setShowModal(!showModal);
        console.log('products: ', products);
    };

    const handleWarranty = async () => {
        const { success, message } = await recallToWarranty(code, idRef.current);
        setShowModal(false);
        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'danger',
        });
    };

    const onSubmit = async (data) => {
        const { success, message } = await productRecall(code, data);

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
    const argsModalProduct = {
        toggleShowExport,
        handleSubmit,
        register,
        errors,
        onSubmit,
    };

    const argsDone = {
        title: 'Do you want recall',
        body: 'Do you want to export to Agent',
        setShowModal,
        showModal,
        isDone: true,
        handleAction: handleWarranty,
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

                {showModal && <ModalAction {...argsDone} />}
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
