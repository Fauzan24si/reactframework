import { Routes, Route } from "react-router-dom";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import NotFound from "./pages/NotFound";
import ErrorPage from "./components/ErrorPage";

function App() {
    return (
        <div className="min-h-screen bg-latar font-poppins text-teks">
            <div className="flex min-h-screen flex-col lg:flex-row">
                <Sidebar />
                <main className="flex-1 p-4 md:p-6 xl:p-8">
                    <Header />
                    <div className="mt-6 space-y-6">
                        <Routes>
                            {/* Halaman Utama */}
                            <Route path="/"          element={<Dashboard />} />
                            <Route path="/orders"    element={<Orders />} />
                            <Route path="/customers" element={<Customers />} />

                            {/* Halaman Error */}
                            <Route path="/error/400" element={<ErrorPage errorCode={400} />} />
                            <Route path="/error/401" element={<ErrorPage errorCode={401} />} />
                            <Route path="/error/403" element={<ErrorPage errorCode={403} />} />

                            {/* 404 — catch-all */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;
