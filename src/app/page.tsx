"use client";
import Analytics from "./analytics";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

type Address = {
  state_province: string;
  street1: string;
  postal_code: string;
  country_code: string;
  city_locality: string;
};

type Order = {
  name: string;
  email: string;
  address: Address;
  createdAt: string;
  cartItems: CartItem[] | null;
};

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const query = `*[_type == "order"] | order(createdAt desc){
        name,
        email,
        createdAt,
      }`;
      const data = await client.fetch(query);
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 sm:p-10 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
        🛒 Admin Dashboard
      </h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {/* Total Orders */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-600">Total Orders</h2>
          <p className="text-3xl font-bold text-blue-500 mt-2">{orders.length}</p>
        </div>

        {/* Revenue Placeholder */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-600">Total Revenue</h2>
          <p className="text-3xl font-bold text-green-500 mt-2">$XX,XXX</p>
        </div>

        {/* Pending Orders Placeholder */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-600">Pending Orders</h2>
          <p className="text-3xl font-bold text-yellow-500 mt-2">XX</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Orders</h2>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white text-sm sm:text-base">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index} className="border-b text-sm sm:text-base hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{order.name}</td>
                  <td className="px-4 py-3">{order.email}</td>
                  <td className="px-4 py-3">{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Analytics Component */}
      <div className="mt-8">
        <Analytics />
      </div>
    </div>
  );
};

export default Dashboard;
