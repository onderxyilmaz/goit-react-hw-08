import { useEffect, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';
import { refreshUser } from '../redux/auth/operations';
import { selectIsRefreshing } from '../redux/auth/selectors';

const HomePage = lazy(() => import('../pages/Home'));
const RegisterPage = lazy(() => import('../pages/Register'));
const LoginPage = lazy(() => import('../pages/Login'));
const ContactsPage = lazy(() => import('../pages/Contacts'));

export const App = () => {
    const dispatch = useDispatch();
    const isRefreshing = useSelector(selectIsRefreshing);

    useEffect(() => {
        dispatch(refreshUser());
    }, [dispatch]);

    return isRefreshing ? (
        <b>Refreshing user...</b>
    ) : (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route
                    path="/register"
                    element={
                        <RestrictedRoute redirectTo="/contacts" component={<RegisterPage />} />
                    }
                />
                <Route
                    path="/login"
                    element={
                        <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
                    }
                />
                <Route
                    path="/contacts"
                    element={
                        <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
                    }
                />
            </Route>
        </Routes>
    );
}; 