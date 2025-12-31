import QRCode from "react-qr-code";

export default function QrCode() {
  const restaurantId = 1;

  const menuUrl = `http://localhost:5173/menu/${restaurantId}`;

  return (
    <div style={{ padding: "80px", textAlign: "center" }}>
      <h2>Scan to View Menu</h2>

      <QRCode value={menuUrl} size={300} />

      <p style={{ marginTop: "20px", wordBreak: "break-all" }}>
        {menuUrl}
      </p>
    </div>
  );
}
