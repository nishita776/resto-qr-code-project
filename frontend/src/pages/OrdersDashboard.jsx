import { useEffect, useState } from "react";
import api from "../api/axios";

export default function OrdersDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await api.get("/orders/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("ORDERS RESPONSE:", res.data); 
      setOrders(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err.response?.data || err);
      alert("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const markDone = async (id) => {
    try {
      const token = localStorage.getItem("access");

      await api.put(
        `/orders/${id}/`,
        { status: "Done" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchOrders();
    } catch (err) {
      console.log("STATUS UPDATE ERROR:", err.response?.data || err);
      alert("Failed to update status");
    }
  };

  if (loading) {
    return <p style={{ padding: "30px" }}>Loading orders...</p>;
  }

  return (
    <div className="container">
      <h2>Incoming Orders</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => (
        <div key={order.id} className="card" style={{ marginBottom: "20px" }}>
          <h3>Table {order.table_number}</h3>
          <p><b>Phone:</b> {order.phone}</p>
          <p><b>Status:</b> {order.status}</p>

          <ul>
            {(order.items || []).length === 0 && (
              <li>No items found</li>
            )}

            {(order.items || []).map((item, i) => (
              <li key={i}>
                {item.menu_item_name} × {item.quantity}
              </li>
            ))}
          </ul>

          {order.status !== "Done" && (
            <button
              onClick={() => markDone(order.id)}
              style={{ background: "#22c55e" }}
            >
              Mark as Done
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
