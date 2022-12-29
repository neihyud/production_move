import React from 'react';

// import './page.css';
import '../../../assets/css/common.css';
import SidebarAgent from '../SidebarAgent';
import Navbar from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';

import Button from '@mui/material/Button';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import SecurityIcon from '@mui/icons-material/Security';
import DoneIcon from '@mui/icons-material/Done';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { AgentContext } from '../../../contexts/AgentContext';
import { AuthContext } from '../../../contexts/AuthContext';

import ModalAction from '../../../components/modal/ModalAction';

const WarrantyDone = () => {
    const [showModal, setShowModal] = useState(false);

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
        exportToCustomer,
        agentState: { products, productLoading },
    } = useContext(AgentContext);

    const idRef = React.useRef();
    useLayoutEffect(() => {
        setLoading();
        return () => {};
    }, []);

    useEffect(() => {
        getProductWarrantyDone(code);
        return () => {};
    }, []);

    const toggleShowCreate = () => {
        setShowModal(!showModal);
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
            width: 150,
            cellClassName: 'actions',
            getActions: (params) => {
                return [
                    <GridActionsCellItem
                        icon={<CheckCircleIcon style={{ color: 'green' }} />}
                        onClick={handleReturnCustomerClick(params)}
                        label="Done"
                    ></GridActionsCellItem>,
                ];
            },
        },
    ];

    const handleReturnCustomerClick = (params) => () => {
        toggleShowCreate();
        idRef.current = params.row._id;
        console.log('params: ', params);
    };

    const handleReturnCustomer = async () => {
        const productId = idRef.current;

        const { success, message, error } = await exportToCustomer(code, productId);

        setShowModal(false);

        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'danger',
        });
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
                    handleSelectClick: null,
                    checkboxSelection: false,
                }}
            />
        );
    }

    const argsDone = {
        title: 'Return To Customer',
        body: 'Do you want to return to Customer',
        setShowModal,
        showModal,
        isDone: true,
        handleAction: handleReturnCustomer,
    };
    return (
        <div className="wrapper-body">
            <SidebarAgent />
            <div className="wrapper-content">
                <Navbar title="Warranty Done" />
                <div className="group-btn">
                    <div className="center">
                        <input type="text" className="input" />
                        <button className="c-btn">Search</button>
                    </div>
                    {/* <div>
                        <button
                            className="btn btn-success"
                            onClick={toggleShowCreate}
                            disabled={selected.length ? false : true}
                        >
                            Warranty
                        </button>
                    </div> */}
                </div>
                {body}
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

export default WarrantyDone;
