import { Shield, Settings, Smartphone, Building2, Clock } from "lucide-react";
import { allProducts } from "../data/product";
import { getCategoryColor, getCategoryIcon } from "../lib/productUtils";

const Overview = () => {
  const user = localStorage.getItem("daia_user");
  const userApps = allProducts.filter(
    (product) =>
      product.name !== "Scholar One" &&
      product.name !== "Isla Intelligence" &&
      product.name !== "Terra Vision AI"
  );

  return (
    <>
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <h2 className="text-xl font-bold">User Account</h2>
        <p className="text-sm text-gray-600">{user}</p>
      </div>

      {/* Apps */}
      <h3 className="text-2xl font-bold mb-6">Your Applications</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userApps.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getCategoryColor(
                product.category
              )} flex items-center justify-center text-white mb-4`}
            >
              {getCategoryIcon(product.category)}
            </div>

            <h4 className="text-lg font-bold mb-2">{product.name}</h4>
            <p className="text-sm text-gray-600 mb-4">
              {product.description}
            </p>

            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg">
              Launch App
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Overview;