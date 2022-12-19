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
                        path="/signIn"
                        element={<SignIn />}
                    />
                    <Route
                        path="/signUp"
                        element={<SignUp />}
                    />

                    <Route
                        path="/"
                        exact
                        element={
                            <RequireAuthLayout>
                                {/* <Dashboard /> */}
                                <Navigate to="/profile" />
                            </RequireAuthLayout>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <RequireAuthLayout>
                                <Profile />
                            </RequireAuthLayout>
                        }
                    />
                    <Route
                        path="/recipes"
                        element={<RequireAuthLayout>"Recipes TBI"</RequireAuthLayout>}
                    />
                    <Route
                        path="/taskManager"
                        element={<RequireAuthLayout>"Task Manager TBI"</RequireAuthLayout>}
                    />
                    <Route
                        path="/shoppingLists"
                        element={<RequireAuthLayout>"Shopping Lists TBI"</RequireAuthLayout>}
                    />
                    <Route
                        path="/message"
                        element={<RequireAuthLayout>"Message TBI"</RequireAuthLayout>}
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
