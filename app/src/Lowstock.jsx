import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Warning } from '@mui/icons-material';
import axios from 'axios';
import Sidebar from './Sidebar';

const LowStockPage = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    fetchLowStockProducts();
  }, []);

  const fetchLowStockProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products/low-stock');
      setLowStockProducts(response.data);
    } catch (error) {
      console.error('Error fetching low stock products:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Sidebar />
      <Box sx={{ padding: '20px', background: '#f0f0f0', flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Low Stock Products
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ background: '#fff', color: '#000' }}>
              <CardHeader
                title="Low Stock Products"
                avatar={<Warning sx={{ fontSize: 40 }} />}
                sx={{ background: '#001f3f', color: '#fff' }}
              />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><Typography fontWeight="bold">Product Name</Typography></TableCell>
                        <TableCell><Typography fontWeight="bold">Stock</Typography></TableCell>
                        <TableCell><Typography fontWeight="bold">Batch Number</Typography></TableCell>
                        <TableCell><Typography fontWeight="bold">Expiry Date</Typography></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {lowStockProducts.length > 0 ? (
                        lowStockProducts.map((product) => (
                          <TableRow key={product._id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>{product.batchNumber}</TableCell>
                            <TableCell>{new Date(product.expiryDate).toDateString()}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} align="center">No products with low stock.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LowStockPage;
