import {  Routes, Route } from 'react-router-dom';
import Statistical from './pages/Statistical';
import Accounts from './pages/Account';
import ProductLine from './pages/ProductLine';
import AdminContextProvider from '../../contexts/AdminContext';

import ProtectedRoute from '../../components/routing/ProtectedRoute';
import Landing from '../../components/layout/Landing';

import Auth from '../Auth';

export default function Admin() {
    return (
        <AdminContextProvider>
            <Routes>
                <Route path="/login" element={<Auth authRoute="login" />} />
                <Route path="/dashboard" element={<ProtectedRoute element={<Statistical />} />} />
                <Route path="/account" element={<ProtectedRoute element={<Accounts />} />} />
                <Route path="/productLine" element={<ProtectedRoute element={<ProductLine />} />} />

                <Route path="*" element={<Landing />} />
            </Routes>
        </AdminContextProvider>
    );
}
