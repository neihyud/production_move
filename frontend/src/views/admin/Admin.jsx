import './admin.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Statistical from './pages/Statistical';
import Accounts from './pages/Account';
import Products from './pages/product/Product';
import ProductLine from './pages/ProductLine';
import AdminContextProvider from '../../contexts/AdminContext';
// import ProtectedRoute from './components/routing/ProtectedRoute';
import ProtectedRoute from '../../components/routing/ProtectedRoute';
import Landing from '../../components/layout/Landing';

import Auth from '../Auth';

export default function Admin() {
    return (
        <div className="container">
            <AdminContextProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Auth authRoute="login" />} />
                        <Route path="/register" element={<Auth authRoute="register" />} />
                        <Route
                            path="/dashboard"
                            element={<ProtectedRoute element={<Statistical />} />}
                        />
                        <Route
                            path="/account"
                            element={<ProtectedRoute element={<Accounts />} />}
                        />
                        {/* <Route
                            path="/product"
                            element={<ProtectedRoute element={<Products />} />}
                        /> */}
                        <Route
                            path="/productLine"
                            element={<ProtectedRoute element={<ProductLine />} />}
                        />

                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </Router>
            </AdminContextProvider>
        </div>
    );
}
