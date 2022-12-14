import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './Layout/Layout';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route
                        path="/"
                        exact
                        element={
                            <Layout>
                                <Dashboard />
                            </Layout>
                        }
                    />

                    <Route
                        path="/signin"
                        element={
                            <Layout>
                                <SignIn />
                            </Layout>
                        }
                    />
                    <Route
                        path="/signup"
                        element={<Layout>sign up here</Layout>}
                    />

                    <Route
                        path="*"
                        element={
                            <Navigate
                                to="/"
                                replace
                            />
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
