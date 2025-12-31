import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container">
      <h2>Restaurant Dashboard</h2>

      <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
        <Link to="/manage-menu">
          <button>Manage Menu</button>
        </Link>

        <Link to="/dashboard/orders">
          <button>View Orders</button>
        </Link>
      </div>
    </div>
  );
}
