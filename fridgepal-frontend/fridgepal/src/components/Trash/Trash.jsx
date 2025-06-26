import { useEffect, useState } from "react";
import axios from "axios";

const categoryColors = {
  Dairy: "bg-blue-100 text-blue-700",
  Meat: "bg-red-100 text-red-700",
  Fruits: "bg-pink-100 text-pink-700",
  Veggies: "bg-green-100 text-green-700",
  Other: "bg-gray-100 text-gray-700",
};

export default function Trash() {
  const [trashItems, setTrashItems] = useState([]);

  useEffect(() => {
    fetchTrashItems();
  }, []);

  const fetchTrashItems = () => {
    axios.get("http://127.0.0.1:8000/trash").then((res) => {
      setTrashItems(res.data);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-red-700 mb-6 text-center">
          🗑 Discarded Items
        </h1>
        <p className="text-gray-600 text-lg text-center mb-10">
          These are items you've discarded. Maybe they expired or went bad.
        </p>

        {trashItems.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {trashItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 rounded-xl border shadow p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      categoryColors[item.category] || categoryColors.Other
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
                <p className="text-lg font-bold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                <p className="text-sm text-gray-500">
                  Expired on: {item.expiry}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 italic mt-10">
            No discarded items yet 🧼
          </div>
        )}
      </div>
    </div>
  );
}
