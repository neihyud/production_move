import './page.css';
import '../../../assets/css/common.css';
import SidebarManufacture from '../SidebarManufacture';
import Navbar from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid';

import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ManufactureContext } from '../../../contexts/ManufactureContext';
import { AuthContext } from '../../../contexts/AuthContext';
import ModalMessage from '../../../components/layout/ModalMessage';
import ModalProduct from '../../../components/modal/ModalProduct';

export default function Products() {
    const [showCreate, setShowCreate] = useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);

    let idRef = React.useRef(0);

    const {
        getProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        showToast: { show, message, type },
        setShowToast,
        manufactureState: { products, productLoading },
    } = useContext(ManufactureContext);

    const {
        authState: {
            user: { username: code },
        },
    } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();

    useEffect(() => {
        getProducts(code);
        return () => {};
    }, []);

    const columns = [
        { headerName: 'Id', field: 'id', flex: 1 },
        {
            headerName: 'Name',
            field: 'productName',
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
            headerName: 'Quantity',
            field: 'quantity',
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
            getActions: ({ row }) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(row)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(row.id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const handleEditClick = (row) => () => {
        console.log(row.id);
        setShowCreate(!showCreate);
        setIsEdit(true);

        // goi query den database => lay gia tri r dien vao
        setValue('code', row.code);
        setValue('product', row.product);
        setValue('description', row.description);
    };

    const handleDeleteClick = (id) => () => {
        console.log('delete product', id);
        setShowModal(true);
        idRef.current = id;
    };

    const handleDelete = async () => {
        const id = idRef.current || 1;
        const { success, message } = await deleteProduct(code, id);
        setShowToast({
            success,
            message,
            type: success ? 'success' : 'danger',
        });
        setShowModal(false);
    };

    const toggleShowCreate = () => {
        setShowCreate(!showCreate);
        setIsEdit(false);
        reset({
            name: '',
            password: '',
            role: 'manufacture',
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
                    checkboxSelection: true,
                }}
            />
        );
    }

    // Submit btn
    const onSubmit = async (data) => {
        console.log('data: ', data);
        const { success, message, error } = isEdit
            ? await updateProduct(code, data)
            : await addProduct(code, data);

        setShowCreate(false);
        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'danger',
        });
        reset(data);
    };

    const argsModal = {
        title: 'Remove product',
        body: 'Do you want to delete this product?',
        handleDelete,
        setShowModal,
        showModal,
    };

    const argsModalProduct = {
        toggleShowCreate,
        handleSubmit,
        register,
        errors,
        onSubmit,
        isEdit,
    };

    return (
        <div className="wrapper-body">
            <SidebarManufacture />
            <div className="wrapper-content">
                <Navbar title="Product Line" />
                <div className="group-btn">
                    <div className="center">
                        <input type="text" className="input" />
                        <button className="c-btn">Search</button>
                    </div>
                    <button className="btn btn-success" onClick={toggleShowCreate}>
                        Add Product
                    </button>
                </div>

                {body}

                {showCreate && <ModalProduct {...argsModalProduct} />}

                {showModal && <ModalMessage {...argsModal} />}
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
}
