import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categoryColors = {
  Dairy: "bg-blue-100 text-blue-700",
  Meat: "bg-red-100 text-red-700",
  Fruits: "bg-pink-100 text-pink-700",
  Veggies: "bg-green-100 text-green-700",
  Other: "bg-gray-100 text-gray-700",
};

const categoryOptions = ["Dairy", "Meat", "Fruits", "Veggies", "Other"];

const getDaysLeft = (expiry) => {
  const today = new Date();
  const exp = new Date(expiry);
  const diff = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
  return diff;
};

export default function Home() {
  const API = "https://fridgepal-65l3.onrender.com/items";
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    quantity: "",
    expiry: "",
    category: "Other",
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios.get(API).then((res) => setItems(res.data));
  };

  const handleSubmit = () => {
    if (!form.name || !form.quantity || !form.expiry) {
      toast.error("Please fill all fields");
      return;
    }

    if (form.id) {
      axios
        .put(`${API}/${form.id}`, form)
        .then(() => {
          fetchItems();
          toast.info("Item updated ✏️");
        })
        .catch(() => toast.error("Failed to update item"));
    } else {
      axios
        .post(API, { ...form, id: Date.now() })
        .then(() => {
          fetchItems();
          toast.success("Item added ✅");
        })
        .catch(() => toast.error("Failed to add item"));
    }
    setForm({
      id: "",
      name: "",
      quantity: "",
      expiry: "",
      category: "Other",
    });
  };

  const handleDelete = (id) => {
    axios.delete(`${API}/${id}`).then(() => {
      fetchItems();
      toast.error("Item moved to Trash 🗑");
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-purple-50 to-fuchsia-100 p-6">
      <ToastContainer position="top-right" autoClose={2500} />
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-10">
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-10 tracking-tight">
          FridgePal
        </h1>

        {/* Form Section */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <input
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Item Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="number"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: parseInt(e.target.value) })
            }
          />
          <input
            type="date"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={form.expiry}
            onChange={(e) => setForm({ ...form, expiry: e.target.value })}
          />
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            onClick={handleSubmit}
            className="col-span-2 w-full bg-green-700 text-white font-semibold py-2 rounded-lg hover:bg-green-800 transition"
          >
            {form.id ? "Update Item" : "Add Item"}
          </button>
        </div>

        {/* Items List */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          📦 Stored Items
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {items.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">
              No items in your fridge yet.
            </p>
          )}
          {items.map((item) => {
            const badgeStyle =
              categoryColors[item.category] || categoryColors["Other"];
            const daysLeft = getDaysLeft(item.expiry);
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border shadow-md p-5 flex flex-col justify-between"
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeStyle}`}
                  >
                    {item.category}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => setForm(item)}
                      className="text-purple-600 hover:text-purple-800"
                      title="Edit"
                    >
                      ✏
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      🗑
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-500">
                    Expiry: {item.expiry} (
                    <span
                      className={`font-semibold ${
                        daysLeft < 0
                          ? "text-red-600"
                          : daysLeft <= 3
                          ? "text-orange-500"
                          : "text-green-600"
                      }`}
                    >
                      {daysLeft < 0
                        ? "Expired"
                        : `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`}
                    </span>
                    )
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Link */}
        <div className="text-center mt-12">
          <Link
            to="/trash"
            className="inline-block px-8 py-3 bg-orange-700 text-white font-semibold rounded-full shadow-md hover:bg-red-600 transition"
          >
            View Trash →
          </Link>
        </div>
      </div>
    </div>
  );
}
