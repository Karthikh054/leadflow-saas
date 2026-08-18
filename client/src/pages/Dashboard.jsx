import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../store/authSlice";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const dispatch = useDispatch();

    const user = useSelector(
        (state) => state.auth.user
    );

    const handleLogout = async () => {
        await dispatch(logoutUser());
        window.location.href = "/login";
    };

    return (
        <div className="min-h-screen bg-gray-100">

            <header className="bg-white border-b">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                    <h1 className="text-xl font-bold text-gray-900">
                        LeadFlow
                    </h1>

                    <button
                        onClick={handleLogout}
                        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-8">

                <h2 className="text-3xl font-bold text-gray-900">
                    Welcome, {user?.name}
                </h2>

                <p className="mt-2 text-gray-500">
                    Here's what's happening with your CRM.
                </p>
                
                <div className="mt-8 grid gap-6 md:grid-cols-4">

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Total Leads
                        </p>

                        <h3 className="mt-2 text-3xl font-bold">
                            0
                        </h3>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Customers
                        </p>

                        <h3 className="mt-2 text-3xl font-bold">
                            0
                        </h3>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Won Leads
                        </p>

                        <h3 className="mt-2 text-3xl font-bold">
                            0
                        </h3>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Revenue
                        </p>

                        <h3 className="mt-2 text-3xl font-bold">
                            ₹0
                        </h3>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;