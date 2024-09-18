import React, { useEffect, useState } from 'react';
import axios from 'axios';
const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState('');
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);

    const handleStatusChange = (orderId, newStatus) => {
        axios.put(`http://localhost:5000/api/orders/${orderId}`, { status: newStatus })
            .then(response => {
                setOrders(orders.map(order =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                ));
            })
            .catch(error => {
                console.error('Error updating order status:', error);
            });
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.name}</td>
                            <td>{order.contactNumber}</td>
                            <td>${order.totalAmount}</td>
                            <td>{order.status}</td>
                            <td>
                                <button onClick={() => handleStatusChange(order._id, 'Pending')}>Pending</button>
                                <button onClick={() => handleStatusChange(order._id, 'Delivered')}>Delivered</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
