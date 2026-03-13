import { allProducts } from "../data/product";
import { getCategoryColor } from "../lib/productUtils";

const Overview = () => {
  const userApps = allProducts.filter(
    (product) =>
      product.name !== "Scholar One" &&
      product.name !== "Isla Intelligence" &&
      product.name !== "Terra Vision AI"
  );

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Your Applications</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userApps.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            {/* Icon + Title + Category */}
            <div className="flex items-start gap-4 mb-4">
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getCategoryColor(
                  product.category
                )} flex items-center justify-center text-white shrink-0`}
              >
                <product.icon className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-lg font-semibold">{product.name}</h4>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4">
              {product.description}
            </p>

            {/* Button */}
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Launch App
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Overview;