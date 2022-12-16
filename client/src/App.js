import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import RequireAuthLayout from './Layout/RequireAuthLayout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route
                        path="/signin"
                        element={<SignIn />}
                    />
                    <Route
                        path="/signup"
                        element={<SignUp />}
                    />

                    <Route
                        path="/"
                        exact
                        element={
                            <RequireAuthLayout>
                                <Dashboard />
                            </RequireAuthLayout>
                        }
                    />
                    <Route
                        path="/profile"
                        exact
                        element={
                            <RequireAuthLayout>
                                <Profile />
                            </RequireAuthLayout>
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
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
