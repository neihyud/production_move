// import './product.css';
// import '../../../../assets/css/common.css';
// import Sidebar from '../../sidebar/Sidebar';
// import Navbar from '../../../../components/navbar/Navbar';
// import Table from '../../../../components/table/Table';

// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/DeleteOutlined';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Close';
// import { GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';

// import React from 'react';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';

// export default function Products() {
//     const height = 631;

//     const [rowModesModel, setRowModesModel] = React.useState({});

//     const handleEditClick = (id) => () => {
//         setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
//     };

//     const handleSaveClick = (id) => () => {
//         console.log(rowModesModel);
//         setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
//         console.log(rowModesModel[id]);
//     };

//     const handleDeleteClick = (id) => () => {
//         console.log(id);
//         setRows(rows.filter((row) => row.id !== id));
//     };

//     const handleCancelClick = (id) => () => {
//         setRowModesModel({
//             ...rowModesModel,
//             [id]: { mode: GridRowModes.View, ignoreModifications: true },
//         });

//         const editedRow = rows.find((row) => row.id === id);
//         if (editedRow.isNew) {
//             setRows(rows.filter((row) => row.id !== id));
//         }
//     };

//     const [rows, setRows] = useState([
//         {
//             id: 1,
//             name: 'Raj',
//             email: 'Raj@gmail.comaj@gmail.comaj@gmail.comaj@gmail.comaj@gmail.com   ',
//             phone: 7894561230,
//             age: null,
//             gender: 'M',
//             city: 'Chennai',
//             fee: 78456,
//         },
//         {
//             id: 2,
//             name: 'Mohan',
//             email: 'mohan@gmail.com',
//             phone: 7845621590,
//             age: 35,
//             gender: 'M',
//             city: 'Delhi',
//             fee: 456125,
//         },
//         {
//             id: 3,
//             name: 'Sweety',
//             email: 'sweety@gmail.com',
//             phone: 741852912,
//             age: 17,
//             gender: 'F',
//             city: 'Noida',
//             fee: 458796,
//         },
//         {
//             id: 4,
//             name: 'Vikas',
//             email: 'vikas@gmail.com',
//             phone: 9876543210,
//             age: 20,
//             gender: 'M',
//             city: 'Mumbai',
//             fee: 874569,
//         },
//         {
//             id: 5,
//             name: 'Neha',
//             email: 'neha@gmail.com',
//             phone: 7845621301,
//             age: 25,
//             gender: 'F',
//             city: 'Patna',
//             fee: 748521,
//         },
//         {
//             id: 6,
//             name: 'Mohan',
//             email: 'mohan@gmail.com',
//             phone: 7845621590,
//             age: 35,
//             gender: 'M',
//             city: 'Delhi',
//             fee: 456125,
//         },
//         {
//             id: 7,
//             name: 'Sweety',
//             email: 'sweety@gmail.com',
//             phone: 741852912,
//             age: 17,
//             gender: 'F',
//             city: 'Noida',
//             fee: 458796,
//         },
//         {
//             id: 8,
//             name: 'Vikas',
//             email: 'vikas@gmail.com',
//             phone: 9876543210,
//             age: 20,
//             gender: 'M',
//             city: 'Mumbai',
//             fee: 874569,
//         },
//         {
//             id: 9,
//             name: 'Raj',
//             email: 'Raj@gmail.com',
//             phone: 7894561230,
//             age: null,
//             gender: 'M',
//             city: 'Chennai',
//             fee: 78456,
//         },
//         {
//             id: 10,
//             name: 'Mohan',
//             email: 'mohan@gmail.com',
//             phone: 7845621590,
//             age: 35,
//             gender: 'M',
//             city: 'Delhi',
//             fee: 456125,
//         },
//         {
//             id: 11,
//             name: 'Sweety',
//             email: 'sweety@gmail.com',
//             phone: 741852912,
//             age: 17,
//             gender: 'F',
//             city: 'Noida',
//             fee: 458796,
//         },
//         {
//             id: 12,
//             name: 'Vikas',
//             email: 'vikas@gmail.com',
//             phone: 9876543210,
//             age: 20,
//             gender: 'M',
//             city: 'Mumbai',
//             fee: 874569,
//         },
//     ]);

//     const columns = [
//         { title: 'Id', field: 'id', flex: 1, editable: true, hidden: true },
//         { title: 'Name', field: 'name', flex: 1 },
//         { title: 'Email', field: 'email', flex: 1, editable: false },
//         { title: 'Phone Number', field: 'phone', flex: 1, editable: true },
//         { title: 'Age', field: 'age', flex: 1, editable: true },
//         { title: 'Gender', field: 'gender', flex: 1, editable: true },
//         { title: 'City', field: 'city', flex: 1, editable: true },
//         { title: 'School Fee', field: 'fee', flex: 1, editable: true },
//         {
//             field: 'actions',
//             type: 'actions',
//             headerName: 'Actions',
//             width: 100,
//             cellClassName: 'actions',
//             getActions: ({ id }) => {
//                 const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
//                 if (isInEditMode) {
//                     return [
//                         <GridActionsCellItem
//                             icon={<SaveIcon />}
//                             label="Save"
//                             onClick={handleSaveClick(id)}
//                         />,
//                         <GridActionsCellItem
//                             icon={<CancelIcon />}
//                             label="Cancel"
//                             className="textPrimary"
//                             onClick={handleCancelClick(id)}
//                             color="inherit"
//                         />,
//                     ];
//                 }

//                 return [
//                     <GridActionsCellItem
//                         icon={<EditIcon />}
//                         label="Edit"
//                         className="textPrimary"
//                         onClick={handleEditClick(id)}
//                         color="inherit"
//                     />,
//                     <GridActionsCellItem
//                         icon={<DeleteIcon />}
//                         label="Delete"
//                         onClick={handleDeleteClick(id)}
//                         color="inherit"
//                     />,
//                 ];
//             },
//         },
//     ];

//     const [showCreate, setShowCreate] = useState(false);

//     const toggleShowCreate = () => {
//         setShowCreate(!showCreate);
//     };

//     const { register, handleSubmit } = useForm();
//     const onSubmit = (data) => {
//         console.log(data);
//     };

//     return (
//         <div className="wrapper-body">
//             <Sidebar />
//             <div className="wrapper-content">
//                 <Navbar />
//                 <div className="addProduct">
//                     <button onClick={toggleShowCreate}>Add Product</button>
//                 </div>
//                 {showCreate && (
//                     <div className="model">
//                         <div onClick={toggleShowCreate} className="overlay"></div>
//                         <form className="content" onSubmit={handleSubmit(onSubmit)}>
//                             <label className="row">
//                                 Name
//                                 <input {...register('name')} placeholder="enter name" />
//                             </label>
//                             <label className="row">
//                                 Username
//                                 <input {...register('username')} placeholder="enter username" />
//                             </label>
//                             <label className="row">
//                                 Email
//                                 <input {...register('email')} placeholder="enter email" />
//                             </label>
//                             <label className="row">
//                                 Type Account
//                                 <select {...register('gender')}>
//                                     <option value="female">female</option>
//                                     <option value="male">male</option>
//                                     <option value="other">other</option>
//                                 </select>
//                             </label>
//                             <input className="submit" type="submit" />
//                         </form>
//                     </div>
//                 )}
//                 <Table
//                     {...{
//                         columns,
//                         rows,
//                         setRows,
//                         height,

//                         rowModesModel,
//                         setRowModesModel,
//                     }}
//                 />
//             </div>
//         </div>
//     );
// }
