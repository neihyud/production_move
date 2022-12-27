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

import {
    TYPE_ACTION_ADD,
    TYPE_ACTION_EDIT,
    TYPE_ACTION_IMPORT,
    TYPE_ACTION_EXPORT,
} from '../../../contexts/constants';

export default function Products() {
    const [showCreate, setShowCreate] = useState(false);
    const [showExport, setShowExport] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [typeAction, setTypeAction] = useState(TYPE_ACTION_ADD);

    const [selected, setSelected] = useState([]);

    let idRef = React.useRef(0);

    const {
        getProducts,
        getProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        exportProduct,
        showToast: { show, message, type },
        setShowToast,
        manufactureState: { products, productLoading, product },
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

    const handleEditClick = (row) => async () => {
        console.log('manufactureId: ', row.id);
        setShowCreate(!showCreate);
        setTypeAction(TYPE_ACTION_EDIT);

        let { product } = await getProduct(code, row.id);

        // goi query den database => lay gia tri r dien vao
        setValue('id', row.id);
        setValue('productName', product.productName);
        setValue('price', product.price);
        setValue('productLine', product.productLine);
        setValue('imageUri', product.imageUri);
        setValue('quantity', product.quantity);
        setValue('description', product.description);
        setValue('engineType', product.engineType);
        setValue('maximumCapacity', product.maximumCapacity);
        setValue('engineOilCapacity', product.engineOilCapacity);
        setValue('petrolTankCapacity', product.petrolTankCapacity);
        setValue('rawMaterialConsumption', product.rawMaterialConsumption);
        setValue('sizeLongLargeHeigh', product.sizeLongLargeHeigh);
        setValue('saddleHeight', product.saddleHeight);
        setValue('chassisHeight', product.chassisHeight);
        setValue('cylinderCapacity', product.cylinderCapacity);
        setValue('bootSystem', product.bootSystem);
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

    const handleSelectClick = (selected) => {
        setSelected(selected);
    };

    const toggleShowCreate = () => {
        setShowCreate(!showCreate);
        setTypeAction(TYPE_ACTION_ADD);
        reset({
            name: '',
            password: '',
            role: 'manufacture',
        });
    };

    const toggleShowExport = () => {
        setShowCreate(!showCreate);
        setTypeAction(TYPE_ACTION_EXPORT);
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
                    handleSelectClick,
                }}
            />
        );
    }

    // Submit btn
    const onSubmit = async (data) => {
        console.log('data: ', data);

        let _data = null;
        switch (typeAction) {
            case TYPE_ACTION_EDIT:
                _data = await updateProduct(code, data);
                break;
            case TYPE_ACTION_ADD:
                _data = await addProduct(code, data);
                break;
            case TYPE_ACTION_EXPORT:
                _data = await exportProduct(code, selected, data);
                break;
            case TYPE_ACTION_IMPORT:
                _data = await addProduct(code, data);
                break;
            default:
                break;
        }

        const { success, message, error } = _data;

        setShowCreate(false);
        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'danger',
        });
        reset(data);
        setSelected([]);
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
        toggleShowExport,
        handleSubmit,
        register,
        errors,
        onSubmit,
        typeAction,
    };

    return (
        <div className="wrapper-body">
            <SidebarManufacture />
            <div className="wrapper-content">
                <Navbar title="Product" />
                <div className="group-btn">
                    <div className="center">
                        <input type="text" className="input" />
                        <button className="c-btn">Search</button>
                    </div>
                    <div>
                        <button
                            className="btn btn-success"
                            style={{ marginRight: '15px' }}
                            onClick={toggleShowExport}
                            disabled={selected.length ? false : true}
                        >
                            Export Product
                        </button>
                        <button className="btn btn-success" onClick={toggleShowCreate}>
                            Add Product
                        </button>
                    </div>
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
