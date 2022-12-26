import './page.css';
import '../../../assets/css/common.css';
import SidebarAdmin from '../SidebarAdmin';
import Navbar from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';

import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import ModalMessage from '../../../components/layout/ModalMessage';
import { AdminContext } from '../../../contexts/AdminContext';
import ModalProductLine from '../../../components/modal/ModalProductLine';

export default function Products() {
    const [showCreate, setShowCreate] = useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const [alert, setAlert] = useState(null);
    let idRef = React.useRef(0);

    const {
        getProductlines,
        addProductline,
        updateProductline,
        deleteProductline,
        showToast: { show, message, type },
        setShowToast,
        adminState: { productLines, productLineLoading },
    } = useContext(AdminContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();

    useEffect(() => {
        getProductlines();
        return () => {};
    }, []);

    const columns = [
        { headerName: 'Id', field: 'id', flex: 1 },
        { headerName: 'Code', field: 'code', width: 150, headerAlign: 'center', align: 'center' },
        {
            headerName: 'Name',
            field: 'productLine',
            width: 200,
            headerAlign: 'center',
            align: 'center',
        },
        {
            headerName: 'Description',
            field: 'description',
            flex: 1,
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
        setValue('productLine', row.productLine);
        setValue('description', row.description);
    };

    const handleDeleteClick = (id) => () => {
        console.log(id);
        setShowModal(true);
        idRef.current = id;
    };

    const handleDelete = async () => {
        const id = idRef.current || 1;
        const { success, message } = await deleteProductline(id);
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
            role: 'admin',
        });
    };

    let body = null;
    if (productLineLoading) {
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
                    rows: productLines,
                }}
            />
        );
    }

    // Submit btn
    const onSubmit = async (data) => {
        console.log('data: ', data);
        const { success, message, error } = isEdit
            ? await updateProductline(data)
            : await addProductline(data);

        setShowCreate(false);
        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'danger',
        });
        reset(data);
    };

    const argsModal = {
        title: 'Remove productLine',
        body: 'Do you want to delete this productLine?',
        handleDelete,
        setShowModal,
        showModal,
    };

    const argsModalProductLine = {
        toggleShowCreate,
        handleSubmit,
        register,
        errors,
        onSubmit,
        isEdit,
    };

    return (
        <div className="wrapper-body">
            <SidebarAdmin />
            <div className="wrapper-content">
                <Navbar title="Product Line" />
                <div className="group-btn">
                    <div className="center">
                        <input type="text" className="input" />
                        <button className="c-btn">Search</button>
                    </div>
                    <button className="btn btn-success" onClick={toggleShowCreate}>
                        Add Productline
                    </button>
                </div>

                {body}

                {showCreate && <ModalProductLine {...argsModalProductLine} />}

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
