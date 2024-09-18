import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Alarm } from '@mui/icons-material';
import axios from 'axios';
import Sidebar from './Sidebar';
const ExpiringProductsPage = () => {
  const [expiringProducts, setExpiringProducts] = useState([]);

  useEffect(() => {
    fetchExpiringProducts();
  }, []);

  const fetchExpiringProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products/expiry');
      setExpiringProducts(response.data);
    } catch (error) {
      console.error('Error fetching expiring products:', error);
    }
  };

  const calculateTimeLeft = (expiryDate) => {
    const now = new Date();
    const end = new Date(expiryDate);
    const difference = end - now;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days} days ${hours} hours`;
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
                avatar={<Alarm sx={{ fontSize: 40 }} />}
                sx={{ background: '#001f3f', color: '#fff' }}
              />
            <CardContent>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><Typography fontWeight="bold">Product Name</Typography></TableCell>
                      <TableCell><Typography fontWeight="bold">Batch Number</Typography></TableCell>
                      <TableCell><Typography fontWeight="bold">Expiry Date</Typography></TableCell>
                      <TableCell><Typography fontWeight="bold">Time Left</Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {expiringProducts.length > 0 ? (
                      expiringProducts.map((product) => (
                        <TableRow key={product._id}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.batchNumber}</TableCell>
                          <TableCell>{new Date(product.expiryDate).toDateString()}</TableCell>
                          <TableCell>{calculateTimeLeft(product.expiryDate)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">No products about to expire.</TableCell>
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

export default ExpiringProductsPage;
