"use client";
import { useEffect, useState, useMemo } from "react";
import { getOrders } from "@/api/order";
import {
    FiSearch, FiPackage, FiX, FiUsers,
    FiTrendingUp, FiShoppingBag, FiCalendar
} from "react-icons/fi";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const response = await getOrders();
                // Console check for debugging
                console.log("Full API Data:", response?.data); 
                setOrders(response?.data || []);
            } catch (err) {
                console.error("Order fetch failed", err);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };
        fetchAllOrders();
    }, []);

    // Memoize groupedData for performance
    const groupedData = useMemo(() => {
        return orders.reduce((acc, order) => {
            // Check if userId is an object (populated) or a string
            const isPopulated = typeof order.userId === 'object' && order.userId !== null;
            const customerId = isPopulated ? order.userId._id : (order.userId || "guest");

            if (!acc[customerId]) {
                acc[customerId] = {
                    name: isPopulated ? order.userId.name : `User (${customerId.substring(0, 6)})`,
                    email: isPopulated ? order.userId.email : "Email not loaded",
                    totalOrders: 0,
                    totalSpent: 0,
                    lastOrderDate: order.createdAt,
                    allOrders: []
                };
            }

            // Data Accumulation (Update counts and totals)
            acc[customerId].totalOrders += 1;
            acc[customerId].totalSpent += (Number(order.amount) || 0);
            acc[customerId].allOrders.push(order);

            // Update last order date
            if (new Date(order.createdAt) > new Date(acc[customerId].lastOrderDate)) {
                acc[customerId].lastOrderDate = order.createdAt;
            }

            return acc;
        }, {});
    }, [orders]);

    const customerList = Object.values(groupedData).filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalRevenue = orders.reduce((sum, ord) => sum + (Number(ord.amount) || 0), 0);

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-white">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="p-8 bg-[#f8f9fa] min-h-screen font-sans text-slate-900">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                        <FiShoppingBag size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Total Orders</p>
                        <h3 className="text-2xl font-bold">{orders.length}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                        <FiTrendingUp size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Total Revenue</p>
                        <h3 className="text-2xl font-bold">₹{totalRevenue.toLocaleString('en-IN')}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                        <FiUsers size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Active Customers</p>
                        <h3 className="text-2xl font-bold">{customerList.length}</h3>
                    </div>
                </div>
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Customer Insights</h2>
                    <p className="text-slate-500">Analyze purchase behavior by customer</p>
                </div>
                <div className="relative group">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search customers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-80 pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-5 text-[13px] font-bold text-slate-500 uppercase">Customer</th>
                                <th className="px-8 py-5 text-[13px] font-bold text-slate-500 uppercase text-center">Engagement</th>
                                <th className="px-8 py-5 text-[13px] font-bold text-slate-500 uppercase">Revenue Contribution</th>
                                <th className="px-8 py-5 text-[13px] font-bold text-slate-500 uppercase text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {customerList.map((customer, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                                                {customer.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 group-hover:text-orange-600">{customer.name}</div>
                                                <div className="text-xs text-slate-400">{customer.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">{customer.totalOrders}</span>
                                            <span className="text-[10px] text-blue-500 font-bold uppercase">Orders</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="font-bold">₹{customer.totalSpent.toLocaleString('en-IN')}</div>
                                        <div className="text-[11px] text-slate-400 flex items-center gap-1">
                                            <FiCalendar size={12}/> Last: {new Date(customer.lastOrderDate).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <button
                                            onClick={() => setSelectedCustomer(customer)}
                                            className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-orange-600 transition-all"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {selectedCustomer && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col">
                        <div className="px-8 py-6 border-b flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white">
                                    <FiPackage size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black">{selectedCustomer.name}</h2>
                                    <p className="text-xs font-bold text-slate-400 uppercase">Order History</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedCustomer(null)} className="text-slate-400 hover:text-slate-900">
                                <FiX size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/30">
                            <div className="space-y-4">
                                {selectedCustomer.allOrders.map((ord, i) => (
                                    <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-slate-50 rounded-xl text-slate-400 font-bold">#{i + 1}</div>
                                            <div>
                                                <div className="font-extrabold text-slate-900">ID: {ord.orderId || 'N/A'}</div>
                                                <div className="text-[11px] text-slate-400">
                                                    {new Date(ord.createdAt).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <div className="text-right">
                                                <div className="text-sm font-black">₹{ord.amount}</div>
                                                <div className={`text-[10px] inline-block font-black uppercase px-2 py-0.5 rounded-md ${ord.status === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                                                    {ord.status}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}