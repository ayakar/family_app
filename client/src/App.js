import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvide } from './contexts/AuthContext';
import Layout from './Layout/Layout';
import SignIn from './pages/SignIn';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    exact
                    element={
                        <AuthProvide>
                            <Layout>
                                <SignIn />
                            </Layout>
                        </AuthProvide>
                    }
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
        </BrowserRouter>
    );
}

export default App;
