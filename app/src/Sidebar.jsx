import React from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Home, Add, Edit, Warning, Alarm } from '@mui/icons-material'; // Import new icons

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        background: '#001f3f',
        color: '#fff',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h3 style={{ color: '#fff' }}>Admin Dashboard</h3>
      <List sx={{ width: '100%' }}>
        <ListItem button component={Link} to="/add">
          <Add sx={{ color: '#fff', fontSize: 30 }} />
          <ListItemText primary="Add Product" sx={{ marginLeft: 2 }} />
        </ListItem>
        <Divider sx={{ my: 1, bgcolor: '#555' }} />
        <ListItem button component={Link} to="/edit">
          <Edit sx={{ color: '#fff', fontSize: 30 }} />
          <ListItemText primary="Edit Product" sx={{ marginLeft: 2 }} />
        </ListItem>
        <Divider sx={{ my: 1, bgcolor: '#555' }} />
        <ListItem button component={Link} to="/low">
          <Warning sx={{ color: '#fff', fontSize: 30 }} />
          <ListItemText primary="Low Stock Products" sx={{ marginLeft: 2 }} />
        </ListItem>
        <Divider sx={{ my: 1, bgcolor: '#555' }} />
        <ListItem button component={Link} to="/expire">
          <Alarm sx={{ color: '#fff', fontSize: 30 }} />
          <ListItemText primary="Expiring Products" sx={{ marginLeft: 2 }} />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
