import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CATEGORIES = ["Starters", "Mains", "Desserts", "Drinks"];

export default function CustomerMenu() {
  const { restaurantId } = useParams();

  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [phone, setPhone] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/menu/list/?restaurant=${restaurantId}`)
      .then((res) => setMenu(res.data))
      .catch((err) => console.log(err));
  }, [restaurantId]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const placeOrder = async () => {
    if (!phone || !tableNumber || cart.length === 0) {
      alert("Phone number, table number and cart items are required");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:8000/orders/place/", {
        phone,
        table_number: Number(tableNumber),
        items: cart.map((item) => item.id),
      });

      alert("Order placed successfully!");
      setCart([]);
      setPhone("");
      setTableNumber("");
    } catch (err) {
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  
  const groupedMenu = {};
  CATEGORIES.forEach((c) => (groupedMenu[c] = []));
  menu.forEach((item) => groupedMenu[item.category]?.push(item));

 
  const cartSummary = {};
  cart.forEach((item) => {
    cartSummary[item.name] = (cartSummary[item.name] || 0) + 1;
  });

  return (
    <div className="container">
      <div className="menu-header">
        <h2>Menu</h2>
        <span className="cart-badge">🛒 {cart.length}</span>
      </div>

      {CATEGORIES.map((category) => (
        <div key={category} className="category-section">
          <h3 className="category-title">
            <span className="category-line" />
            {category}
          </h3>

          <div className="menu-grid">
            {groupedMenu[category].map((item) => (
              <div key={item.id} className="card lift">
                {item.image && (
                  <div className="image-wrapper">
                    <img src={item.image} alt={item.name} />
                    <div className="image-overlay" />
                  </div>
                )}

                <div className="card-content">
                  <h4>{item.name}</h4>
                  <span className="price-badge">₹{item.price}</span>
                  <button onClick={() => addToCart(item)}>
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      
      <div className="card cart-card static-card">
        <h3>Your Cart</h3>

        {Object.keys(cartSummary).length === 0 && (
          <p className="empty-cart">
            No items yet.<br />Add something delicious!
          </p>
        )}

        {Object.entries(cartSummary).map(([name, qty]) => (
          <p key={name} className="cart-item">
            {name} × {qty}
          </p>
        ))}

        <input
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          placeholder="Table number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
        />

        <button onClick={placeOrder} disabled={loading}>
          {loading ? "Placing..." : "Place Order"}
        </button>
      </div>

      <footer className="footer">
        © 2025 Café Order System 
      </footer>
    </div>
  );
}
