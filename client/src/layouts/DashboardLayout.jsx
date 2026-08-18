import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
    const [mobileMenu, setMobileMenu] =
        useState(false);

    const menuItems = [
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: "📊",
        },
        {
            label: "Leads",
            path: "/leads",
            icon: "👥",
        },
        {
            label: "Customers",
            path: "/customers",
            icon: "🏢",
        },
        {
            label: "Follow-ups",
            path: "/follow-ups",
            icon: "📅",
        },
        {
            label: "Users",
            path: "/users",
            icon: "👤",
        },
        {
            label: "Settings",
            path: "/settings",
            icon: "⚙️",
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Mobile overlay */}
            {mobileMenu && (
                <div
                    onClick={() => setMobileMenu(false)}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 w-64
                    border-r border-gray-200 bg-white
                    transition-transform duration-300
                    lg:static lg:translate-x-0
                    ${
                        mobileMenu
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }
                `}
            >
                <div className="flex h-full flex-col">

                    {/* Logo */}
                    <div className="flex h-16 items-center border-b px-6">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                LeadFlow
                            </h1>

                            <p className="text-xs text-gray-500">
                                CRM SaaS
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 p-4">

                        {menuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() =>
                                    setMobileMenu(false)
                                }
                                className={({ isActive }) =>
                                    `
                                    flex items-center gap-3
                                    rounded-lg px-4 py-3
                                    text-sm font-medium
                                    transition
                                    ${
                                        isActive
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }
                                    `
                                }
                            >
                                <span>{item.icon}</span>

                                <span>
                                    {item.label}
                                </span>
                            </NavLink>
                        ))}

                    </nav>

                    {/* Bottom section */}
                    <div className="border-t p-4">

                        <button
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-600 hover:bg-gray-50"
                        >
                            <span>👤</span>
                            Profile
                        </button>

                        <button
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                        >
                            <span>🚪</span>
                            Logout
                        </button>

                    </div>
                </div>
            </aside>

            {/* Main area */}
            <div className="flex min-w-0 flex-1 flex-col">

                {/* Header */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 lg:px-6">

                    <button
                        onClick={() =>
                            setMobileMenu(true)
                        }
                        className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
                    >
                        ☰
                    </button>

                    <div className="ml-auto flex items-center gap-4">

                        <button className="relative rounded-lg p-2 hover:bg-gray-100">
                            🔔

                            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
                        </button>

                        <div className="hidden text-right sm:block">
                            <p className="text-sm font-semibold">
                                Karthik
                            </p>

                            <p className="text-xs text-gray-500">
                                Admin
                            </p>
                        </div>

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                            K
                        </div>

                    </div>
                </header>

                {/* Page */}
                <main className="flex-1 p-4 lg:p-6">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default DashboardLayout;