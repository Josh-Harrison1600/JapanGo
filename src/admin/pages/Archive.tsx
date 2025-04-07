import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, IconButton, Toolbar, Typography, Tooltip, TablePagination, Button, Modal, TextField, TableSortLabel } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore'; 

//Archive component to display and manage archived items
function Archive({ deletedItems, onRestore}: {
    deletedItems: any[];
    onRestore: (id: string) => void;
    refreshItems: () => void;
}) {
    const [selected, setSelected] = useState<string[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof any>('name');
    const [restoreTarget, setRestoreTarget] = useState<{ id: string, name: string } | null>(null);

    //Function for sorting in asc/dec
    const handleRequestSort = (property: keyof any) => {
        const isAsc = orderBy === property && orderDirection === 'asc';
        setOrderDirection(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    //Function for selecting items
    const handleClick = (id: string) => {
        setSelected((prev) => 
            prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
        );
    };

    //Function for going to next page
    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    //Function for changing rows per page
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const sortedItems = [...deletedItems].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return orderDirection === 'asc' ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return orderDirection === 'asc' ? 1 : -1;
    return 0;
    });

    return(
        <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Toolbar>
            {selected.length > 0 ? (
              <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1">
                {selected.length} selected
              </Typography>
            ) : (
              <Typography sx={{ flex: '1 1 100%' }} variant="h6">
                Archived Items
              </Typography>
            )}
            {selected.length > 0 ? (
              <Tooltip title="Restore">
                <IconButton onClick={() => {
                  const target = deletedItems.find(item => item._id === selected[0]);
                  if (target) setRestoreTarget({ id: target._id, name: target.name });
                }}>
                  <RestoreIcon />
                </IconButton>
              </Tooltip>
            ) : null}
          </Toolbar>
  
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={orderDirection}
                      onClick={() => handleRequestSort('name')}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price ($)</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  const isItemSelected = selected.includes(row._id);
                  return (
                    <TableRow
                      hover
                      key={row._id}
                      selected={isItemSelected}
                      onClick={() => handleClick(row._id)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} />
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>{row.description}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
  
          <TablePagination
            component="div"
            count={deletedItems.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
  
        {/* Modal for confirming restore */}
        <Modal open={!!restoreTarget} onClose={() => setRestoreTarget(null)}>
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)', bgcolor: 'background.paper',
            p: 4, boxShadow: 24, width: 400
          }}>
            <Typography variant="h6">Restore Item</Typography>
            <Typography>Are you sure you want to restore <strong>{restoreTarget?.name}</strong>?</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
              <Button variant="contained" color="primary" onClick={() => {
                if (restoreTarget) {
                  onRestore(restoreTarget.id);
                  setRestoreTarget(null);
                }
              }}>
                Restore
              </Button>
              <Button onClick={() => setRestoreTarget(null)}>Cancel</Button>
            </Box>
          </Box>
        </Modal>
      </Box>        
    )
}

export default Archive;