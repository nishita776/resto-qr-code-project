import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ManageMenu from "./pages/ManageMenu";
import CustomerMenu from "./pages/CustomerMenu";
import QrCode from "./pages/QrCode";
import OrdersDashboard from "./pages/OrdersDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        //staff
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/orders" element={<OrdersDashboard />} />
        <Route path="/manage-menu" element={<ManageMenu />} />

        //customer
        <Route path="/qr" element={<QrCode />} />
        <Route path="/menu/:restaurantId" element={<CustomerMenu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
