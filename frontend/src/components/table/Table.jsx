import { Box } from '@mui/material';
import React from 'react';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { useState } from 'react';
import './table.css';

const Table = ({ columns, rows, checkboxSelection, handleOnCellClick, handleSelectClick }) => {
    const [pageSize, setPageSize] = useState(10);

    const initState = {
        columns: {
            columnVisibilityModel: {
                id: false,
                _id: false,
            },
        },
    };

    return (
        <div style={{ flex: 1 }}>
            <Box
                className="box"
                sx={{
                    width: '100%',
                    height: '100%',
                }}
                style={{
                    cursor: 'pointer',
                }}
            >
                <DataGrid
                    rowHeight={45}
                    getRowId={(row) => row._id}
                    initialState={initState}
                    className=""
                    columns={columns}
                    checkboxSelection={checkboxSelection}
                    rows={rows}
                    pagination
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[10, 20, 40]}
                    onCellClick={handleOnCellClick}
                    onSelectionModelChange={(item) => handleSelectClick(item)}
                />
            </Box>
        </div>
    );
};

export default Table;
