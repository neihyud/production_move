import { Routes, Route } from 'react-router-dom';

import WarrantyContextProvider from '../../contexts/WarrantyContext';
import ProtectedRoute from '../../components/routing/ProtectedRoute';
import Landing from '../../components/layout/Landing';

import Statistical from './pages/Statistical';
import Product from './pages/Product';

import Auth from '../Auth';

export default function Warranty() {
    return (
        <WarrantyContextProvider>
            <Routes>
                <Route path="/login" element={<Auth authRoute="login" />} />
                <Route path="/dashboard" element={<ProtectedRoute element={<Statistical />} />} />
                <Route path="/product" element={<ProtectedRoute element={<Product />} />} />
                <Route path="*" element={<Landing />} />
            </Routes>
        </WarrantyContextProvider>
    );
}
