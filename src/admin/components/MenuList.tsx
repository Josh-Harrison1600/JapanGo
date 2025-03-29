import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, IconButton, Toolbar, Typography, Tooltip,TablePagination, Button, Modal, TextField, TableSortLabel, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

//Categories for edit modal
const categories = [
  "Appetizer",
  "A La Carte",
  "Hot Dishes & Noodles",
  "Lunch",
  "Rolls",
  "Special Rolls",
  "Sushi, Sashimi & Roll",
  "Salad",
  "Soup",
  "Vegetarian",
  "Tempura"
];


function MenuList({ items, onDelete, refreshItems }: { items: any[]; onDelete: (id: string) => void; refreshItems: () => void }) {
  const [deleteTarget, setDeleteTarget] = useState<{ id: string, name: string } | null>(null);
  const [confirmName, setConfirmName] = useState('');
  const [editTarget, setEditTarget] = useState<any | null>(null);
  const [editForm, setEditForm] = useState({ name: '', category: [] as string[], price: '', description: '', imageUrl: '' });
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof any>('name'); 

  // function for the edit modal
  const openEditModal = (item: any) => {
    setEditTarget(item);
    setEditForm({
      name: item.name,
      category: Array.isArray(item.category) ? item.category : [item.category],
      price: item.price,
      description: item.description || '',
      imageUrl: item.imageUrl || '',
    });
  };

  // Push the changes to setEditForm
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // function to send the edit to the api
  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/menu-items/${editTarget._id}`, editForm);
      refreshItems();
      setEditTarget(null);
      toast.success('Item Updated Successfully!');
    } catch (err) {
      console.error('Error updating item', err);
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = items.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  //Function for sorting the menu
  const handleRequestSort = (property: keyof any) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (id: string) => {
    if(selected.includes(id)){
      setSelected([]);
    }else{
      setSelected([id]);
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  //Logic for sorting the items in asc/desc order
  const sortedItems = [...items].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return orderDirection === 'asc' ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return orderDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar>
          {selected.length > 0 ? (
            <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
              {selected.length} selected
            </Typography>
          ) : (
            <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
              Menu Items
            </Typography>
          )}
          {selected.length > 0 ? (
            <Tooltip title="Delete">
              <IconButton onClick={() => {
                const target = items.find((item) => item._id === selected[0]);
                if (target) setDeleteTarget({ id: target._id, name: target.name });
              }}
                sx={{
                  color: 'gray',
                  '&:hover': {
                    color: 'red',
                  },
                }}
              >
            
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : null}
        </Toolbar>
        <TableContainer>
          <Table>
          <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < items.length}
                checked={items.length > 0 && selected.length === items.length}
                onChange={handleSelectAllClick}
              />
            </TableCell>

            <TableCell>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderDirection}
                onClick={() => handleRequestSort('name')}
              >
                Name
              </TableSortLabel>
            </TableCell>

            <TableCell>
              <TableSortLabel
                active={orderBy === 'category'}
                direction={orderDirection}
                onClick={() => handleRequestSort('category')}
              >
                Category
              </TableSortLabel>
            </TableCell>

            <TableCell>
              <TableSortLabel
                active={orderBy === 'price'}
                direction={orderDirection}
                onClick={() => handleRequestSort('price')}
              >
                Price ($)
              </TableSortLabel>
            </TableCell>

            <TableCell>
              <TableSortLabel
                active={orderBy === 'description'}
                direction={orderDirection}
                onClick={() => handleRequestSort('description')}
              >
                Description
              </TableSortLabel>
            </TableCell>

            <TableCell>
              <TableSortLabel
                active={orderBy === 'imageUrl'}
                direction={orderDirection}
                onClick={() => handleRequestSort('imageUrl')}
              >
                Image Url
              </TableSortLabel>
            </TableCell>

            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

            <TableBody>
              {sortedItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${row._id}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleClick(row._id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.imageUrl}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => openEditModal(row)}>
                        <EditIcon color="primary" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Delete Confirmation Modal */}
      <Modal open={!!deleteTarget} onClose={() => { setDeleteTarget(null); setConfirmName(''); }}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', p: 4, boxShadow: 24, width: 400 }}>
          <Typography variant="h6">Confirm Deletion</Typography>
          <Typography>Type <strong>{deleteTarget?.name}</strong> to confirm deletion:</Typography>
          <TextField fullWidth variant="outlined" margin="normal" value={confirmName} onChange={(e) => setConfirmName(e.target.value)} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                if (confirmName === deleteTarget?.name) {
                  onDelete(deleteTarget.id);
                  setDeleteTarget(null);
                  setConfirmName('');
                  toast.success('Item Deleted Successfully!');
                } else {
                  toast.error('Name does not match!');
                }
              }}
            >
              Confirm
            </Button>
            <Button onClick={() => { setDeleteTarget(null); setConfirmName(''); }}>Cancel</Button>
          </Box>
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal open={!!editTarget} onClose={() => setEditTarget(null)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', p: 4, boxShadow: 24, width: 400 }}>
          <Typography variant="h6">Edit Item</Typography>
          <TextField fullWidth variant="outlined" margin="dense" label="Name" name="name" value={editForm.name} onChange={handleEditChange} />
          <TextField select fullWidth variant="outlined" margin="dense" label="Category" name="category" value={editForm.category} onChange={(e) => {
            const selected = typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value;
            setEditForm({ ...editForm, category: selected});
          }}
            slotProps={{
              select: {
                multiple: true,
              }
            }}
          >
            {/* Loop through all cat items */}
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))} 
          </TextField>
          <TextField fullWidth variant="outlined" margin="dense" label="Price" name="price" type="number" value={editForm.price} onChange={handleEditChange} />
          <TextField fullWidth variant="outlined" margin="dense" label="Description" name="description" value={editForm.description} onChange={handleEditChange} />
          <TextField fullWidth variant="outlined" margin="dense" label="Image URL" name="imageUrl" value={editForm.imageUrl} onChange={handleEditChange} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleEditSubmit}>Save</Button>
            <Button onClick={() => setEditTarget(null)}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default MenuList;
