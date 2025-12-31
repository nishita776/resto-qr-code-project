import { useEffect, useState } from "react";
import api from "../api/axios";

const CATEGORIES = ["Starters", "Mains", "Desserts", "Drinks"];

export default function ManageMenu() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Starters");
  const [image, setImage] = useState("");
  const [items, setItems] = useState([]);

  const token = localStorage.getItem("access");

  const loadMenu = async () => {
    try {
      const res = await api.get("/menu/list/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItems(res.data);
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const addItem = async () => {
    if (!name || !price || !category) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await api.post(
        "/menu/create/",
        {
          name,
          price: Number(price),
          category,
          image, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      setName("");
      setPrice("");
      setCategory("Starters");
      setImage("");

      loadMenu();
    } catch (err) {
      console.log(err.response?.data || err);
      alert("Failed to add menu item");
    }
  };

  
  const grouped = {};
  CATEGORIES.forEach((c) => (grouped[c] = []));

  items.forEach((item) => {
    grouped[item.category]?.push(item);
  });

  return (
    <div className="container">
      <h2>Manage Menu</h2>


      <div className="card static-card" style={{ marginBottom: "24px" }}>
        <h3>Add Menu Item</h3>

       
        <input
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

       
        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            marginBottom: "12px",
          }}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        
        <input
          placeholder="Image URL (paste food image link)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button onClick={addItem}>Add Item</button>
      </div>

      
      {CATEGORIES.map((cat) => (
        <div key={cat} className="card" style={{ marginBottom: "16px" }}>
          <h3>{cat}</h3>

          {grouped[cat].length === 0 && (
            <p style={{ color: "#9ca3af" }}>No items</p>
          )}

          {grouped[cat].map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "8px",
              }}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}

              <span>
                {item.name} - ₹{item.price}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
