import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
const MainLayout = React.lazy(() => import("./layouts/MainLayout"))
const Dashboard = React.lazy(() => import("./pages/main/Dashboard"))
const Orders = React.lazy(() => import("./pages/main/Orders"))
const Customers = React.lazy(() => import("./pages/main/Customers"))
const NotFound = React.lazy(() => import("./pages/main/NotFound"))
const ErrorPage = React.lazy(() => import("./components/ErrorPage"))
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"))
const Login = React.lazy(() => import("./pages/auth/Login"))
const Register = React.lazy(() => import("./pages/auth/Register"))
const Forgot = React.lazy(() => import("./pages/auth/Forgot"))
import Loading from "./components/Loading";

function App() {
    return (
        <Suspense fallback={<Loading />}>
                    <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="orders" element={<Orders />} />
                <Route path="customers" element={<Customers />} />

                <Route path="error/400" element={<ErrorPage errorCode={400} />} />
                <Route path="error/401" element={<ErrorPage errorCode={401} />} />
                <Route path="error/403" element={<ErrorPage errorCode={403} />} />
            </Route>

                <Route element={<AuthLayout/>}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/forgot" element={<Forgot/>} />
                </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
    );
}

export default App;
