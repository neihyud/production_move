import React from 'react';

// import './page.css';
import '../../../assets/css/common.css';
import SidebarWarranty from '../SidebarWarranty';
import Navbar from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import { GridActionsCellItem } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useState, useEffect, useContext } from 'react';
import { WarrantyContext } from '../../../contexts/WarrantyContext';
import { AuthContext } from '../../../contexts/AuthContext';
import ModalAction from '../../../components/modal/ModalAction';

const Product = () => {
    const [showModal, setShowModal] = useState(false);
    const [isDone, setIsDone] = useState(false);

    let idRef = React.useRef(0);
    const {
        authState: {
            user: { username: code },
        },
    } = useContext(AuthContext);

    const {
        showToast: { show, message, type },
        setShowToast,
        getProducts,
        exportToAgent,
        exportToManufacture,
        warrantyState: { products, productLoading },
    } = useContext(WarrantyContext);

    useEffect(() => {
        getProducts(code);
        return () => {};
    }, []);

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

            getActions: ({ row }) => {
                return [
                    <GridActionsCellItem
                        icon={<ErrorOutlineIcon style={{ color: 'red' }} />}
                        label="error"
                        className="textPrimary"
                        onClick={handleProductError(row)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<CheckCircleIcon style={{ color: 'green' }} />}
                        label="done"
                        onClick={handleProductSuccess(row)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const handleProductError = (row) => () => {
        console.log('params', row);
        setIsDone(false);
        setShowModal(!showModal);
        idRef.current = row._id;
        console.log('Test');
    };

    const handleProductSuccess = (row) => () => {
        setIsDone(true);
        setShowModal(!showModal);
        idRef.current = row._id;
    };

    const handleAction = async (isDone) => {
        const id = idRef.current;

        const { success, message, error } = isDone
            ? await exportToAgent(code, id)
            : await exportToManufacture(code, id);

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
        console.log('products: ', products);
        body = (
            <Table
                {...{
                    columns,
                    rows: products,
                }}
            />
        );
    }

    const argsError = {
        title: 'Export To Manufacture',
        body: 'You want to export to Manufacture',
        setShowModal,
        showModal,
        handleAction,
        isDone,
    };

    const argsDone = {
        title: 'Export To Agent',
        body: 'Do you want to export to Agent',
        setShowModal,
        showModal,
        isDone,
        handleAction,
    };
    return (
        <div className="wrapper-body">
            <SidebarWarranty />
            <div className="wrapper-content">
                <Navbar title="Product" />
                <div className="group-btn">
                    <div className="center">
                        <input type="text" className="input" />
                        <button className="c-btn">Search</button>
                    </div>
                </div>

                {showModal &&
                    (isDone ? <ModalAction {...argsDone} /> : <ModalAction {...argsError} />)}

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
