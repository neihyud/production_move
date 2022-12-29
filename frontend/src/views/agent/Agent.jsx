import { Routes, Route } from 'react-router-dom';

import AgentContextProvider from '../../contexts/AgentContext';
import ProtectedRoute from '../../components/routing/ProtectedRoute';
import Landing from '../../components/layout/Landing';

import Statistical from './pages/Statistical';
import Product from './pages/Product';
import Order from './pages/Order';
import Warranty from './pages/Warranty';
import WarrantyDone from './pages/WarrantyDone';
import Sold from './pages/Sold';

import Auth from '../Auth';
import Recall from './pages/Recall';

export default function Agent() {
    return (
        <AgentContextProvider>
            <Routes>
                <Route path="/login" element={<Auth authRoute="login" />} />
                <Route path="/dashboard" element={<ProtectedRoute element={<Statistical />} />} />
                <Route path="/product" element={<ProtectedRoute element={<Product />} />} />
                <Route path="/order" element={<ProtectedRoute element={<Order />} />} />
                <Route path="/warranty" element={<ProtectedRoute element={<Warranty />} />} />
                <Route
                    path="/warranty-done"
                    element={<ProtectedRoute element={<WarrantyDone />} />}
                />
                <Route path="/recall" element={<ProtectedRoute element={<Recall />} />} />
                <Route path="/sold" element={<ProtectedRoute element={<Sold />} />} />
                <Route path="*" element={<Landing />} />
            </Routes>
        </AgentContextProvider>
    );
}
