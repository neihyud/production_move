import React from 'react';

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

import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ManufactureContext } from '../../../contexts/ManufactureContext';
import { AuthContext } from '../../../contexts/AuthContext';
import ModalMessage from '../../../components/layout/ModalMessage';
import ModalProduct from '../../../components/modal/ModalProduct';

const Repair = () => {
    const [showCreate, setShowCreate] = useState(false);
    const [selected, setSelected] = useState([]);

    const {
        authState: {
            user: { username: code },
        },
    } = useContext(AuthContext);

    const {
        showToast: { show, message, type },
        setShowToast,
        getErrorProducts,
        manufactureState: { productsError, productLoading },
    } = useContext(ManufactureContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();

    useEffect(() => {
        getErrorProducts(code);
        return () => {};
    }, []);

    const handleEditClick = (row) => async () => {
        console.log('manufactureId: ', row._id);
        setShowCreate(!showCreate);

        // goi query den database => lay gia tri r dien vao
        setValue('id', row._id);
    };

    const toggleShowCreate = () => {
        setShowCreate(!showCreate);
        reset({
            name: '',
            password: '',
            role: 'manufacture',
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
            getActions: ({ row }) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(row)}
                        color="inherit"
                    />,
                    // <GridActionsCellItem
                    //     icon={<DeleteIcon />}
                    //     label="Delete"
                    //     onClick={handleDeleteClick(row._id)}
                    //     color="inherit"
                    // />,
                ];
            },
        },
    ];

    const onSubmit = async (data) => {
        console.log('data: ', data);

        const { success, message, error } = await Repair();

        setShowCreate(false);
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
        console.log('productsError: ', productsError);
        body = (
            <Table
                {...{
                    columns,
                    rows: productsError,
                    checkboxSelection: true,
                    handleSelectClick,
                }}
            />
        );
    }
    const argsModalProduct = {
        toggleShowCreate,
        handleSubmit,
        register,
        errors,
        onSubmit,
    };
    return (
        <div className="wrapper-body">
            <SidebarManufacture />
            <div className="wrapper-content">
                <Navbar title="Defective" />
                <div className="group-btn">
                    <div className="center">
                        <input type="text" className="input" />
                        <button className="c-btn">Search</button>
                    </div>
                    <div>
                        <button className="btn btn-success" onClick={toggleShowCreate}>
                            Add Product
                        </button>
                    </div>
                </div>

                {body}

                {showCreate && <ModalProduct {...argsModalProduct} />}
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

export default Repair;
