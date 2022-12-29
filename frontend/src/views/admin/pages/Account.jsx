import './page.css';
import '../../../assets/css/common.css';
import SidebarAdmin from '../SidebarAdmin';
import Navbar from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import ModalAccount from '../../../components/modal/ModalAccount';
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

export default function Products() {
    const [showCreate, setShowCreate] = useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    let idRef = React.useRef(0);

    const {
        getAccounts,
        addAccount,
        updateAccount,
        deleteAccount,
        showToast: { show, message, type },
        setShowToast,
        adminState: { accounts, accountLoading },
    } = useContext(AdminContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();

    useEffect(() => {
        getAccounts();
        return () => {};
    }, []);

    const columns = [
        { headerName: 'Id', field: '_id', flex: 1 },
        { headerName: 'Name', field: 'username', flex: 1, headerAlign: 'center', align: 'center' },
        { headerName: 'Role', field: 'role', width: 150, headerAlign: 'center', align: 'center' },
        {
            headerName: 'Status',
            field: 'status',
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
                        onClick={handleDeleteClick(row._id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const handleEditClick = (row) => () => {
        console.log(row._id);
        setShowCreate(!showCreate);
        setIsEdit(true);

        // goi query den database => lay gia tri r dien vao
        setValue('username', row.username);
        setValue('password', '');
        setValue('role', row.role);
    };

    const handleDeleteClick = (id) => () => {
        console.log(id);
        setShowModal(true);
        idRef.current = id;
    };

    const handleDelete = async () => {
        const id = idRef.current || 1;
        const { success, message } = await deleteAccount(id);
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
    if (accountLoading) {
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
                    rows: accounts,
                }}
            />
        );
    }

    // Submit btn
    const onSubmit = async (data) => {
        console.log('data: ', data);
        const { success, message } = isEdit ? await updateAccount(data) : await addAccount(data);

        setShowCreate(false);
        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'danger',
        });

        reset(data);
    };

    const argsModal = {
        title: 'Remove account',
        body: 'Do you want to delete this account?',
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
                <Navbar title="Account" />
                <div className="group-btn">
                    <div className="center">
                        <input type="text" className="input" />
                        <button className="c-btn">Search</button>
                    </div>
                    <button className="btn btn-success" onClick={toggleShowCreate}>
                        Add Account
                    </button>
                </div>

                {body}

                {showCreate && <ModalAccount {...argsModalProductLine} />}

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
